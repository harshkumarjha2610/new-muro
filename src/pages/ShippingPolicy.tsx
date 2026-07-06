import React from "react";

const ShippingPolicy: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-[#333333] font-sans antialiased">
      <div className="max-w-[1540px] mx-auto pl-16 pr-12 sm:pl-24 sm:pr-16 lg:pl-32 lg:pr-24 pt-4 pb-12 md:pt-6 md:pb-16">

        {/* Page Title */}
        <h3 className="mb-4 text-[27px] font-semibold text-[#333333]">
          Shipping policy
        </h3>

        {/* Intro */}
        <p className="mb-4 text-[13.5px] md:text-[14px] font-semibold leading-[1.5] text-[#333333]">
          At MURO POSTER, environment matters and so does delivery.
        </p>
        <p className="mb-4 text-[13.5px] md:text-[14px] font-semibold leading-[1.5] text-[#333333]">
          Each piece is produced, packed, and shipped with care because what shapes your space should arrive with the same intention it was designed with.
        </p>

        {/* Order Processing */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            ORDER PROCESSING
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            All MURO products are prepared after order confirmation.
          </p>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Orders are typically processed within 2–4 business days, depending on product type and volume. Processing times are estimates and may vary during peak periods.
          </p>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            You will receive a dispatch confirmation email once your order has shipped.
          </p>
        </section>

        {/* Shipping & Delivery */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            SHIPPING & DELIVERY
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Estimated delivery time is 5–10 business days after dispatch. Delivery timelines are estimates only and are not guaranteed, as they depend on location, carrier performance, and external conditions. Remote areas or unforeseen logistical factors may result in additional transit time.
          </p>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Once an order is dispatched, it is handled by third-party shipping partners. While we work with trusted carriers, MURO POSTER is not responsible for delays caused by courier operations, customs processing, weather conditions, or other events beyond our control. We will, however, assist in tracking and communication wherever possible.
          </p>
        </section>

        {/* Packaging */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            PACKAGING
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Products are securely packed using protective materials designed to minimize the risk of bending, scratches, or transit damage.
          </p>
        </section>

        {/* Tracking */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            TRACKING
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            A tracking link will be sent via email once your order has been shipped.
          </p>
        </section>

        {/* Shipping Issues */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            SHIPPING ISSUES
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            If your order arrives damaged or appears lost, please contact our support team within 72 hours of delivery or expected delivery with your order details and supporting images if applicable.
          </p>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            We will review the situation and work toward an appropriate resolution.
          </p>
        </section>

        {/* Force Majeure */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            FORCE MAJEURE
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            MURO POSTER is not liable for shipping delays or delivery failures resulting from circumstances beyond reasonable control, including but not limited to natural events, transportation disruptions, labor actions, or regulatory delays.
          </p>
        </section>

        {/* Contact Support */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            CONTACT SUPPORT
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            For shipping, tracking, damaged delivery, or lost order support, contact us at{" "}
            <a href="mailto:helpmuroposter@gmail.com" className="text-[#0000ee] underline hover:text-[#0000aa]">
              helpmuroposter@gmail.com
            </a>
            .
          </p>
        </section>

        {/* Muro Promise */}
        <section className="mb-8">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            Muro Promise
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            We don’t ship decorations. We ship intention.
          </p>
          <p className="text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Choose what surrounds you carefully — we’ll handle the rest.
          </p>
        </section>

      </div>
    </main>
  );
};

export default ShippingPolicy;