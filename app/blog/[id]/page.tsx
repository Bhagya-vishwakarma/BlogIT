import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import TableOfContents from "@/components/table-of-contents"

// Sample blog post data
const getBlogPost = (id: string) => {
  return {
    id,
    title: "The Art of Minimalism in Modern Design",
    date: "May 15, 2025",
    readTime: "8 min read",
    category: "Design",
    image: "/placeholder.svg?height=600&width=1200",
    content: `
      <h2>Introduction to Minimalism</h2>
      <p>Minimalism is more than an aesthetic—it's a philosophy that emphasizes the value of simplicity, intentionality, and the removal of excess. In design, this translates to clean lines, ample white space, and a focus on functionality.</p>
      
      <p>The origins of minimalist design can be traced back to traditional Japanese aesthetics, where the concept of "Ma" (negative space) plays a crucial role. This influence was later adopted by the Bauhaus movement and modernist architects like Ludwig Mies van der Rohe, who coined the phrase "less is more."</p>
      
      <blockquote>Design is not just what it looks like and feels like. Design is how it works. — Steve Jobs</blockquote>
      
      <h2>Core Principles of Minimalist Design</h2>
      
      <h3>Simplicity and Clarity</h3>
      <p>At its heart, minimalist design prioritizes simplicity. This doesn't mean designs should be boring or lacking in personality. Rather, it suggests that every element should serve a purpose, and anything that doesn't contribute to the overall function or message should be eliminated.</p>
      
      <h3>Negative Space</h3>
      <p>Also known as white space, negative space is the area between and around elements in a design. In minimalist design, this space isn't empty—it's an active component that provides breathing room and helps direct attention to what matters most.</p>
      
      <h3>Limited Color Palette</h3>
      <p>Minimalist designs typically employ a restrained color palette, often featuring neutral tones with perhaps one or two accent colors. This limitation creates a sense of harmony and allows the content to take center stage.</p>
      
      <h2>Minimalism in Different Design Fields</h2>
      
      <h3>Graphic Design</h3>
      <p>In graphic design, minimalism manifests through clean typography, strategic use of space, and simplified imagery. Brands like Apple and Google have embraced minimalist principles in their visual identities, recognizing that a clear, uncluttered message often resonates more strongly with audiences.</p>
      
      <h3>Interior Design</h3>
      <p>Minimalist interiors are characterized by open spaces, natural light, and a "less is more" approach to furnishings and decor. The focus is on quality over quantity, with each piece carefully selected for both its functionality and aesthetic contribution to the space.</p>
      
      <h3>Digital Design</h3>
      <p>In user interface and web design, minimalism improves usability by reducing cognitive load and helping users focus on tasks without distraction. This approach has become increasingly important in our information-saturated digital landscape.</p>
      
      <h2>The Future of Minimalist Design</h2>
      <p>As we move forward, minimalist design continues to evolve. We're seeing a shift toward "warm minimalism," which maintains simplicity while incorporating natural materials, subtle textures, and soft colors to create more inviting spaces and experiences.</p>
      
      <p>The enduring appeal of minimalism lies in its timelessness. By focusing on essentials and eliminating trends, minimalist design creates lasting value and relevance—a particularly important consideration in our era of rapid consumption and disposal.</p>
      
      <p>Ultimately, minimalism reminds us that good design isn't about adding more—it's about distilling something to its essence, removing barriers between people and what truly matters.</p>
    `,
    author: {
      name: "Alex Morgan",
      bio: "Alex is a design writer and minimalism advocate with over a decade of experience in the creative industry. When not writing, they can be found exploring architectural landmarks or practicing mindful photography.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    relatedPosts: [
      {
        id: "2",
        title: "Finding Balance: Work and Life in 2025",
        excerpt:
          "Strategies for maintaining harmony between professional ambitions and personal well-being in our increasingly connected world.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "3",
        title: "The Future of Sustainable Architecture",
        excerpt:
          "How innovative architects are reimagining buildings to reduce environmental impact while creating beautiful spaces.",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "4",
        title: "Digital Minimalism: Reclaiming Attention",
        excerpt:
          "Practical approaches to mindful technology use in an age of constant notifications and digital distractions.",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  }
}

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = getBlogPost(params.id)

  return (
    <main className="flex-1">
      {/* Banner Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="container px-4 md:px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
          <article>
            <div className="mb-8">
              <div className="inline-block rounded-md bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 mb-4">
                {post.category}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-playfair mb-4">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 mb-6">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                    {post.date} · {post.readTime}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="blog-content prose prose-zinc dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
              <div className="flex items-start space-x-4">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-bold text-lg font-playfair">About {post.author.name}</h3>
                  <p className="text-zinc-600 dark:text-zinc-300 mt-2 font-inter">{post.author.bio}</p>
                </div>
              </div>
            </div>
          </article>

          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tighter mb-8 font-playfair">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {post.relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group">
                <div className="overflow-hidden rounded-lg mb-4">
                  <Image
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    width={300}
                    height={200}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:underline font-playfair">{relatedPost.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 line-clamp-2 font-inter">{relatedPost.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
