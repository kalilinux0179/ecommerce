import mongoose, { Schema } from "mongoose";

const CategorySchema = Schema({
    categoryName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true
    },
    altImage: {
        type: String,
        required: true
    },
    totalStock: {
        type: Number,
        required: true
    },
    sale:{
        type: Number,
        default: 1
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "AdminAuth",
        required: true,
    }

}, { timestamps: true });

export const Category = mongoose.model("Category", CategorySchema);