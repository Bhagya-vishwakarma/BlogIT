import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  // Sample blog posts data
  const featuredPost = {
    id: "1",
    title: "The Art of Minimalism in Modern Design",
    excerpt:
      "Explore how minimalism has shaped contemporary design aesthetics and why less continues to be more in today's visual landscape.",
    date: "May 15, 2025",
    readTime: "8 min read",
    category: "Design",
    image: "/placeholder.svg?height=600&width=1200",
    author: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  }

  const recentPosts = [
    {
      id: "2",
      title: "Finding Balance: Work and Life in 2025",
      excerpt:
        "Strategies for maintaining harmony between professional ambitions and personal well-being in our increasingly connected world.",
      date: "May 10, 2025",
      readTime: "6 min read",
      category: "Lifestyle",
      image: "/placeholder.svg?height=400&width=600",
      author: {
        name: "Jamie Chen",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "3",
      title: "The Future of Sustainable Architecture",
      excerpt:
        "How innovative architects are reimagining buildings to reduce environmental impact while creating beautiful spaces.",
      date: "May 5, 2025",
      readTime: "10 min read",
      category: "Architecture",
      image: "/placeholder.svg?height=400&width=600",
      author: {
        name: "Sam Rivera",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "4",
      title: "Digital Minimalism: Reclaiming Attention",
      excerpt:
        "Practical approaches to mindful technology use in an age of constant notifications and digital distractions.",
      date: "April 28, 2025",
      readTime: "7 min read",
      category: "Technology",
      image: "/placeholder.svg?height=400&width=600",
      author: {
        name: "Taylor Kim",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "5",
      title: "The Psychology of Color in Everyday Life",
      excerpt:
        "Understanding how color influences our emotions, decisions, and experiences in both subtle and profound ways.",
      date: "April 22, 2025",
      readTime: "9 min read",
      category: "Psychology",
      image: "/placeholder.svg?height=400&width=600",
      author: {
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
    {
      id: "6",
      title: "Slow Travel: Experiencing Places Deeply",
      excerpt:
        "Why more travelers are choosing to explore fewer destinations more thoroughly, and how it's changing tourism.",
      date: "April 15, 2025",
      readTime: "8 min read",
      category: "Travel",
      image: "/placeholder.svg?height=400&width=600",
      author: {
        name: "Riley Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    },
  ]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-beige dark:bg-zinc-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-playfair">
                Thoughts, stories, and ideas.
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 font-inter">
                Exploring life's nuances through thoughtful writing and beautiful imagery.
              </p>
            </div>
            <div className="space-x-4">
              <Button className="bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Start Reading
              </Button>
              <Button
                variant="outline"
                className="border-zinc-200 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl font-playfair">Featured Post</h2>
              <p className="max-w-[600px] text-zinc-500 dark:text-zinc-400 font-inter">
                Our latest and most noteworthy exploration.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-md bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50">
                    {featuredPost.category}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl font-playfair">
                    <Link href={`/blog/${featuredPost.id}`} className="hover:underline">
                      {featuredPost.title}
                    </Link>
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-inter">{featuredPost.excerpt}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Image
                    src={featuredPost.author.avatar || "/placeholder.svg"}
                    alt={featuredPost.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{featuredPost.author.name}</p>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {featuredPost.date} · {featuredPost.readTime}
                    </p>
                  </div>
                </div>
                <div>
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-zinc-900 dark:text-zinc-50 hover:underline font-medium"
                  >
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl font-playfair">Recent Posts</h2>
              <p className="max-w-[600px] text-zinc-500 dark:text-zinc-400 font-inter">
                Discover our latest thoughts and explorations.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden border-zinc-200 dark:border-zinc-800">
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <div className="inline-block rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-zinc-900 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-50">
                        {post.category}
                      </div>
                    </div>
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="font-playfair">
                      <Link href={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-zinc-500 dark:text-zinc-400 font-inter line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Image
                        src={post.author.avatar || "/placeholder.svg"}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <div className="text-xs">
                        <p className="font-medium">{post.author.name}</p>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{post.date}</div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center w-full mt-8">
              <Button
                variant="outline"
                className="border-zinc-200 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                View All Posts
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
