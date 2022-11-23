import { findIfUserExists, findProductCount, registerNewUser } from "../Services/userQuery.js";
import {genHash} from "../../index.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


// function is called when API to register new user is called
export const registerUser = async (req,res) => {
    const data = req.body;
    // Before entering the data making sure no other user with same email exist
    const find_existing_user = await findIfUserExists(data);
    if(find_existing_user){
      res.send({msg: "email id is already registered. Kindly use a different email id"})
    }else{
      const hash_pwd = await genHash(data.pwd);
      const data2enter= {
        ...data,
        pwd: hash_pwd,
        re_pwd: hash_pwd,
      }
      const db_insert = await registerNewUser(data2enter);
      if(db_insert.insertedId){
        res.send({msg: "New user succesfully created"})
      }else{
        res.send({msg: "The user can't be created. Try again"})
      }
    }
}



// function is called when API to login user is called
export const loginUser = async (req, res) => {
    const data = req.body;
     // First step is to check whether the email id is registered wqith us or not
     const find_in_db = await findIfUserExists(data);
     if(find_in_db){
       // Now check whether the paswword the user enters matches with the password hash value stored in db
       const pwd_check = await bcrypt.compare(data.pwd, find_in_db.pwd);
       if(pwd_check){
         const token = jwt.sign({_id: find_in_db.email}, process.env.secret_key);
         const no_ofproduct_in_user_cart = await findProductCount(find_in_db._id)
         res.send({msg: "Succesfully logged in", token, uuid: find_in_db._id, cart_count: no_ofproduct_in_user_cart})
       }else{
         res.send({msg: "Invalid Credentials"})
       }
     }else{
       res.send({msg: "Invalid Credentials"})
     }
}