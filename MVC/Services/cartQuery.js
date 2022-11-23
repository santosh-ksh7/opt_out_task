import { ObjectId } from "mongodb";
import {client} from "../../index.js"


// DB query to add product to users cart
export const addProductToCart = async (data) => {
    let result = await client.db("opt_out").collection("cart").insertOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id), qty: 1});
    return result;
}




// DB query to remove product from users cart
export const removeProductFromCart = async (data) => {
    let result = await client.db("opt_out").collection("cart").deleteOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id)});
    return result;
}



// DB query to increment the qty of product in users cart
export const incrementProductQuantityInCart = async (data) => {
    let result = await client.db("opt_out").collection("cart").updateOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id)}, {$set: {qty: data.qty}});
    return result;
}



// DB query to decrement the qty of product in users cart
export const decrementProductQuantityInCart = async (data) => {
    let result = await client.db("opt_out").collection("cart").updateOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id)}, {$set: {qty: data.qty}});
    return result;
}



// DB query to get all the products in a users cart
export const findProductInUsersCart = async (id) => {
    let result = await client.db("opt_out").collection("cart").find({u_id: ObjectId(id)}).toArray();
    return result;
}



// DB query to check for a specific product in users cart
export const findSpecificProductInUsersCart = async (data) => {
    let result = await client.db("opt_out").collection("cart").findOne({u_id: ObjectId(data.u_id), prod_id: ObjectId(data.prod_id)})
    return result
}



// DB
export const findAllProductInUserCartWithData = async (id) => {
    let result = await client.db("opt_out").collection("cart").aggregate([
        {$match: {u_id: ObjectId(id)}},
        {$lookup: {
          from: "products",
          localField: "prod_id",
          foreignField: "_id",
          as: "product_info"
        }},
        {$unwind: "$product_info"}
      ]).toArray();
      return result;
}