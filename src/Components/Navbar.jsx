import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

export default function Navbar() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/menu");
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            default: { type: "spring" },
            opacity: { ease: "easeInOut", duration: 1 }
          }
        }}
        className='h-screen flex items-center justify-center w-screen bg-white'
      >
        <header className='shadow-xl rounded-2xl p-6'>
          <motion.button 
            onClick={handleButtonClick}
            animate={{
              x: 0,
              transition: {
                ease: "easeOut",
                duration: 0.5,
              }
            }}
          >
            <h1 className='text-6xl font-bold text-indigo-500 text-center'>
              Go QLess
            </h1>
            <p className='text-zinc-500 text-3xl font-semibold mt-2 text-center'>
              Where waiting becomes NULL
            </p>
          </motion.button>
        </header>
      </motion.section>

      {/* Card Section */}
      <div className='bg-amber-200 py-16 space-y-12 px-4 md:px-20'>
        {/* Card 1 - Left */}
        <motion.div 
          className='flex justify-start'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className='w-full md:w-1/2 lg:w-1/3 h-[33vh] bg-white shadow-lg rounded-lg p-6'>
            <h1 className='text-black text-2xl font-bold'>About Us :</h1>
            <article>
              <p className='text-xl font-light'>
                In QLess we believe that nobody deserves to wait in queues
                for significant things like hair salons or important matters
                like clinics or banks. So we came up with this website.
              </p>
            </article>
          </div>
        </motion.div>

        {/* Card 2 - Right */}
        <motion.div 
          className='flex justify-end'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className='w-full md:w-1/2 lg:w-1/3 h-[33vh] bg-white shadow-lg rounded-lg p-6'>
            <h1 className='text-black text-2xl font-bold'>Our Vision :</h1>
            <article>
              <p className='text-xl font-light'>
                QLess aims to modernize how people schedule their time and
                appointments efficiently, removing the hassle of queues.
              </p>
            </article>
          </div>
        </motion.div>

        {/* Card 3 - Left */}
        <motion.div 
          className='flex justify-start'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className='w-full md:w-1/2 lg:w-1/3 h-[33vh] bg-white shadow-lg rounded-lg p-6'>
            <h1 className='text-black text-2xl font-bold'>Why Us?</h1>
            <article>
              <p className='text-xl font-light'>
                We’re providing a smarter and faster way to handle services,
                giving users freedom and control over their time.
              </p>
            </article>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
