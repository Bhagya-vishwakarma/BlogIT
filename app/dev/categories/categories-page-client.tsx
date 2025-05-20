"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CategoryList from "@/components/dev/category-list"
import { getCategories, createCategory } from "@/lib/api"
import type { Category } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

export default function CategoriesPageClient() {
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error: any) {
      setError(error.message || "Failed to fetch categories")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateCategory = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await createCategory({ name, description })
      toast({
        title: "Category created",
        description: "Category created successfully",
      })
      setName("")
      setDescription("")
      fetchCategories()
    } catch (error: any) {
      setError(error.message || "Failed to create category")
      toast({
        variant: "destructive",
        title: "Error creating category",
        description: error.message || "Failed to create category",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Categories</h1>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create Category</CardTitle>
            <CardDescription>Add a new category to your blog.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateCategory} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category List</CardTitle>
            <CardDescription>View and manage your existing categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryList categories={categories} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
