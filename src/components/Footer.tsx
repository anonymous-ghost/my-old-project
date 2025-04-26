import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 py-8 px-4 mt-16 text-neutral-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <span className="bg-purple-700 text-white rounded-full px-3 py-1 font-bold text-lg">M</span>
          <span className="font-bold text-white text-lg">MovieApp</span>
        </div>
        <div className="text-sm text-center md:text-left mb-4 md:mb-0">
          The best place to discover and track your favorite movies and sessions.<br />
          © 2025 MovieApp. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm">
          <Link to="/faq" className="hover:text-white transition">FAQ</Link>
          <a href="#" className="hover:text-white transition">Contact</a>
          <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
