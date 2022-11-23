import express from "express";
import { auth } from "../../middleware/auth_middleware.js";
import { addToCart, checkSpecificProductInUserCart, getAllProductsInUserCartWithData, getProductsInUsersCart, inc_dec_qty_of_product, removeFromCart } from "../Controller/cart.js";


const router = express.Router();

export const cartRouter = router;


// API to add to cart (only if user is logged in)
router.get("/add-to-cart", auth, addToCart)



// API to remove the item from the cart 
router.get("/remove-from-cart", auth, removeFromCart)



// API to increment or decrement the qty of a specific product in the cart collection
router.get("/inc-dec-qty", auth, inc_dec_qty_of_product)



// API to get all the products in the users cart
router.get("/items-in-cart/:id", getProductsInUsersCart)



// API to chech whether a specific product exist in users cart
router.get("/check-product-in-cart", checkSpecificProductInUserCart)



// API to get all products in users cart
router.get("/all-product-in-user-cart/:id", auth, getAllProductsInUserCartWithData)