'use client';

import { useRouter } from 'next/navigation';
import { useGetProductByIdQuery } from '@/graphql/generated/graphql';
import { use } from 'react';

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = use(params); // Unwrap the `params` promise
  const { id } = resolvedParams;
  console.log('the id is : ', id)
  const router = useRouter();

  const { data, loading, error } = useGetProductByIdQuery({
    variables: { id },
  });

  console.log('loading ...')
  console.log('data : ', data)
  console.log('error : ', error)

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-4xl font-bold">
        Loading...
      </div>
    );
  }

  if (error || !data?.getProduct) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-4xl font-bold">
        Product not found
      </div>
    );
  }

  const { title, description, images, quantity, createdAt } = data.getProduct?.item;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-4">
        <button
          className="bg-primary text-primary-foreground shadow hover:bg-primary/90 p-3 rounded-full"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
      <label>title: </label>
      <h1 className="text-3xl font-bold">{title}</h1>
      <label>quantity: </label>
      <h1 className="text-3xl font-bold">{quantity}</h1>
      <label>description: </label>
      <p className="text-lg mt-2">{description}</p>
      <label>image: </label>
      <p className="text-lg mt-2">
        {/* <strong>Price:</strong> ${price.toFixed(2)} */}
      </p>
      <p className="text-lg mt-2">{images.length > 0 ? (
                <img
                  src={images[0]}
                  alt={title}
                  className="w-16 h-16 object-cover"
                />
              ) : (
                'No Image'
              )}</p>
      <p className="text-sm mt-2 text-gray-500">
        Created at: {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

// const ProductDetails = ({ productId }) => {
//     const { data, loading, error } = useGetProductByIdQuery({
//       variables: { id: productId },
//     });
  
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;
  
//     const product = data?.getProduct?.item;
  
//     if (!product) return <p>Product not found.</p>;
  
//     return (
//       <div>
//         <h1>{product.title}</h1>
//         <p>{product.description}</p>
//         <p>Quantity: {product.quantity}</p>
//         <p>Created At: {new Date(product.createdAt).toLocaleString()}</p>
//       </div>
//     );
//   };
  

export default ProductPage;
