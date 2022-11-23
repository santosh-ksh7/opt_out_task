import { ObjectId } from "mongodb";
import {client} from "../../index.js"


// DB query to get all products 
export const findAllProducts = async () => {
    let result = await client.db("opt_out").collection("products").find({}).toArray();
    return result;
}


// DB query to get a specific product
export const findSingleProduct = async (id) => {
    let result = await client.db("opt_out").collection("products").findOne({_id: ObjectId(id)});
    return result;
}