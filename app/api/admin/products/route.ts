import { NextRequest, NextResponse } from "next/server"
import { getProducts, addProduct, saveProducts, deleteProduct, type Product } from "@/lib/products"

// Simple auth check
function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("admin_token")
  return !!token
}

// GET - Get all products
export async function GET() {
  try {
    const products = getProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

// POST - Add a new product
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.affiliateLink || !body.category) {
      return NextResponse.json(
        { error: "Name, affiliateLink, and category are required" },
        { status: 400 }
      )
    }

    // Calculate discount if prices are provided
    let discount = body.discount || 0
    if (body.originalPrice && body.salePrice) {
      discount = Math.round(((body.originalPrice - body.salePrice) / body.originalPrice) * 100)
    }

    const productData: Omit<Product, "id"> = {
      name: body.name,
      originalPrice: body.originalPrice || 0,
      salePrice: body.salePrice || 0,
      discount,
      rating: body.rating || 0,
      reviews: body.reviews || 0,
      image: body.image || "/placeholder.svg?height=300&width=300",
      affiliateLink: body.affiliateLink,
      features: body.features || [],
      badge: body.badge || "",
      category: body.category,
    }

    const newProduct = addProduct(productData)
    return NextResponse.json({ success: true, product: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Error adding product:", error)
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    )
  }
}

// DELETE - Delete a product
export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const productId = searchParams.get("id")

    if (!category || !productId) {
      return NextResponse.json(
        { error: "Category and product ID are required" },
        { status: 400 }
      )
    }

    const success = deleteProduct(category, parseInt(productId))
    
    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
}

