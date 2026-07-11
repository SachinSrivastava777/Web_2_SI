export const initialVendors = [
  {
    id: 1,
    name: "Sunil Egg Roll",
    ownerName: "Sunil Kumar",
    category: "Food",
    image: "/sunil-egg-roll.jpg",
    images: [
      "/sunil-egg-roll.jpg",
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    address: "Khatima Chauraha, Near Police Station, Khatima, Uttarakhand",
    phone: "8114181327",
    hours: "04:00 PM - 11:00 PM",
    about: "Delicious and mouth-watering egg rolls, chicken rolls, and paneer rolls made fresh right in front of you. Sunil Egg Roll has been serving Khatima with high-quality street food for years. We use fresh ingredients and local spices to make the perfect evening snack.",
    priceRange: "₹30 - ₹120",
    products: [
      { name: "Single Egg Roll", price: "₹35" },
      { name: "Double Egg Roll", price: "₹50" },
      { name: "Single Egg Chicken Roll", price: "₹70" },
      { name: "Double Egg Chicken Roll", price: "₹90" },
      { name: "Paneer Roll", price: "₹60" },
      { name: "Egg Paneer Roll", price: "₹80" },
      { name: "Boiled Eggs (2 pcs)", price: "₹20" },
      { name: "Omelette (2 eggs)", price: "₹35" }
    ],
    mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3082531393693!2d79.9678241!3d28.9190772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a13d740c0f9947%3A0xe541e24749f7ba3b!2sKhatima%2C%20Uttarakhand%20262308!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    reviews: [
      { id: 1, author: "Rahul Sharma", rating: 5, comment: "Best rolls in the town! The double egg chicken roll is a must-try. Cleanliness is also maintained well.", date: "2 days ago" },
      { id: 2, author: "Priya Rawat", rating: 4, comment: "Amazing taste and very fast service. Sunil bhaiya is very polite. Highly recommended!", date: "1 week ago" },
      { id: 3, author: "Amit Joshi", rating: 5, comment: "Budget friendly and delicious. The spices are perfect.", date: "3 weeks ago" }
    ]
  },
  {
    id: 2,
    name: "Sharma Grocery Store",
    ownerName: "Ramesh Sharma",
    category: "Grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    address: "Main Market, Street No. 4, Khatima",
    phone: "9876543210",
    hours: "08:00 AM - 09:30 PM",
    about: "All your daily grocery needs in one place. We offer fresh vegetables, premium rice, wheat flour, dairy products, household goods, and toiletries at competitive prices. Quick delivery is available for orders above ₹500 within the local area.",
    priceRange: "₹10 - ₹2,000",
    products: [
      { name: "Basmati Rice (1kg)", price: "₹90" },
      { name: "Aashirvaad Aata (5kg)", price: "₹240" },
      { name: "Fortune Mustard Oil (1L)", price: "₹165" },
      { name: "Amul Butter (100g)", price: "₹56" },
      { name: "Tata Salt (1kg)", price: "₹28" },
      { name: "Surf Excel Bar (250g)", price: "₹35" }
    ],
    mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3082531393693!2d79.9678241!3d28.9190772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a13d740c0f9947%3A0xe541e24749f7ba3b!2sKhatima%2C%20Uttarakhand%20262308!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    reviews: [
      { id: 1, author: "Ganesh Bisht", rating: 5, comment: "Always has fresh products. Helpful staff.", date: "1 week ago" },
      { id: 2, author: "Kiran Saxena", rating: 4, comment: "Reasonable prices, plus they do free home delivery. Very convenient store.", date: "2 weeks ago" }
    ]
  },
  {
    id: 3,
    name: "Classic Unisex Salon",
    ownerName: "Vikram Sen",
    category: "Salon",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    address: "Link Road, Near PNB Bank, Khatima",
    phone: "9876543211",
    hours: "09:00 AM - 08:30 PM (Tuesday Closed)",
    about: "Classic Unisex Salon offers state-of-the-art hair styling, coloring, skin treatments, and bridal makeups. Our professional stylists have years of experience and use only premium products to ensure you look your absolute best.",
    priceRange: "₹80 - ₹3,500",
    products: [
      { name: "Men's Haircut", price: "₹100" },
      { name: "Women's Haircut", price: "₹250" },
      { name: "Beard Styling", price: "₹60" },
      { name: "Facial (O3+)", price: "₹1,200" },
      { name: "Hair Spa (L'Oreal)", price: "₹600" },
      { name: "Pedicure", price: "₹350" }
    ],
    mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3082531393693!2d79.9678241!3d28.9190772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a13d740c0f9947%3A0xe541e24749f7ba3b!2sKhatima%2C%20Uttarakhand%20262308!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    reviews: [
      { id: 1, author: "Sunita Joshi", rating: 5, comment: "Amazing haircut! Vikram is an expert stylist. Clean and hygienic salon.", date: "4 days ago" },
      { id: 2, author: "Vivek Tiwari", rating: 4, comment: "Standard rates and good styling. Usually busy on weekends.", date: "1 month ago" }
    ]
  },
  {
    id: 4,
    name: "Verma Electrical & Repairing",
    ownerName: "Sanjay Verma",
    category: "Repair",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    address: "Tanakpur Road, Opp. Govt. Hospital, Khatima",
    phone: "9876543212",
    hours: "09:30 AM - 07:30 PM (Sunday Closed)",
    about: "Prompt and reliable repairs for all home electronics and electrical items, including Fans, Coolers, Washing Machines, Microwaves, Water Geysers, and house wiring. We also offer emergency home visits for critical electricity failures.",
    priceRange: "₹150 - ₹1,500",
    products: [
      { name: "Ceiling Fan Repairing", price: "₹180" },
      { name: "Cooler Motor Rewinding", price: "₹450" },
      { name: "Washing Machine Service", price: "₹350" },
      { name: "House Wiring Inspection", price: "₹500" },
      { name: "Switchboard Installation", price: "₹150" }
    ],
    mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3082531393693!2d79.9678241!3d28.9190772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a13d740c0f9947%3A0xe541e24749f7ba3b!2sKhatima%2C%20Uttarakhand%20262308!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    reviews: [
      { id: 1, author: "Neeraj Rawat", rating: 5, comment: "Verma ji fixed my washing machine in just 30 mins. Highly professional!", date: "1 week ago" }
    ]
  },
  {
    id: 5,
    name: "Saraswati Book Depot",
    ownerName: "Devendra Pandey",
    category: "Stationery",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    ],
    address: "Tehsil Road, Near Intermediate College, Khatima",
    phone: "9876543213",
    hours: "08:30 AM - 08:30 PM",
    about: "We supply all kinds of academic textbooks (NCERT, CBSE, ICSE), competitive exam books, general storybooks, registers, notebooks, painting sets, school bags, and premium office stationery. Xerox and scanning services are also available.",
    priceRange: "₹10 - ₹800",
    products: [
      { name: "Class 10 NCERT Science Book", price: "₹190" },
      { name: "A4 Size Register (200 pages)", price: "₹70" },
      { name: "Camel Water Color Cake", price: "₹120" },
      { name: "Parker Vector Pen", price: "₹350" },
      { name: "Photocopy per page", price: "₹2" }
    ],
    mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3082531393693!2d79.9678241!3d28.9190772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a13d740c0f9947%3A0xe541e24749f7ba3b!2sKhatima%2C%20Uttarakhand%20262308!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    reviews: [
      { id: 1, author: "Deepak Pal", rating: 4, comment: "Good store. Almost all school books are available. They give nice discounts too.", date: "3 weeks ago" }
    ]
  }
];
