import { Button } from '@/components/ui/button'
import { Eye, Loader2, Pencil, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Separator } from "@/components/ui/separator"
import axios from 'axios'
import { api } from '@/utils/constants'

const CategoryList = () => {
  const navigate = useNavigate();
  // fetch category data from backend
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await axios.get(`${api}/admin/getCategory`, {
          withCredentials: true
        });
        if (data.data.success) {
          setCategoryData(data.data.categoryData);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [])
  return (
    <>
      <div className='flex flex-col'>
        <div className="flex justify-between items-center my-2">
          <div className='flex gap-2 items-center'>
          </div>
          <Button onClick={() => navigate('/admin/addcategroy')}>Add Category</Button>
        </div>
        <Separator className="my-4" />
        <div className="bg-muted/50 rounded-xl p-4 my-2">
          {
            loading ? (
              <div className='w-full h-[75vh] flex items-center justify-center'>
                <h1 className="flex gap-2 text-4xl justify-center items-center tracking-wider" >
                  <Loader2 className="animate-spin" />
                  Please Wait...
                </h1>
              </div>
            ) : (
              categoryData.length === 0 ? (
                <div className='w-full h-[75vh] flex items-center justify-center'>
                  <img src="../../../public/nodata.svg" alt="nodata" className=" object-cover object-center h-full " />
                </div>
              ) : (
                <div className='w-full h-[75vh] overflow-y-auto'>
                  <Table >
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left w-[200px] pl-4">Category Image</TableHead>
                        <TableHead className="text-center">Category Name</TableHead>
                        <TableHead className="text-center">Quantity</TableHead>
                        <TableHead className="text-center">Sale</TableHead>
                        <TableHead className="text-center">Upload Date</TableHead>
                        <TableHead className="text-right w-[200px] pr-4">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryData.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell >
                            <img src={item.imageUrl} alt={item.altImage} className="h-14 rounded-md" />
                          </TableCell>
                          <TableCell className="text-center capitalize">{item.categoryName}</TableCell>
                          <TableCell className="text-center">{item.totalStock}</TableCell>
                          <TableCell className="text-center">{item.sale}</TableCell>
                          <TableCell className="text-center">{item.updatedAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-4">
                              <Eye id={item._id} />
                              <Pencil id={item._id} />
                              <Trash2 id={item._id} />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )
            )
          }


        </div>
      </div>
    </>
  );
};

export default CategoryList;
