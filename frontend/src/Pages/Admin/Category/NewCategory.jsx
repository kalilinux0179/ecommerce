import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminAuth, api } from "@/utils/constants";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const NewCategory = () => {
  const [input, setInput] = useState({
    categoryName: "",
    altImage: "",
    totalStock: "",
    file: null
  })
  const [loading, setLoading] = useState(false);
  const CategorySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", input.categoryName);
    formData.append("altImage", input.altImage);
    formData.append("totalStock", input.totalStock);
    formData.append("file", input.file);
    try {
      setLoading(true);
      const response = await axios.post(`${api}/admin/addcategory`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <div className="flex justify-center items-center h-full w-full min-h-[80vh]">
        <div className="bg-muted/50 rounded-xl px-8 py-8 w-full max-w-screen-sm flex flex-col gap-8">
          <h1 className="text-center text-4xl">Create New Category</h1>
          <form onSubmit={CategorySubmit} className=" pt-2">
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-4">
                  <Label htmlFor="categoryname">Category Name</Label>
                  <Input
                    id="categoryname"
                    type="text"
                    placeholder="Category Name"
                    required
                    name="categoryName"
                    value={input.categoryName}
                    onChange={(e) => setInput({ ...input, categoryName: e.target.value })}
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="categoryImage">Category Image</Label>
                  <Input
                    id="categoryImage"
                    type="file"
                    required
                    name="file"
                    accept="image/*"
                    onChange={(e) => setInput({ ...input, file: e.target.files[0] })}
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="altImage">Category Alternate Name</Label>
                  <Input
                    id="altImage"
                    placeholder="Category Alternate Name"
                    type="text"
                    required
                    name="altImage"
                    value={input.altImage}
                    onChange={(e) => setInput({ ...input, altImage: e.target.value })}
                  />
                </div>
                <div className="grid gap-4">
                  <Label htmlFor="totalStock">Total Stock</Label>
                  <Input
                    id="totalStock"
                    type="text"
                    placeholder="Total Stock"
                    required
                    name="totalStock"
                    value={input.totalStock}
                    onChange={(e) => setInput({ ...input, totalStock: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              {
                loading ? (
                  <Button disabled className="w-full">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </Button>
                ) : (
                  <Button className="w-full">
                    Add Category</Button>
                )
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewCategory;
