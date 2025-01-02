import { Button } from '@/components/ui/button'
import { Eye, Pencil, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState, useEffect } from 'react'
import { Separator } from "@/components/ui/separator"
import axios from 'axios'

const CategoryList = () => {
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const [categoryData, setCategoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch the category data when the component mounts
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get('/api/admin/getcategory', {
          withCredentials: true, // If using cookies for authentication
        });

        if (response.data.success) {
          setCategoryData(response.data.categoryData);
        }
      } catch (error) {
        console.error("Error fetching category data", error);
      }
    };

    fetchCategoryData();
  }, []);

  const totalPages = Math.ceil(categoryData.length / itemsPerPage); // Calculate total pages

  // Calculate the range of data to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = categoryData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const visiblePages = () => {
    const start = Math.max(currentPage - 1, 1);
    const end = Math.min(currentPage + 1, totalPages);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  
  return (
    <>
      <div className='flex flex-col'>
        <div className="flex justify-between items-center my-2">
          <div className='flex gap-2 items-center'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={handlePrevious} className="cursor-pointer" />
                </PaginationItem>
                {visiblePages().map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink isActive={pageNumber === currentPage}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={handleNext} className="cursor-pointer" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <Button onClick={() => navigate('/admin/addcategory')}>Add Category</Button>
        </div>
        <Separator className="my-4" />
        <div className="bg-muted/50 rounded-xl p-4 my-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left w-[200px]">Category Image</TableHead>
                <TableHead className="text-center">Category Name</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Sale</TableHead>
                <TableHead className="text-center">Upload Date</TableHead>
                <TableHead className="text-right w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell >
                    <img src={item.imageUrl} alt={item.altImage} className="h-10 w-10 rounded-md" />
                  </TableCell>
                  <TableCell className="text-center">{item.categoryName}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-center">{item.sale}</TableCell>
                  <TableCell className="text-center">{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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
      </div>
    </>
  );
};

export default CategoryList;
