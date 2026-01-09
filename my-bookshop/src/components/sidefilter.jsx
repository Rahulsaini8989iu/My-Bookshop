import React, { useState, useEffect } from "react";
import { Filter, X, BookOpen, Star, Users, Search, User } from "lucide-react";

export default function SideFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  selectedWriter,
  onSelectWriter, 
  mobileOpen, 
  onClose,
  books = []
}) {
  const defaultCats = [
    "Fiction", "Novel", "Science Fiction", "Fantasy", "Mystery",
    "Thriller", "Romance", "Young Adult", "Horror", "Biography",
    "Self Help", "Business", "History", "Science", "Technology",
    "Philosophy", "Travel", "Cookbooks", "Art", "Comics"
  ];
  
  const cats = categories || defaultCats;
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("categories"); // "categories" or "writers"
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get all unique writers from books
  const getAllWriters = () => {
    const writersMap = {};
    books.forEach(book => {
      if (book.writer) {
        if (!writersMap[book.writer]) {
          writersMap[book.writer] = 0;
        }
        writersMap[book.writer]++;
      }
    });
    
    // Convert to array and sort by book count
    return Object.entries(writersMap)
      .map(([name, count]) => ({ name, books: count }))
      .sort((a, b) => b.books - a.books);
  };

  const writers = getAllWriters();

  const getCategoryCount = (category) => {
    return books.filter(book => book.category === category).length;
  };

  const getWriterCount = (writerName) => {
    return books.filter(book => book.writer === writerName).length;
  };

  const filteredCats = cats.filter(cat => 
    cat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredWriters = writers.filter(writer =>
    writer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleCats = showAll ? filteredCats : filteredCats.slice(0, 8);
  const visibleWriters = showAll ? filteredWriters : filteredWriters.slice(0, 8);

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
    onSelectWriter(""); // Clear writer selection
  };

  const handleWriterSelect = (writer) => {
    onSelectWriter(writer);
    onSelectCategory(""); // Clear category selection
    // Yahan aap writer detail page pe redirect kar sakte hain
    // navigate(`/writer/${writer}`);
  };

  const handleClearFilters = () => {
    onSelectCategory("");
    onSelectWriter("");
    setSearchTerm("");
  };

  // Mobile Filter Button
  if (!mobileOpen && isMobile) {
    return (
      <div className="lg:hidden">
        {/* Mobile Filter Trigger Button */}
        <button
          onClick={onClose}
          className="fixed bottom-6 right-6 z-40 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors lg:hidden"
        >
          <Filter size={24} />
        </button>

        {/* Active Filters Display */}
        {(selectedCategory || selectedWriter) && (
          <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-2 lg:hidden">
            {selectedCategory && (
              <div className="bg-white border border-purple-200 text-purple-700 px-3 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2">
                📚 {selectedCategory}
                <button 
                  onClick={() => onSelectCategory("")}
                  className="text-purple-500 hover:text-purple-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {selectedWriter && (
              <div className="bg-white border border-blue-200 text-blue-700 px-3 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2">
                ✍️ {selectedWriter}
                <button 
                  onClick={() => onSelectWriter("")}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 bg-white rounded-lg shadow-sm border border-gray-100 h-fit sticky top-24">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <div className="text-xl font-bold text-gray-800">BOOKLIBRARY</div>
          </div>
          <p className="text-sm text-gray-600">Discover your next favorite book</p>
        </div>

        {/* Active Filters */}
        {(selectedCategory || selectedWriter) && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Active Filters:</span>
              <button 
                onClick={handleClearFilters}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                  📚 {selectedCategory}
                  <button onClick={() => onSelectCategory("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedWriter && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  ✍️ {selectedWriter}
                  <button onClick={() => onSelectWriter("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("categories")}
              className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${
                activeTab === "categories" 
                  ? "border-purple-600 text-purple-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              📚 Categories
            </button>
            <button
              onClick={() => setActiveTab("writers")}
              className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${
                activeTab === "writers" 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              ✍️ Writers
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        {/* Categories Tab Content */}
        {activeTab === "categories" && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Categories</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {filteredCats.length}
              </span>
            </div>

            <div className="space-y-1 max-h-96 overflow-y-auto">
              {/* All Categories Option */}
              <button
                onClick={() => handleCategorySelect("")}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                  selectedCategory === "" && !selectedWriter
                    ? "bg-purple-50 border border-purple-200 text-purple-700" 
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <span className="font-medium">All Categories</span>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  {books.length}
                </span>
              </button>

              {/* Category List */}
              {visibleCats.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                    selectedCategory === category
                      ? "bg-purple-50 border border-purple-200 text-purple-700" 
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <span className="text-sm">{category}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedCategory === category 
                      ? "bg-purple-100 text-purple-700" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {getCategoryCount(category)}
                  </span>
                </button>
              ))}
            </div>

            {filteredCats.length > 8 && (
              <button 
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium py-2 hover:bg-purple-50 rounded-lg transition-colors"
              >
                {showAll ? "Show Less" : `Show All (${filteredCats.length})`}
              </button>
            )}
          </div>
        )}

        {/* Writers Tab Content */}
        {activeTab === "writers" && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Popular Writers</h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {filteredWriters.length}
              </span>
            </div>

            <div className="space-y-1 max-h-96 overflow-y-auto">
              {/* All Writers Option */}
              <button
                onClick={() => handleWriterSelect("")}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                  selectedWriter === "" && !selectedCategory
                    ? "bg-blue-50 border border-blue-200 text-blue-700" 
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <span className="font-medium">All Writers</span>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  {books.length}
                </span>
              </button>

              {/* Writers List */}
              {visibleWriters.map((writer) => (
                <button
                  key={writer.name}
                  onClick={() => handleWriterSelect(writer.name)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                    selectedWriter === writer.name
                      ? "bg-blue-50 border border-blue-200 text-blue-700" 
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {writer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm">{writer.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedWriter === writer.name 
                      ? "bg-blue-100 text-blue-700" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {writer.books}
                  </span>
                </button>
              ))}
            </div>

            {filteredWriters.length > 8 && (
              <button 
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium py-2 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {showAll ? "Show Less" : `Show All (${filteredWriters.length})`}
              </button>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-gray-800">{books.length}</div>
              <div className="text-xs text-gray-600">Books</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{new Set(books.map(b => b.category)).size}</div>
              <div className="text-xs text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{writers.length}</div>
              <div className="text-xs text-gray-600">Writers</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Filter Modal */}
      {mobileOpen && (
        <MobileFilterModal
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          selectedWriter={selectedWriter}
          handleCategorySelect={handleCategorySelect}
          handleWriterSelect={handleWriterSelect}
          handleClearFilters={handleClearFilters}
          filteredCats={filteredCats}
          filteredWriters={filteredWriters}
          visibleCats={visibleCats}
          visibleWriters={visibleWriters}
          getCategoryCount={getCategoryCount}
          getWriterCount={getWriterCount}
          showAll={showAll}
          setShowAll={setShowAll}
          books={books}
          writers={writers}
          onClose={onClose}
        />
      )}
    </>
  );
}

// Mobile Filter Modal Component
function MobileFilterModal({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  selectedWriter,
  handleCategorySelect,
  handleWriterSelect,
  handleClearFilters,
  filteredCats,
  filteredWriters,
  visibleCats,
  visibleWriters,
  getCategoryCount,
  getWriterCount,
  showAll,
  setShowAll,
  books,
  writers,
  onClose
}) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Active Filters */}
        {(selectedCategory || selectedWriter) && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Active Filters:</span>
              <button onClick={handleClearFilters} className="text-xs text-red-600 font-medium">
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                  {selectedCategory}
                  <button onClick={() => handleCategorySelect("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedWriter && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                  {selectedWriter}
                  <button onClick={() => handleWriterSelect("")}>
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("categories")}
              className={`flex-1 py-3 text-sm font-medium text-center border-b-2 ${
                activeTab === "categories" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500"
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab("writers")}
              className={`flex-1 py-3 text-sm font-medium text-center border-b-2 ${
                activeTab === "writers" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
              }`}
            >
              Writers
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-200px)] overflow-y-auto">
          {activeTab === "categories" ? (
            <div className="p-4">
              <div className="space-y-1">
                <button
                  onClick={() => { handleCategorySelect(""); onClose(); }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                    selectedCategory === "" && !selectedWriter
                      ? "bg-purple-50 text-purple-700 font-medium" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{books.length}</span>
                </button>

                {visibleCats.map((category) => (
                  <button
                    key={category}
                    onClick={() => { handleCategorySelect(category); onClose(); }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                      selectedCategory === category
                        ? "bg-purple-50 text-purple-700 font-medium" 
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm">{category}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {getCategoryCount(category)}
                    </span>
                  </button>
                ))}
              </div>

              {filteredCats.length > 8 && (
                <button 
                  onClick={() => setShowAll(!showAll)}
                  className="w-full mt-3 text-sm text-purple-600 font-medium py-2"
                >
                  {showAll ? "Show Less" : `Show All (${filteredCats.length})`}
                </button>
              )}
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-1">
                <button
                  onClick={() => { handleWriterSelect(""); onClose(); }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                    selectedWriter === "" && !selectedCategory
                      ? "bg-blue-50 text-blue-700 font-medium" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span>All Writers</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{books.length}</span>
                </button>

                {visibleWriters.map((writer) => (
                  <button
                    key={writer.name}
                    onClick={() => { handleWriterSelect(writer.name); onClose(); }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                      selectedWriter === writer.name
                        ? "bg-blue-50 text-blue-700 font-medium" 
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
                        {writer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm">{writer.name}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {writer.books}
                    </span>
                  </button>
                ))}
              </div>

              {filteredWriters.length > 8 && (
                <button 
                  onClick={() => setShowAll(!showAll)}
                  className="w-full mt-3 text-sm text-blue-600 font-medium py-2"
                >
                  {showAll ? "Show Less" : `Show All (${filteredWriters.length})`}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}