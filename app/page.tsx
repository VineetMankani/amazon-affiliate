import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Headphones, ShoppingBag, Laptop, Watch, Camera, Home, Gamepad2, Book, Dumbbell, Car } from "lucide-react"

const categories = [
  {
    id: "earphones",
    name: "Earphones & Headphones",
    description: "Premium audio devices with amazing deals",
    icon: Headphones,
    color: "bg-blue-500",
  },
  {
    id: "shoes",
    name: "Shoes & Footwear",
    description: "Trendy shoes with exclusive offers",
    icon: ShoppingBag,
    color: "bg-green-500",
  },
  // {
  //   id: "watches",
  //   name: "Watches & Smartwatches",
  //   description: "Stylish timepieces with great savings",
  //   icon: Watch,
  //   color: "bg-orange-500",
  // },
  // {
  //   id: "cameras",
  //   name: "Cameras & Photography",
  //   description: "Capture memories with discounted cameras",
  //   icon: Camera,
  //   color: "bg-red-500",
  // },
  // {
  //   id: "home-appliances",
  //   name: "Home Appliances",
  //   description: "Smart home devices with special offers",
  //   icon: Home,
  //   color: "bg-teal-500",
  // },
  // {
  //   id: "gaming",
  //   name: "Gaming & Accessories",
  //   description: "Gaming gear with exclusive discounts",
  //   icon: Gamepad2,
  //   color: "bg-indigo-500",
  // },
  {
    id: "books",
    name: "Books & E-readers",
    description: "Knowledge at discounted prices",
    icon: Book,
    color: "bg-yellow-500",
  },
  {
    id: "fitness",
    name: "Fitness & Sports",
    description: "Stay fit with affordable equipment",
    icon: Dumbbell,
    color: "bg-pink-500",
  },
  // {
  //   id: "automotive",
  //   name: "Automotive & Tools",
  //   description: "Car accessories and tools on sale",
  //   icon: Car,
  //   color: "bg-gray-500",
  // },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Amazon Deals Hub</h1>
            <p className="text-lg text-gray-600 mb-4">
              Discover the best deals on top 10 products across all categories
            </p>
            <Badge variant="secondary" className="text-sm">
              🔥 Updated Daily with Fresh Offers
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each category features the top 10 products with the best offers and deals. Click on any category to explore
            amazing discounts!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-sm">{category.description}</CardDescription>
                    <div className="mt-4 text-center">
                      <Badge variant="outline" className="text-xs">
                        Top 10 Deals
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-3">Affiliate Disclosure</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            This website contains affiliate links. When you click on links to various merchants on this site and make a
            purchase, this can result in this site earning a commission. Affiliate programs and affiliations include,
            but are not limited to, the Amazon Associates Program. We only recommend products we believe will add value
            to our readers.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Amazon Deals Hub. All rights reserved.
            <span className="block mt-2">Find the best deals and save money on your favorite products.</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
