import React from 'react';

const FAQ_DATA = [
  {
    question: 'How do I add a new movie?',
    answer:
      'Go to the "Admin Panel", click the "Add Movie" button, and fill in all required fields. After adding, the movie will be saved to your browser\'s local storage and will not disappear after refreshing the page.'
  },
  {
    question: 'Why do movies disappear after refreshing the page?',
    answer:
      'Movies are stored in your browser\'s localStorage. If localStorage is cleared (for example, due to privacy settings or manually), movies will be lost. Also, make sure you add movies through the interface, not directly in the code.'
  },
  {
    question: 'How do I add a movie to favorites?',
    answer:
      'On the movie page or in the list, click the heart icon. Favorite movies are stored separately in localStorage.'
  },
  {
    question: 'How does the cart work?',
    answer:
      'You can add sessions to the cart on the movie page. To place an order, go to the "Cart" section.'
  },
  {
    question: 'Can I import movies from Excel?',
    answer:
      'Yes, in the "Admin Panel" there is an option to import movies from an Excel file.'
  },
  {
    question: 'Are data saved on the server?',
    answer:
      'No, all data (movies, favorites, cart) are stored only in the user\'s browser.'
  },
  {
    question: 'What should I do if an error occurs?',
    answer:
      'Check the browser console for error messages. If the problem persists, contact the developer.'
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white py-8 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">FAQ — Часті питання</h1>
      <div className="space-y-6">
        {FAQ_DATA.map((item, idx) => (
          <div key={idx} className="bg-neutral-900 rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{item.question}</h2>
            <p className="text-neutral-300 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
