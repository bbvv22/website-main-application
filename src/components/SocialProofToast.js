import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';

const names = ['Aarav', 'Vihaan', 'Ishita', 'Ananya', 'Kabir', 'Meera', 'Riya', 'Arjun', 'Aisha', 'Dhruv'];
const cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad'];

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const SocialProofToast = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const featuredNames = useMemo(() => products.map((p) => p.name), []);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    const showToast = () => {
      const who = pickRandom(names);
      const where = pickRandom(cities);
      const what = pickRandom(featuredNames);
      setMessage(`${who} in ${where} just purchased ${what}`);
      setVisible(true);
      timeoutId = setTimeout(() => setVisible(false), 4500);
    };

    // initial delay 10s, then every 30-45s
    const start = setTimeout(() => {
      showToast();
      intervalId = setInterval(() => {
        showToast();
      }, 30000 + Math.floor(Math.random() * 15000));
    }, 10000);

    return () => {
      clearTimeout(start);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [featuredNames]);

  return (
    <div className="fixed bottom-6 left-6 z-[60] pointer-events-none">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-auto bg-white/95 text-dwapor-museum shadow-xl rounded-lg px-4 py-3 border border-dwapor-soft-gray/20 min-w-[260px]"
          >
            <div className="flex items-start space-x-3">
              <div className="mt-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-sans text-dwapor-museum">{message}</p>
                <p className="text-xs text-dwapor-soft-gray mt-1">moments ago</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProofToast;

