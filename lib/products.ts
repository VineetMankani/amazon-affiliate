import fs from "fs"
import path from "path"

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json")

export interface Product {
  id: number
  name: string
  originalPrice: number
  salePrice: number
  discount: number
  rating: number
  reviews: number
  image: string
  affiliateLink: string
  features: string[]
  badge: string
  category: string
}

export interface ProductsData {
  [category: string]: Product[]
}

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Read products from file
export function getProducts(): ProductsData {
  ensureDataDirectory()
  
  if (!fs.existsSync(PRODUCTS_FILE)) {
    // Return empty structure if file doesn't exist
    return {}
  }

  try {
    const fileContent = fs.readFileSync(PRODUCTS_FILE, "utf-8")
    return JSON.parse(fileContent) as ProductsData
  } catch (error) {
    console.error("Error reading products file:", error)
    return {}
  }
}

// Get products for a specific category
export function getProductsByCategory(category: string): Product[] {
  const products = getProducts()
  return products[category] || []
}

// Write products to file
export function saveProducts(products: ProductsData): void {
  ensureDataDirectory()
  
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), "utf-8")
  } catch (error) {
    console.error("Error writing products file:", error)
    throw new Error("Failed to save products")
  }
}

// Add a new product
export function addProduct(product: Omit<Product, "id">): Product {
  const products = getProducts()
  const categoryProducts = products[product.category] || []
  
  // Generate new ID
  const maxId = categoryProducts.length > 0 
    ? Math.max(...categoryProducts.map(p => p.id))
    : 0
  
  const newProduct: Product = {
    ...product,
    id: maxId + 1,
  }

  if (!products[product.category]) {
    products[product.category] = []
  }

  products[product.category].push(newProduct)
  saveProducts(products)
  
  return newProduct
}

// Delete a product
export function deleteProduct(category: string, productId: number): boolean {
  const products = getProducts()
  
  if (!products[category]) {
    return false
  }

  const index = products[category].findIndex(p => p.id === productId)
  if (index === -1) {
    return false
  }

  products[category].splice(index, 1)
  saveProducts(products)
  
  return true
}

// Get all categories
export function getCategories(): string[] {
  const products = getProducts()
  return Object.keys(products)
}

