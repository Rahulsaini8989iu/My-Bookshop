import React, { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Search, Filter, BookOpen } from "lucide-react";

const SellerBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = () => {
    const savedBooks = JSON.parse(localStorage.getItem("sellerBooks") || "[]");
    setBooks(savedBooks);
    setLoading(false);
  };

  const deleteBook = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      const updatedBooks = books.filter(book => book.id !== bookId);
      setBooks(updatedBooks);
      localStorage.setItem("sellerBooks", JSON.stringify(updatedBooks));
    }
  };

  const categories = ["all", "Fiction", "Novel", "Science Fiction", "Fantasy", "Mystery", "Thriller", "Romance"];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.writer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Books</h1>
            <p className="text-gray-600 mt-1">Manage your book inventory</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-2xl font-bold text-gray-800">{books.length}</div>
          <div className="text-gray-600 text-sm">Total Books</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-2xl font-bold text-green-600">
            {books.filter(b => b.status === "available").length}
          </div>
          <div className="text-gray-600 text-sm">Available</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-2xl font-bold text-orange-600">
            {books.filter(b => b.status === "sold").length}
          </div>
          <div className="text-gray-600 text-sm">Sold</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="text-2xl font-bold text-blue-600">
            {books.reduce((total, book) => total + (book.price || 0), 0).toFixed(2)}
          </div>
          <div className="text-gray-600 text-sm">Total Value</div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search books by title or writer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <Filter className="h-5 w-5 text-gray-400 mt-3" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No books found</h3>
          <p className="text-gray-500">Add your first book to start selling</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Book Image */}
              <div className="h-48 bg-gray-200 relative">
                {book.images && book.images[0] ? (
                  <img 
                    src={book.images[0]} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  book.status === "available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {book.status || "available"}
                </div>
              </div>

              {/* Book Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1 truncate">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {book.writer}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-green-600">${book.price}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {book.category}
                  </span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                  {book.description || "No description available"}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button 
                    onClick={() => deleteBook(book.id)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerBooks;