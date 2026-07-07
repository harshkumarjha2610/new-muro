import React from "react";
import { Link } from "react-router-dom";

const serifFont = "'Cormorant Garamond', Georgia, serif";

const containerClass =
  "max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[80px] xl:px-[96px]";

const About: React.FC = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">

        {/* =========================================================
            SECTION 1: ABOUT US HERO
        ========================================================= */}
        <section className={`${containerClass} pt-10 md:pt-12 mb-20`}>
          <div className="grid grid-cols-1 min-[930px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[615px_minmax(0,1fr)] gap-y-10 gap-x-12 lg:gap-x-16 items-start">

            {/* Image Side */}
            <div
              className="w-full bg-[#f2f2f2] rounded-[12px] overflow-hidden"
              style={{ aspectRatio: "881 / 945" }}
            >
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"
                alt="Interior"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Text Side */}
            <div className="flex flex-col justify-start max-w-[480px] min-[930px]:max-w-none mx-auto min-[930px]:mx-0">

              <h1
                className="text-[32px] min-[930px]:text-[36px] lg:text-[42px] leading-[1.1] font-normal text-[#111111] mb-8 text-center"
                style={{ fontFamily: serifFont }}
              >
                About us
              </h1>

              <div className="space-y-2 text-[14px] font-semibold min-[930px]:text-[13.5px] lg:text-[14px] leading-[1.60] text-[#111111]">
                <p>
                  Postery is a Swedish brand bringing together carefully curated
                  and distinctive art prints. We are a curious and creative team
                  based in Gothenburg, Sweden, and we believe in diversity,
                  value and quality. We are united by our love for art, and we
                  are passionate about trends, interiors and design that help
                  create that personal space. We enjoy the aesthetics of the
                  world, and we invite everyone to join and contribute – to
                  explore the beauty of art and design.
                </p>

                <p>
                  Inspired by Scandinavian design heritage, we curate art prints
                  that combine timeless aesthetics with contemporary creativity.
                  Each collection is thoughtfully selected by our art directors,
                  bringing together influences from modern art, design and
                  visual culture. Our posters, frames and hanging accessories
                  are designed to complement modern living spaces and to stand
                  the test of time as staples of a thoughtfully curated home.
                </p>

                <p>
                  Over the years, Postery&apos;s collections and gallery walls
                  have been featured in several respected interior and design
                  publications, including Elle Decoration,{" "}
                  The World of Interiors,{" "}
                  Residence, Nya Rum and{" "}
                  Bo Living. These features reflect our ongoing
                  commitment to bringing inspiring art and thoughtfully design
                  into modern interiors.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 2: OUR PURPOSE
        ========================================================= */}
        <section className="w-full mb-[48px]">
          <div className={`${containerClass}`}>
            <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,760px)] lg:grid-cols-[300px_minmax(0,760px)] xl:grid-cols-[320px_minmax(0,760px)] gap-y-4 md:gap-x-[40px] lg:gap-x-[48px] xl:gap-x-[56px] items-start">

              <h2
                className="text-[28px] md:text-[29px] lg:text-[30px] font-normal text-[#111111] leading-[1.2]"
                style={{ fontFamily: serifFont }}
              >
                Our purpose
              </h2>

              <p className="max-w-[760px] font-semibold text-[14px] leading-[1.45] text-[#111111]">
                Our purpose is to make high-quality art accessible to homes
                around the world. We believe that beautiful design should be
                available to everyone and that art has the power to transform
                everyday spaces. At Postery, we aim to inspire creativity and
                help people discover pieces that reflect their personality and
                style. Our ambition is to share our passion for art and design
                while making it easier for people everywhere to create
                interiors that feel personal, inspiring and unique.
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 3: OUR PARTNERS
        ========================================================= */}
        <section className="w-full mb-[64px]">
          <div className={`${containerClass}`}>
            <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,760px)] lg:grid-cols-[300px_minmax(0,760px)] xl:grid-cols-[320px_minmax(0,760px)] gap-y-4 md:gap-x-[40px] lg:gap-x-[48px] xl:gap-x-[56px] items-start">

              <h2
                className="text-[28px] md:text-[29px] lg:text-[30px] font-normal text-[#111111] leading-[1.2]"
                style={{ fontFamily: serifFont }}
              >
                Our partners
              </h2>

              <p className="max-w-[760px] font-semibold text-[14px] leading-[1.45] text-[#111111]">
                Collaboration is an important part of Postery&apos;s journey.
                Over the years we have worked with selected global retailers
                and creative partners to bring curated art collections to new
                audiences. Our collaborations include projects with
                international brands such as H&amp;M,{" "}
                Lefties (Inditex) and{" "}
                Lagerhaus, where Postery collections have been
                introduced in retail environments across different markets.
                Through these partnerships we continue to explore new ways of
                sharing art and design with a wider community.
              </p>
            </div>
          </div>
        </section>


        {/* =========================================================
            SECTION 4: LARGE IMAGE
        ========================================================= */}
        <section className={`${containerClass} mb-20`}>

          <div className="w-full bg-[#f2f2f2] rounded-[12px] overflow-hidden aspect-[16/9] md:aspect-[2.15/1]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
              alt="Gallery Wall"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="mt-7 text-center max-w-[760px] mx-auto">

            <p className="text-[14px] font-semibold leading-[1.55] text-[#111111] mb-8">
              If you are looking for inspiration for your next art print or
              ideas for styling your home, our Magazine is where creativity and
              design come together. Through artist features, styling guides and
              curated interiors, we share inspiration for creating personal
              spaces with posters and gallery walls.
            </p>

            <button className="inline-flex items-center justify-center min-w-[205px] h-[46px] px-7 rounded-full border border-[#999999] text-[#111111] text-[14px] font-medium hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors">
              Discover our Magazine
            </button>

          </div>
        </section>


        {/* =========================================================
            SECTION 5: BOTTOM THREE CARDS
        ========================================================= */}
        <section className={`${containerClass} mb-8`}>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-4">

            {/* Card 1 */}
            <div className="flex flex-col">

              <div className="w-full bg-[#f2f2f2] rounded-[12px] overflow-hidden mb-5 aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
                  alt="Sustainability"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <h3
                className="text-[22px] md:text-[24px] lg:text-[26px] font-normal text-[#111111] mb-3 tracking-tight"
                style={{ fontFamily: serifFont }}
              >
                Sustainability
              </h3>

              <p className="text-[14px] leading-[1.5] text-[#333333] mb-4 flex-grow">
                Learn how we work to reduce our environmental impact and improve
                the way our products are made.
              </p>

              <Link
                to="/sustainability"
                className="text-[12px] font-semibold tracking-widest uppercase text-[#111111] underline hover:opacity-70"
              >
                Read More
              </Link>

            </div>


            {/* Card 2 */}
            <div className="flex flex-col">

              <div className="w-full bg-[#f2f2f2] rounded-[12px] overflow-hidden mb-5 aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=1843&auto=format&fit=crop"
                  alt="Our products"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <h3
                className="text-[22px] md:text-[24px] lg:text-[26px] font-normal text-[#111111] mb-3 tracking-tight"
                style={{ fontFamily: serifFont }}
              >
                Our products
              </h3>

              <p className="text-[14px] leading-[1.5] text-[#333333] mb-4 flex-grow">
                Discover the materials, craftsmanship and design behind our
                posters, frames and hanging accessories.
              </p>

              <Link
                to="/our-products"
                className="text-[12px] font-semibold tracking-widest uppercase text-[#111111] underline hover:opacity-70"
              >
                Read More
              </Link>

            </div>


            {/* Card 3 */}
            <div className="flex flex-col">

              <div className="w-full bg-[#f2f2f2] rounded-[12px] overflow-hidden mb-5 aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
                  alt="Collaborations"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <h3
                className="text-[22px] md:text-[24px] lg:text-[26px] font-normal text-[#111111] mb-3 tracking-tight"
                style={{ fontFamily: serifFont }}
              >
                Collaborations
              </h3>

              <p className="text-[14px] leading-[1.5] text-[#333333] mb-4 flex-grow">
                Discover the artists and creative collaborations that shape our
                collections and bring new artistic perspectives to Postery.
              </p>

              <Link
                to="/collaborations"
                className="text-[12px] font-semibold tracking-widest uppercase text-[#111111] underline hover:opacity-70"
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