import React, { useState } from 'react';
import Rating from './Rating';

const Reviews = ({ product, onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [city, setCity] = useState('');

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
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="py-16 max-w-4xl mx-auto bg-dwapor-museum">
      <h2 className="text-4xl font-serif text-black text-center mb-16">Reviews</h2>
      <div className="flex items-center justify-center mb-8">
        <Rating rating={averageRating} />
        <span className="ml-2 text-stone-700">{averageRating}/5 ({product.reviews.length} reviews)</span>
      </div>

      <div className="space-y-12"> {/* Changed to single column layout with spacing */}
        {/* Customer Reviews Section */}
        <div className="space-y-12">
          {sortedReviews.length === 0 ? (
            <p className="text-gray-600 text-center">No reviews yet.</p>
          ) : (
            <ul className="space-y-12">
              {sortedReviews.map((review, index) => (
                <li key={index} className="flex flex-col items-center text-center">
                  <p className="font-serif italic text-xl text-gray-800 leading-relaxed mb-8">
                    "{review.comment}"
                  </p>
                  <span className="font-sans uppercase font-bold text-base text-black block">
                    {review.name || 'VERIFIED BUYER'}
                  </span>
                  <p className="font-sans text-sm text-gray-600 mt-2">
                    {review.profession}, {review.city}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Write a Review Section */}
        <div>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg"> {/* Card layout */}
            <h3 className="text-2xl font-bold text-stone-900 mb-6">Write a Review</h3> {/* Adjusted typography */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-stone-700 mb-2">Rating</label> {/* Adjusted typography */}
              <Rating rating={rating} onRating={setRating} /> {/* Star rating interactivity assumed in Rating.js */}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Name</label> {/* Adjusted typography */}
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent" // Input styling
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="profession" className="block text-sm font-medium text-stone-700 mb-2">Profession</label> {/* Adjusted typography */}
              <input
                type="text"
                id="profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent" // Input styling
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-stone-700 mb-2">City</label> {/* Adjusted typography */}
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent" // Input styling
              />
            </div>
            <div className="mb-6"> {/* Increased margin-bottom */}
              <label htmlFor="comment" className="block text-sm font-medium text-stone-700 mb-2">Review</label> {/* Adjusted typography */}
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-500 focus:border-transparent" // Input styling
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full px-8 py-3 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"> {/* Submit button styling */}
              Submit Review
            </button>
            <p className="text-sm text-gray-500 mt-4 text-center">Reviews are verified before publishing.</p> {/* Trust message */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
