const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Luxury Birthday Gift Basket",
    description: "A premium collection of gourmet chocolates, fine wines, and artisanal treats perfect for celebrating special birthdays.",
    shortDescription: "Premium birthday celebration basket",
    price: 149.99,
    category: "birthday",
    occasion: "birthday",
    recipient: "family",
    images: [
      { url: "/api/placeholder/400/400", alt: "Luxury Birthday Gift Basket", isPrimary: true }
    ],
    inventory: {
      quantity: 25,
      sku: "BIRTHDAY-LUX-001"
    },
    features: ["Gourmet Chocolates", "Fine Wines", "Artisanal Treats", "Luxury Packaging"],
    isActive: true,
    isFeatured: true,
    tags: ["luxury", "birthday", "gourmet", "wine"]
  },
  {
    name: "Anniversary Romance Package",
    description: "Create unforgettable memories with this romantic anniversary package featuring champagne, candles, and personalized touches.",
    shortDescription: "Romantic anniversary celebration",
    price: 199.99,
    originalPrice: 249.99,
    category: "anniversary",
    occasion: "anniversary",
    recipient: "her",
    images: [
      { url: "/api/placeholder/400/400", alt: "Anniversary Romance Package", isPrimary: true }
    ],
    inventory: {
      quantity: 15,
      sku: "ANNIV-ROM-001"
    },
    features: ["Champagne", "Scented Candles", "Personalized Card", "Luxury Box"],
    isActive: true,
    isFeatured: true,
    isOnSale: true,
    tags: ["romantic", "anniversary", "champagne", "personalized"]
  },
  {
    name: "Corporate Executive Gift Set",
    description: "Professional and elegant gift set perfect for corporate clients and business partners.",
    shortDescription: "Professional corporate gifting",
    price: 89.99,
    category: "corporate",
    occasion: "thank-you",
    recipient: "colleague",
    images: [
      { url: "/api/placeholder/400/400", alt: "Corporate Executive Gift Set", isPrimary: true }
    ],
    inventory: {
      quantity: 50,
      sku: "CORP-EXEC-001"
    },
    features: ["Leather Portfolio", "Premium Pen", "Business Card Holder", "Professional Packaging"],
    isActive: true,
    tags: ["corporate", "professional", "executive", "business"]
  },
  {
    name: "Home & Garden Luxury Set",
    description: "Beautiful collection of home decor and gardening essentials for the discerning homeowner.",
    shortDescription: "Luxury home and garden gifts",
    price: 129.99,
    category: "home",
    occasion: "housewarming",
    recipient: "home",
    images: [
      { url: "/api/placeholder/400/400", alt: "Home & Garden Luxury Set", isPrimary: true }
    ],
    inventory: {
      quantity: 20,
      sku: "HOME-GARDEN-001"
    },
    features: ["Crystal Vase", "Gardening Tools", "Scented Candles", "Decorative Tray"],
    isActive: true,
    isFeatured: true,
    tags: ["home", "garden", "decor", "luxury"]
  },
  {
    name: "Wedding Celebration Package",
    description: "Elegant wedding gift package with champagne flutes, personalized congratulations, and luxury treats.",
    shortDescription: "Elegant wedding celebration",
    price: 179.99,
    category: "wedding",
    occasion: "wedding",
    recipient: "family",
    images: [
      { url: "/api/placeholder/400/400", alt: "Wedding Celebration Package", isPrimary: true }
    ],
    inventory: {
      quantity: 30,
      sku: "WEDDING-CELEB-001"
    },
    features: ["Champagne Flutes", "Personalized Card", "Luxury Chocolates", "Elegant Packaging"],
    isActive: true,
    tags: ["wedding", "celebration", "champagne", "elegant"]
  },
  {
    name: "Thank You Appreciation Basket",
    description: "Show your gratitude with this thoughtful basket of premium teas, coffees, and artisanal snacks.",
    shortDescription: "Gratitude and appreciation gift",
    price: 79.99,
    category: "thank-you",
    occasion: "thank-you",
    recipient: "friend",
    images: [
      { url: "/api/placeholder/400/400", alt: "Thank You Appreciation Basket", isPrimary: true }
    ],
    inventory: {
      quantity: 40,
      sku: "THANK-YOU-001"
    },
    features: ["Premium Teas", "Gourmet Coffee", "Artisanal Snacks", "Gratitude Card"],
    isActive: true,
    tags: ["thank-you", "appreciation", "tea", "coffee"]
  },
  {
    name: "For Him Luxury Grooming Set",
    description: "Complete grooming set with premium colognes, shaving essentials, and skincare products.",
    shortDescription: "Luxury men's grooming essentials",
    price: 159.99,
    category: "luxury",
    occasion: "birthday",
    recipient: "him",
    images: [
      { url: "/api/placeholder/400/400", alt: "For Him Luxury Grooming Set", isPrimary: true }
    ],
    inventory: {
      quantity: 35,
      sku: "HIM-GROOMING-001"
    },
    features: ["Premium Cologne", "Shaving Kit", "Skincare Products", "Leather Case"],
    isActive: true,
    isFeatured: true,
    tags: ["men", "grooming", "luxury", "skincare"]
  },
  {
    name: "For Her Spa Experience Gift",
    description: "Indulgent spa experience gift set with bath salts, candles, and relaxation essentials.",
    shortDescription: "Relaxing spa experience at home",
    price: 119.99,
    category: "luxury",
    occasion: "birthday",
    recipient: "her",
    images: [
      { url: "/api/placeholder/400/400", alt: "For Her Spa Experience Gift", isPrimary: true }
    ],
    inventory: {
      quantity: 28,
      sku: "HER-SPA-001"
    },
    features: ["Bath Salts", "Scented Candles", "Face Mask", "Relaxation Guide"],
    isActive: true,
    tags: ["spa", "relaxation", "women", "wellness"]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dieuclat', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} sample products`);

    // Calculate average ratings for products with reviews
    for (const product of products) {
      product.calculateAverageRating();
      await product.save();
    }

    console.log('Sample data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;