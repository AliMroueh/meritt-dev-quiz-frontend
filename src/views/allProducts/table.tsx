'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Product } from '@/graphql/generated/graphql';
import moment from 'moment';
import Link from 'next/link';

interface ProductTableProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export function ProductTable({
  products,
  currentPage,
  totalPages,
  totalItems,
  limit,
}: ProductTableProps) {
  const router = useRouter();
  const [page, setPage] = useState(currentPage);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
      router.push(`/products?page=${newPage}&limit=${limit}`);
    },
    [limit, router]
  );

  const renderPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          variant={i === currentPage ? 'secondary' : 'outline'}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }

    return pageNumbers;
  }, [currentPage, handlePageChange, totalPages]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead>Created At</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Images</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                {moment(product.createdAt).format('MMM/DD/YYYY')}
              </TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  'No Image'
                )}
              </TableCell>
              <TableCell>
                <Button asChild>
                  <Link href={`/product/${product._id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col items-center mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          {page > 1 && (
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
          )}
          {renderPageNumbers()}
          {page < totalPages && (
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          )}
        </div>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages} | Total items: {totalItems}
        </div>
      </div>
    </div>
  );
}
