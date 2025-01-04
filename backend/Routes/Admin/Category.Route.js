import express from "express"
import { addCategory, deleteCategory, getCategory } from "../../Controllers/Admin/Category.Controller.js";
import upload from "../../Middlewares/multerConfig.js";
import checkAuthentication from "../../Middlewares/CheckAuthentication.js";

const router = express.Router();
router.route("/addcategory").post(checkAuthentication, upload, addCategory);
router.route("/getcategory").get(checkAuthentication, getCategory);
router.route("/deletecategory/:id").delete(checkAuthentication, deleteCategory);

export default router;