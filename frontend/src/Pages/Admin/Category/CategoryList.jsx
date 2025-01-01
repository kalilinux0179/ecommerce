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
import { useState } from 'react'
import { Separator } from "@/components/ui/separator"

const data = [{
  'id': 1,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test1',
  'categoryName': 'Category 1',
  'sale': 35,
  'quantity': 2386,
  'uploadDate': '2022-09-04'
},
{
  'id': 2,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test2',
  'categoryName': 'Category 2',
  'sale': 24,
  'quantity': 955,
  'uploadDate': '2022-11-17'
},
{
  'id': 3,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test3',
  'categoryName': 'Category 3',
  'sale': 29,
  'quantity': 4548,
  'uploadDate': '2024-11-08'
},
{
  'id': 4,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test4',
  'categoryName': 'Category 4',
  'sale': 49,
  'quantity': 4416,
  'uploadDate': '2023-03-28'
},
{
  'id': 5,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test5',
  'categoryName': 'Category 5',
  'sale': 37,
  'quantity': 1728,
  'uploadDate': '2022-06-28'
},
{
  'id': 6,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test6',
  'categoryName': 'Category 6',
  'sale': 47,
  'quantity': 4958,
  'uploadDate': '2024-03-24'
},
{
  'id': 7,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test7',
  'categoryName': 'Category 7',
  'sale': 30,
  'quantity': 834,
  'uploadDate': '2023-08-28'
},
{
  'id': 8,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test8',
  'categoryName': 'Category 8',
  'sale': 15,
  'quantity': 2762,
  'uploadDate': '2024-09-14'
},
{
  'id': 9,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test9',
  'categoryName': 'Category 9',
  'sale': 24,
  'quantity': 762,
  'uploadDate': '2024-02-02'
},
{
  'id': 10,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test10',
  'categoryName': 'Category 10',
  'sale': 29,
  'quantity': 1254,
  'uploadDate': '2023-08-03'
},
{
  'id': 11,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test11',
  'categoryName': 'Category 11',
  'sale': 11,
  'quantity': 2301,
  'uploadDate': '2022-01-18'
},
{
  'id': 12,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test12',
  'categoryName': 'Category 12',
  'sale': 20,
  'quantity': 4682,
  'uploadDate': '2023-09-30'
},
{
  'id': 13,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test13',
  'categoryName': 'Category 13',
  'sale': 20,
  'quantity': 1642,
  'uploadDate': '2022-09-01'
},
{
  'id': 14,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test14',
  'categoryName': 'Category 14',
  'sale': 13,
  'quantity': 3752,
  'uploadDate': '2022-06-26'
},
{
  'id': 15,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test15',
  'categoryName': 'Category 15',
  'sale': 8,
  'quantity': 3260,
  'uploadDate': '2024-09-22'
},
{
  'id': 16,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test16',
  'categoryName': 'Category 16',
  'sale': 9,
  'quantity': 676,
  'uploadDate': '2024-08-05'
},
{
  'id': 17,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test17',
  'categoryName': 'Category 17',
  'sale': 15,
  'quantity': 740,
  'uploadDate': '2022-05-26'
},
{
  'id': 18,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test18',
  'categoryName': 'Category 18',
  'sale': 46,
  'quantity': 4099,
  'uploadDate': '2022-07-17'
},
{
  'id': 19,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test19',
  'categoryName': 'Category 19',
  'sale': 5,
  'quantity': 1139,
  'uploadDate': '2022-01-28'
},
{
  'id': 20,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test20',
  'categoryName': 'Category 20',
  'sale': 32,
  'quantity': 1395,
  'uploadDate': '2022-02-22'
},
{
  'id': 21,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test21',
  'categoryName': 'Category 21',
  'sale': 7,
  'quantity': 1168,
  'uploadDate': '2024-04-11'
},
{
  'id': 22,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test22',
  'categoryName': 'Category 22',
  'sale': 36,
  'quantity': 4427,
  'uploadDate': '2024-02-08'
},
{
  'id': 23,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test23',
  'categoryName': 'Category 23',
  'sale': 21,
  'quantity': 3580,
  'uploadDate': '2022-07-06'
},
{
  'id': 24,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test24',
  'categoryName': 'Category 24',
  'sale': 45,
  'quantity': 2486,
  'uploadDate': '2023-12-13'
},
{
  'id': 25,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test25',
  'categoryName': 'Category 25',
  'sale': 20,
  'quantity': 3669,
  'uploadDate': '2024-03-27'
},
{
  'id': 26,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test26',
  'categoryName': 'Category 26',
  'sale': 25,
  'quantity': 975,
  'uploadDate': '2023-05-28'
},
{
  'id': 27,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test27',
  'categoryName': 'Category 27',
  'sale': 49,
  'quantity': 3796,
  'uploadDate': '2024-11-16'
},
{
  'id': 28,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test28',
  'categoryName': 'Category 28',
  'sale': 5,
  'quantity': 1259,
  'uploadDate': '2024-02-10'
},
{
  'id': 29,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test29',
  'categoryName': 'Category 29',
  'sale': 14,
  'quantity': 1686,
  'uploadDate': '2022-05-29'
},
{
  'id': 30,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test30',
  'categoryName': 'Category 30',
  'sale': 6,
  'quantity': 2212,
  'uploadDate': '2023-11-23'
},
{
  'id': 31,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test31',
  'categoryName': 'Category 31',
  'sale': 26,
  'quantity': 4272,
  'uploadDate': '2023-07-10'
},
{
  'id': 32,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test32',
  'categoryName': 'Category 32',
  'sale': 22,
  'quantity': 3862,
  'uploadDate': '2023-01-19'
},
{
  'id': 33,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test33',
  'categoryName': 'Category 33',
  'sale': 46,
  'quantity': 3732,
  'uploadDate': '2022-06-12'
},
{
  'id': 34,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test34',
  'categoryName': 'Category 34',
  'sale': 32,
  'quantity': 4472,
  'uploadDate': '2023-06-06'
},
{
  'id': 35,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test35',
  'categoryName': 'Category 35',
  'sale': 20,
  'quantity': 2428,
  'uploadDate': '2024-01-12'
},
{
  'id': 36,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test36',
  'categoryName': 'Category 36',
  'sale': 20,
  'quantity': 4119,
  'uploadDate': '2022-01-12'
},
{
  'id': 37,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test37',
  'categoryName': 'Category 37',
  'sale': 27,
  'quantity': 1759,
  'uploadDate': '2023-06-18'
},
{
  'id': 38,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test38',
  'categoryName': 'Category 38',
  'sale': 19,
  'quantity': 543,
  'uploadDate': '2022-12-06'
},
{
  'id': 39,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test39',
  'categoryName': 'Category 39',
  'sale': 30,
  'quantity': 2263,
  'uploadDate': '2022-12-11'
},
{
  'id': 40,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test40',
  'categoryName': 'Category 40',
  'sale': 36,
  'quantity': 1269,
  'uploadDate': '2022-05-08'
},
{
  'id': 41,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test41',
  'categoryName': 'Category 41',
  'sale': 42,
  'quantity': 4666,
  'uploadDate': '2024-02-20'
},
{
  'id': 42,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test42',
  'categoryName': 'Category 42',
  'sale': 39,
  'quantity': 945,
  'uploadDate': '2024-12-29'
},
{
  'id': 43,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test43',
  'categoryName': 'Category 43',
  'sale': 36,
  'quantity': 864,
  'uploadDate': '2024-02-28'
},
{
  'id': 44,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test44',
  'categoryName': 'Category 44',
  'sale': 46,
  'quantity': 1398,
  'uploadDate': '2024-02-28'
},
{
  'id': 45,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test45',
  'categoryName': 'Category 45',
  'sale': 33,
  'quantity': 1902,
  'uploadDate': '2024-06-25'
},
{
  'id': 46,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test46',
  'categoryName': 'Category 46',
  'sale': 32,
  'quantity': 4575,
  'uploadDate': '2024-03-14'
},
{
  'id': 47,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test47',
  'categoryName': 'Category 47',
  'sale': 7,
  'quantity': 4653,
  'uploadDate': '2022-07-12'
},
{
  'id': 48,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test48',
  'categoryName': 'Category 48',
  'sale': 45,
  'quantity': 787,
  'uploadDate': '2022-09-12'
},
{
  'id': 49,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test49',
  'categoryName': 'Category 49',
  'sale': 7,
  'quantity': 3235,
  'uploadDate': '2023-12-30'
},
{
  'id': 50,
  'imageUrl': 'https://github.com/shadcn.png',
  'altImage': 'test50',
  'categoryName': 'Category 50',
  'sale': 40,
  'quantity': 586,
  'uploadDate': '2023-09-30'
},
]

const CategoryList = () => {
  const navigate = useNavigate();
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage); // Calculate total pages
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of data to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

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
          <Button onClick={() => navigate('/admin/addcategroy')}>Add Category</Button>
        </div>
        <Separator className="my-4" />
        <div className="bg-muted/50 rounded-xl p-4 my-2">
          <Table >
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
                <TableRow key={item.id}>
                  <TableCell >
                    <img src={item.imageUrl} alt={item.altImage} className="h-10 w-10 rounded-md" />
                  </TableCell>
                  <TableCell className="text-center">{item.categoryName}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-center">{item.sale}</TableCell>
                  <TableCell className="text-center">{item.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Eye id={item.id} />
                      <Pencil id={item.id} />
                      <Trash2 id={item.id} />
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
