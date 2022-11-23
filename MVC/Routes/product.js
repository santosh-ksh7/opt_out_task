import express from "express";
import { getAllProducts, getInfoAboutSingleProduct } from "../Controller/product.js";

const router = express.Router();

export const productRouter = router;



// API to get all products
router.get("/get-all-product", getAllProducts)


// API to get info about single product
router.get("/get-single-product/:id", getInfoAboutSingleProduct)