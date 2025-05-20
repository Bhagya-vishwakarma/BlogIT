import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for the /dev route
  if (request.nextUrl.pathname.startsWith("/dev")) {
    // Skip the middleware for the login page itself
    if (request.nextUrl.pathname === "/dev/login") {
      return NextResponse.next()
    }

    // Check if the user is authenticated
    const authToken = request.cookies.get("auth_token")?.value

    // If no auth token exists, redirect to login
    if (!authToken) {
      return NextResponse.redirect(new URL("/dev/login", request.url))
    }

    try {
      // In a production environment, you would verify the JWT token here
      // This is a simplified example for demonstration purposes
      if (authToken !== "valid_admin_token") {
        throw new Error("Invalid token")
      }
    } catch (error) {
      // If token verification fails, redirect to login
      return NextResponse.redirect(new URL("/dev/login", request.url))
    }
  }

  return NextResponse.next()
}

// Configure the paths that should be checked by this middleware
export const config = {
  matcher: ["/dev/:path*"],
}
