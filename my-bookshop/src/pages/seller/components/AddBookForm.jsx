import React, { useState } from "react";
import { Plus, Upload, BookOpen, User, DollarSign, Calendar } from "lucide-react";

function ImagePreview({ file }) {
  if (!file) return null;
  const url = typeof file === "string" ? file : URL.createObjectURL(file);
  return <img src={url} alt="preview" className="w-full h-full object-cover rounded" />;
}

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    writer: "",
    description: "",
    summary: "",
    category: "",
    price: "",
    publicationDate: "",
    writerBirthDate: "",
    writerDeathDate: "",
    isWriterAlive: true
  });

  const [writerImage, setWriterImage] = useState(null);
  const [bookImages, setBookImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const categories = [
    "Fiction", "Novel", "Science Fiction", "Fantasy", "Mystery",
    "Thriller", "Romance", "Young Adult", "Horror", "Biography",
    "Self Help", "Business", "History", "Science", "Technology"
  ];

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setBookImages(prev => prev.map((img, i) => i === index ? file : img));
    }
  };

  const handleWriterImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWriterImage(file);
    }
  };

  const calculateWriterAge = () => {
    if (!formData.writerBirthDate) return "";
    
    const birth = new Date(formData.writerBirthDate);
    const endDate = formData.isWriterAlive ? new Date() : new Date(formData.writerDeathDate);
    const age = endDate.getFullYear() - birth.getFullYear();
    
    return `${age} years ${formData.isWriterAlive ? '🎉' : ''}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Convert images to base64 (temporary solution)
      const toDataUrl = (file) => new Promise((res) => {
        if (!file) return res(null);
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(file);
      });

      const [uploadedWriterImage, ...uploadedBookImages] = await Promise.all([
        toDataUrl(writerImage),
        ...bookImages.map(toDataUrl)
      ]);

      const bookData = {
        ...formData,
        price: parseFloat(formData.price),
        writerImage: uploadedWriterImage,
        images: uploadedBookImages,
        writerAge: calculateWriterAge(),
        sellerId: JSON.parse(localStorage.getItem("user") || "{}").id,
        sellerName: JSON.parse(localStorage.getItem("user") || "{}").name,
        status: "available",
        createdAt: new Date().toISOString()
      };

      // Save to localStorage (temporary)
      const existingBooks = JSON.parse(localStorage.getItem("sellerBooks") || "[]");
      const newBook = {
        id: existingBooks.length ? Math.max(...existingBooks.map(b => b.id)) + 1 : 1,
        ...bookData
      };
      
      localStorage.setItem("sellerBooks", JSON.stringify([...existingBooks, newBook]));
      
      setMessage("Book added successfully! 📚");
      resetForm();
      
      setTimeout(() => setMessage(""), 3000);
      
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage("Error adding book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      writer: "",
      description: "",
      summary: "",
      category: "",
      price: "",
      publicationDate: "",
      writerBirthDate: "",
      writerDeathDate: "",
      isWriterAlive: true
    });
    setWriterImage(null);
    setBookImages([null, null, null, null]);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <Plus className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add New Book</h1>
            <p className="text-gray-600 mt-1">Add your book to start selling</p>
          </div>
        </div>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {/* Book Basic Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="text-green-600" />
            Book Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter book title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Writer Name *
              </label>
              <input
                type="text"
                value={formData.writer}
                onChange={(e) => setFormData({ ...formData, writer: e.target.value })}
                placeholder="Enter writer name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline" /> Price *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter price"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar size={16} className="inline" /> Publication Date
            </label>
            <input
              type="date"
              value={formData.publicationDate}
              onChange={(e) => setFormData({ ...formData, publicationDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the book..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Summary
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              placeholder="Brief summary of the book..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
        </div>

        {/* Writer Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <User className="text-blue-600" />
            Writer Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Writer Birth Date
              </label>
              <input
                type="date"
                value={formData.writerBirthDate}
                onChange={(e) => setFormData({ ...formData, writerBirthDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isWriterAlive"
                  checked={formData.isWriterAlive}
                  onChange={(e) => setFormData({ ...formData, isWriterAlive: e.target.checked })}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="isWriterAlive" className="text-sm font-medium text-gray-700">
                  Writer is still alive 🎉
                </label>
              </div>

              {!formData.isWriterAlive && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Writer Death Date
                  </label>
                  <input
                    type="date"
                    value={formData.writerDeathDate}
                    onChange={(e) => setFormData({ ...formData, writerDeathDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
              )}

              {formData.writerBirthDate && (
                <div className="text-sm text-green-600 font-medium">
                  Writer Age: {calculateWriterAge()}
                </div>
              )}
            </div>
          </div>

          {/* Writer Image */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Writer Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleWriterImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {writerImage && (
              <div className="mt-2 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border">
                <ImagePreview file={writerImage} />
              </div>
            )}
          </div>
        </div>

        {/* Book Images */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Upload className="text-orange-600" />
            Book Images (Upload 4 images) *
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bookImages.map((img, index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image {index + 1} {index === 0 && "(Main Image)"}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2"
                  required={index === 0}
                />
                <div className="w-full h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center">
                  {img ? (
                    <ImagePreview file={img} />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <Upload size={24} className="mx-auto mb-2" />
                      <span className="text-xs">Upload Image {index + 1}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-green-400 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Adding Book...
              </>
            ) : (
              <>
                <Plus size={20} />
                Add Book to Store
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;