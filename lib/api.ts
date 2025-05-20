import type { Post, Category, ApiResponse, PostFormData, PostStatus } from "@/lib/types"

// Mock data for demonstration purposes
const posts: Post[] = [
  {
    id: "1",
    title: "The Art of Minimalism in Modern Design",
    content: `
      <h2>Introduction to Minimalism</h2>
      <p>Minimalism is more than an aesthetic—it's a philosophy that emphasizes the value of simplicity, intentionality, and the removal of excess. In design, this translates to clean lines, ample white space, and a focus on functionality.</p>
      
      <p>The origins of minimalist design can be traced back to traditional Japanese aesthetics, where the concept of "Ma" (negative space) plays a crucial role. This influence was later adopted by the Bauhaus movement and modernist architects like Ludwig Mies van der Rohe, who coined the phrase "less is more."</p>
      
      <blockquote>Design is not just what it looks like and feels like. Design is how it works. — Steve Jobs</blockquote>
      
      <h2>Core Principles of Minimalist Design</h2>
      
      <h3>Simplicity and Clarity</h3>
      <p>At its heart, minimalist design prioritizes simplicity. This doesn't mean designs should be boring or lacking in personality. Rather, it suggests that every element should serve a purpose, and anything that doesn't contribute to the overall function or message should be eliminated.</p>
    `,
    excerpt:
      "Explore how minimalism has shaped contemporary design aesthetics and why less continues to be more in today's visual landscape.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    category: "Design",
    tags: ["minimalism", "design", "aesthetics"],
    status: "published",
    publishDate: "2025-05-15T12:00:00.000Z",
    createdAt: "2025-05-10T10:30:00.000Z",
    updatedAt: "2025-05-15T09:45:00.000Z",
    author: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "2",
    title: "Finding Balance: Work and Life in 2025",
    content: `
      <h2>The Modern Work-Life Challenge</h2>
      <p>In today's hyperconnected world, the boundaries between work and personal life have become increasingly blurred. This article explores strategies for maintaining balance.</p>
      
      <h3>Digital Boundaries</h3>
      <p>Creating clear boundaries between work and personal digital spaces is essential for mental wellbeing.</p>
    `,
    excerpt:
      "Strategies for maintaining harmony between professional ambitions and personal well-being in our increasingly connected world.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    category: "Lifestyle",
    tags: ["work-life balance", "productivity", "wellbeing"],
    status: "published",
    publishDate: "2025-05-10T12:00:00.000Z",
    createdAt: "2025-05-05T14:20:00.000Z",
    updatedAt: "2025-05-10T08:15:00.000Z",
    author: {
      name: "Jamie Chen",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "3",
    title: "The Future of Sustainable Architecture",
    content: `
      <h2>Reimagining Buildings for a Sustainable Future</h2>
      <p>Sustainable architecture is no longer just a trend—it's becoming a necessity as we face climate challenges.</p>
      
      <h3>Innovative Materials</h3>
      <p>New eco-friendly building materials are revolutionizing how we think about construction.</p>
    `,
    excerpt:
      "How innovative architects are reimagining buildings to reduce environmental impact while creating beautiful spaces.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    category: "Architecture",
    tags: ["sustainability", "architecture", "eco-friendly"],
    status: "draft",
    publishDate: "",
    createdAt: "2025-05-18T11:40:00.000Z",
    updatedAt: "2025-05-18T16:30:00.000Z",
    author: {
      name: "Sam Rivera",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "4",
    title: "Digital Minimalism: Reclaiming Attention",
    content: `
      <h2>The Attention Economy</h2>
      <p>Our attention has become one of the most valuable commodities in the digital age. This article explores how to reclaim it.</p>
      
      <h3>Mindful Technology Use</h3>
      <p>Strategies for using technology intentionally rather than reactively.</p>
    `,
    excerpt:
      "Practical approaches to mindful technology use in an age of constant notifications and digital distractions.",
    featuredImage: "/placeholder.svg?height=600&width=1200",
    category: "Technology",
    tags: ["digital minimalism", "attention", "technology"],
    status: "scheduled",
    publishDate: "2025-05-25T12:00:00.000Z",
    createdAt: "2025-05-20T09:15:00.000Z",
    updatedAt: "2025-05-20T15:45:00.000Z",
    author: {
      name: "Taylor Kim",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  },
]

const categories: Category[] = [
  {
    id: "1",
    name: "Design",
    slug: "design",
    description: "Articles about design principles and aesthetics",
    postCount: 1,
  },
  {
    id: "2",
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Content related to balanced living and personal growth",
    postCount: 1,
  },
  {
    id: "3",
    name: "Architecture",
    slug: "architecture",
    description: "Exploring architectural concepts and innovations",
    postCount: 1,
  },
  {
    id: "4",
    name: "Technology",
    slug: "technology",
    description: "Articles about tech trends and digital tools",
    postCount: 1,
  },
  {
    id: "5",
    name: "Psychology",
    slug: "psychology",
    description: "Understanding human behavior and mental processes",
    postCount: 0,
  },
  { id: "6", name: "Travel", slug: "travel", description: "Destinations and travel experiences", postCount: 0 },
]

// API functions
export async function getPosts(): Promise<ApiResponse<Post[]>> {
  try {
    // In a real app, this would be a fetch call to your API
    return {
      success: true,
      data: posts,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch posts. Please try again later.",
    }
  }
}

export async function getPostById(id: string): Promise<ApiResponse<Post>> {
  try {
    // In a real app, this would be a fetch call to your API
    const post = posts.find((p) => p.id === id)

    if (!post) {
      return {
        success: false,
        error: "Post not found",
      }
    }

    return {
      success: true,
      data: post,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch post. Please try again later.",
    }
  }
}

export async function createPost(postData: PostFormData): Promise<ApiResponse<Post>> {
  try {
    // Validate required fields
    if (!postData.title) {
      return {
        success: false,
        error: "Post title is required",
      }
    }

    if (!postData.content) {
      return {
        success: false,
        error: "Post content is required",
      }
    }

    // In a real app, this would be a POST request to your API
    const newPost: Post = {
      id: Math.random().toString(36).substring(2, 9),
      ...postData,
      publishDate: postData.publishDate ? postData.publishDate.toISOString() : "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        name: "Admin User",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      data: newPost,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to create post. Please try again later.",
    }
  }
}

export async function updatePost(id: string, postData: PostFormData): Promise<ApiResponse<Post>> {
  try {
    // Validate required fields
    if (!postData.title) {
      return {
        success: false,
        error: "Post title is required",
      }
    }

    if (!postData.content) {
      return {
        success: false,
        error: "Post content is required",
      }
    }

    // In a real app, this would be a PUT request to your API
    const existingPost = posts.find((p) => p.id === id)

    if (!existingPost) {
      return {
        success: false,
        error: "Post not found",
      }
    }

    const updatedPost: Post = {
      ...existingPost,
      ...postData,
      publishDate: postData.publishDate ? postData.publishDate.toISOString() : "",
      updatedAt: new Date().toISOString(),
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      data: updatedPost,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to update post. Please try again later.",
    }
  }
}

export async function deletePost(id: string): Promise<ApiResponse<null>> {
  try {
    // In a real app, this would be a DELETE request to your API
    const postExists = posts.some((p) => p.id === id)

    if (!postExists) {
      return {
        success: false,
        error: "Post not found",
      }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to delete post. Please try again later.",
    }
  }
}

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  try {
    // In a real app, this would be a fetch call to your API
    return {
      success: true,
      data: categories,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to fetch categories. Please try again later.",
    }
  }
}

export async function createCategory(name: string, description?: string): Promise<ApiResponse<Category>> {
  try {
    // Validate required fields
    if (!name) {
      return {
        success: false,
        error: "Category name is required",
      }
    }

    // Check if category already exists
    if (categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      return {
        success: false,
        error: "A category with this name already exists",
      }
    }

    // In a real app, this would be a POST request to your API
    const newCategory: Category = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      description,
      postCount: 0,
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      data: newCategory,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to create category. Please try again later.",
    }
  }
}

export async function updateCategory(id: string, name: string, description?: string): Promise<ApiResponse<Category>> {
  try {
    // Validate required fields
    if (!name) {
      return {
        success: false,
        error: "Category name is required",
      }
    }

    // In a real app, this would be a PUT request to your API
    const existingCategory = categories.find((c) => c.id === id)

    if (!existingCategory) {
      return {
        success: false,
        error: "Category not found",
      }
    }

    // Check if another category already has this name
    if (categories.some((c) => c.id !== id && c.name.toLowerCase() === name.toLowerCase())) {
      return {
        success: false,
        error: "Another category with this name already exists",
      }
    }

    const updatedCategory: Category = {
      ...existingCategory,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      description,
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      data: updatedCategory,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to update category. Please try again later.",
    }
  }
}

export async function deleteCategory(id: string): Promise<ApiResponse<null>> {
  try {
    // In a real app, this would be a DELETE request to your API
    const category = categories.find((c) => c.id === id)

    if (!category) {
      return {
        success: false,
        error: "Category not found",
      }
    }

    // Check if category has posts
    if (category.postCount > 0) {
      return {
        success: false,
        error: "Cannot delete a category that has posts. Please reassign or delete the posts first.",
      }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to delete category. Please try again later.",
    }
  }
}

export async function login(username: string, password: string): Promise<ApiResponse<{ token: string }>> {
  try {
    // In a real app, this would be a POST request to your authentication API

    // Simple validation
    if (!username || !password) {
      return {
        success: false,
        error: "Username and password are required",
      }
    }

    // Mock authentication logic
    if (username === "admin" && password === "securepassword") {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return {
        success: true,
        data: {
          token: "valid_admin_token", // In a real app, this would be a JWT
        },
      }
    }

    return {
      success: false,
      error: "Invalid username or password",
    }
  } catch (error) {
    return {
      success: false,
      error: "Authentication failed. Please try again later.",
    }
  }
}

export async function getPostsByStatus(status: PostStatus): Promise<ApiResponse<Post[]>> {
  try {
    // In a real app, this would be a fetch call to your API with query parameters
    const filteredPosts = posts.filter((post) => post.status === status)

    return {
      success: true,
      data: filteredPosts,
    }
  } catch (error) {
    return {
      success: false,
      error: `Failed to fetch ${status} posts. Please try again later.`,
    }
  }
}

export async function reorderPosts(postIds: string[]): Promise<ApiResponse<null>> {
  try {
    // In a real app, this would be a PUT request to update post order

    // Validate that all post IDs exist
    const allPostsExist = postIds.every((id) => posts.some((post) => post.id === id))

    if (!allPostsExist) {
      return {
        success: false,
        error: "One or more posts not found",
      }
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      error: "Failed to reorder posts. Please try again later.",
    }
  }
}
