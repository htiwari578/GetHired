import React from 'react'
import { motion } from 'framer-motion';

const Footer = () => {
    return (
      <footer className="border-t border-t-gray-200 py-8 bg-gradient-to-r from-[#e2cfef] via-[#d4bed4] to-[#f1ebed]">



          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">

              <h2  className="text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800">Get</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b0764] via-[#9b63cd] to-[#6b21a8] text-shadow-glow">Hired</span>
              </h2>

              <p className="italic font-bold text-sm text-center bg-gradient-to-r from-[#151516] via-[#821273] to-[#1f2323] bg-clip-text text-transparent">
                © 2024 Your Company. All rights reserved.
              </p>
               
               
                </div>
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mt-6">
                  <p className="text-sm text-white">Have questions? <a href="mailto:your@email.com" className="text-[#3b0764] hover:text-gray-200">Contact Us</a></p>
                </div>

              
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="https://facebook.com" className="hover:text-gray-400  text-[#3b0764]" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" /></svg>
                </a>
                <a href="https://twitter.com" className= "hover:text-gray-400 text-[#3b0764]" aria-label="Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" /></svg>
                </a>
                <a href="https://linkedin.com" className="hover:text-gray-400  text-[#3b0764]" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
                </a>
                <a href="https://github.com" className="hover:text-gray-200 text-[#3b0764]" aria-label="GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.47 0-.23-.01-.93-.01-1.69-2.77.61-3.34-1.33-3.34-1.33-.45-1.12-1.11-1.42-1.11-1.42-.91-.62.07-.61.07-.61 1.01-.07 1.54 1.01 1.54 1.01.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.65-1.33-2.21-.25-4.53-1.1-4.53-4.91 0-1.08.38-1.97 1.01-2.67-.1-.25-.44-.7.11-.98 0 0 .82-.27 2.72 1.01C10.24 9.23 11.12 9 12 9s1.76.23 2.29.51c1.9-1.28 2.72-1.01 2.72-1.01.56.28.21.73.11.98.63.7 1.01 1.59 1.01 2.67 0 3.81-2.33 4.66-4.53 4.91.3.25.56.74.56 1.42 0 1.02-.01 1.83-.01 2.07 0 .26.18.56.68.47C21.13 20.17 24 16.42 24 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
        
              </div>
              </div>
          </div>

       
        </footer>
      );
    }
export default Footer;