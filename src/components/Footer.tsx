import React from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const Footer = () => {
  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="bg-white text-black border-t border-[#EBEBEB] font-sans">
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
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
          <div className="w-full lg:w-[60%] grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1: SHOP */}
            <div className="text-left flex flex-col gap-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black">
                Shop
              </span>
              <div className="flex flex-col gap-3 text-[13px] text-[#555555]">
                <Link to="/products" className="hover:text-black transition-colors w-fit">
                  Posters
                </Link>
                <Link to="/bestsellers" className="hover:text-black transition-colors w-fit">
                  Bestsellers
                </Link>
                <Link to="/cutouts" className="hover:text-black transition-colors w-fit">
                  CutOuts
                </Link>
                <Link to="/postcards" className="hover:text-black transition-colors w-fit">
                  Postcard
                </Link>
                <Link to="/about" className="hover:text-black transition-colors w-fit">
                  About MURO
                </Link>
              </div>
            </div>

            {/* Column 2: ABOUT US */}
            <div className="text-left flex flex-col gap-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black">
                About Us
              </span>
              <div className="flex flex-col gap-3 text-[13px] text-[#555555]">
                <Link to="/about" className="hover:text-black transition-colors w-fit">
                  About us
                </Link>
                <Link to="/about#sustainability" className="hover:text-black transition-colors w-fit">
                  Sustainability
                </Link>
                <Link to="/contact" className="hover:text-black transition-colors w-fit">
                  Collaborations
                </Link>
                <Link to="/about" className="hover:text-black transition-colors w-fit">
                  Career
                </Link>
              </div>
            </div>

            {/* Column 3: SUPPORT */}
            <div className="text-left flex flex-col gap-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black">
                Support
              </span>
              <div className="flex flex-col gap-3 text-[13px] text-[#555555]">
                <Link to="/contact" className="hover:text-black transition-colors w-fit">
                  Contact us
                </Link>
                <Link to="/shipping-policy" className="hover:text-black transition-colors w-fit">
                  Shipping policy
                </Link>
                <Link to="/cancellation-refund" className="hover:text-black transition-colors w-fit">
                  Return policy
                </Link>
                <Link to="/privacy" className="hover:text-black transition-colors w-fit">
                  Privacy policy
                </Link>
                <Link to="/faq" className="hover:text-black transition-colors w-fit">
                  FAQ
                </Link>
                <Link to="/terms" className="hover:text-black transition-colors w-fit">
                  Terms & conditions
                </Link>
              </div>
            </div>

            {/* Column 4: FOLLOW US */}
            <div className="text-left flex flex-col gap-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black">
                Follow Us
              </span>
              <div className="flex flex-col gap-3 text-[13px] text-[#555555]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors w-fit"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors w-fit"
                >
                  Facebook
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors w-fit"
                >
                  TikTok
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors w-fit"
                >
                  Pinterest
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Center Brand and Copyright Block */}
        <div className="flex flex-col items-center justify-center border-t border-[#EBEBEB] pt-12 mt-12">
          <Link to="/" className="inline-block mb-5">
            <span 
              className="text-[34px] tracking-[0.05em] lowercase text-black"
              style={{ fontFamily: '"Coolvetica", "Coolvetica Regular", Arial, sans-serif' }}
            >
              muro
            </span>
          </Link>
          <p className="text-center text-[11px] leading-[1.8] text-[#888888] max-w-[600px] px-4">
            Copyright © 2026 MURO Poster. Operated by Saar Graphics, India. All rights reserved.
          </p>
        </div>

        {/* Bottom Strip: Payments & Locator */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8 pt-6 border-t border-[#EBEBEB] text-[#888888] text-[11px]">
          {/* Payment Icons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-[#F4F4F2] text-black/60 rounded-md border border-[#EBEBEB]">
              Visa
            </span>
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-[#F4F4F2] text-black/60 rounded-md border border-[#EBEBEB]">
              MasterCard
            </span>
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-[#F4F4F2] text-black/60 rounded-md border border-[#EBEBEB]">
              RuPay
            </span>
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-[#F4F4F2] text-black/60 rounded-md border border-[#EBEBEB]">
              UPI
            </span>
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-[#F4F4F2] text-black/60 rounded-md border border-[#EBEBEB]">
              Paytm
            </span>
            <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-[#F4F4F2] text-black/60 rounded-md border border-[#EBEBEB]">
              AMEX
            </span>
          </div>

          {/* Country Selector */}
          <div className="flex items-center gap-2 font-semibold text-black/60 hover:text-black cursor-pointer">
            <Globe size={14} />
            <span>United States (USD)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;