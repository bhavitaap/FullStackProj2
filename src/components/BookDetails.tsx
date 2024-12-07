import { useLocation, Link } from 'react-router-dom';

export default function BookDetails() {
  const location = useLocation();
  const { book } = location.state;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://via.placeholder.com/300x400.png?text=No+Cover';

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>← Back to Home</Link>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <img src={coverUrl} alt={book.title} style={{ width: '300px', height: '400px', objectFit: 'cover' }} />
        <h1>{book.title}</h1>
        <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
        <p>First Published: {book.first_publish_year || 'Unknown'}</p>
        <p>Key: {book.key}</p>
      </div>
    </div>
  );
}
