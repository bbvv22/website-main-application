import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import HeroSection from './HeroSection';
import TaglineSection from './TaglineSection';


import CollectionSection from './CollectionSection';
import FounderIntro from './FounderIntro';
import TestimonialSection from './TestimonialSection';
import NewsletterSection from './NewsletterSection';
import Footer from './Footer';

const DwaporLanding = () => {
  return (
    <div className="min-h-screen bg-dwapor-museum text-dwapor-amber overflow-x-hidden">
      <Header />
      <TaglineSection />
      <div id="product-carousel-section">
        <HeroSection />
      </div>
      
      
      <CollectionSection />
      <FounderIntro />
      <TestimonialSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default DwaporLanding;