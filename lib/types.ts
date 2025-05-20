export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  featuredImage: string
  category: string
  tags: string[]
  status: "published" | "draft" | "scheduled"
  publishDate: string
  createdAt: string
  updatedAt: string
  author: {
    name: string
    avatar: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  postCount: number
}

export interface User {
  id: string
  username: string
  name: string
  email: string
  avatar: string
  role: "admin" | "editor" | "author"
}

export type PostStatus = "published" | "draft" | "scheduled"

export interface PostFormData {
  title: string
  content: string
  excerpt: string
  featuredImage: string
  category: string
  tags: string[]
  status: PostStatus
  publishDate?: Date
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
