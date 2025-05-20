"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PostEditor from "@/components/dev/post-editor"
import { createPost } from "@/lib/api"
import type { PostFormData } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

export default function NewPostPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: PostFormData, action: "publish" | "draft" | "schedule") => {
    try {
      setIsSubmitting(true)

      // Set the status based on the action
      const status = action === "publish" ? "published" : action === "schedule" ? "scheduled" : "draft"
      const postData = { ...formData, status }

      const response = await createPost(postData)

      if (!response.success) {
        throw new Error(response.error || "Failed to create post")
      }

      toast({
        title: "Success",
        description: `Post ${status === "published" ? "published" : status === "scheduled" ? "scheduled" : "saved as draft"} successfully.`,
      })

      // Redirect to the posts page
      router.push("/dev/posts")
    } catch (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight font-playfair">Create New Post</h1>
      <PostEditor onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
