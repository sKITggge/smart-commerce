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
  availabilityStatus: string
  brand?: string
  weight?: number
  stock?: number
  warrantyInformation?: string
  reviews: Review[]
  thumbnail: string
}

export interface Review {
  rating: number
  comment: string
  reviewerName: string
}

export interface PaginatedProducts {
  products: Product[]
  total: number
  skip: number
  limit: number
}
