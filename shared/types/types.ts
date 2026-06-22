export interface Category {
  slug: string
  name: string
  url: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  brand: string
  thumbnail: string
}

export interface PaginatedProducts {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface SortOption {
  sortBy: 'price' | 'title'
  order: 'asc' | 'desc'
}
