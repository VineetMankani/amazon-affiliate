import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Category Not Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            The category you're looking for doesn't exist or may have been moved. Let's get you back to finding great
            deals!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/" className="flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/category/earphones" className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Browse Deals
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
