import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2, Share2, BookOpen, Star, Filter, Search } from 'lucide-react';

const LikedBooks = () => {
  const [likedBooks, setLikedBooks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock liked books data
  const mockLikedBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 299,
      originalPrice: 399,
      rating: 4.5,
      reviews: 128,
      category: 'Classic',
      description: 'A classic novel of the Jazz Age, exploring themes of idealism, resistance to change, social upheaval, and excess.',
      image: '/api/placeholder/120/160',
      inStock: true,
      seller: 'Classic Books Store',
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 350,
      originalPrice: 450,
      rating: 4.8,
      reviews: 256,
      category: 'Fiction',
      description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
      image: '/api/placeholder/120/160',
      inStock: true,
      seller: 'Literary Haven',
      addedDate: '2024-01-12'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      price: 275,
      originalPrice: 350,
      rating: 4.7,
      reviews: 189,
      category: 'Science Fiction',
      description: 'A dystopian social science fiction novel that examines the consequences of totalitarianism.',
      image: '/api/placeholder/120/160',
      inStock: false,
      seller: 'Future Reads',
      addedDate: '2024-01-10'
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 320,
      originalPrice: 400,
      rating: 4.6,
      reviews: 215,
      category: 'Romance',
      description: 'A romantic novel that charts the emotional development of protagonist Elizabeth Bennet.',
      image: '/api/placeholder/120/160',
      inStock: true,
      seller: 'Romantic Tales',
      addedDate: '2024-01-08'
    },
    {
      id: 5,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      price: 400,
      originalPrice: 500,
      rating: 4.9,
      reviews: 312,
      category: 'Fantasy',
      description: 'A fantasy novel about the adventures of hobbit Bilbo Baggins in Middle-earth.',
      image: '/api/placeholder/120/160',
      inStock: true,
      seller: 'Fantasy World',
      addedDate: '2024-01-05'
    }
  ];

  useEffect(() => {
    // Load from localStorage or use mock data
    const savedLikedBooks = JSON.parse(localStorage.getItem('likedBooks') || '[]');
    setLikedBooks(savedLikedBooks.length > 0 ? savedLikedBooks : mockLikedBooks);
  }, []);

  const removeFromLiked = (bookId) => {
    const updatedBooks = likedBooks.filter(book => book.id !== bookId);
    setLikedBooks(updatedBooks);
    localStorage.setItem('likedBooks', JSON.stringify(updatedBooks));
  };

  const moveToCart = (book) => {
    // Add to cart logic here
    alert(`Added "${book.title}" to cart!`);
  };

  const shareBook = (book) => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: book.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${book.title} by ${book.author} - ₹${book.price}`);
      alert('Book link copied to clipboard!');
    }
  };

  const filteredBooks = likedBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'available' && book.inStock) ||
                         (filter === 'outOfStock' && !book.inStock);
    return matchesSearch && matchesFilter;
  });

  const categories = [...new Set(likedBooks.map(book => book.category))];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-100 rounded-lg">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Liked Books</h1>
              <p className="text-gray-600 mt-1">Your personal collection of favorite books</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Heart size={16} className="text-pink-500" />
            <span>{likedBooks.length} books in your wishlist</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search your liked books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            >
              <option value="all">All Books</option>
              <option value="available">Available</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            onChange={(e) => setFilter(e.target.value === 'all' ? 'all' : e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Heart size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No liked books found</h3>
          <p className="text-gray-600 mb-4">Start adding books to your wishlist to see them here</p>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Browse Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              {/* Book Image and Actions */}
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl overflow-hidden">
                  {book.image ? (
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <BookOpen size={48} />
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => removeFromLiked(book.id)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                    title="Remove from liked"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                  <button
                    onClick={() => shareBook(book)}
                    className="p-2 bg-white rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                    title="Share book"
                  >
                    <Share2 size={16} className="text-blue-600" />
                  </button>
                </div>

                {/* Stock Status */}
                {!book.inStock && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Discount Badge */}
                {book.originalPrice > book.price && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                      {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* Book Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {book.rating} ({book.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-gray-800">₹{book.price}</span>
                  {book.originalPrice > book.price && (
                    <span className="text-sm text-gray-500 line-through">₹{book.originalPrice}</span>
                  )}
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="bg-gray-100 px-2 py-1 rounded">{book.category}</span>
                  <span>Seller: {book.seller}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => moveToCart(book)}
                    disabled={!book.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                      book.inStock
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {book.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>

                {/* Added Date */}
                <div className="text-xs text-gray-500 mt-3 text-center">
                  Added on {book.addedDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wishlist Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-pink-600 mb-2">{likedBooks.length}</div>
          <div className="text-sm text-gray-600">Total Liked</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {likedBooks.filter(book => book.inStock).length}
          </div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {categories.length}
          </div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            ₹{likedBooks.reduce((total, book) => total + book.price, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Value</div>
        </div>
      </div>
    </div>
  );
};

export default LikedBooks;