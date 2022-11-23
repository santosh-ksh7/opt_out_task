import { findAllProducts, findSingleProduct } from "../Services/productQuery.js";

// The function is called when the API to get all products is called
export const getAllProducts = async (req,res) => {
    const data = await findAllProducts();
    res.send(data);
}


// The function is called when the API to get specific product is called
export const getInfoAboutSingleProduct = async (req,res) => {
    const{id} = req.params;
    let result = await findSingleProduct(id);
    res.send(result);
}