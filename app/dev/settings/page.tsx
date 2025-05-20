import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Settings - Blog CMS",
  description: "Configure your blog settings",
}

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight font-playfair">Settings</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blog Information</CardTitle>
              <CardDescription>Basic information about your blog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blog-name">Blog Name</Label>
                <Input id="blog-name" defaultValue="Minimalist" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-description">Blog Description</Label>
                <Textarea
                  id="blog-description"
                  defaultValue="A beautiful space dedicated to minimalism, design, and thoughtful living."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-url">Blog URL</Label>
                <Input id="blog-url" defaultValue="https://minimalist-blog.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure how your content is displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="posts-per-page">Posts Per Page</Label>
                  <p className="text-sm text-muted-foreground">Number of posts to display on the homepage</p>
                </div>
                <Input id="posts-per-page" defaultValue="6" className="w-20" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="comments">Enable Comments</Label>
                  <p className="text-sm text-muted-foreground">Allow visitors to comment on your posts</p>
                </div>
                <Switch id="comments" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="related-posts">Show Related Posts</Label>
                  <p className="text-sm text-muted-foreground">Display related posts at the end of each article</p>
                </div>
                <Switch id="related-posts" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your blog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Theme</Label>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    Light
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Dark
                  </Button>
                  <Button variant="outline" className="flex-1 bg-zinc-100 dark:bg-zinc-800">
                    System
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  <div className="h-10 rounded-md bg-zinc-900 cursor-pointer border-2 border-zinc-400"></div>
                  <div className="h-10 rounded-md bg-zinc-700 cursor-pointer"></div>
                  <div className="h-10 rounded-md bg-zinc-500 cursor-pointer"></div>
                  <div className="h-10 rounded-md bg-zinc-300 cursor-pointer"></div>
                  <div className="h-10 rounded-md bg-zinc-100 cursor-pointer"></div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-heading">Heading Font</Label>
                <Input id="font-heading" defaultValue="Playfair Display" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-body">Body Font</Label>
                <Input id="font-body" defaultValue="Inter" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your blog for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Default Meta Title</Label>
                <Input id="meta-title" defaultValue="Minimalist Blog | Thoughtful Living & Design" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Default Meta Description</Label>
                <Textarea
                  id="meta-description"
                  defaultValue="Explore minimalism, design, and thoughtful living through our curated articles and insights."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Default Keywords</Label>
                <Input id="keywords" defaultValue="minimalism, design, lifestyle, architecture" />
                <p className="text-xs text-muted-foreground mt-1">Separate keywords with commas</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="social-sharing">Social Media Sharing</Label>
                  <p className="text-sm text-muted-foreground">Generate social media meta tags</p>
                </div>
                <Switch id="social-sharing" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="admin@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Update Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
