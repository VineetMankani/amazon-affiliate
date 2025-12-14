"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LogOut, Plus, Trash2, Package } from "lucide-react"
import { toast } from "sonner"

const productSchema = z.object({
  name: z.string().min(1, "Title is required"),
  affiliateLink: z.string().url("Must be a valid URL").min(1, "Affiliate URL is required"),
  category: z.string().min(1, "Category is required"),
  originalPrice: z.number().min(0).optional(),
  salePrice: z.number().min(0).optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().min(0).optional(),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  features: z.string().optional(),
  badge: z.string().optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

const categories = [
  { value: "earphones", label: "Earphones & Headphones" },
  { value: "shoes", label: "Shoes & Footwear" },
  { value: "books", label: "Books & E-readers" },
  { value: "fitness", label: "Fitness & Sports" },
  { value: "laptops", label: "Laptops & Computers" },
  { value: "watches", label: "Watches & Smartwatches" },
  { value: "cameras", label: "Cameras & Photography" },
  { value: "home-appliances", label: "Home Appliances" },
  { value: "gaming", label: "Gaming & Accessories" },
  { value: "automotive", label: "Automotive & Tools" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [products, setProducts] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      affiliateLink: "",
      category: "",
      originalPrice: undefined,
      salePrice: undefined,
      rating: undefined,
      reviews: undefined,
      image: "",
      features: "",
      badge: "",
    },
  })

  useEffect(() => {
    checkAuth()
    loadProducts()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/products")
      if (response.status === 401) {
        router.push("/admin")
      }
    } catch (error) {
      router.push("/admin")
    }
  }

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/admin/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Error loading products:", error)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin")
  }

  const onSubmit = async (data: ProductFormValues) => {
    setSubmitting(true)
    try {
      const featuresArray = data.features
        ? data.features.split(",").map((f) => f.trim()).filter(Boolean)
        : []

      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          originalPrice: data.originalPrice || 0,
          salePrice: data.salePrice || 0,
          rating: data.rating || 0,
          reviews: data.reviews || 0,
          image: data.image || "/placeholder.svg?height=300&width=300",
          features: featuresArray,
          badge: data.badge || "",
        }),
      })

      if (response.ok) {
        toast.success("Product added successfully!")
        form.reset()
        loadProducts()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Failed to add product")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (category: string, productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/products?category=${category}&id=${productId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Product deleted successfully!")
        loadProducts()
      } else {
        toast.error("Failed to delete product")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Product
                </CardTitle>
                <CardDescription>Fill in the product details below. Title and Affiliate URL are required.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Title *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter product title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="affiliateLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Affiliate URL *</FormLabel>
                          <FormControl>
                            <Input placeholder="https://amazon.com/dp/..." {...field} />
                          </FormControl>
                          <FormDescription>The Amazon affiliate link for this product</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat.value} value={cat.value}>
                                  {cat.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="originalPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Original Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="salePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sale Price</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating (0-5)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                placeholder="4.5"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="reviews"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Reviews</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="1000"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://..." {...field} />
                          </FormControl>
                          <FormDescription>Leave empty to use placeholder image</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Features</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Feature 1, Feature 2, Feature 3"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Separate features with commas</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="badge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Badge</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Best Seller, Limited Time" {...field} />
                          </FormControl>
                          <FormDescription>Optional badge text to display on product</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? "Adding Product..." : "Add Product"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Products List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Existing Products</CardTitle>
                <CardDescription>Manage your products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {Object.keys(products).length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">No products yet</p>
                  ) : (
                    Object.entries(products).map(([category, categoryProducts]) => (
                      <div key={category} className="space-y-2">
                        <h3 className="font-semibold text-sm text-gray-700 capitalize">
                          {category} ({categoryProducts.length})
                        </h3>
                        {categoryProducts.map((product) => (
                          <div
                            key={product.id}
                            className="bg-gray-50 p-3 rounded-md border border-gray-200"
                          >
                            <p className="text-sm font-medium line-clamp-2 mb-2">{product.name}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">Rs. {product.salePrice}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(category, product.id)}
                                className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

