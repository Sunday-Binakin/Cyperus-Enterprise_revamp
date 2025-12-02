import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const whatsappNumber = '233240000000';
const whatsappLink = `https://wa.me/${whatsappNumber}`;

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 rounded-full p-3 md:p-4 shadow-lg hover:bg-green-600 transition-colors flex items-center"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-8 h-4 text-white" size={32} />
      {/* Text hidden on mobile, visible on md+ */}
      <p className="hidden md:block text-white ml-2">Hi, How may I help?</p>
    </a>
  );
}

