import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, ExternalLink, Tag, Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProductsByCategory } from "@/lib/products"

// Fallback product data for different categories (used if file system has no data)
const fallbackProductData: Record<string, any[]> = {
  earphones: [
    {
      id: 1,
      name: "Leosportz Weight Lifting Hook Straps - Leather Lifting Straps Reduce Cellulose | Weightlifting for Deadlift and Powerlifting, Neoprene Padded Gym Lifting Straps for Women Men (Leather)",
      originalPrice: 599,
      salePrice: 499,
      discount: 17,
      rating: 43.3,
      reviews: 48,
      image: "https://m.media-amazon.com/images/I/71IOGZ6IsYL._SX679_.jpg",
      affiliateLink: "https://amzn.to/3IE82xB",
      features: ["Leather", "Brown"],
      badge: "",
    },
    {
      id: 2,
      name: "Nobero Mockneck Sweatshirts for Man Stylish | 280 GSM Rich Cotton Fleece Regular Fit Full Sleeve Sweatshirt for Men | Stylish Casual Wear Winter Sweatshirt for Men",
      originalPrice: 0,
      salePrice: 0,
      discount: 0,
      rating: 0,
      reviews: 0,
      image: "https://m.media-amazon.com/images/I/611D8xiBX3L._SX679_.jpg",
      affiliateLink: "https://amzn.to/48Fs9pG",
      features: [""],
      badge: "Limited Time",
    },
    {
      id: 3,
      name: "Lymio Jackets || Jacket for men || Lightweight Outwear Jacket (J-10-11)",
      originalPrice: 0.0,
      salePrice: 0.0,
      discount: 0,
      rating: 0.0,
      reviews: 0,
      image: "https://m.media-amazon.com/images/I/71sB8bOhSmL._SY741_.jpg",
      affiliateLink: "https://amzn.to/4rRONTr",
      features: [""],
      badge: "Editor's Choice",
    },
    {
      id: 4,
      name: "Kratos K9 Selfie Stick Tripod With Light, 67 inch /170CM Reinforced Tripod for Mobile Phone, Multi-Functional Bluetooth Long Selfie Stick",
      originalPrice: 0,
      salePrice: 0,
      discount: 0,
      rating: 0,
      reviews: 0,
      image: "https://m.media-amazon.com/images/I/617qw0QPA8L._SX679_.jpg",
      affiliateLink: "https://amzn.to/4j2zraM",
      features: [""],
      badge: "Premium",
    },
    {
      id: 5,
      name: "JBL Live 660NC Wireless Headphones",
      originalPrice: 199.99,
      salePrice: 129.99,
      discount: 35,
      rating: 4.4,
      reviews: 6540,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B08F2BRHZX?tag=vineetmankani-21",
      features: ["50hr Battery", "Active Noise Cancelling", "Voice Assistant"],
      badge: "Great Value",
    },
    {
      id: 6,
      name: "Audio-Technica ATH-M50xBT2 Wireless",
      originalPrice: 199.99,
      salePrice: 149.99,
      discount: 25,
      rating: 4.6,
      reviews: 9870,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B09HZQYXBP?tag=vineetmankani-21",
      features: ["50hr Battery", "Professional Monitor", "Low Latency Mode"],
      badge: "Pro Choice",
    },
    {
      id: 7,
      name: "Beats Studio3 Wireless Noise Cancelling",
      originalPrice: 349.99,
      salePrice: 199.99,
      discount: 43,
      rating: 4.3,
      reviews: 18920,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B075CYQTPX?tag=vineetmankani-21",
      features: ["22hr Battery", "Pure ANC", "Apple W1 Chip"],
      badge: "Hot Deal",
    },
    {
      id: 8,
      name: "Anker Soundcore Life Q30",
      originalPrice: 79.99,
      salePrice: 59.99,
      discount: 25,
      rating: 4.5,
      reviews: 45670,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B08HMWZBXC?tag=vineetmankani-21",
      features: ["40hr Battery", "Hi-Res Audio", "Multiple EQ Modes"],
      badge: "Budget Pick",
    },
    {
      id: 9,
      name: "Jabra Elite 85h Wireless Noise-Canceling",
      originalPrice: 299.99,
      salePrice: 179.99,
      discount: 40,
      rating: 4.4,
      reviews: 7890,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B07RS8SRWZ?tag=vineetmankani-21",
      features: ["36hr Battery", "SmartSound Technology", "Rain Resistant"],
      badge: "Weather Proof",
    },
    {
      id: 10,
      name: "Skullcandy Crusher Evo Wireless",
      originalPrice: 199.99,
      salePrice: 129.99,
      discount: 35,
      rating: 4.2,
      reviews: 12340,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B08P3K4W7V?tag=vineetmankani-21",
      features: ["40hr Battery", "Sensory Bass", "Personal Sound"],
      badge: "Bass Lover",
    },
  ],
  shoes: [
    {
      id: 1,
      name: "Nike Air Max 270 Running Shoes",
      originalPrice: 150.0,
      salePrice: 89.99,
      discount: 40,
      rating: 4.6,
      reviews: 8920,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B07BQZPX9X?tag=vineetmankani-21",
      features: ["Air Max Technology", "Breathable Mesh", "Durable Rubber Sole"],
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22 Running Shoes",
      originalPrice: 190.0,
      salePrice: 129.99,
      discount: 32,
      rating: 4.7,
      reviews: 12450,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B09PQXM8KL?tag=vineetmankani-21",
      features: ["Boost Midsole", "Primeknit Upper", "Continental Rubber"],
      badge: "Runner's Choice",
    },
    {
      id: 3,
      name: "New Balance Fresh Foam X 1080v12",
      originalPrice: 149.99,
      salePrice: 99.99,
      discount: 33,
      rating: 4.5,
      reviews: 6780,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B09TQXM8KL?tag=vineetmankani-21",
      features: ["Fresh Foam X", "Hypoknit Upper", "Blown Rubber Outsole"],
      badge: "Comfort Plus",
    },
    {
      id: 4,
      name: "Allbirds Tree Runners",
      originalPrice: 98.0,
      salePrice: 69.99,
      discount: 29,
      rating: 4.4,
      reviews: 15670,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B08HMWZBXC?tag=vineetmankani-21",
      features: ["Eucalyptus Tree Fiber", "Merino Wool Lining", "SweetFoam Sole"],
      badge: "Eco-Friendly",
    },
    {
      id: 5,
      name: "Converse Chuck Taylor All Star",
      originalPrice: 65.0,
      salePrice: 39.99,
      discount: 38,
      rating: 4.8,
      reviews: 25890,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B000OLQVEU?tag=vineetmankani-21",
      features: ["Canvas Upper", "Rubber Toe Cap", "Classic Design"],
      badge: "Timeless",
    },
    {
      id: 6,
      name: "Vans Old Skool Sneakers",
      originalPrice: 65.0,
      salePrice: 44.99,
      discount: 31,
      rating: 4.6,
      reviews: 18920,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B000OLQVEU?tag=vineetmankani-21",
      features: ["Suede and Canvas", "Signature Side Stripe", "Waffle Outsole"],
      badge: "Skate Style",
    },
    {
      id: 7,
      name: "ASICS Gel-Kayano 29 Running Shoes",
      originalPrice: 160.0,
      salePrice: 119.99,
      discount: 25,
      rating: 4.5,
      reviews: 7650,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B09PQXM8KL?tag=vineetmankani-21",
      features: ["GEL Technology", "FlyteFoam Blast+", "3D Space Construction"],
      badge: "Stability",
    },
    {
      id: 8,
      name: "Puma RS-X Reinvention Sneakers",
      originalPrice: 110.0,
      salePrice: 74.99,
      discount: 32,
      rating: 4.3,
      reviews: 5430,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B08F2BRHZX?tag=vineetmankani-21",
      features: ["RS Cushioning", "Mixed Materials", "Bold Colorways"],
      badge: "Retro Style",
    },
    {
      id: 9,
      name: "Under Armour HOVR Phantom 3",
      originalPrice: 140.0,
      salePrice: 89.99,
      discount: 36,
      rating: 4.4,
      reviews: 9870,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B09HZQYXBP?tag=vineetmankani-21",
      features: ["HOVR Foam", "Compression Mesh", "Connected Technology"],
      badge: "Tech Enhanced",
    },
    {
      id: 10,
      name: "Reebok Classic Leather Sneakers",
      originalPrice: 75.0,
      salePrice: 49.99,
      discount: 33,
      rating: 4.7,
      reviews: 22340,
      image: "/placeholder.svg?height=300&width=300",
      affiliateLink: "https://amazon.com/dp/B000OLQVEU?tag=vineetmankani-21",
      features: ["Soft Leather Upper", "Die-Cut EVA Midsole", "High Abrasion Rubber"],
      badge: "Classic",
    },
  ],
}

// Keep the old data as fallback
const productData = fallbackProductData

// Category information
const categoryInfo: Record<string, { name: string; description: string }> = {
  earphones: {
    name: "Earphones & Headphones",
    description: "Premium audio devices with incredible sound quality and unbeatable deals",
  },
  shoes: {
    name: "Shoes & Footwear",
    description: "Stylish and comfortable footwear for every occasion at amazing prices",
  },
  laptops: {
    name: "Laptops & Computers",
    description: "High-performance computing devices with exclusive discounts",
  },
  watches: {
    name: "Watches & Smartwatches",
    description: "Elegant timepieces and smart wearables with great savings",
  },
  cameras: {
    name: "Cameras & Photography",
    description: "Capture life's moments with professional cameras at reduced prices",
  },
  "home-appliances": {
    name: "Home Appliances",
    description: "Smart home solutions and appliances with special offers",
  },
  gaming: {
    name: "Gaming & Accessories",
    description: "Gaming gear and accessories for the ultimate gaming experience",
  },
  books: {
    name: "Books & E-readers",
    description: "Expand your knowledge with books and e-readers at discounted prices",
  },
  fitness: {
    name: "Fitness & Sports",
    description: "Stay active with fitness equipment and sports gear on sale",
  },
  automotive: {
    name: "Automotive & Tools",
    description: "Car accessories and professional tools with exclusive deals",
  },
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params
  
  // Try to get products from file system, fallback to hardcoded data
  let products = getProductsByCategory(slug)
  
  // If no products found in file system, use fallback data
  if (products.length === 0) {
    products = fallbackProductData[slug] || fallbackProductData.earphones || []
  }
  
  const category = categoryInfo[slug] || categoryInfo.earphones

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Categories</span>
            </Link>
            <div className="text-center flex-1 mx-8">
              <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>Updated Today</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="bg-white rounded-lg p-4 mb-8 shadow-sm border">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2 text-green-600" />
              <span className="font-medium">Average Savings: 32%</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              <span className="font-medium">Average Rating: 4.5/5</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="text-green-600 font-medium">🔥 Limited Time Offers - Act Fast!</div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white"
            >
              <CardHeader className="p-0 relative">
                {/* Rank Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="secondary" className="bg-blue-600 text-white font-bold">
                    #{index + 1}
                  </Badge>
                </div>

                {/* Product Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="outline" className="bg-white/90 text-xs font-medium">
                    {product.badge}
                  </Badge>
                </div>

                {/* Discount Badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <Badge className="bg-red-500 text-white font-bold">-{product.discount}%</Badge>
                </div>

                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 ml-2">
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                </div>

                {/* Features */}
                <div className="mb-3">
                  {product.features.slice(0, 2).map((feature: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-600">Rs. {product.salePrice}</span>
                    <span className="text-sm text-gray-500 line-through">Rs. {product.originalPrice}</span>
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    Save Rs. {(product.originalPrice - product.salePrice).toFixed(2)}
                  </div>
                </div>

                {/* CTA Button */}
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium">
                  <a
                    href={product.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    View on Amazon
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Tag className="w-5 h-5 mr-2 text-blue-600" />
            Important Information
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Affiliate Disclosure:</strong> This page contains affiliate links. When you purchase through our
              links, we may earn a commission at no additional cost to you.
            </p>
            <p>
              <strong>Price Updates:</strong> Prices and availability are subject to change. Please verify current
              pricing on Amazon before making a purchase.
            </p>
            <p>
              <strong>Deal Status:</strong> Limited-time offers may expire without notice. We recommend acting quickly
              on deals that interest you.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Amazon Deals Hub. All rights reserved.
            <span className="block mt-2">Your trusted source for the best Amazon deals and offers.</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
