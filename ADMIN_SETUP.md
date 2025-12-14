# Admin Panel Setup

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
ADMIN_USERNAME=your-username-here
ADMIN_PASSWORD=your-password-here
```

Replace `your-username-here` and `your-password-here` with your desired admin credentials.

## Accessing the Admin Panel

1. Navigate to `/admin` in your browser
2. Enter your username and password (from `.env.local`)
3. Once logged in, you'll be redirected to `/admin/dashboard`

## Adding Products

In the admin dashboard, you can:

- **Add new products** using the comprehensive form
- **View existing products** organized by category
- **Delete products** using the delete button next to each product

### Required Fields
- **Product Title** - The name of the product
- **Affiliate URL** - The Amazon affiliate link
- **Category** - Select from available categories

### Optional Fields
- Original Price
- Sale Price
- Rating (0-5)
- Number of Reviews
- Product Image URL
- Features (comma-separated)
- Badge text

## Data Storage

Products are stored in `data/products.json` in the file system. This file is automatically created when you add your first product.

## Categories

Available categories:
- earphones
- shoes
- books
- fitness
- laptops
- watches
- cameras
- home-appliances
- gaming
- automotive

