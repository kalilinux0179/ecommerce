import { Button } from '@/components/ui/button'
import { Loader2, Pencil, Trash2 } from "lucide-react"
import { format } from 'date-fns'
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
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
import nodataImage from "@/assets/nodata.svg"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const CategoryList = () => {
  const navigate = useNavigate();
  // fetch category data from backend
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [switchStates, setSwitchStates] = useState({});

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
  }, [triggerFetch, active]);
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`${api}/admin/deletecategory/${id}`, {
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setTriggerFetch((prev) => !prev);
      }
      console.log(response.data)
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error)
    }
  }
  return (
    <>
      <div className='flex flex-col'>
        <div className="flex justify-between items-center my-2">
          <div className='flex gap-2 items-center'>
            <Input type="text" placeholder="Search..." />
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
                  <img src={nodataImage} alt="nodata" className=" object-cover object-center h-full " />
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
                        <TableHead className="text-center">Status</TableHead>
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
                          <TableCell className="text-center">{format(new Date(item.createdAt), 'dd MMMM yyyy')}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <Switch id={item._id}
                                checked={active}
                                onCheckedChange={() => setActive(!active)}
                              />
                              <Badge className={"capitalize w-16 text-center flex justify-center"} variant={active ? "default" : "destructive"} id={item._id}>
                                {
                                  active ? "Active" : "Inactive"
                                }</Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline">
                                <Pencil />
                              </Button>

                              <AlertDialog>
                                <AlertDialogTrigger asChild id={item._id} >
                                  <Button variant="outline">
                                    <Trash2 />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete this category and all the products belongs to this category from the servers.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteCategory(item._id)}>Continue</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
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
