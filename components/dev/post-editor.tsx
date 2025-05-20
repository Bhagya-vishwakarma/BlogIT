"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Save,
  Calendar,
  Upload,
  X,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  LinkIcon,
  Undo,
  Redo,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { createPost, updatePost, getCategories } from "@/lib/api"
import type { PostFormData, Category, PostStatus } from "@/lib/types"

interface PostEditorProps {
  initialData?: {
    id?: string
    title?: string
    content?: string
    excerpt?: string
    featuredImage?: string
    category?: string
    tags?: string[]
    status?: PostStatus
    publishDate?: string
  }
}

export default function PostEditor({ initialData }: PostEditorProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "")
  const [category, setCategory] = useState(initialData?.category || "")
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const [status, setStatus] = useState<PostStatus>(initialData?.status || "draft")
  const [publishDate, setPublishDate] = useState<Date | undefined>(
    initialData?.publishDate ? new Date(initialData.publishDate) : undefined,
  )
  const [isScheduled, setIsScheduled] = useState(!!publishDate)
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true)
        const response = await getCategories()

        if (response.success && response.data) {
          setCategories(response.data)
        } else {
          console.error("Failed to fetch categories:", response.error)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setError("Post title is required")
      return false
    }

    if (!content.trim()) {
      setError("Post content is required")
      return false
    }

    if (!category) {
      setError("Please select a category")
      return false
    }

    if (isScheduled && !publishDate) {
      setError("Please select a publish date")
      return false
    }

    return true
  }

  const handleSave = async (saveStatus: PostStatus) => {
    setError("")

    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    try {
      const formData: PostFormData = {
        title,
        content,
        excerpt,
        featuredImage,
        category,
        tags,
        status: saveStatus,
        publishDate: isScheduled ? publishDate : undefined,
      }

      let response

      if (initialData?.id) {
        // Update existing post
        response = await updatePost(initialData.id, formData)
      } else {
        // Create new post
        response = await createPost(formData)
      }

      if (!response.success) {
        throw new Error(response.error || "Failed to save post")
      }

      setStatus(saveStatus)

      toast({
        title: "Success",
        description: initialData?.id ? "Post updated successfully" : "Post created successfully",
      })

      if (saveStatus === "published" || (initialData?.id && saveStatus !== "draft")) {
        router.push("/dev/posts")
      }
    } catch (error) {
      console.error("Error saving post:", error)
      setError(error instanceof Error ? error.message : "Failed to save post. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  // Rich text editor functions
  const formatText = (command: string, value = "") => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const insertHeading = (level: number) => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = range.toString()

      // Create heading element
      const heading = document.createElement(`h${level}`)
      heading.textContent = selectedText || `Heading ${level}`

      // Replace selection with heading
      range.deleteContents()
      range.insertNode(heading)

      // Move cursor to end of heading
      selection.removeAllRanges()
      const newRange = document.createRange()
      newRange.selectNodeContents(heading)
      newRange.collapse(false)
      selection.addRange(newRange)
    }
  }

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && initialData?.content) {
      editorRef.current.innerHTML = initialData.content
    }
  }, [initialData?.content])

  // Handle editor content changes
  const handleEditorChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-medium">{initialData?.id ? "Edit Post" : "Create New Post"}</h2>
          <p className="text-sm text-muted-foreground">
            {status === "published"
              ? "This post is live on your blog"
              : status === "scheduled"
                ? "This post is scheduled to publish"
                : "This post is saved as a draft"}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button
            className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            onClick={() => handleSave("published")}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Publish
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
              disabled={isSaving}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Content</Label>
              <Tabs defaultValue="write" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="write" onClick={() => setPreviewMode(false)}>
                    Write
                  </TabsTrigger>
                  <TabsTrigger value="preview" onClick={() => setPreviewMode(true)}>
                    Preview
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {!previewMode && (
              <>
                <div className="bg-white dark:bg-zinc-900 border rounded-md p-2 flex flex-wrap gap-1">
                  <Button variant="ghost" size="icon" onClick={() => formatText("bold")} disabled={isSaving}>
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => formatText("italic")} disabled={isSaving}>
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => insertHeading(1)} disabled={isSaving}>
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => insertHeading(2)} disabled={isSaving}>
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => insertHeading(3)} disabled={isSaving}>
                    <Heading3 className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="mx-1 h-6" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => formatText("insertUnorderedList")}
                    disabled={isSaving}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => formatText("insertOrderedList")}
                    disabled={isSaving}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => formatText("formatBlock", "<blockquote>")}
                    disabled={isSaving}
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => formatText("formatBlock", "<pre>")}
                    disabled={isSaving}
                  >
                    <Code className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const url = prompt("Enter URL:")
                      if (url) formatText("createLink", url)
                    }}
                    disabled={isSaving}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="mx-1 h-6" />
                  <Button variant="ghost" size="icon" onClick={() => formatText("undo")} disabled={isSaving}>
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => formatText("redo")} disabled={isSaving}>
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>

                <div
                  ref={editorRef}
                  contentEditable={!isSaving}
                  className={cn(
                    "min-h-[400px] border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-700 blog-content",
                    isSaving && "opacity-70 cursor-not-allowed",
                  )}
                  onInput={handleEditorChange}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </>
            )}

            {previewMode && (
              <div className="min-h-[400px] border rounded-md p-4 blog-content prose prose-zinc dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Enter a short excerpt for this post"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="resize-none"
              rows={3}
              disabled={isSaving}
            />
            <p className="text-xs text-muted-foreground">
              This will be displayed on the blog homepage and in search results.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Featured Image</Label>
            {featuredImage ? (
              <div className="relative aspect-video rounded-md overflow-hidden border">
                <Image src={featuredImage || "/placeholder.svg"} alt="Featured image" fill className="object-cover" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={() => setFeaturedImage("")}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border border-dashed rounded-md p-8 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFeaturedImage("/placeholder.svg?height=600&width=1200")}
                  disabled={isSaving}
                >
                  Upload Image
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} disabled={isSaving || loadingCategories}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {loadingCategories ? (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Loading categories...
                  </div>
                ) : (
                  categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex">
              <Input
                id="tags"
                placeholder="Add a tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
                disabled={isSaving}
              />
              <Button variant="outline" className="ml-2" onClick={handleAddTag} disabled={isSaving}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveTag(tag)}
                    disabled={isSaving}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2 border rounded-md p-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="scheduled">Schedule Post</Label>
              <Switch id="scheduled" checked={isScheduled} onCheckedChange={setIsScheduled} disabled={isSaving} />
            </div>

            {isScheduled && (
              <div className="pt-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !publishDate && "text-muted-foreground",
                      )}
                      disabled={isSaving}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {publishDate ? publishDate.toDateString() : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={publishDate} onSelect={setPublishDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
