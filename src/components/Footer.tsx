import React from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

const Footer = () => {
  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const footerHeadingClass =
    "muro-footer-heading mb-[26px] text-left text-[16px] font-semibold uppercase leading-none text-black";

  const footerLinkClass =
    "block w-fit text-left text-[16px] font-normal leading-[1.62] tracking-[-0.01em] text-black transition-colors hover:text-black/65";

  return (
    <footer
      id="muro-footer"
      className="w-full overflow-hidden border-t border-[#E2E2E2] bg-[#F1F1F1] font-sans text-black"
    >
      <style>{`
        #muro-footer,
        #muro-footer * {
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        #muro-footer .muro-footer-container {
          width: calc(100% - 32px);
          max-width: 1320px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 0;
          padding-right: 0;
          box-sizing: border-box;
        }

        @media (min-width: 640px) {
          #muro-footer .muro-footer-container {
            width: calc(100% - 48px);
          }
        }

        @media (min-width: 1024px) {
          #muro-footer .muro-footer-container {
            width: calc(100% - 64px);
          }
        }

        @media (min-width: 1440px) {
          #muro-footer .muro-footer-container {
            width: 1320px;
          }
        }

        #muro-footer .muro-newsletter-title {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: -0.02em !important;
        }

        #muro-footer .muro-footer-heading {
          letter-spacing: 2px !important;
          font-weight: 700 !important;
        }
      `}</style>

      <div className="muro-footer-container pt-[58px] pb-[54px]">
        <div className="grid grid-cols-1 items-start gap-y-14 xl:grid-cols-[minmax(0,760px)_1fr] xl:gap-x-[100px] 2xl:gap-x-[125px]">
          <div className="w-full max-w-[760px] text-left">
            <h5
              className="muro-newsletter-title mb-[20px] text-[16px] leading-none text-black md:text-[17px]"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
              }}
            >
              Join our community and receive 10% off your first order.
            </h5>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-[735px] flex-col gap-3 sm:flex-row sm:items-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="h-[54px] min-w-0 flex-1 rounded-full border border-[#9E9E9E] bg-white px-[22px] text-[16px] font-normal text-black outline-none placeholder:text-black/70 focus:border-black"
              />

              <button
                type="submit"
                className="h-[54px] w-full shrink-0 rounded-full bg-[#211D1D] px-[24px] text-[16px] font-normal text-white transition-colors hover:bg-black sm:w-auto"
              >
                Sign up
              </button>
            </form>

            <p className="mt-[20px] max-w-[735px] text-[13px] font-normal leading-[1.55] tracking-[-0.01em] text-black">
              By subscribing, you agree to receive our newsletter and our{" "}
              <Link to="/privacy" className="underline hover:text-black/65">
                Privacy Policy
              </Link>
              . You may unsubscribe at any time.
            </p>
          </div>

          <div className="grid w-full grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 xl:flex xl:justify-between xl:gap-0">
            <div className="min-w-0 text-left xl:w-[140px]">
              <h4 className={footerHeadingClass}>SHOP</h4>
              <nav className="flex flex-col items-start">
                <Link to="/business" className={footerLinkClass}>Business</Link>
                <Link to="/products" className={footerLinkClass}>Posters</Link>
                <Link to="/frames" className={footerLinkClass}>Frames</Link>
                <Link to="/accessories" className={footerLinkClass}>Accessories</Link>
                <Link to="/artists" className={footerLinkClass}>Artists</Link>
                <Link to="/collections" className={footerLinkClass}>Collections</Link>
                <Link to="/black-friday" className={footerLinkClass}>Black Friday</Link>
              </nav>
            </div>

            <div className="min-w-0 text-left xl:w-[150px]">
              <h4 className={footerHeadingClass}>ABOUT US</h4>
              <nav className="flex flex-col items-start">
                <Link to="/about" className={footerLinkClass}>About us</Link>
                <Link to="/our-products" className={footerLinkClass}>Our products</Link>
                <Link to="/sustainability" className={footerLinkClass}>Sustainability</Link>
                <Link to="/collaborations" className={footerLinkClass}>Collaborations</Link>
                <Link to="/career" className={footerLinkClass}>Career</Link>
              </nav>
            </div>

            <div className="min-w-0 text-left xl:w-[170px]">
              <h4 className={footerHeadingClass}>SUPPORT</h4>
              <nav className="flex flex-col items-start">
                <Link to="/customer-service" className={footerLinkClass}>Customer service</Link>
                <Link to="/contact" className={footerLinkClass}>Contact us</Link>
                <Link to="/shipping-policy" className={footerLinkClass}>Shipping policy</Link>
                <Link to="/return-policy" className={footerLinkClass}>Return policy</Link>
                <Link to="/privacy" className={footerLinkClass}>Privacy policy</Link>
                <Link to="/ai-policy" className={footerLinkClass}>AI policy</Link>
                <Link to="/terms" className={footerLinkClass}>Terms &amp; conditions</Link>
              </nav>
            </div>

            <div className="min-w-0 text-left xl:w-[120px]">
              <h4 className={footerHeadingClass}>FOLLOW US</h4>
              <nav className="flex flex-col items-start">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className={footerLinkClass}>Instagram</a>
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className={footerLinkClass}>Facebook</a>
                <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className={footerLinkClass}>TikTok</a>
                <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer" className={footerLinkClass}>Pinterest</a>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-[34px] flex flex-col items-center justify-center text-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <span className="text-center text-[42px] font-bold uppercase leading-none tracking-[4px] text-black md:text-[48px]">
              MURO POSTER
            </span>
          </Link>

          <p className="mt-[26px] max-w-[900px] text-center text-[13px] font-normal leading-[1.55] tracking-[-0.01em] text-black">
            Copyright © 2026 MURO Poster. Operated by Saar Graphics, India. All rights reserved.
          </p>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5] bg-white">
        <div className="muro-footer-container">
          <div className="flex min-h-[52px] w-full flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-0">
            <div className="flex flex-wrap items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg"
                alt="Google Pay"
                className="h-[11px] w-auto object-contain"
                loading="lazy"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
                alt="Apple Pay"
                className="h-[11px] w-auto object-contain"
                loading="lazy"
              />
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/paytm-icon.png"
                alt="Paytm"
                className="h-[8px] w-auto object-contain"
                loading="lazy"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="h-[11px] w-auto object-contain"
                loading="lazy"
              />
            </div>

            <div className="flex items-center gap-2 text-[14px] font-normal text-black">
              <Globe size={14} strokeWidth={1.6} className="shrink-0" />
              <span>India (IND)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;