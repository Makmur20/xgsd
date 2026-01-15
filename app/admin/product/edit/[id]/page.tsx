import { notFound } from 'next/navigation';
import EditProduct from '@/components/admin/product/edit-product';
import { Suspense } from 'react';

const UpdateProductPage = async ({
    params
}:{
    params: Promise<{id: string}>
}) => {
    const productId = (await params).id;
    if(!productId) return notFound();
  return (
    <div className='max-w-screen-xl px-4 py-16 mt-10 mx-auto'>
        <Suspense fallback={<p>Loading....</p>}>
            <EditProduct productId={productId} />
        </Suspense>
       
    </div>
  )
}

export default UpdateProductPage