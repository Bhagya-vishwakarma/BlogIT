"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Clock, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/types"
import { deletePost } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface PostsTableProps {
  posts: Post[]
  onPostsChange?: (posts: Post[]) => void
}

export default function PostsTable({ posts, onPostsChange }: PostsTableProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [sortField, setSortField] = useState<"title" | "date">("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(posts.map((post) => post.id))
    }
  }

  const handleSelectPost = (id: string) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter((postId) => postId !== id))
    } else {
      setSelectedPosts([...selectedPosts, id])
    }
  }

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return

    try {
      setIsDeleting(true)
      const response = await deletePost(postToDelete)

      if (!response.success) {
        throw new Error(response.error || "Failed to delete post")
      }

      // Remove the deleted post from the list
      const updatedPosts = posts.filter((post) => post.id !== postToDelete)
      if (onPostsChange) {
        onPostsChange(updatedPosts)
      }

      toast({
        title: "Success",
        description: "Post deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting post:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setPostToDelete(null)
    }
  }

  const handleSort = (field: "title" | "date") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <Check className="h-4 w-4 text-green-500" />
      case "draft":
        return <FileText className="h-4 w-4 text-amber-500" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
          >
            Published
          </Badge>
        )
      case "draft":
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
          >
            Draft
          </Badge>
        )
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
          >
            Scheduled
          </Badge>
        )
      default:
        return null
    }
  }

  // Sort posts based on current sort field and direction
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  return <div>{/* Table component here */}</div>
}
