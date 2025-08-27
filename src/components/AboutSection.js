import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="py-30 bg-dwapor-museum">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Brand Story Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-32"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest mb-8">
              Our Story
            </div>
            <h2 className="font-serif text-display text-dwapor-amber font-light mb-12">
              Heritage Redefined
            </h2>
            <p className="font-sans text-dwapor-soft-gray text-lg leading-relaxed max-w-4xl mx-auto">
              DWAPOR exists to democratize luxury—bringing museum-quality craftsmanship to the everyday wardrobes of women who refuse to compromise between tradition and trend. We believe that exceptional fabrics, intricate embellishments, and timeless silhouettes shouldn't be reserved for special occasions alone, but should grace the lives of women who appreciate artistry in all its forms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl text-dwapor-amber mb-6">Our Mission</h3>
                <p className="font-sans text-dwapor-soft-gray leading-relaxed mb-6">
                  We design for the contemporary woman who values authenticity, appreciates craftsmanship, and seeks pieces that seamlessly transition from boardroom to brunch, from casual Fridays to festive celebrations. She's educated, confident, and willing to invest in pieces that tell a story.
                </p>
                <p className="font-sans text-dwapor-soft-gray leading-relaxed">
                  Our clientele appreciates the narrative behind each piece: the heritage of block printing, the poetry of hand embroidery, and the luxury of premium fabrics. They're digital natives who value Instagram-worthy aesthetics but prioritize substance over surface.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-dwapor-amber mb-6">Our Craft</h3>
                <p className="font-sans text-dwapor-soft-gray leading-relaxed">
                  Every piece represents our commitment to honor traditional Indian craftsmanship while creating silhouettes that speak to contemporary sensibilities. From selecting ethical suppliers to working directly with artisan communities, we ensure that each purchase supports cultural preservation and empowers skilled craftspeople.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src="/handcrafted-excellence.jpg"
                  alt="Heritage Craftsmanship"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dwapor-museum/40 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className="text-dwapor-amber font-serif text-lg mb-2">Handcrafted Excellence</div>
                  <div className="text-dwapor-parchment font-sans text-sm">Each piece tells a story of artisanal mastery</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Meet the Founder Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-dwapor-gold/20 pt-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest mb-8">
              Meet the Founder
            </div>
            <h2 className="font-serif text-display text-dwapor-amber font-light">
              Where Passion Meets Purpose
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 items-center justify-items-center">
            

            <motion.div variants={itemVariants} className="space-y-8 flex flex-col items-center w-full">
              <div className="max-w-prose mx-auto text-center">
                <h3 className="font-serif text-xl text-dwapor-amber mb-4">Keerthi Rao</h3>
                <p className="font-sans text-dwapor-soft-gray text-sm uppercase tracking-widest mb-6">FOUNDER & CREATIVE DIRECTOR</p>
                <p className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-6">
                  Keerthi embodies the spirit of fearless femininity—a 24-year-old visionary who traded the courtroom for the cutting room, choosing passion over predictability. With a law degree in hand but fashion in her heart, she embarked on an extraordinary journey to revolutionize how women experience ethnic wear.
                </p>
                <p className="font-sans text-dwapor-soft-gray text-lg leading-relaxed mb-6">
                  Born from the belief that every woman deserves to feel extraordinary in what she wears, Keerthi's story began during her law school days when she found herself constantly searching for ethnic pieces that married traditional craftsmanship with contemporary sensibilities. What started as personal frustration transformed into purposeful action.
                </p>
              </div>

              <div className="border-l-2 border-dwapor-gold mx-auto max-w-prose text-center">
                <blockquote className="font-serif text-xl text-dwapor-amber italic leading-relaxed mb-4">
                  "I realized that law taught me to advocate for others, but fashion allows me to empower them."
                </blockquote>
                <cite className="font-sans text-dwapor-soft-gray text-sm block">— Keerthi Rao</cite>
              </div>

              <div className="max-w-prose mx-auto text-center">
                <h3 className="font-serif text-xl text-dwapor-amber mb-4">A Foundation Built on Excellence</h3>
                <p className="font-sans text-dwapor-soft-gray leading-relaxed">
                  Her legal training instilled in her an unwavering attention to detail, analytical thinking, and a deep respect for authenticity—qualities that now define every piece in our collection. While her peers were drafting contracts, Keerthi was drafting dreams, envisioning a brand that would celebrate the intricate beauty of Indian textiles while serving the discerning tastes of today’s confident women.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center mt-20">
            <div className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></div>
            <p className="font-sans text-dwapor-soft-gray text-sm tracking-wider max-w-2xl mx-auto">
              We're not just creating clothes; we're curating experiences—transforming everyday moments into celebrations of feminine grace and cultural pride. Because when a woman feels beautiful in what she wears, she carries herself differently, and that confidence becomes her greatest accessory.
            </p>
          </motion.div>
        </motion.div>

        {/* Local Sourcing & Women Empowerment Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-dwapor-gold/20 pt-20 mt-20"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <div className="text-dwapor-gold font-sans text-xs uppercase tracking-widest mb-8">
              Our Community Impact
            </div>
            <h2 className="font-serif text-display text-dwapor-amber font-light">
              Empowering Through Fashion
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Local Farmers */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="relative mb-8">
                <img
                  src="https://images.pexels.com/photos/6851273/pexels-photo-6851273.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Local Farmers Partnership"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4 bg-dwapor-museum/90 backdrop-blur-sm px-3 py-2 rounded">
                  <div className="text-dwapor-amber font-serif text-sm">Farm to Fashion</div>
                </div>
              </div>
              <h3 className="font-serif text-xl text-dwapor-amber mb-4">
                Local Farmers Partnership
              </h3>
              <p className="font-sans text-dwapor-soft-gray leading-relaxed text-sm">
                We source our premium cotton and silk directly from local farmers across India, ensuring fair trade practices and supporting sustainable agriculture. Our partnerships with farming communities guarantee quality raw materials while providing them with steady income and recognition for their invaluable contribution to our craft.
              </p>
            </motion.div>

            {/* Women Tailors */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="relative mb-8">
                <img
                  src="https://images.unsplash.com/photo-1632090947779-9af3a457e6e1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwYXJ0aXNhbiUyMHdvbWVufGVufDB8fHx8MTc1NDI4OTk3N3ww&ixlib=rb-4.1.0&q=85&w=600"
                  alt="Indian Women Artisans"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4 bg-dwapor-museum/90 backdrop-blur-sm px-3 py-2 rounded">
                  <div className="text-dwapor-amber font-serif text-sm">Skilled Artisans</div>
                </div>
              </div>
              <h3 className="font-serif text-xl text-dwapor-amber mb-4">
                Women Artisan Network
              </h3>
              <p className="font-sans text-dwapor-soft-gray leading-relaxed text-sm">
                Over 80% of our garments are crafted by skilled women tailors and artisans from across India. We provide them with fair wages, flexible working conditions, and opportunities for skill development. Each purchase directly supports these talented women and their families, creating a ripple effect of economic empowerment in their communities.
              </p>
            </motion.div>

            {/* Local Community */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="relative mb-8">
                <img
                  src="https://images.unsplash.com/photo-1622632405663-f43782a098b5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBjb21tdW5pdHklMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NTQyODk5ODR8MA&ixlib=rb-4.1.0&q=85&w=600"
                  alt="Community Empowerment"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4 bg-dwapor-museum/90 backdrop-blur-sm px-3 py-2 rounded">
                  <div className="text-dwapor-amber font-serif text-sm">Community Growth</div>
                </div>
              </div>
              <h3 className="font-serif text-xl text-dwapor-amber mb-4">
                Community Development
              </h3>
              <p className="font-sans text-dwapor-soft-gray leading-relaxed text-sm">
                Through our local partnerships, we've established skill development programs, provided sewing machines to women entrepreneurs, and created employment opportunities in rural areas. Our commitment extends beyond fashion to education support for artisan children and healthcare initiatives for our partner communities.
              </p>
            </motion.div>
          </div>

          {/* Impact Statistics */}
          <motion.div variants={itemVariants} className="mt-20 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="font-serif text-3xl text-dwapor-amber mb-2">150+</div>
                <div className="font-sans text-dwapor-soft-gray text-sm uppercase tracking-wider">Women Artisans</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-dwapor-amber mb-2">25+</div>
                <div className="font-sans text-dwapor-soft-gray text-sm uppercase tracking-wider">Farming Partners</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-dwapor-amber mb-2">12</div>
                <div className="font-sans text-dwapor-soft-gray text-sm uppercase tracking-wider">States</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-dwapor-amber mb-2">500+</div>
                <div className="font-sans text-dwapor-soft-gray text-sm uppercase tracking-wider">Families Supported</div>
              </div>
            </div>
            
            <div className="w-24 h-px bg-dwapor-gold mx-auto mb-8"></div>
            <p className="font-sans text-dwapor-soft-gray text-sm tracking-wider max-w-3xl mx-auto">
              Every DWAPOR piece carries the dreams and aspirations of the incredible people who bring it to life. When you choose our clothing, you're not just making a fashion statement—you're supporting a movement that celebrates traditional craftsmanship while empowering communities across India.
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;