import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

const SavedBooks = ({ savedBooks }) => {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Saved Books</h2>
        {savedBooks.length === 0 ? (
          <p>No saved books yet.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {savedBooks.map((book) => (
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
                <h3 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>
                  {book.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#555' }}>
                  Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default SavedBooks;
  