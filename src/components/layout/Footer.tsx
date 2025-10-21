import { Sparkles, Facebook, Twitter, Instagram } from 'lucide-react';
import { useState } from 'react';

export const Footer = () => {
  const [language, setLanguage] = useState('EN');

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-green-500 p-2 rounded-2xl">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Curatify</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your trusted marketplace for professional cleaning services in Romania.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="p-2 bg-gray-200 hover:bg-blue-600 text-gray-700 hover:text-white rounded-xl transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-200 hover:bg-blue-600 text-gray-700 hover:text-white rounded-xl transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-200 hover:bg-blue-600 text-gray-700 hover:text-white rounded-xl transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('RO')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  language === 'RO'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                RO
              </button>
              <button
                onClick={() => setLanguage('EN')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  language === 'EN'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © 2025 Curatify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
