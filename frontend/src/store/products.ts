import { create } from 'zustand'
import { type Product } from './types'
import { persist, devtools } from 'zustand/middleware'
import { getAllProducts } from '../services/products'

interface State {
  products: Product[]
  currentProduct: number,
  fetchProducts: () => Promise<void>
}

export const useProductsStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        products: [],
        currentProduct: 0,

        fetchProducts: async () => {
          const json = await getAllProducts()

          const products = json

          set({ products }, false, 'FETCH_PRODUCTS')
        }
      }), { name: '__store__products' }
    )
  )
)
