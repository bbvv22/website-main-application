export const getProductFeatures = (productName) => {
  // In a real application, you would fetch this from a database
  // or have a more sophisticated way to get features per product.
  const genericFeatures = [
    "Handcrafted with precision",
    "Made from high-quality materials",
    "Unique and elegant design",
    "Comfortable to wear",
  ];

  // You can add specific features for certain products here
  // if (productName.toLowerCase().includes("earring")) {
  //   return [...genericFeatures, "Lightweight for all-day comfort"];
  // }

  return genericFeatures;
};

export const getProductCare = (productName) => {
  // Generic care instructions
  const genericCare = [
    "Store in a cool, dry place.",
    "Avoid contact with perfumes and chemicals.",
    "Clean with a soft, dry cloth.",
    "Handle with care to avoid damage.",
  ].join('\n');

  return genericCare;
};
