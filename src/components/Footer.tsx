import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 py-8 px-4 mt-16 text-neutral-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <span className="font-extrabold text-2xl text-[#e50914] drop-shadow-lg select-none" style={{fontFamily: 'Arial Black, Arial, sans-serif', transform: 'skewY(-10deg)'}}>N</span>
          <span className="font-extrabold text-white text-lg ml-2 tracking-wide" style={{fontFamily: 'Arial Black, Arial, sans-serif'}}>NETFLIX MOVIES LLC</span>
        </div>
        <div className="text-sm text-center md:text-left mb-4 md:mb-0">
          The best place to discover and track your favorite movies and sessions.<br />
          © 2025 NETFLIX MOVIES LLC. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm">
          <div className="flex flex-col items-center md:items-start text-xs text-neutral-400 space-y-1 min-w-[170px]">
  <span className="font-semibold text-neutral-200">NETFLIX MOVIES</span>
  <span>24 Kinoshna St., Kyiv, Ukraine, 02000</span>
  <span className="flex items-center"><svg className="w-4 h-4 mr-1 inline-block text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5.75A2.75 2.75 0 015.75 3h12.5A2.75 2.75 0 0121 5.75v12.5A2.75 2.75 0 0118.25 21H5.75A2.75 2.75 0 013 18.25V5.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4a1 1 0 001 1h4" /></svg>+380 (44) 987-65-43</span>
  <span className="flex items-center"><svg className="w-4 h-4 mr-1 inline-block text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4 4-4-4m8-4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h8a4 4 0 014 4v8z" /></svg><a href="mailto:contact@netflixmoviesllc.com" className="hover:underline text-blue-400">contact@netflixmoviesllc.com</a></span>
</div>
<Link to="/faq" className="hover:text-white transition">FAQ</Link>
          <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
