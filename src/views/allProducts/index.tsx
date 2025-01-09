'use client';
import {
  Product,
  ProductSearchFields,
  Sorting,
  useGetAllProductsQuery,
} from '@/graphql/generated/graphql';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { ProductTable } from './table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Index = () => {
  const params = useSearchParams();

  const page = parseInt(params.get('page') || '1', 10);
  const limit = parseInt(params.get('limit') || '30', 10);

  const { data, loading } = useGetAllProductsQuery({
    variables: {
      limit: limit,
      page: page,
      sort: {
        field: ProductSearchFields.Title,
        order: Sorting.Asc,
      },
      searchFields: {
        fields: [ProductSearchFields.Title],
        q: '',
      },
    },
  });

  const { allProducts, allProductsLength, totalPages } = useMemo(() => {
    return {
      allProducts: data?.getAllProduct.items,
      allProductsLength: data?.getAllProduct.length,
      totalPages: Math.ceil(+data?.getAllProduct?.length! / +limit!),
    };
  }, [data?.getAllProduct.items, data?.getAllProduct.length, limit]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-4xl font-bold">
        loading...
      </div>
    );
  }

  console.log("allProducts: ", allProducts)
  console.log("allProductsLength: ", allProductsLength)
  console.log("totalPages: ", totalPages)

  return (
    <div className="max-w-7xl mx-auto py-4 px-2">
      <div className="text-2xl font-bold mb-4">
        <Button asChild>
          <Link href={'/'}>Go Back</Link>
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      {/* {allContacts && (
        <ContactTable
          contacts={allContacts as ContactUs[]}
          currentPage={+page!}
          totalPages={totalPages}
          totalItems={+allContactsLength!}
          limit={+limit!}
        />
      )}
       */}

      {allProducts && (
        <ProductTable
          products={allProducts as Product[]}
          currentPage={+page!}
          totalPages={totalPages}
          totalItems={+allProductsLength!}
          limit={+limit!}
        />
      )}

    </div>
  );
};

export default Index;
