import React from "react";
import { Link } from "react-router-dom";
import { Globe, Mail, Phone, Clock } from "lucide-react";

const Footer = () => {
  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="bg-[#F1F1F1] text-[#111111] border-t border-[#E4E4E4] font-sans">
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-2">
          {/* Left Block: Newsletter Section */}
          <div className="w-full lg:w-[35%] flex flex-col gap-4 text-left">
            <h5 className="text-[14px] font-semibold tracking-wide text-black">
              Join our community and receive 10% off your first order.
            </h5>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-[400px] items-center gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="h-[42px] min-w-0 flex-1 rounded-full border border-[#D8D8D8] bg-white px-4 text-[13px] text-black outline-none placeholder:text-[#888888] focus:border-black"
              />

              <button
                type="submit"
                className="h-[42px] shrink-0 rounded-full bg-black px-6 text-[13px] font-semibold text-white transition-colors hover:bg-black/80"
              >
                Sign up
              </button>
            </form>

            <p className="text-[11px] leading-[1.6] text-[#888888] max-w-[360px]">
              By subscribing, you agree to receive our newsletter and our{" "}
              <Link to="/privacy" className="underline hover:text-black">
                Privacy Policy
              </Link>
              . You may unsubscribe at any time.
            </p>
          </div>

          {/* Right Block: Links Grid */}
          <div className="w-full lg:w-[60%] grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 2: Shop */}
            <div className="text-left">
              <h4 className="h-[42px] flex items-center text-[24px] md:text-[26px] mb-9 tracking-wide text-[#111111]">
                Shop
              </h4>

              <div className="flex flex-col gap-4 text-[14px] text-[#111111]/70">
                <Link
                  to="/shop"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  All Products
                </Link>

                <Link
                  to="/bestsellers"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  Bestsellers
                </Link>

                <Link
                  to="/new-arrivals"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  New Arrivals
                </Link>

                <Link
                  to="/shop"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  Shop by Mood
                </Link>

                <Link
                  to="/gift-ideas"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  Gift Ideas
                </Link>
              </div>
            </div>

            {/* Column 3: Policies */}
            <div className="text-left">
              <h4 className="h-[42px] flex items-center text-[24px] md:text-[26px] mb-9 tracking-wide text-[#111111]">
                Policies
              </h4>

              <div className="flex flex-col gap-4 text-[14px] text-[#111111]/70">
                <Link
                  to="/shipping-policy"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  Shipping Policy
                </Link>

                <Link
                  to="/cancellation-refund"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  Cancellation & Refund
                </Link>

                <Link
                  to="/terms"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  Terms & Conditions
                </Link>

                <Link
                  to="/privacy"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/#faqs"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  FAQ
                </Link>

                <Link
                  to="/disclaimer"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  Website Disclaimer
                </Link>
              </div>
            </div>

            {/* Column 4: Support */}
            <div className="text-left">
              <h4 className="h-[42px] flex items-center text-[24px] md:text-[26px] mb-9 tracking-wide text-[#111111]">
                Support
              </h4>

              <div className="flex flex-col gap-4 text-[14px] text-[#111111]/70">
                <Link
                  to="/contact"
                  className="hover:text-[#111111] transition-all w-fit"
                >
                  Contact Page
                </Link>

                <a
                  href="mailto:helpmuroposter@gmail.com"
                  className="flex items-center gap-3 hover:text-[#111111] transition-all w-fit"
                >
                  <Mail size={16} /> helpmuroposter@gmail.com
                </a>

                <a
                  href="https://wa.me/918059700876"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-[#111111] transition-all w-fit"
                >
                  <Phone size={16} /> +91 80597 00876
                </a>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    Mon – Fri
                    <br />
                    10:00 AM – 6:00 PM (IST)
                  </span>
                </div>

                <Link
                  to="/track-order"
                  className="hover:text-[#111111] transition-all w-fit mt-2 font-semibold border-b border-[#111111]/30 pb-0.5"
                >
                  Track Your Order
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Center Brand and Copyright Block */}
        <div className="flex flex-col items-center justify-center border-t border-[#EBEBEB]">
          <Link to="/" className="inline-block mb-2">
            <span 
              className="text-[34px] tracking-[2px] text-black"
              style={{ fontFamily: '"Coolvetica", "Coolvetica Regular", Arial, sans-serif' }}
            >
MURO POSTER            </span>
          </Link>
          <p className="text-center text-[11px] leading-[1.8] text-[#888888] max-w-[600px] px-4">
            Copyright © 2026 MURO Poster. Operated by Saar Graphics, India. All rights reserved.
          </p>
        </div>
      </div>
      {/* Bottom Strip: Payments & Locator */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 p-6 border-t border-[#EBEBEB] bg-white text-[#888888] text-[11px]">
          {/* Payment Icons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-12 h-7.5 bg-white rounded-md border border-[#EBEBEB] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#CCCCCC]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg"
                alt="Visa"
                className="max-h-[60%] max-w-[80%] object-contain"
                loading="lazy"
              />
            </div>
            
            <div className="w-12 h-7.5 bg-white rounded-md border border-[#EBEBEB] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#CCCCCC]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                alt="MasterCard"
                className="max-h-[60%] max-w-[80%] object-contain"
                loading="lazy"
              />
            </div>

            <div className="w-12 h-7.5 bg-white rounded-md border border-[#EBEBEB] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#CCCCCC]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png"
                alt="RuPay"
                className="max-h-[60%] max-w-[80%] object-contain"
                loading="lazy"
              />
            </div>

            <div className="w-12 h-7.5 bg-white rounded-md border border-[#EBEBEB] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#CCCCCC]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6f/UPI_logo.svg"
                alt="UPI"
                className="max-h-[65%] max-w-[85%] object-contain"
                loading="lazy"
              />
            </div>

            <div className="w-12 h-7.5 bg-white rounded-md border border-[#EBEBEB] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#CCCCCC]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
                alt="Paytm"
                className="max-h-[55%] max-w-[80%] object-contain"
                loading="lazy"
              />
            </div>

            <div className="w-12 h-7.5 bg-white rounded-md border border-[#EBEBEB] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors hover:border-[#CCCCCC]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                alt="American Express"
                className="max-h-[60%] max-w-[80%] object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Country Selector */}
          <div className="flex items-center gap-2 font-semibold text-black/60 hover:text-black cursor-pointer">
            <Globe size={14} />
            <span>India (IND)</span>
          </div>
        </div>
    </footer>
  );
};

export default Footer;