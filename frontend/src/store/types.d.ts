export interface Product {
  id: string
  name: string
  code: string
  description: string
  price: number
  category: {
    id: string,
    name: Sting
  }
  discountPercentage: number
  stock: number
  brand: string
  categoryId: string
  thumbnail: string
  images: string[]
  sizes: string[]
  colors: string[]
  selectedSize?: number
  selectedColor?: number
  quantity?: number
}
