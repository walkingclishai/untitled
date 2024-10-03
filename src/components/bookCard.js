import { useParams } from "react-router-dom";

function BookCard({ image, title, author }) {
  const { name } = useParams();

  return (
    <div id="book-container">
      <img src={image} width="120px" height="auto" />
      <div id="book-content">
        <h3>{title}</h3>
        <p>By {author}</p>
      </div>
    </div>
  );
}

export default BookCard;
