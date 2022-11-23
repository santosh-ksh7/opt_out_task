import { ObjectId } from "mongodb";
import { client } from "../../index.js";



// DB query to check if email already exists before creating new account so no 2 users have same email ID
export const findIfUserExists = async (data) => {
    let result = await client.db("opt_out").collection("users").findOne({email: data.email});
    return result;
}


// DB query to register new user
export const registerNewUser = async (data) => {
    let result = await client.db("opt_out").collection("users").insertOne(data);
    return result;
}


// DB query to find out the number of product in user cart
export const findProductCount = async (data) => {
    let result = await client.db("opt_out").collection("cart").find({u_id: ObjectId(data)}).count();
    return result;
}