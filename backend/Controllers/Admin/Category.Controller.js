import { Category } from "../../Model/Admin/Category.Model.js";
import getURI from "../../utils/getUri.js"
import cloudinary from "../../utils/cloudinary.js"

export const addCategory = async (req, res) => {
    try {
        const { categoryName, altImage, totalStock } = req.body;
        if (!categoryName || !altImage || !totalStock) {
            return res.status(400)
                .json({
                    message: "All Fields are required.",
                    success: false
                })
        }
        const CategoryImage = req.file;
        const profileURi = getURI(CategoryImage);
        const cloudinaryResponse = await cloudinary.uploader.upload(
            profileURi.content
        );

        const categoryExists = await Category.findOne({ categoryName, createdBy: req.id })
        if (categoryExists) {
            return res.status(400)
                .json({
                    message: "Category Already Exists.",
                    success: false
                })
        }
        const category = await Category.create({
            categoryName,
            altImage,
            totalStock,
            sale: 1,
            imageUrl: cloudinaryResponse.secure_url,
            createdBy: req.id
        });
        return res.status(201).json({
            message: "Category Added Successfully.",
            success: true,
            category
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

export const getCategory = async (req, res) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            })
        }
        const categoryData = await Category.find({ createdBy: userId }).sort({ createdAt: -1 });
        if (!categoryData) {
            return res.status(404).json({
                message: "Category Not Found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Category Fetched Successfully",
            success: true,
            categoryData
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryData = await Category.findByIdAndDelete(id);
        if (!categoryData) {
            return res.status(404).json({
                message: "Category Not Found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Category Deleted Successfully",
            success: true,
            categoryData
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}