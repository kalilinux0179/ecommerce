import express from "express";
import connectDB from "./DataBase/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import adminAuthRoute from "./Routes/Admin/Auth.Route.js";
import categoryRoute from "./Routes/Admin/Category.Route.js"
import cors from "cors";
const app = express();
// defaul middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

// Routes
app.use("/api/admin/", adminAuthRoute);
app.use("/api/admin/", categoryRoute)
const PORT = 4000;
connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`[+] Server is running on http://localhost:${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });
