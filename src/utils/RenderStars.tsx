import "./RenderStars.css";

const renderStars = (rating: number) => {
  const rounded = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(rounded);
  const hasHalfStar = rounded % 1 === 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={`full-${i}`} className="star full">
          ★
        </span>
      ))}
      {hasHalfStar && (
        <span key="half" className="star half">
          <span className="left">★</span>
          <span className="right">★</span>
        </span>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>
      ))}
      <span className="rating-number">({rating.toFixed(1)})</span>
    </div>
  );
};

export default renderStars;
