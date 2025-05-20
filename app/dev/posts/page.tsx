"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2 } from "lucide-react"
import Link from "next/link"
import PostsTable from "@/components/dev/posts-table"
import { getPosts } from "@/lib/api"
import type { Post } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

export default function PostsPage() {
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await getPosts()

        if (!response.success) {
          throw new Error(response.error || "Failed to fetch posts")
        }

        setPosts(response.data || [])
      } catch (error) {
        console.error("Error fetching posts:", error)
        toast({
          title: "Error",
          description: "Failed to load posts. Please try refreshing the page.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [toast])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight font-playfair">All Posts</h1>
        <Link href="/dev/posts/new">
          <Button className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <PostsTable posts={posts} onPostsChange={setPosts} />
      )}
    </div>
  )
}
