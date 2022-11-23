import express from 'express'
import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'
import dotenv from "dotenv"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import {auth} from "./middleware/auth_middleware.js"
import { userRouter } from './MVC/Routes/user.js'
import { productRouter } from './MVC/Routes/product.js'
import { cartRouter } from './MVC/Routes/cart.js'


const app = express()

app.use(cors())

app.use(express.json())

// Express Router   if path starts with /user go to userRouter
app.use("/user", userRouter)

// Express Router   if path starts with /product go to productRouter
app.use("/product", productRouter)

// Express Router   if path starts with /cart go to cartRouter
app.use("/cart", cartRouter)


dotenv.config()

// const mongo_url = "mongodb://127.0.0.1"

export async function genHash(pwd){
  // adding random string to password  i.e.. Salting step
  const salt = await bcrypt.genSalt(5);
  const hash = await bcrypt.hash(pwd, salt);
  return hash
}


async function createConnection(){
    const client = new MongoClient(process.env.mongo_url);
    await client.connect();
    console.log("MongoDB is Connected");
    return client
}

export const client = await createConnection();


app.get('/', function (req, res) {
  res.send('Hello World')
})


// // API to register new user
// app.post("/register", async function(req,res){
//   const data = req.body;
//   // Before entering the data making sure no other user with same email exist
//   const find_existing_user = await client.db("opt_out").collection("users").findOne({email: data.email});
//   if(find_existing_user){
//     res.send({msg: "email id is already registered. Kindly use a different email id"})
//   }else{
//     const hash_pwd = await genHash(data.pwd);
//     const data2enter= {
//       ...data,
//       pwd: hash_pwd,
//       re_pwd: hash_pwd,
//     }
//     const db_insert = await client.db("opt_out").collection("users").insertOne(data2enter);
//     if(db_insert.insertedId){
//       res.send({msg: "New user succesfully created"})
//     }else{
//       res.send({msg: "The user can't be created. Try again"})
//     }
//   }
// })



// // API for login
// app.post("/login", async function(req, res){
//   const data = req.body;
//    // First step is to check whether the email id is registered wqith us or not
//    const find_in_db = await client.db("opt_out").collection("users").findOne({email: data.email});
//    if(find_in_db){
//      // Now check whether the paswword the user enters matches with the password hash value stored in db
//      const pwd_check = await bcrypt.compare(data.pwd, find_in_db.pwd);
//      if(pwd_check){
//        const token = jwt.sign({_id: find_in_db.email}, process.env.secret_key);
//        res.send({msg: "Succesfully logged in", token, uuid: find_in_db._id})
//      }else{
//        res.send({msg: "Invalid Credentials"})
//      }
//    }else{
//      res.send({msg: "Invalid Credentials"})
//    }
// })



// // API to get all products
// app.get("/get-all-product", async function(req,res){
//   const data = await client.db("opt_out").collection("products").find({}).toArray();
//   res.send(data);
// })


// // API to add to cart (only if user is logged in)
// app.get("/add-to-cart", auth, async function(req,res){
//   const data = req.query;
//   // add the item to DB cart collection with qty as 1
//   let result = await client.db("opt_out").collection("cart").insertOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id), qty: 1})
//   // Only if the insert operation is successfull
//   if(result.insertedId){
//     res.send({"msg": "Successfully added to cart"})
//   }
// })



// // API to remove the item from the cart 
// app.get("/remove-from-cart", auth, async function(req, res){
//   const data = req.query;
//   // Remove the item from the cart collection
//   let result = await client.db("opt_out").collection("cart").deleteOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id)});
//   // Only if the delete operation is successfull
//   if(result.deletedCount){
//     res.send({"msg": "Successfully removed to cart"})
//   }
// })


// // API to increment or decrement the qty of a specific product in the cart collection
// app.get("/inc-dec-qty", auth, async function(req,res){
//   const data = req.query;
//   // Update the quantity in the cart collection
//   if(data.action === "inc"){
//     // The case of increment
//     var result = await client.db("opt_out").collection("cart").updateOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id)}, {$set: {qty: data.qty}});
//   }else if(data.action === "dec"){
//     // The case of decrement
//     var result = await client.db("opt_out").collection("cart").updateOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id)}, {$set: {qty: data.qty}});
//   }
//   // Send the response only if the update opertaion is successfull
//   if(result.modifiedCount){
//     res.send({"msg": "Successfully updated the quantity of the product"})
//   }
// })


// // API to get all the products in the users cart
// app.get("/items-in-cart/:id", async function(req,res){
//   const{id} = req.params;
//   let result = await client.db("opt_out").collection("cart").find({u_id: ObjectId(id)}).toArray();
//   res.send(result)
// })


// // API to get info about single product
// app.get("/get-single-product/:id", async function(req,res){
//   const{id} = req.params;
//   let result = await client.db("opt_out").collection("products").findOne({_id: ObjectId(id)});
//   res.send(result);
// })


// // API to chech whether a specific product exist in users cart
// app.get("/check-product-in-cart", async function(req,res){
//   const data = req.query;
//   let result = await client.db("opt_out").collection("cart").findOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id)});
//   if(result){
//     res.send({"msg": true, qty: result.qty})
//   }else{
//     res.send({"msg": false})
//   }
// })


// // API to get all products in users cart
// app.get("/all-product-in-user-cart/:id", auth, async function(req,res){
//   const{id} = req.params;
//   let result = await client.db("opt_out").collection("cart").aggregate([
//     {$match: {u_id: ObjectId(id)}},
//     {$lookup: {
//       from: "products",
//       localField: "prod_id",
//       foreignField: "_id",
//       as: "product_info"
//     }},
//     {$unwind: "$product_info"}
//   ]).toArray();
//   res.send(result);
// })


app.listen(process.env.PORT)