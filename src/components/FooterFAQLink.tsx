import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterFAQLink() {
  return (
    <footer className="w-full bg-neutral-900 py-6 mt-12 text-center">
      <Link to="/faq" className="text-blue-400 hover:underline text-lg">
      Power parts      (FAQ)
      </Link>
    </footer>
  );
}
