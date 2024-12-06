import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBooks([]);

    try {
      const response = await axios.get('https://openlibrary.org/search.json', {
        params: { q: searchQuery },
      });
      setBooks(response.data.docs);
    } catch (err) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };


  const handleSaveBook = (book) => {
    setSavedBooks((prevSavedBooks) => {
      // Avoid saving duplicate books
      if (prevSavedBooks.some((saved) => saved.key === book.key)) {
        return prevSavedBooks;
      }
      return [...prevSavedBooks, book];
    });
  };

  const handleDeleteBook = (bookKey) => {
    setSavedBooks((prevSavedBooks) =>
      prevSavedBooks.filter((book) => book.key !== bookKey)
    );
  };


  return (
    <div style={{paddingLeft: '20px'}}>
      <h1 style={{borderRadius: '10px', fontSize: "1.5rem", textAlign: 'center', paddingTop: '20px', fontFamily: 'Arial, sans-serif'}}>Book Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a book"
          style={{color: "rgba(0, 0, 0, 0.5)", padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{backgroundColor: "rgba(0, 255, 0, 0.5)", padding: '10px', marginLeft: '10px' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '30px',  }}>
        <h2>Saved Books</h2>
        <div style={{display: 'flex',
              flexWrap: 'wrap', gap: '20px', paddingTop: '10px'}}>
          {savedBooks.length === 0 && <p>No saved books yet.</p>}
          {savedBooks.map((book) => (
            <div
              key={book.key}
              style={{
                
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                width: '200px',
                marginBottom: '10px',
                textAlign: 'center',
                
              }}
            >
              <h3 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>
                {book.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#555' }}>
                Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}
              </p>
            
            <button
            onClick={() => handleDeleteBook(book.key)}
            style={{
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              cursor: 'pointer',
              marginTop: '10px',
            }}>
              Delete
            </button>
            </div>   
        ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {books.map((book) => {
          const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : 'https://via.placeholder.com/128x192.png?text=No+Cover';

          return (
            <div
              key={book.key}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                width: '200px',
                textAlign: 'center',
              }}
            >
              <button>
                <img
                  src={coverUrl}
                  alt={book.title}
                  style={{ width: '128px', height: '192px', objectFit: 'cover', marginBottom: '10px' }}
                />
              </button>
              <h3 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>{book.title}</h3>
              <p style={{ fontSize: '14px', color: '#555' }}>
                Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}
              </p>
              <p style={{ fontSize: '14px', color: '#555' }}>
                First Published: {book.first_publish_year || 'Unknown'}
              </p>
              <button
                onClick={() => handleSaveBook(book)}
                style={{
                  backgroundColor: 'rgba(0, 0, 255, 0.5)',
                  padding: '5px 10px',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>

      

    </div>
  );
}
