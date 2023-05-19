
// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').config();
// }
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY; /*key stored in .env file locally*/
// const stripeSecretKey = process.env.STRIPE_SECRET_KEY_HEROKU  /*key stored in heroku config files*/
const stripeSecretKey = "sk_test_51KCRd9HhLmpfEuqhcGLfFf6uXvMcJWSFTQqTjIyjxrfHat0oYBjpjX8IH1bdyY4BR68kgJA1mkpaFLFKAoqkPMgH002AoWiagQ"

// const stripeSecretKey = process.env.STRIPE_PUBLIC_KEY; /*key stored in .env file locally*/
const stripePublicKey = "pk_test_51KCRd9HhLmpfEuqhe9seMzfM4k0eh4Fcvgf2u7mS1Pv3OeqzQNtfg4ZrWOzOmoWPruBBvlnzR6SzaDiH85TNdbAd00uuWnLRiy"
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY_HEROKU   

const contentful = require('contentful');
const express = require('express');
const app = express();
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);
const port = process.env.PORT || 3000

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));





app.listen(port);


//sending items.json data to shop.ejs and making a get request at route shop
app.get('/shop', (req, res)=>{
    fs.readFile('items.json', (error, data)=>{
        if(error){
            res.status(500).end();
        }
        else{
         res.render('shop.ejs',{
             stripePublicKey,
             items:JSON.parse(data)
         })   
        }
    })
  
})  

app.post('/purchase' , (req, res)=>{
    fs.readFile('items.json', (error, data)=>{
        if(error){
            res.status(500).end();
        }
        else{
       const itemsStoredInOurBakend = JSON.parse(data)   
       const recievedData = req.body.items; //items array that was posted via fetch from frontend
            var total = 0;     
            recievedData.forEach(item=>{
                const purchasedItems = itemsStoredInOurBakend.merch.find((i)=>{
                    return i.id == item.id;
                })
                // console.log(purchasedItems); 
                total = total + ((purchasedItems.price*100) * item.quantity) 
                /*multiplied by 100 to convert each price into cents as expected by stripe*/
                console.log(total);
            })
          stripe.charges.create({
              amount:total, 
              currency: 'usd',
              source:req.body.stripeTokenId,
              description: 'from dj nav shop'
          }).then(()=>{
              console.log('transaction successful')
              res.json({message: 'Transaction successful'})
          }).catch((error)=>{
              console.error(`Transaction Failed due to ${error}`)
              res.status(500).end();
          })  
        }
    })
})


 
//getting audio files data from contentful
async function getAudioFrommCMS(){
const client = await contentful.createClient({
    space: 'w8pfw39hxfke',
    accessToken: 'Vj6UZLn52yctUtux8DSOhHJqPoaCMsyZwQMl7Cj8LqA',
  });
const audioFilesEntry = await client.getEntries({content_type:'addAudioToHomepage'})
                  .then(entries=>{

const entryItems = entries.items;

const audioFiles = entryItems.map(eachEntry=>{

 const {audioTitle,audioFile,audioLength}=eachEntry.fields;

 const audioSrc = `https:${audioFile.fields.file.url}`;

 return {audioTitle,audioSrc,audioLength};
})

  //making a get request to home page
app.get('/',(req,res)=>{
    res.render('index.ejs', {audioFiles});
})  
     })
}
getAudioFrommCMS();