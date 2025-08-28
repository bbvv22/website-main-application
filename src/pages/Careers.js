
import React from 'react';
import { motion } from 'framer-motion';

const Careers = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-dwapor-museum pt-48 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="font-serif text-5xl md:text-6xl font-light text-dwapor-amber mb-10 tracking-tight text-center"
          variants={itemVariants}
        >
          Careers at Dwapor
        </motion.h1>
        <motion.div variants={itemVariants} className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></motion.div>

        <motion.p 
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8 text-center"
          variants={itemVariants}
        >
          At Dwapor, we are passionate about creating timeless and stylish Indian clothing, with a special focus on women’s wear and tops. Our mission is to blend tradition with modern design, and we are always looking for enthusiastic and creative individuals to join our growing team.
        </motion.p>

        <motion.h2 
          className="font-serif text-3xl text-dwapor-amber mb-6 mt-12 text-center"
          variants={itemVariants}
        >
          Why Work With Us
        </motion.h2>
        <motion.ul 
          className="list-disc list-inside font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-8 space-y-2 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <li>Opportunity to work with a young and creative fashion brand.</li>
          <li>Hands-on experience in design, stitching, and production.</li>
          <li>Exposure to the latest trends in Indian clothing and women’s fashion.</li>
          <li>A collaborative and supportive environment where your ideas matter.</li>
        </motion.ul>

        <motion.h2 
          className="font-serif text-3xl text-dwapor-amber mb-6 mt-12 text-center"
          variants={itemVariants}
        >
          Current Openings
        </motion.h2>
        
        <div className="space-y-8">
          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-2xl text-dwapor-parchment mb-2">1. Fashion Design Intern</h3>
            <ul className="list-disc list-inside font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4 pl-4 space-y-1">
              <li>Assist in developing new collections and design concepts.</li>
              <li>Research fashion trends and adapt them to our brand style.</li>
              <li>Support the design team with sketches, fabric selections, and sampling.</li>
            </ul>
            <p className="font-sans text-dwapor-soft-gray text-lg"><strong>Who can apply:</strong> Students, fresh graduates, or anyone with a passion for fashion design.</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-serif text-2xl text-dwapor-parchment mb-2">2. Stitching Intern / Trainee</h3>
            <ul className="list-disc list-inside font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-4 pl-4 space-y-1">
              <li>Work closely with our production team to create high-quality garments.</li>
              <li>Learn about various stitching techniques and garment finishing.</li>
              <li>Assist in sample making and tailoring for new designs.</li>
            </ul>
            <p className="font-sans text-dwapor-soft-gray text-lg"><strong>Who can apply:</strong> Skilled stitchers, tailoring students, or individuals passionate about garment making.</p>
          </motion.div>
        </div>

        <motion.h2 
          className="font-serif text-3xl text-dwapor-amber mb-6 mt-12 text-center"
          variants={itemVariants}
        >
          How to Apply
        </motion.h2>
        <motion.p 
          className="font-sans text-dwapor-soft-gray text-lg leading-relaxed text-center"
          variants={itemVariants}
        >
          If you are interested in joining us, we would love to hear from you.
          <br />
          📩 Email your resume/portfolio to: <a href="mailto:team.dwapor@gmail.com" className="text-dwapor-gold hover:underline">team.dwapor@gmail.com</a>
        </motion.p>

      </motion.div>
    </div>
  );
};

export default Careers;
