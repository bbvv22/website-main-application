import React, { useState } from 'react';
import Rating from './Rating';

const Reviews = ({ product, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [city, setCity] = useState('');
  const [sortBy, setSortBy] = useState('Newest');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview({ rating, comment, name, profession, city });
    setRating(0);
    setComment('');
    setName('');
    setProfession('');
    setCity('');
  };

  const averageRating = product.reviews.length > 0
    ? (product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length).toFixed(1)
    : 0;

  const sortedReviews = [...product.reviews].sort((a, b) => {
    switch (sortBy) {
      case 'Highest rating':
        return b.rating - a.rating;
      case 'Lowest rating':
        return a.rating - b.rating;
      case 'Newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="mt-12">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="flex items-center ml-4">
          <Rating rating={averageRating} />
          <span className="ml-2">{averageRating}/5 ({product.reviews.length} reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Customer Reviews</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded p-2"
            >
              <option>Newest</option>
              <option>Highest rating</option>
              <option>Lowest rating</option>
            </select>
          </div>
          {/* Sorting options will be added here */}
          {sortedReviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {product.reviews.map((review, index) => (
                <li key={index} className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <Rating rating={review.rating} />
                    <span className="ml-2 font-bold">{review.name || 'Verified Buyer'}</span>
                  </div>
                  <p className="text-sm text-gray-500">{review.profession}, {review.city}</p>
                  <p className="mt-2">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <Rating rating={rating} onRating={setRating} />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profession</label>
              <input
                type="text"
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Review</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border rounded p-2"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-dwapor-amber text-dwapor-museum py-3 px-4 font-sans text-sm uppercase tracking-widest hover:bg-dwapor-gold transition-colors duration-300">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;