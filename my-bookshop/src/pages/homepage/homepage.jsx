import { useState } from "react";
import SideFilter from "../../components/sidefilter";
import BookCard from "../../components/BookCard";
import Navbar from "../../components/Navbar";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedWriter, setSelectedWriter] = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [books, setBooks] = useState([]);

  const filteredBooks = books.filter((book) => {
    if (selectedCategory && book.category !== selectedCategory) return false;
    if (selectedWriter && book.writer !== selectedWriter) return false;
    return true;
  });

  return (
    <div>
      <Navbar/>
      <SideFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedWriter={selectedWriter}
        onSelectWriter={setSelectedWriter}
        mobileOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(!mobileFilterOpen)}
        books={books}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;