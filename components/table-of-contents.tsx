"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings from content
  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, "text/html")
    const headingElements = doc.querySelectorAll("h2, h3")

    const extractedHeadings: Heading[] = []

    headingElements.forEach((el, index) => {
      const level = Number.parseInt(el.tagName.substring(1))
      const text = el.textContent || ""
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")

      extractedHeadings.push({
        id,
        text,
        level,
      })
    })

    setHeadings(extractedHeadings)
  }, [content])

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" },
    )

    // Add IDs to headings in the document and observe them
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, "text/html")
    const headingElements = doc.querySelectorAll("h2, h3")

    headingElements.forEach((el, index) => {
      if (index < headings.length) {
        const heading = headings[index]
        const element = document.getElementById(heading.id)
        if (element) {
          observer.observe(element)
        }
      }
    })

    return () => {
      headingElements.forEach((el, index) => {
        if (index < headings.length) {
          const heading = headings[index]
          const element = document.getElementById(heading.id)
          if (element) {
            observer.unobserve(element)
          }
        }
      })
    }
  }, [headings, content])

  if (headings.length === 0) return null

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-lg">
      <h3 className="font-bold text-lg mb-4 font-playfair">Table of Contents</h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id} className={`${heading.level === 3 ? "ml-4" : ""}`}>
              <Link
                href={`#${heading.id}`}
                className={`text-sm hover:underline block py-1 border-l-2 pl-3 transition-colors ${
                  activeId === heading.id
                    ? "border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100 font-medium"
                    : "border-zinc-200 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                }`}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
