import express from "express"
import { addCategory, getCategory } from "../../Controllers/Admin/Category.Controller.js";
import upload from "../../Middlewares/multerConfig.js";
import checkAuthentication from "../../Middlewares/CheckAuthentication.js";

const router = express.Router();
router.route("/addcategory").post(checkAuthentication, upload, addCategory);
router.route("/getcategory").get(checkAuthentication, getCategory);

export default router;