import React from "react";
import { Link } from "react-router-dom";

const serifFont = "'Cormorant Garamond', Georgia, serif";
const containerClass = "max-w-[1400px] mx-auto px-4 md:px-8";

const About: React.FC = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">

        {/* Section 1: About Us
            - Below ~930px: title + text above, image below (stacked)
            - At ~930px+: text LEFT, image RIGHT (two columns)
        */}
        <section className="mx-auto max-w-[1400px] px-4 md:px-8 pt-8 mb-12">

          {/* Two-column layout at md+ */}
          <div className="grid grid-cols-1 min-[930px]:grid-cols-[1.2fr_1fr] lg:grid-cols-[649px_1fr] gap-x-10 lg:gap-x-14 items-start">

            {/* Text first in DOM = above image on mobile, right side on desktop via order */}
            <div className="flex flex-col justify-start min-[930px]:pt-2 min-[930px]:order-2">
              <h1
                className="text-[32px] min-[930px]:text-[28px] lg:text-[32px] leading-[1.1] font-normal text-[#111111] mb-5 text-center min-[930px]:text-center"
                style={{ fontFamily: serifFont }}
              >
                About us
              </h1>

              <div className="space-y-2 text-[13.5px] min-[930px]:text-[13px] lg:text-[13.5px] leading-[1.6] text-[#111111]">
                <p>
                  Postery is a Swedish brand bringing together carefully curated and
                  distinctive art prints. We are a curious and creative team based in
                  Gothenburg, Sweden, and we believe in diversity, value and quality.
                  We are united by our love for art, and we are passionate about
                  trends, interiors and design that help create that personal space.
                  We enjoy the aesthetics of the world, and we invite everyone to join
                  and contribute to explore the beauty of art and design.
                </p>
                <p>
                  Inspired by Scandinavian design heritage, we curate art prints that
                  combine timeless aesthetics with contemporary creativity. Each
                  collection is thoughtfully selected by our art directors, bringing
                  together influences from modern art, design and visual culture. Our
                  posters, frames and hanging accessories are designed to complement
                  modern living spaces and to stand the test of time as staples of a
                  thoughtfully curated home.
                </p>
                <p>
                  Over the years, Postery&apos;s collections and gallery walls have
                  been featured in several respected interior and design publications,
                  including <strong>Elle Decoration</strong>,{" "}
                  <strong>The World of Interiors</strong>, <strong>Residence</strong>,{" "}
                  <strong>Nya Rum</strong> and <strong>Bo Living</strong>. These
                  features reflect our ongoing commitment to bringing inspiring art and
                  thoughtful design into modern interiors.
                </p>
              </div>
            </div>

            {/* Image second in DOM = below text on mobile, left side on desktop via order */}
            <div
              className="w-full bg-[#f2f2f2] rounded-[16px] overflow-hidden mt-8 min-[930px]:mt-0 min-[930px]:order-1"
              style={{ aspectRatio: '881 / 945' }}
            >
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"
                alt="Interior"
                className="w-full h-full object-cover object-top"
              />
            </div>

          </div>
        </section>

        {/* Section 2: Purpose and Partners */}
        <section className={`${containerClass} mb-12 mt-2 space-y-10 min-[1044px]:space-y-12`}>
          <div className="grid grid-cols-1 min-[1044px]:grid-cols-[0.95fr_2.35fr] gap-3 min-[1044px]:gap-8 items-start">
            <h2
              className="text-[26px] min-[1044px]:text-[28px] leading-[1.05] font-normal text-[#111111]"
              style={{ fontFamily: serifFont }}
            >
              Our purpose
            </h2>

            <p className="text-[15px] min-[1044px]:text-[14px] leading-[1.65] text-[#111111] max-w-[680px]">
              Our purpose is to make high-quality art accessible to homes around the
              world. We believe that beautiful design should be available to
              everyone and that art has the power to transform everyday spaces. At
              Postery, we aim to inspire creativity and help people discover pieces
              that reflect their personality and style. Our ambition is to share our
              passion for art and design while making it easier for people
              everywhere to create interiors that feel personal, inspiring and
              unique.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[1044px]:grid-cols-[0.95fr_2.35fr] gap-3 min-[1044px]:gap-8 items-start">
            <h2
              className="text-[26px] min-[1044px]:text-[28px] leading-[1.05] font-normal text-[#111111]"
              style={{ fontFamily: serifFont }}
            >
              Our partners
            </h2>

            <p className="text-[15px] min-[1044px]:text-[14px] leading-[1.65] text-[#111111] max-w-[680px]">
              Collaboration is an important part of Postery&apos;s journey. Over the
              years we have worked with selected global retailers and creative
              partners to bring curated art collections to new audiences. Our
              collaborations include projects with international brands such as{" "}
              <strong>H&amp;M</strong>, <strong>Lefties (Inditex)</strong> and{" "}
              <strong>Lagerhaus</strong>, where Postery collections have been
              introduced in retail environments across different markets. Through
              these partnerships we continue to explore new ways of sharing art and
              design with a wider community.
            </p>
          </div>
        </section>

        {/* Section 3: Full width image banner */}
        <section className={`${containerClass} mb-8`}>
          <div className="w-full bg-[#f2f2f2] rounded-[16px] overflow-hidden aspect-[16/9] md:aspect-[2/1]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              alt="Gallery Wall"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="mt-6 text-center max-w-[800px] mx-auto">
            <p className="text-[15px] md:text-[16px] leading-6 tracking-tight text-[#333333] mb-8 font-medium">
              If you are looking for inspiration for your next art print or ideas
              for styling your home, our Magazine is where creativity and design
              come together. Through artist features, styling guides and curated
              interiors, we share inspiration for creating personal spaces with
              posters and gallery walls.
            </p>

            <button className="px-8 py-3 rounded-full border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors text-[14px] font-medium">
              Discover our Magazine
            </button>
          </div>
        </section>

        {/* Section 4: Three columns */}
        <section className="max-w-[1850px] mx-auto px-1 md:px-2 mb-0">
          <div className="grid grid-cols-1 min-[980px]:grid-cols-3 gap-y-10 min-[980px]:gap-x-2 min-[980px]:gap-y-6">

            {/* Card 1 */}
            <div className="bg-white rounded-xl p-1">
              <div
                className="bg-[#f2f2f2] rounded-xl overflow-hidden mb-4"
                style={{ aspectRatio: '952 / 1284' }}
                // above 980px use fixed height instead
              >
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                  alt="Sustainability"
                  className="w-full h-full object-cover object-center"
                  style={{ height: undefined }}
                />
              </div>
              <h3
                className="text-[22px] min-[980px]:text-[28px] font-normal text-[#111111] mb-3"
                style={{ fontFamily: serifFont }}
              >
                Sustainability
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#111111] mb-3">
                Learn how we work to reduce our environmental impact and improve the
                way our products are made.
              </p>
              <Link
                to="/sustainability"
                className="text-[13px] font-bold tracking-wider uppercase text-[#111111] underline hover:opacity-70"
              >
                Read More
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-1">
              <div
                className="bg-[#f2f2f2] rounded-xl overflow-hidden mb-4"
                style={{ aspectRatio: '952 / 1284' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=1843&auto=format&fit=crop"
                  alt="Our products"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3
                className="text-[22px] min-[980px]:text-[28px] font-normal text-[#111111] mb-3"
                style={{ fontFamily: serifFont }}
              >
                Our products
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#111111] mb-3">
                Discover the materials, craftsmanship and design behind our posters,
                frames and hanging accessories.
              </p>
              <Link
                to="/our-products"
                className="text-[13px] font-bold tracking-wider uppercase text-[#111111] underline hover:opacity-70"
              >
                Read More
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-1">
              <div
                className="bg-[#f2f2f2] rounded-xl overflow-hidden mb-4"
                style={{ aspectRatio: '952 / 1284' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
                  alt="Collaborations"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3
                className="text-[22px] min-[980px]:text-[28px] font-normal text-[#111111] mb-3"
                style={{ fontFamily: serifFont }}
              >
                Collaborations
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#111111] mb-3">
                Discover the artists and creative collaborations that shape our
                collections and bring new artistic perspectives to Postery.
              </p>
              <Link
                to="/collaborations"
                className="text-[13px] font-bold tracking-wider uppercase text-[#111111] underline hover:opacity-70"
              >
                Read More
              </Link>
            </div>

          </div>
        </section>
      </main>
    </>
  );
};

export default About;