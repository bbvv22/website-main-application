import React from 'react';
import { motion } from 'framer-motion';

const SizeGuide = () => {
  const cmSizes = [
    { size: 'S', bust: 86.4, waist: 76.2, hip: 102 },
    { size: 'M', bust: 91.4, waist: 81.3, hip: 107 },
    { size: 'L', bust: 96.5, waist: 86.4, hip: 112 },
  ];

  const inchSizes = [
    { size: 'S', bust: 34, waist: 30, hip: 40 },
    { size: 'M', bust: 36, waist: 32, hip: 42 },
    { size: 'L', bust: 38, waist: 34, hip: 44 },
  ];

  return (
    <div className="min-h-screen bg-dwapor-museum pt-48 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-light text-dwapor-amber mb-10 tracking-tight">
            Size Guide
          </h1>
          <div className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></div>
          <p className="font-sans text-dwapor-soft-gray text-lg leading-relaxed max-w-3xl mx-auto">
            Find your perfect fit with our detailed size guide. All measurements are in inches and centimeters.
          </p>
        </motion.div>

        <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
          <h2 className="font-serif text-3xl text-dwapor-amber mb-6">Measurements in Centimeters (CM)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bust</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hip</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cmSizes.map((row) => (
                  <tr key={row.size}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.bust}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.waist}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="font-serif text-3xl text-dwapor-amber mb-6">Measurements in Inches</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bust</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waist</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hip</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inchSizes.map((row) => (
                  <tr key={row.size}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.bust}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.waist}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
