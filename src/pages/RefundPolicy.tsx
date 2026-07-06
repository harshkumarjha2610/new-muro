import React from "react";

const RefundPolicy: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-[#333333] font-sans antialiased">
      <div className="max-w-[1540px] mx-auto pl-16 pr-12 sm:pl-24 sm:pr-16 lg:pl-32 lg:pr-24 pt-4 pb-12 md:pt-6 md:pb-16">

        {/* Page Title */}
        <h3 className="mb-4 text-[27px] font-semibold text-[#333333]">
          Cancellation & refund policy
        </h3>

        {/* Intro */}
        <p className="mb-4 text-[13.5px] md:text-[14px] font-semibold leading-[1.5] text-[#333333]">
          We stand behind the quality of every MURO product. If something is not right, we address it with clarity and fairness.
        </p>

        {/* Order Cancellation */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            ORDER CANCELLATION
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Orders may be cancelled within 24 hours of purchase, provided production or shipping has not begun. Once an order enters printing, packaging, or dispatch, cancellation is no longer possible.
          </p>
        </section>

        {/* Returns & Replacements */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            RETURNS & REPLACEMENTS
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Requests for return or replacement must be submitted within 7 days of delivery and are reviewed on a case-by-case basis under the following conditions:
          </p>
          <ul className="mb-2 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>Product arrived damaged</li>
            <li>Incorrect item received</li>
            <li>Confirmed non-delivery</li>
          </ul>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            To support your request, clear photos or relevant documentation may be required. Items must remain unused and in original condition.
          </p>
        </section>

        {/* Non-Refundable Cases */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            NON-REFUNDABLE CASES
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Returns or refunds are not accepted for:
          </p>
          <ul className="mb-2 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>Change of mind</li>
            <li>Incorrect selection made by the customer</li>
            <li>Minor color variations due to screen or lighting differences</li>
          </ul>
        </section>

        {/* Delivery Responsibility */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            DELIVERY RESPONSIBILITY
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Customers are responsible for providing accurate shipping details. Delivery delays caused by courier services, incorrect addresses, or failed delivery attempts may not qualify for refund.
          </p>
        </section>

        {/* Refund Process */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            REFUND PROCESS
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Approved refunds are issued to the original payment method within 5–7 business days. Actual credit timing may vary depending on banking or payment provider processing.
          </p>
        </section>

        {/* Shipping Costs */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            SHIPPING COSTS
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Unless a product defect or error is confirmed, return shipping costs are the responsibility of the customer.
          </p>
        </section>

        {/* Inspection & Approval */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            INSPECTION & APPROVAL
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            All return or replacement requests are subject to verification to ensure eligibility under this policy.
          </p>
        </section>

        {/* Contact Support */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            CONTACT SUPPORT
          </h2>
          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            To initiate a cancellation, return, refund, or replacement request, contact our support team at{" "}
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
          <p className="text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            We design with intention, deliver with care, and evaluate every concern responsibly.
          </p>
        </section>

      </div>
    </main>
  );
};

export default RefundPolicy;