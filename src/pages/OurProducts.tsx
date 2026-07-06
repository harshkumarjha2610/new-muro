import React from "react";
import { Link } from "react-router-dom";

const serifFont = "'Cormorant Garamond', Georgia, serif";
const containerClass = "max-w-[1400px] mx-auto px-4 md:px-8";

const BottomThreeColumns = () => (
  <section className={`${containerClass} mb-8 mt-10`}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6 lg:gap-x-8">
      {/* Item 1 */}
      <div className="flex flex-col">
        <div className="bg-[#f2f2f2] rounded-[16px] overflow-hidden aspect-square mb-5">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="About us"
            className="w-full h-full object-cover"
          />
        </div>

        <h3
          className="text-[22px] md:text-[24px] lg:text-[26px] font-normal text-[#111111] mb-3 tracking-tight"
          style={{ fontFamily: serifFont }}
        >
          About us
        </h3>

        <p className="text-[14px] leading-[1.5] text-[#333333] mb-4 flex-grow">
          Get to know Postery, our story and the passion for art and design that
          inspires everything we do.
        </p>

        <Link
          to="/about"
          className="text-[12px] font-semibold tracking-widest uppercase text-[#111111] underline hover:opacity-70"
        >
          Read More
        </Link>
      </div>

      {/* Item 2 */}
      <div className="flex flex-col">
        <div className="bg-[#f2f2f2] rounded-[16px] overflow-hidden aspect-square mb-5">
          <img
            src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop"
            alt="Our products"
            className="w-full h-full object-cover"
          />
        </div>

        <h3
          className="text-[22px] md:text-[24px] lg:text-[26px] font-normal text-[#111111] mb-3 tracking-tight"
          style={{ fontFamily: serifFont }}
        >
          Our products
        </h3>

        <p className="text-[14px] leading-[1.5] text-[#333333] mb-4 flex-grow">
          Discover the materials, craftsmanship and design behind our posters,
          frames and hanging accessories.
        </p>

        <Link
          to="/our-products"
          className="text-[12px] font-semibold tracking-widest uppercase text-[#111111] underline hover:opacity-70"
        >
          Read More
        </Link>
      </div>

      {/* Item 3 */}
      <div className="flex flex-col">
        <div className="bg-[#f2f2f2] rounded-[16px] overflow-hidden aspect-square mb-5">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
            alt="Sustainability"
            className="w-full h-full object-cover"
          />
        </div>

        <h3
          className="text-[22px] md:text-[24px] lg:text-[26px] font-normal text-[#111111] mb-3 tracking-tight"
          style={{ fontFamily: serifFont }}
        >
          Sustainability
        </h3>

        <p className="text-[14px] leading-[1.5] text-[#333333] mb-4 flex-grow">
          Learn how we work to reduce our environmental impact and improve the
          way our products are made.
        </p>

        <Link
          to="/sustainability"
          className="text-[12px] font-semibold tracking-widest uppercase text-[#111111] underline hover:opacity-70"
        >
          Read More
        </Link>
      </div>
    </div>
  </section>
);

const OurProducts: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-[1400px] px-4 md:px-8 pt-10 mb-20">
        <div className="grid grid-cols-1 min-[930px]:grid-cols-[1.05fr_1fr] lg:grid-cols-[615px_1fr] gap-y-10 gap-x-12 lg:gap-x-16 items-start">
          {/* Left Image */}
          <div
            className="w-full bg-[#f2f2f2] rounded-[16px] overflow-hidden"
            style={{ aspectRatio: "881 / 945" }}
          >
            <img
              src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=2070&auto=format&fit=crop"
              alt="Our Products Display"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Text */}
          <div className="flex flex-col justify-start max-w-[480px] min-[930px]:max-w-none mx-auto min-[930px]:mx-0">
            <h1
              className="text-[32px] min-[930px]:text-[36px] lg:text-[42px] leading-[1.1] font-normal text-[#111111] mb-8 text-center"
              style={{ fontFamily: serifFont }}
            >
              Our products
            </h1>

            <div className="space-y-4 text-[14px] min-[930px]:text-[13.5px] lg:text-[14px] leading-[1.65] text-[#111111]">
              <p>
                At Postery, our products are designed to highlight the art while
                fitting naturally into modern interiors. From premium posters
                printed on carefully selected paper to a wide range of frames in
                different materials, colours and sizes, each piece is created
                with attention to quality and detail. Alongside our classic
                frames, we also explore new design expressions through pieces
                such as our distinctive wavy frame from the Postery Atelier
                collection. Together, our posters, frames and accessories are
                designed to make it easy to create gallery walls and personal
                spaces that reflect your style. Explore the materials, frames
                and designs behind our products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posters Section */}
      <section className="w-full mb-[46px]">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12 lg:px-[80px] xl:px-[96px] grid grid-cols-1 md:grid-cols-[260px_minmax(0,760px)] lg:grid-cols-[300px_minmax(0,760px)] xl:grid-cols-[320px_minmax(0,760px)] gap-y-4 md:gap-x-[40px] lg:gap-x-[48px] xl:gap-x-[56px] items-start">
          <h2
            className="text-[28px] md:text-[30px] lg:text-[32px] font-normal text-[#111111] leading-[1.2]"
            style={{ fontFamily: serifFont }}
          >
            Posters
          </h2>

          <div className="text-[14px] leading-[1.45] text-[#111111] space-y-[10px]">
            <p>
              Our <span className="font-bold">poster selection</span> is one of
              the widest you&apos;ll find. Whatever your style, space, or mood,
              there&apos;s a print made to fit.
            </p>

            <p>
              We work with artists, photographers, and designers from around the
              world, bringing you everything from bold abstracts and
              black-and-white photography to landscapes, botanical prints, and
              modern illustrations. Whether you&apos;re after a single statement
              piece or building a full gallery wall, it&apos;s all here.
            </p>

            <p>
              All our posters are printed on premium{" "}
              <span className="font-bold">200 g/m² paper</span> with a soft matte
              finish, giving you rich colours and crisp detail. The paper is{" "}
              <span className="font-bold">archive-proof</span>, so your print
              won&apos;t yellow over time, and{" "}
              <span className="font-bold">FSC-certified</span>, supporting more
              responsible forestry.
            </p>

            <p>
              We print in some of Sweden&apos;s most modern printing facilities,
              all with{" "}
              <span className="font-bold">ISO 14001 certification</span> – your
              guarantee of a careful process and a high-quality result.
            </p>
          </div>
        </div>
      </section>

      {/* Frames Section */}
      <section className="w-full mb-24">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12 lg:px-[80px] xl:px-[96px] grid grid-cols-1 md:grid-cols-[260px_minmax(0,760px)] lg:grid-cols-[300px_minmax(0,760px)] xl:grid-cols-[320px_minmax(0,760px)] gap-y-4 md:gap-x-[40px] lg:gap-x-[48px] xl:gap-x-[56px] items-start">
          <h2
            className="text-[28px] md:text-[30px] lg:text-[32px] font-normal text-[#111111] leading-[1.2]"
            style={{ fontFamily: serifFont }}
          >
            Frames
          </h2>

          <div className="text-[14px] leading-[1.45] text-[#111111] space-y-[10px]">
            <p>
              Our <span className="font-bold">frames</span> are made to do
              justice to the art they hold. Whatever your style, wall, or
              budget, there&apos;s a frame made to fit.
            </p>

            <p>
              The <span className="font-bold">Wavy Frame</span> stands out with
              its soft, sculptural curves, turning any poster into a piece of art
              in its own right. The{" "}
              <span className="font-bold">Ribbed Frame</span> offers a quieter
              kind of character – subtle grooves that add texture and depth.
            </p>

            <p>
              For a more classic look, our{" "}
              <span className="font-bold">wooden frames</span> come in genuine
              black, white, and oak, bringing natural warmth to any room. Our{" "}
              <span className="font-bold">aluminium frames</span> in black,
              white, gold, space grey, and silver offer a clean, modern finish
              that suits any interior.
            </p>

            <p>
              If you want to bring more personality to your walls, our{" "}
              <span className="font-bold">coloured frames</span> are a great
              choice. From fresh greens and warm oranges to soft pastel blues,
              they work just as well on their own as part of a gallery wall.
            </p>

            <p>
              Every Postery frame is made with solid materials and clear{" "}
              <span className="font-bold">1,2 mm plexiglass</span> that protects
              your print while letting every detail shine through.
            </p>
          </div>
        </div>
      </section>

      {/* Wavy Frame Section */}
      <section className="bg-[#f4f1eb] mb-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[96px] py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.15fr] gap-3 items-stretch">
            {/* Left Image */}
            <div className="w-full h-[520px] lg:h-[620px] overflow-hidden rounded-[10px]">
              <img
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2080&auto=format&fit=crop"
                alt="Bedroom with framed artwork"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Middle Image */}
            <div className="w-full h-[520px] lg:h-[620px] overflow-hidden rounded-[10px]">
              <img
                src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1964&auto=format&fit=crop"
                alt="Wavy Frame close-up"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Text */}
            <div className="flex flex-col items-center justify-center text-center px-6 lg:px-10 py-14 md:col-span-2 lg:col-span-1">
              <span className="text-[12px] font-medium uppercase text-[#111111] mb-5">
                POSTERY ATELIER
              </span>

              <h2
                className="text-[28px] md:text-[30px] lg:text-[32px] font-normal text-[#111111] mb-8 leading-tight"
                style={{ fontFamily: serifFont }}
              >
                The Wavy Frame
              </h2>

              <p className="text-[14px] leading-[1.45] text-[#111111] mb-8 max-w-[390px]">
                Discover the{" "}
                <span className="font-semibold">Wavy Frame</span> by Postery – a
                premium picture frame featuring a unique wavy design. Its
                innovative design can elevate any space and become the
                centerpiece of your home. Made for the bold and playful; Wavy
                Frame comes available in a diverse palette of colors. Perfect
                for creating a truly unique gallery wall.
              </p>

              <Link
                to="/products"
                className="inline-flex items-center justify-center min-w-[205px] h-[46px] px-6 rounded-full border border-[#999999] text-[#111111] text-[14px] font-medium hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors"
              >
                Discover the Wavy Frame
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ribbed Frames Section */}
      <section className="w-full mb-[42px]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[80px] xl:px-[96px] grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-cols-[minmax(0,610px)_minmax(0,650px)] xl:grid-cols-[minmax(0,620px)_minmax(0,660px)] gap-y-10 md:gap-x-[50px] lg:gap-x-[65px] items-start">
          {/* Left Content */}
          <div className="pt-1 md:pt-2">
            <h2
              className="text-[28px] md:text-[29px] lg:text-[30px] font-normal text-[#111111] leading-[1.2] mb-[30px]"
              style={{ fontFamily: serifFont }}
            >
              Ribbed Frames
            </h2>

            <div className="max-w-[610px] text-[14px] leading-[1.45] text-[#111111] space-y-[10px]">
              <p>
                Defined by its elegant ribbed structure, the Ribbed Frame
                introduces a sculptural dimension to wall art. Its textured
                surface catches the light softly, adding depth while maintaining
                a clean, minimal silhouette inspired by Scandinavian design. A
                distinctive frame designed to elevate your prints and bring a
                refined, sophisticated touch to your home. Crafted from yellow
                poplar wood, the Ribbed Frame combines natural materials with a
                refined, sculptural design.
              </p>

              <p>
                The Ribbed Frame is available in a selection of carefully chosen
                wood finishes, from natural oak to black, white and dark oak.
                Explore our ribbed frames.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center justify-center mt-[58px] min-w-[185px] h-[46px] px-6 rounded-full border border-[#b5b5b5] text-[#111111] text-[14px] font-medium hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors"
            >
              Explore Ribbed Frames
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-full h-[500px] md:h-[560px] lg:h-[620px] xl:h-[650px] overflow-hidden rounded-[12px]">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop"
              alt="Ribbed Frames"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Accessories and Poster Hangers */}
      <section className="w-full mb-[48px]">
        <div className="max-w-[1420px] mx-auto px-6 md:px-12 lg:px-[80px] xl:px-[96px]">
          {/* Accessories */}
          <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,760px)] lg:grid-cols-[300px_minmax(0,760px)] xl:grid-cols-[320px_minmax(0,760px)] gap-y-4 md:gap-x-[40px] lg:gap-x-[48px] xl:gap-x-[56px] items-start">
            <h2
              className="text-[28px] md:text-[29px] lg:text-[30px] font-normal text-[#111111] leading-[1.2]"
              style={{ fontFamily: serifFont }}
            >
              Accessories
            </h2>

            <div className="max-w-[760px] text-[14px] leading-[1.45] text-[#111111]">
              <p>
                We offer great alternatives to traditional nails when mounting
                frames and posters onto a wall. Discover the innovative
                self-adhesive Tesa products you can easily apply to your wall and
                remove without a trace, or check out the easy-to-use picture
                hook compatible with all types of picture frames.
              </p>
            </div>
          </div>

          {/* Poster Hangers */}
          <div className="mt-[46px] grid grid-cols-1 md:grid-cols-[260px_minmax(0,760px)] lg:grid-cols-[300px_minmax(0,760px)] xl:grid-cols-[320px_minmax(0,760px)] gap-y-4 md:gap-x-[40px] lg:gap-x-[48px] xl:gap-x-[56px] items-start">
            <h2
              className="text-[28px] md:text-[29px] lg:text-[30px] font-normal text-[#111111] leading-[1.2]"
              style={{ fontFamily: serifFont }}
            >
              Poster Hangers
            </h2>

            <div className="max-w-[760px] text-[14px] leading-[1.45] text-[#111111]">
              <p>
                We offer great alternatives to traditional nails when mounting
                frames and posters onto a wall. Discover the innovative
                self-adhesive Tesa products you can easily apply to your wall and
                remove without a trace, or check out the easy-to-use picture
                hook compatible with all types of picture frames.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomThreeColumns />
    </main>
  );
};

export default OurProducts;