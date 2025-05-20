import CategoriesPageClient from "./categories-page-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Categories - Blog CMS",
  description: "Manage your blog categories",
}

export default function CategoriesPage() {
  return <CategoriesPageClient />
}
