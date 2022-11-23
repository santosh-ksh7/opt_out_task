import { addProductToCart, decrementProductQuantityInCart, findAllProductInUserCartWithData, findProductInUsersCart, findSpecificProductInUsersCart, incrementProductQuantityInCart, removeProductFromCart } from "../Services/cartQuery.js";

// function to call if add to cart API link is called
export const addToCart = async (req,res) => {
    const data = req.query;
    // add the item to DB cart collection with qty as 1
    let result = await addProductToCart(data);
    // Only if the insert operation is successfull
    if(result.insertedId){
      res.send({"msg": "Successfully added to cart"})
    }
}



// function to call if remove from cart API link is called
export const removeFromCart = async (req, res) => {
    const data = req.query;
    // Remove the item from the cart collection
    let result = await removeProductFromCart(data);
    // Only if the delete operation is successfull
    if(result.deletedCount){
      res.send({"msg": "Successfully removed to cart"})
    }
}



// function to call if altering the quantity of product in cart is called
export const inc_dec_qty_of_product = async function(req,res){
    const data = req.query;
    // Update the quantity in the cart collection
    if(data.action === "inc"){
      // The case of increment
      var result = await incrementProductQuantityInCart(data);
    }else if(data.action === "dec"){
      // The case of decrement
      var result = await decrementProductQuantityInCart(data);
    }
    // Send the response only if the update opertaion is successfull
    if(result.modifiedCount){
      res.send({"msg": "Successfully updated the quantity of the product"})
    }
}




// function to call to get items in users cart
export const getProductsInUsersCart = async (req,res) => {
    const{id} = req.params;
    let result = await findProductInUsersCart(id);
    res.send(result)
}



// function to call in order to check for a specific product in users cart
export const checkSpecificProductInUserCart = async (req,res) => {
    const data = req.query;
    let result = await findSpecificProductInUsersCart(data);
    if(result){
      res.send({"msg": true, qty: result.qty})
    }else{
      res.send({"msg": false})
    }
}




// function to call in order to form the aggregation pipeline to merge data from 2 different collection
export const getAllProductsInUserCartWithData = async (req,res) => {
    const{id} = req.params;
    let result = await findAllProductInUserCartWithData(id);
    res.send(result);
  }