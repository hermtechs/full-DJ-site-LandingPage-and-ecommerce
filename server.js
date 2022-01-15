
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// console.log(stripeSecretKey)

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
// console.log(stripePublicKey)
const express = require('express');
const app = express();
const fs = require('fs');
const stripe = require('stripe')(stripeSecretKey);


app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.listen(3000);

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
app.get('/index',(req,res)=>{
  res.render('index.ejs');
})

 

