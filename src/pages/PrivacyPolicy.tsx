import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-white text-[#333333] font-sans antialiased">
      <div className="max-w-[1540px] mx-auto pl-16 pr-12 sm:pl-24 sm:pr-16 lg:pl-32 lg:pr-24 pt-4 pb-12 md:pt-6 md:pb-16">

        {/* Page Title */}
        <h3 className="mb-4 text-[30px] font-semibold text-[#333333]">
          Privacy policy
        </h3>

        {/* Intro */}
        <p className="mb-4 text-[13.5px] md:text-[14px] font-semibold leading-[1.5] text-[#333333]">
          We care about your privacy. This policy explains what personal data we collect, why we collect it, and how we use it. If you have any questions, you are always welcome to reach out to us. Posterly AB, Drottninggatan 5 ltr, 411 14 Gothenburg, Sweden (company reg. no. 559128-6405) is responsible for the processing of your personal data.
        </p>

        {/* What data do we collect? */}
        <section className="mb-4">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            What data do we collect?
          </h2>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            The data we collect depends on how you interact with us — whether you&apos;re browsing, making a purchase, or contacting our customer service.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-bold leading-[1.6] text-[#111111]">
            To process your orders and purchases, we collect:
          </p>
          <ul className="mb-2 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>Name, address, phone number and email</li>
            <li>Date of birth (required for some payment methods)</li>
            <li>Payment information and payment history</li>
            <li>Order details such as order number, products, delivery address and invoice</li>
          </ul>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            This is necessary to fulfil our purchase agreement with you. We store this information for 36 months from the date both delivery and payment have been completed, in order to assist you with any complaints or returns.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-bold leading-[1.6] text-[#111111]">
            To comply with legal obligations, we store:
          </p>
          <ul className="mb-1 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>Name and address</li>
            <li>Payment information and payment history</li>
            <li>Order details such as order number, products and delivery address</li>
          </ul>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            We are required by law to retain certain financial and transaction data. Under the Swedish Bookkeeping Act, this information is stored for 7 years plus the current year, with restricted access. This data is not accessible to our customer service team.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-bold leading-[1.6] text-[#111111]">
            To provide customer service, we use:
          </p>
          <ul className="mb-2 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>Name, phone number and email</li>
            <li>Date of birth (required for some payment methods)</li>
            <li>Payment information and payment history</li>
            <li>Order details such as order number, products, delivery address and invoice</li>
            <li>Any information you share with us during our communication</li>
          </ul>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            This is necessary to respond to your enquiries and resolve any issues. We store this information for 14 months from the date your customer service case is closed.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-bold leading-[1.6] text-[#111111]">
            To personalise your experience, we use:
          </p>
          <ul className="mb-2 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>IP address</li>
            <li>Data collected via cookies — for example, which products you viewed and your browsing history</li>
          </ul>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            We use this data to show you relevant product recommendations on our site. This is based on our legitimate interest in providing you with a tailored shopping experience. Data is stored in plain text for one year from your most recent activity. You can ask us to delete this data at any time by contacting us.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-bold leading-[1.6] text-[#111111]">
            To show you relevant marketing, we use:
          </p>
          <ul className="mb-2 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>IP address</li>
            <li>Data collected via cookies — for example, which products you viewed and your shopping history</li>
            <li>Order number</li>
          </ul>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            We use this data to show you relevant products and offers on our site and through our advertising partners. This is based on our legitimate interest in marketing our products to you. We use external advertising and analytics services for this purpose, managed through our cookie consent platform. You can manage or withdraw your consent to these at any time via our cookie settings.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-bold leading-[1.6] text-[#111111]">
            If you subscribe to our newsletter or contact us, we use:
          </p>
          <ul className="mb-2 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>Name, address, phone number and email</li>
            <li>Any information you choose to share with us</li>
          </ul>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            We only process this data based on your consent. Storage duration varies depending on the context but always aligns with the period specified when you gave your consent. You can unsubscribe from our newsletter at any time via the link in any of our emails.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-bold leading-[1.6] text-[#111111]">
            To prevent misuse and investigate potential fraud or crime, we may use:
          </p>
          <ul className="mb-2 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>Name, address, phone number and email</li>
            <li>Payment information</li>
            <li>Information about returns and deliveries</li>
            <li>IP address</li>
            <li>Customer service history</li>
          </ul>

          <p className="text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            This is based on our legitimate interest in protecting our services and preventing fraud. Such information is stored only for as long as relevant, typically no longer than 36 months.
          </p>
        </section>

        {/* To analyse and improve our services */}
        <section className="mb-8">
          <p className="mb-2 text-[13.5px] md:text-[14px] font-bold leading-[1.6] text-[#111111]">
            To analyse and improve our services, we use:
          </p>
          <ul className="mb-2 list-disc pl-5 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333] space-y-0">
            <li>Purchase and browsing data, such as click and visit history</li>
            <li>Technical data such as device settings, language, IP address, browser settings, time zone and operating system</li>
            <li>Information about how you interact with our site, such as pages visited, time spent, login method and error codes</li>
          </ul>

          <p className="text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            This analysis is conducted at an aggregated level — meaning it is general and not tied to individual behaviour. Data is stored in plain text for up to one year from your most recent activity, after which it is pseudonymised (depersonalised). If you exercise your right to erasure, we will no longer be able to recover your data.
          </p>
        </section>

        {/* Who do we share your data with? */}
        <section className="mb-2">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            Who do we share your data with?
          </h2>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            We never sell your personal data. We may share it with the following categories of recipients in order to deliver our services:
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <strong className="font-bold text-[#111111]">Delivery partners</strong> — to process and deliver your order. These partners may only process your data according to our instructions.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <strong className="font-bold text-[#111111]">Payment service providers</strong> — to process payments made on the site. Each provider is independently responsible for their own data handling, and their privacy terms apply when you select a payment method at checkout.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <strong className="font-bold text-[#111111]">Advertising and analytics partners</strong> — to show relevant marketing across channels. This is managed through our cookie consent platform, and you can update your preferences at any time via our cookie settings.
          </p>

          <p className="text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <strong className="font-bold text-[#111111]">Other recipients</strong> — we may share data with public authorities if required by law. In the event of a merger, acquisition or sale of our business, your data may be transferred to the relevant parties involved.
          </p>
        </section>

        {/* Transfers Outside the EU */}
        <section className="mb-2">
          <h2 className="mb-4 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            Transfers Outside the EU
          </h2>

          <p className="text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Some of our service providers operate outside the EU. We never transfer personal data outside the EU without appropriate safeguards and a valid legal basis for the transfer — for example, through the EU-U.S. Data Privacy Framework or the European Commission&apos;s standard contractual clauses.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-2">
          <h2 className="mb-2 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            Your Rights
          </h2>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Under GDPR, you have the following rights regarding your personal data:
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <strong className="font-bold text-[#111111]">Access</strong> — you have the right to know what data we hold about you. Contact us and we will provide a full overview.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <strong className="font-bold text-[#111111]">Correction</strong> — if any of your data is inaccurate or outdated, you have the right to have it corrected. Simply contact our customer service.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <strong className="font-bold text-[#111111]">Erasure</strong> — in certain circumstances, you have the right to have your data deleted. This does not apply where we are legally required to retain it or where it is necessary to fulfil an agreement with you.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <strong className="font-bold text-[#111111]">Objection</strong> — you have the right to object to certain types of processing, such as direct marketing and newsletters.
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <strong className="font-bold text-[#111111]">Withdrawal of consent</strong> — where we process your data based on your consent, you can withdraw that consent at any time.
          </p>

          <p className="text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            If you are unsatisfied with how we handle your data, you have the right to file a complaint with the relevant supervisory authority in your country.
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-2">
          <h2 className="mb-4 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            Cookies
          </h2>

          <p className="text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            We use cookies to improve your experience, personalise content and deliver relevant marketing. You can manage your cookie preferences at any time via our cookie settings. For full details on how we use cookies, please see our <a href="/cookie-policy" className="text-[#0000ee] underline hover:text-[#0000aa]">Cookie Policy.</a>
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="mb-4 text-[16px] md:text-[17px] font-bold leading-snug text-[#111111]">
            Contact
          </h2>

          <p className="mb-4 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            If you have any questions about how we process your personal data, please contact our data protection contact:
          </p>

          <p className="mb-4 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <a href="mailto:sebastian.johansson@postery.com" className="text-[#0000ee] underline hover:text-[#0000aa]">
              sebastian.johansson@postery.com
            </a>
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            For general enquiries:
          </p>

          <p className="mb-4 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            <a href="mailto:help@postery.com" className="text-[#0000ee] underline hover:text-[#0000aa]">
              help@postery.com
            </a>
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Phone: +46 76 030 31 22
          </p>

          <p className="mb-2 text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Postery AB Drottninggatan 5 ltr 411 14 Gothenburg Sweden
          </p>

          <p className="text-[13.5px] md:text-[14px] font-semibold leading-[1.6] text-[#333333]">
            Company number: 559128-6405
          </p>
        </section>

      </div>
    </main>
  );
};

export default PrivacyPolicy;