import { Product } from "@/store/types";
import ProductItemTrending from "./ProductItemTrending";
import { getAllProducts } from '@/services/products';

export default async function ProductListTrending() {
  const products: Product[] = await getAllProducts()

  return (
    <section className='grid md:grid-cols-3 gap-6'>
      {products.length > 0 && products.slice(0, 3).map(product => (
        <ProductItemTrending key={product.id} product={product}  />
      ))}
    </section>
  )
}