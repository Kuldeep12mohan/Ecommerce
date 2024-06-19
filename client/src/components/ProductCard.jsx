import React from 'react';

const ProductCard = ({ title, description, image, buttonText }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-400 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
