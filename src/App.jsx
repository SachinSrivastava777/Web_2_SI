import { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  PlusCircle, 
  Star, 
  ArrowLeft, 
  Menu, 
  X, 
  Upload, 
  Tag, 
  DollarSign, 
  MessageSquare,
  Globe,
  ChevronDown,
  User,
  Heart
} from 'lucide-react';
import { initialVendors } from './data/vendors';

function App() {
  // State
  const [vendors, setVendors] = useState(() => {
    const saved = localStorage.getItem('local_vendors');
    return saved ? JSON.parse(saved) : initialVendors;
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'details' | 'register' | 'about'
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Registration Form State
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    category: 'Food',
    phone: '',
    address: '',
    hours: '10:00 AM - 08:00 PM',
    about: '',
    priceRange: '₹50 - ₹500',
    productsInput: '', // comma separated products
    image: null,
    imagePreview: ''
  });
  
  // New Review State
  const [reviewForm, setReviewForm] = useState({
    author: '',
    rating: 5,
    comment: ''
  });

  // Active Image Gallery State for Details Page
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('local_vendors', JSON.stringify(vendors));
  }, [vendors]);

  // Categories list derived from initial + standard ones
  const categories = ['All', 'Food', 'Grocery', 'Salon', 'Repair', 'Stationery', 'Other'];

  // Handle Search and Filter
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          vendor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (vendor.about && vendor.about.toLowerCase().includes(searchQuery.toLowerCase()));
                          
    const matchesCategory = selectedCategory === 'All' || vendor.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Find selected vendor
  const selectedVendor = vendors.find(v => v.id === selectedVendorId);

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Shop Registration Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!formData.shopName || !formData.ownerName || !formData.phone || !formData.address) {
      alert('Please fill out all required fields.');
      return;
    }

    // Process product list input
    const productList = formData.productsInput
      ? formData.productsInput.split(',').map(p => {
          const parts = p.split(':');
          return {
            name: parts[0]?.trim() || 'Item',
            price: parts[1]?.trim() ? `₹${parts[1].trim()}` : '₹Varies'
          };
        })
      : [
          { name: 'General Service/Product', price: formData.priceRange }
        ];

    const newVendor = {
      id: Date.now(),
      name: formData.shopName,
      ownerName: formData.ownerName,
      category: formData.category,
      image: formData.imagePreview || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=60',
      images: [
        formData.imagePreview || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60'
      ],
      address: formData.address,
      phone: formData.phone,
      hours: formData.hours,
      about: formData.about || `Welcome to ${formData.shopName}! We are dedicated to providing the best products and services to our local community in Khatima.`,
      priceRange: formData.priceRange,
      products: productList,
      mapLocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.3082531393693!2d79.9678241!3d28.9190772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a13d740c0f9947%3A0xe541e24749f7ba3b!2sKhatima%2C%20Uttarakhand%20262308!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      reviews: []
    };

    setVendors(prev => [newVendor, ...prev]);
    alert('Congratulations! Your shop has been registered successfully.');
    
    // Reset Form
    setFormData({
      shopName: '',
      ownerName: '',
      category: 'Food',
      phone: '',
      address: '',
      hours: '10:00 AM - 08:00 PM',
      about: '',
      priceRange: '₹50 - ₹500',
      productsInput: '',
      image: null,
      imagePreview: ''
    });
    
    // Redirect to Home
    setCurrentView('home');
  };

  // Handle Review Submit
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.author || !reviewForm.comment) {
      alert('Please enter your name and comment.');
      return;
    }

    const newReview = {
      id: Date.now(),
      author: reviewForm.author,
      rating: Number(reviewForm.rating),
      comment: reviewForm.comment,
      date: 'Just now'
    };

    setVendors(prev => prev.map(v => {
      if (v.id === selectedVendorId) {
        return {
          ...v,
          reviews: [newReview, ...(v.reviews || [])]
        };
      }
      return v;
    }));

    setReviewForm({
      author: '',
      rating: 5,
      comment: ''
    });
  };

  // Helper: Open Vendor Details View
  const viewVendorDetails = (id) => {
    setSelectedVendorId(id);
    setActiveImageIndex(0);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FAQs Array
  const faqs = [
    {
      q: "How can I add my own shop to this website?",
      a: "It's super simple! Just click on the 'Register Shop' button in the navigation menu, fill in your shop name, owner name, category, phone number, address, and upload a photo of your shop. Click submit, and your shop will immediately appear on the home page!"
    },
    {
      q: "Is it free to list my small business here?",
      a: "Yes, absolutely! This is a free local initiative to help small vendors and roadside shop owners build an instant online presence. Customers can easily find your contact details, see what you sell, and call you directly."
    },
    {
      q: "How do customers contact me?",
      a: "Each shop profile contains a direct 'Call Shop' button. When customers tap it on their mobile phone, it directly dials your registered phone number."
    },
    {
      q: "Can I update my shop details later?",
      a: "For security and simplicity, current listings are saved in your local browser storage. In future updates, we will add login accounts for shop owners to update their listings from any device."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* 1. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
            >
              <div className="bg-gradient-to-tr from-emerald-500 to-orange-500 p-2.5 rounded-xl text-white shadow-md shadow-emerald-500/10">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
                  LocalVibe
                </span>
                <span className="block text-[10px] text-slate-400 font-semibold tracking-wider uppercase -mt-1">
                  Khatima Market
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex space-x-1">
              <button 
                onClick={() => setCurrentView('home')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentView === 'home' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                Find Shops
              </button>
              <button 
                onClick={() => setCurrentView('register')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentView === 'register' 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                Register a Shop
              </button>
              <button 
                onClick={() => {
                  setCurrentView('home');
                  setTimeout(() => {
                    const el = document.getElementById('faq-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200"
              >
                FAQ
              </button>
            </nav>

            {/* Call To Action - Right Side */}
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => setCurrentView('register')}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md shadow-emerald-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Your Business</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-emerald-600 p-2 rounded-lg hover:bg-slate-50 transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-fadeIn">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              <button 
                onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
                className={`w-full text-left block px-3 py-2.5 rounded-lg text-base font-semibold ${
                  currentView === 'home' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Find Shops
              </button>
              <button 
                onClick={() => { setCurrentView('register'); setMobileMenuOpen(false); }}
                className={`w-full text-left block px-3 py-2.5 rounded-lg text-base font-semibold ${
                  currentView === 'register' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Register a Shop
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('faq-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full text-left block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                FAQ
              </button>
              <div className="pt-2 px-3">
                <button 
                  onClick={() => { setCurrentView('register'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold shadow-md shadow-emerald-500/20"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Register My Business</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Areas */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div>
            
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white border-b border-slate-100 py-16 sm:py-24">
              {/* Background gradient decorative shapes */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-65 pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100 mb-4 animate-bounce">
                  ✨ Supporting Local Shops in Khatima
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
                  Discover Local Shops & <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-emerald-500 to-orange-500 bg-clip-text text-transparent">
                    Street Food Vendors
                  </span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-500">
                  Find contact numbers, locations, and menus for small shops, salons, repairs, and roadside stalls near you.
                </p>

                {/* Big Search Bar */}
                <div className="mt-8 max-w-2xl mx-auto px-2">
                  <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-xl shadow-slate-100 border border-slate-200">
                    <div className="flex items-center flex-grow pl-3">
                      <Search className="h-5 w-5 text-slate-400 mr-2 flex-shrink-0" />
                      <input 
                        type="text"
                        placeholder="Search Sunil Egg Roll, groceries, salon, repair..."
                        className="w-full py-2.5 text-slate-700 bg-transparent border-none focus:outline-none focus:ring-0 text-sm sm:text-base placeholder-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="p-1 rounded-full hover:bg-slate-100 text-slate-400 mr-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <button 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base shadow-md shadow-emerald-500/20 transition-all duration-300"
                      onClick={() => {}}
                    >
                      Search
                    </button>
                  </div>
                </div>

                {/* Quick Info Badges */}
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1 text-emerald-500" /> Khatima, Uttarakhand</span>
                  <span className="flex items-center"><Phone className="h-3.5 w-3.5 mr-1 text-orange-500" /> Dial and Order Directly</span>
                  <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1 text-emerald-500" /> Support Local Vendors</span>
                </div>
              </div>
            </div>

            {/* Category Slider & Filter Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="border-b border-slate-100 pb-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-emerald-500" /> Explore by Category
                </h2>
                
                {/* Category tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {categories.map(cat => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                          isSelected 
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20 scale-105' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                        }`}
                      >
                        {cat === 'All' ? '🌐 All Shops' : cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Vendors List Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              
              {/* Header inside list */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-800">
                    {selectedCategory === 'All' ? 'All Registered Shops' : `${selectedCategory} Shops`}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Showing {filteredVendors.length} {filteredVendors.length === 1 ? 'vendor' : 'vendors'} in Khatima
                  </p>
                </div>
              </div>

              {/* Grid of Vendor Cards */}
              {filteredVendors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredVendors.map(vendor => (
                    <article 
                      key={vendor.id} 
                      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 hover:border-emerald-100 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                    >
                      {/* Image section with category badge */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                        <img 
                          src={vendor.image} 
                          alt={vendor.name} 
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-emerald-700 shadow-sm border border-emerald-50">
                            {vendor.category}
                          </span>
                        </div>
                        {vendor.priceRange && (
                          <div className="absolute bottom-4 right-4">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-sm">
                              {vendor.priceRange}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-extrabold text-lg sm:text-xl text-slate-800 group-hover:text-emerald-600 transition-colors">
                            {vendor.name}
                          </h4>
                          
                          {/* Rating display */}
                          <div className="flex items-center space-x-1 text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg text-xs font-bold">
                            <Star className="h-3.5 w-3.5 fill-orange-500" />
                            <span>
                              {vendor.reviews && vendor.reviews.length > 0 
                                ? (vendor.reviews.reduce((acc, curr) => acc + curr.rating, 0) / vendor.reviews.length).toFixed(1) 
                                : '4.5'}
                            </span>
                          </div>
                        </div>

                        {/* Owner name */}
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4 flex items-center">
                          <User className="h-3 w-3 mr-1 text-slate-400" /> Owner: {vendor.ownerName}
                        </p>

                        {/* Description snippet */}
                        <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed flex-grow">
                          {vendor.about}
                        </p>

                        {/* Quick fields */}
                        <div className="space-y-2 border-t border-slate-50 pt-4 mb-4 text-xs sm:text-sm text-slate-600">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{vendor.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                            <span>{vendor.hours}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                            <span className="font-semibold text-slate-800">{vendor.phone}</span>
                          </div>
                        </div>

                        {/* Interactive View details */}
                        <div className="flex items-center space-x-2 mt-auto">
                          <button 
                            onClick={() => viewVendorDetails(vendor.id)}
                            className="flex-grow text-center bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-200"
                          >
                            View Details
                          </button>
                          
                          <a 
                            href={`tel:${vendor.phone}`}
                            className="bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-xl transition-all duration-200 shadow-md shadow-orange-500/20 hover:shadow-lg"
                            title="Call vendor"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm px-4">
                  <Globe className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-slate-700">No Shops Found</h4>
                  <p className="text-slate-400 mt-2 max-w-md mx-auto">
                    We couldn't find any shops matching "{searchQuery}" in the category "{selectedCategory}". Try checking your spelling or selecting another category.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="mt-6 bg-emerald-600 text-white font-semibold px-6 py-2 rounded-xl text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </section>
            
            {/* Owner banner */}
            <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none"></div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left md:flex justify-between items-center">
                <div className="mb-6 md:mb-0 max-w-xl">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Are you a shop owner in Khatima?</h3>
                  <p className="text-slate-400 mt-2">
                    Create your simple, free online business profile in 2 minutes. Get discovered by local customers who want to support small businesses.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentView('register');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>List Your Shop Now</span>
                </button>
              </div>
            </div>

            {/* FAQ ACCORDION SECTION */}
            <section id="faq-section" className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
                <p className="text-slate-500 mt-2">Everything you need to know about LocalVibe directory</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div 
                      key={index} 
                      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen 
                          ? <ChevronDown className="h-5 w-5 text-slate-400 transform rotate-180 transition-transform" />
                          : <ChevronDown className="h-5 w-5 text-slate-400 transition-transform" />
                        }
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-slate-500 text-sm border-t border-slate-50 leading-relaxed animate-fadeIn">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: VENDOR DETAILS PAGE */}
        {currentView === 'details' && selectedVendor && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            
            {/* Back Button */}
            <button 
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center space-x-2 text-slate-600 hover:text-emerald-600 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold mb-6 shadow-sm transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Listings</span>
            </button>

            {/* Profile Grid (Top: Gallery & Basic info card) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              
              {/* Left Column: Image Gallery (Span 7) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Big Display Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100 rounded-3xl shadow-sm border border-slate-100">
                  <img 
                    src={selectedVendor.images[activeImageIndex]} 
                    alt={selectedVendor.name}
                    className="h-full w-full object-cover" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                      {selectedVendor.category}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {selectedVendor.images.length > 1 && (
                  <div className="flex space-x-3 overflow-x-auto pb-1">
                    {selectedVendor.images.map((imgUrl, idx) => {
                      const isActive = activeImageIndex === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative h-20 w-28 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                            isActive ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-transparent hover:border-slate-300'
                          }`}
                        >
                          <img src={imgUrl} alt="Thumbnail" className="h-full w-full object-cover" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Contact & Quick Info Card (Span 5) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col justify-between">
                  
                  {/* Shop Details Header */}
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                        {selectedVendor.name}
                      </h1>
                      
                      {/* Favorite Button */}
                      <button className="text-slate-300 hover:text-red-500 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center text-sm mb-4">
                      <span className="font-semibold text-slate-400 uppercase text-xs tracking-wider">
                        Owner: {selectedVendor.ownerName}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs">
                        Open
                      </span>
                    </div>

                    {/* Price Range */}
                    <div className="flex items-center space-x-1.5 text-slate-600 mb-6 bg-slate-50 py-2 px-3 rounded-xl w-fit">
                      <DollarSign className="h-4.5 w-4.5 text-emerald-600" />
                      <span className="text-sm font-semibold">Price range: </span>
                      <span className="text-sm font-bold text-slate-800">{selectedVendor.priceRange}</span>
                    </div>

                    {/* Meta Fields */}
                    <div className="space-y-4 text-slate-600 border-t border-slate-50 pt-5">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-400 font-semibold">Address</p>
                          <p className="text-sm font-medium text-slate-700 mt-0.5">{selectedVendor.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-400 font-semibold">Opening Hours</p>
                          <p className="text-sm font-medium text-slate-700 mt-0.5">{selectedVendor.hours}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-slate-400 font-semibold">Contact Phone</p>
                          <p className="text-base font-extrabold text-slate-800 mt-0.5">{selectedVendor.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Big Call Button */}
                  <div className="mt-8">
                    <a 
                      href={`tel:${selectedVendor.phone}`}
                      className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transform hover:-translate-y-0.5 transition-all text-center"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Call Vendor Now</span>
                    </a>
                    <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                      📱 Tap on mobile to place a call or ask about products
                    </p>
                  </div>

                </div>
              </div>

            </div>

            {/* Profile Grid (Bottom: About, Products, Map & Reviews) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: About & Products (Span 7) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* About Shop */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">
                    About The Shop
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {selectedVendor.about}
                  </p>
                </div>

                {/* Product/Service List */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50 flex justify-between items-center">
                    <span>Products & Services Menu</span>
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-bold">
                      Price List
                    </span>
                  </h3>
                  
                  {selectedVendor.products && selectedVendor.products.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {selectedVendor.products.map((item, idx) => (
                        <div key={idx} className="py-3 flex justify-between items-center text-sm sm:text-base">
                          <span className="font-semibold text-slate-700">{item.name}</span>
                          <span className="font-bold text-emerald-600 bg-emerald-50/50 px-3 py-1 rounded-lg text-sm">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 text-sm italic">Product list not specified. Please contact owner for details.</p>
                  )}
                </div>

                {/* Dummy Review Form & Reviews List */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 pb-2 border-b border-slate-50 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-emerald-500" /> Customer Reviews
                  </h3>

                  {/* Write a Review Section */}
                  <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-4 sm:p-5 rounded-2xl space-y-4">
                    <h4 className="font-bold text-sm text-slate-700">Write a Customer Review</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Your Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Rahul Bisht"
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-emerald-500"
                          value={reviewForm.author}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, author: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Rating</label>
                        <select 
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 font-semibold"
                          value={reviewForm.rating}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                        >
                          <option value="5">⭐⭐⭐⭐⭐ Excellent (5 Stars)</option>
                          <option value="4">⭐⭐⭐⭐ Very Good (4 Stars)</option>
                          <option value="3">⭐⭐⭐ Average (3 Stars)</option>
                          <option value="2">⭐⭐ Below Average (2 Stars)</option>
                          <option value="1">⭐ Poor (1 Star)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Review Comment</label>
                      <textarea 
                        rows="2"
                        placeholder="Tell others about your experience, food quality, or customer service..."
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-emerald-500"
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all"
                    >
                      Post Review
                    </button>
                  </form>

                  {/* Reviews List */}
                  <div className="space-y-4 mt-6">
                    {selectedVendor.reviews && selectedVendor.reviews.length > 0 ? (
                      selectedVendor.reviews.map(review => (
                        <div key={review.id} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-extrabold text-sm text-slate-800">{review.author}</h5>
                              <span className="text-[10px] text-slate-400 font-semibold">{review.date}</span>
                            </div>
                            <div className="flex text-orange-400">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'fill-orange-400' : 'text-slate-200'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-6 text-slate-400 text-xs italic">
                        No reviews yet. Be the first to share your feedback!
                      </p>
                    )}
                  </div>

                </div>

              </div>

              {/* Right Column: Google Maps Location (Span 5) */}
              <div className="lg:col-span-5">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 sticky top-24">
                  <h3 className="text-xl font-bold text-slate-800 pb-2 border-b border-slate-50 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-orange-500" /> Shop Location
                  </h3>
                  
                  {/* Google Map Iframe Placeholder */}
                  <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner bg-slate-50">
                    <iframe 
                      src={selectedVendor.mapLocation} 
                      className="absolute inset-0 w-full h-full border-none"
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Shop Location on Google Maps"
                    ></iframe>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 leading-relaxed">
                    <span className="font-bold text-slate-700 block mb-1">📍 Local Guide Info:</span>
                    This shop is located near Khatima Chauraha. You can ask anyone in the local market for direction or call the shop directly using the contact number above.
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 3: REGISTER A SHOP OWNER FORM */}
        {currentView === 'register' && (
          <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16 animate-fadeIn">
            
            <div className="text-center mb-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                🚀 Free Online Directory
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 mt-3">Register Your Small Business</h1>
              <p className="text-slate-500 mt-2">
                Fill in the details below to show your business card on our local directory. No computer skills needed!
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-xl space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Shop Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Shop Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="shopName"
                    required
                    placeholder="e.g. Sunil Egg Roll"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm sm:text-base"
                    value={formData.shopName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text"
                    name="ownerName"
                    required
                    placeholder="e.g. Sunil Kumar"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm sm:text-base"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Shop Category <span className="text-red-500">*</span>
                  </label>
                  <select 
                    name="category"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm sm:text-base font-semibold"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="Food">Food (Chaat, Roll, Sweets)</option>
                    <option value="Grocery">Grocery (Kirana, Fruits)</option>
                    <option value="Salon">Salon & Beauty Parlour</option>
                    <option value="Repair">Electrical & Mechanical Repair</option>
                    <option value="Stationery">Book Depot & Stationery</option>
                    <option value="Other">Other Category</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Phone / Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="tel"
                    name="phone"
                    required
                    maxLength="10"
                    pattern="[0-9]{10}"
                    placeholder="e.g. 8114181327"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm sm:text-base"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Please enter a valid 10-digit mobile number</span>
                </div>

              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Shop Address <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. Khatima Chauraha, Near Police Station, Khatima"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm sm:text-base"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Opening Hours */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Opening Hours
                  </label>
                  <input 
                    type="text"
                    name="hours"
                    placeholder="e.g. 04:00 PM - 11:00 PM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm sm:text-base"
                    value={formData.hours}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Price Range / Estimates
                  </label>
                  <input 
                    type="text"
                    name="priceRange"
                    placeholder="e.g. ₹30 - ₹120"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm sm:text-base"
                    value={formData.priceRange}
                    onChange={handleInputChange}
                  />
                </div>

              </div>

              {/* Products/Services Menu Input */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  Product / Service List (Comma separated)
                </label>
                <input 
                  type="text"
                  name="productsInput"
                  placeholder="Egg Roll:35, Double Roll:50, Paneer Roll:60"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm sm:text-base"
                  value={formData.productsInput}
                  onChange={handleInputChange}
                />
                <span className="text-[10px] text-slate-400 block mt-1">Enter items in format "Item Name:Price" separated by commas</span>
              </div>

              {/* About Shop */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">
                  About the Shop (Description)
                </label>
                <textarea 
                  name="about"
                  rows="3"
                  placeholder="Briefly describe what you sell, how long you've been in business, or what makes your shop special..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm sm:text-base"
                  value={formData.about}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Shop Image Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Shop Image Upload
                </label>
                
                <div className="flex items-center space-x-6">
                  
                  {/* File Input Box */}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-emerald-400 bg-slate-50 rounded-2xl h-32 w-48 cursor-pointer transition-colors p-4 text-center">
                    <Upload className="h-6 w-6 text-slate-400 mb-2" />
                    <span className="text-xs font-bold text-slate-500">Choose Image</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </label>

                  {/* Image Preview Box */}
                  {formData.imagePreview ? (
                    <div className="relative h-32 w-48 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                      <img src={formData.imagePreview} alt="Shop preview" className="h-full w-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: '' }))}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-32 w-48 rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50 flex items-center justify-center text-xs text-slate-300 italic">
                      No photo chosen
                    </div>
                  )}

                </div>
              </div>

              {/* Buttons Container */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-slate-50">
                <button
                  type="submit"
                  className="flex-grow bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-500/25 transition-all text-center text-sm sm:text-base"
                >
                  Submit & List My Shop
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentView('home')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 px-6 rounded-2xl transition-all text-center text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-slate-800">
            
            {/* Brand Logo & Tagline (Span 4) */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-tr from-emerald-500 to-orange-500 p-2 rounded-lg text-white">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="font-extrabold text-lg text-white tracking-tight">
                  LocalVibe
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Empowering small business owners and roadside street vendors in Khatima, Uttarakhand. Supporting the local community by making discovery effortless.
              </p>
            </div>

            {/* Quick Links (Span 3) */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => { setCurrentView('home'); window.scrollTo({top:0, behavior:'smooth'}); }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Search Vendors
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentView('register'); window.scrollTo({top:0, behavior:'smooth'}); }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Add Business Profile
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setCurrentView('home');
                      setTimeout(() => {
                        const el = document.getElementById('faq-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    FAQs Accordion
                  </button>
                </li>
              </ul>
            </div>

            {/* About & Mission (Span 3) */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Our Mission</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                LocalVibe was built to solve a simple problem: small vendors don't have websites, making it hard for tourists or locals to call or order in advance. This platform provides that digital identity for free.
              </p>
            </div>

            {/* Contact Details (Span 2) */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Contact Info</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Khatima Market Association<br />
                Uttarakhand, India<br />
                <span className="block mt-2 font-bold text-white">support@localvibe.in</span>
              </p>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
            <p>© 2026 LocalVibe Directory. Built with ❤️ for local businesses.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-300">Terms of Use</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
