"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PostEditor from "@/components/dev/post-editor"
import { getPostById, updatePost } from "@/lib/api"
import type { Post, PostFormData } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const response = await getPostById(params.id)

        if (!response.success) {
          throw new Error(response.error || "Failed to fetch post")
        }

        setPost(response.data || null)
      } catch (error) {
        console.error("Error fetching post:", error)
        toast({
          title: "Error",
          description: "Failed to load post. Please try again.",
          variant: "destructive",
        })
        router.push("/dev/posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id, router, toast])

  const handleSubmit = async (formData: PostFormData, action: "publish" | "draft" | "schedule") => {
    try {
      setIsSubmitting(true)

      // Set the status based on the action
      const status = action === "publish" ? "published" : action === "schedule" ? "scheduled" : "draft"
      const postData = { ...formData, status }

      const response = await updatePost(params.id, postData)

      if (!response.success) {
        throw new Error(response.error || "Failed to update post")
      }

      toast({
        title: "Success",
        description: `Post ${status === "published" ? "published" : status === "scheduled" ? "scheduled" : "saved as draft"} successfully.`,
      })

      // Redirect to the posts page
      router.push("/dev/posts")
    } catch (error) {
      console.error("Error updating post:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight font-playfair">Post Not Found</h1>
        <p className="mt-4">The post you are looking for does not exist or has been removed.</p>
      </div>
    )
  }

  // Convert the post data to the format expected by the PostEditor
  const initialData: PostFormData = {
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    category: post.category,
    tags: post.tags,
    status: post.status,
    publishDate: post.publishDate ? new Date(post.publishDate) : undefined,
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight font-playfair">Edit Post</h1>
      <PostEditor initialData={initialData} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
