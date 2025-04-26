import React, { useState } from 'react';

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


function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-8 px-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {FAQ_DATA.map((item, idx) => {
          const open = openIdx === idx;
          return (
            <div key={idx} className="bg-neutral-900 rounded-lg shadow overflow-hidden transition-all">
              <button
                className="w-full flex justify-between items-center px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 group"
                onClick={() => setOpenIdx(open ? null : idx)}
                aria-expanded={open}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="text-lg font-semibold text-left group-hover:text-blue-400 transition-colors">{item.question}</span>
                <svg
                  className={`w-5 h-5 ml-4 transform transition-transform duration-300 ${open ? 'rotate-90 text-blue-400' : 'rotate-0 text-neutral-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`px-6 pb-4 text-neutral-300 leading-relaxed transition-all duration-300 ease-in-out ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                style={{
                  transitionProperty: 'max-height, opacity',
                }}
                aria-hidden={!open}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FAQ;


