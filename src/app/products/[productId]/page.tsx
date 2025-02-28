import React from 'react'
import Image from 'next/image'
import Button from '@/components/atoms/Button/Button'
import { getProductById } from '@/services/apiFetchService'

type Props = {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(Number(params.productId));

  return (
    <>
      <header className="bg-amber-400 h-16"></header>
      <main className="flex flex-row h-[90vh] bg-[#DDD8D9]">
        <div className='flex flex-row gap-4 mx-20 my-6'>
          <div className=' w-1/3 h-fit bg-white m-4 rounded-md'>
            <Image 
              className='rounded-md mx-auto my-auto object-contain'
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
            />
          </div>
          <div className='flex flex-col gap-2 m-6'>
              <h1 className='text-2xl font-bold'>{product.title}</h1>
              <p className='text-sm text-gray-500'>{product.description}</p>
              <p className='text-sm font-bold'>R$ {product.price}</p>
              <p className='text-sm font-bold'>rate: {product.rating.rate}</p>
              <p className='text-sm font-bold'>count: {product.rating.count}</p>
          </div>
          <div className='flex flex-col gap-2 justify-start'>
              <Button>Edit</Button>
              <Button>Delete</Button>
          </div>
        </div>
      </main>
    </>
  )
}
