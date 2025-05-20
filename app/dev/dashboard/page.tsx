"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { CalendarDays, Edit3, FileText, Plus, Loader2 } from "lucide-react"
import PostsTable from "@/components/dev/posts-table"
import { getPosts, getPostsByStatus } from "@/lib/api"
import type { Post } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

export default function DashboardPage() {
  const { toast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [publishedPosts, setPublishedPosts] = useState<Post[]>([])
  const [draftPosts, setDraftPosts] = useState<Post[]>([])
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)

        // Fetch all posts
        const allPostsResponse = await getPosts()
        if (!allPostsResponse.success) {
          throw new Error(allPostsResponse.error || "Failed to fetch posts")
        }

        setPosts(allPostsResponse.data || [])

        // Fetch posts by status
        const publishedResponse = await getPostsByStatus("published")
        const draftResponse = await getPostsByStatus("draft")
        const scheduledResponse = await getPostsByStatus("scheduled")

        if (publishedResponse.success) {
          setPublishedPosts(publishedResponse.data || [])
        }

        if (draftResponse.success) {
          setDraftPosts(draftResponse.data || [])
        }

        if (scheduledResponse.success) {
          setScheduledPosts(scheduledResponse.data || [])
        }
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

  // Stats for the dashboard
  const stats = {
    totalPosts: posts.length,
    publishedPosts: publishedPosts.length,
    draftPosts: draftPosts.length,
    scheduledPosts: scheduledPosts.length,
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight font-playfair">Dashboard</h1>
        <Link href="/dev/posts/new">
          <Button className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">All blog posts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedPosts}</div>
            <p className="text-xs text-muted-foreground">Live on your blog</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit3 className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draftPosts}</div>
            <p className="text-xs text-muted-foreground">Saved but not published</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <CalendarDays className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduledPosts}</div>
            <p className="text-xs text-muted-foreground">Set to publish later</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="all" className="space-y-4">
              <PostsTable posts={posts} onPostsChange={setPosts} />
            </TabsContent>
            <TabsContent value="published" className="space-y-4">
              <PostsTable posts={publishedPosts} onPostsChange={setPublishedPosts} />
            </TabsContent>
            <TabsContent value="drafts" className="space-y-4">
              <PostsTable posts={draftPosts} onPostsChange={setDraftPosts} />
            </TabsContent>
            <TabsContent value="scheduled" className="space-y-4">
              <PostsTable posts={scheduledPosts} onPostsChange={setScheduledPosts} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}
