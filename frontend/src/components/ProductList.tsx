import ProductItemTrending from "./ProductItemTrending";

import { getAllProducts } from "@/services/products";
import { Product } from "@/store/types";

export default async function ProductList() {
  const products: Product[] = await getAllProducts()

  return (
    <section className='grid md:grid-cols-3 gap-6 mt-8'>
      {products.length > 0 && products.map(product => (
        <ProductItemTrending key={product.id} product={product}  />
      ))}
    </section>
  )
}