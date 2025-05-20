import Link from "next/link"
import { Instagram, Twitter, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-zinc-950">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-playfair">About This Blog</h3>
            <p className="text-zinc-500 dark:text-zinc-400 font-inter">
              A beautiful space dedicated to minimalism, design, and thoughtful living. We explore ideas that inspire a
              more intentional approach to modern life.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-playfair">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
                Home
              </Link>
              <Link
                href="/about"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                About
              </Link>
              <Link
                href="/categories"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Categories
              </Link>
              <Link
                href="/contact"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold font-playfair">Subscribe to Newsletter</h3>
            <p className="text-zinc-500 dark:text-zinc-400 font-inter">
              Stay updated with our latest articles and insights.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
              />
              <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-zinc-500 dark:text-zinc-400 text-sm">
          <p>© {new Date().getFullYear()} Minimalist Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
