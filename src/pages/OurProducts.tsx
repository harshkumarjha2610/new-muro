import React from "react";
import { Link } from "react-router-dom";

const serifFont = "Georgia, 'Times New Roman', serif";
const containerClass = "max-w-[1200px] mx-auto px-4 md:px-8";

const BottomThreeColumns = () => (
  <section className={`${containerClass} mb-8 mt-16`}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {/* Item 1 */}
      <div>
        <div className="bg-[#f2f2f2] rounded-[16px] overflow-hidden aspect-[3/4] mb-6">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="About us" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-[24px] font-normal text-[#111111] mb-4" style={{ fontFamily: serifFont }}>About us</h3>
        <p className="text-[14px] leading-relaxed text-[#333333] mb-6 h-16">
          Get to know Postery, our story and the passion for art and design that inspires everything we do.
        </p>
        <Link to="/about" className="text-[12px] font-bold tracking-wider uppercase text-[#111111] hover:underline">Read More</Link>
      </div>
      {/* Item 2 */}
      <div>
        <div className="bg-[#f2f2f2] rounded-[16px] overflow-hidden aspect-[3/4] mb-6">
          <img src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop" alt="Our products" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-[24px] font-normal text-[#111111] mb-4" style={{ fontFamily: serifFont }}>Our products</h3>
        <p className="text-[14px] leading-relaxed text-[#333333] mb-6 h-16">
          Discover the materials, craftsmanship and design behind our posters, frames and hanging accessories.
        </p>
        <Link to="/our-products" className="text-[12px] font-bold tracking-wider uppercase text-[#111111] hover:underline">Read More</Link>
      </div>
      {/* Item 3 */}
      <div>
        <div className="bg-[#f2f2f2] rounded-[16px] overflow-hidden aspect-[3/4] mb-6">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Sustainability" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-[24px] font-normal text-[#111111] mb-4" style={{ fontFamily: serifFont }}>Sustainability</h3>
        <p className="text-[14px] leading-relaxed text-[#333333] mb-6 h-16">
          Learn how we work to reduce our environmental impact and improve the way our products are made.
        </p>
        <Link to="/sustainability" className="text-[12px] font-bold tracking-wider uppercase text-[#111111] hover:underline">Read More</Link>
      </div>
    </div>
  </section>
);

const OurProducts: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white pt-10 pb-20">
      
      {/* Hero Section */}
      <section className={`${containerClass} mb-24 mt-4 md:mt-8`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="w-full bg-[#f2f2f2] rounded-[16px] overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <img 
              src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=2070&auto=format&fit=crop" 
              alt="Our Products Display" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left px-0 md:px-8">
            <h1 className="text-[32px] md:text-[40px] font-normal text-[#111111] mb-8 text-center" style={{ fontFamily: serifFont }}>
              Our products
            </h1>
            <div className="text-[14px] md:text-[15px] leading-relaxed text-[#111111] space-y-6">
              <p>
                At Postery, our products are designed to highlight the art while fitting naturally into modern interiors. From premium posters printed on carefully selected paper to a wide range of frames in different materials, colours and sizes, each piece is created with attention to quality and detail. Alongside our classic frames, we also explore new design expressions through pieces such as our distinctive wavy frame from the Postery Atelier collection. Together, our posters, frames and accessories are designed to make it easy to create gallery walls and personal spaces that reflect your style. Explore the materials, frames and designs behind our products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posters Section */}
      <section className={`${containerClass} mb-16`}>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="text-[22px] font-normal text-[#111111]" style={{ fontFamily: serifFont }}>Posters</h2>
          <div className="text-[14px] md:text-[15px] leading-relaxed text-[#111111] space-y-6">
            <p>
              Our <strong>poster selection</strong> is one of the widest you'll find. Whatever your style, space, or mood, there's a print made to fit.
            </p>
            <p>
              We work with artists, photographers, and designers from around the world, bringing you everything from bold abstracts and black-and-white photography to landscapes, botanical prints, and modern illustrations. Whether you're after a single statement piece or building a full gallery wall, it's all here.
            </p>
            <p>
              All our posters are printed on premium <strong>200 g/m² paper</strong> with a soft matte finish, giving you rich colours and crisp detail. The paper is <strong>archive-proof</strong>, so your print won't yellow over time, and <strong>FSC-certified</strong>, supporting more responsible forestry.
            </p>
            <p>
              We print in some of Sweden's most modern printing facilities, all with <strong>ISO 14001 certification</strong> – your guarantee of a careful process and a high-quality result.
            </p>
          </div>
        </div>
      </section>

      {/* Frames Section */}
      <section className={`${containerClass} mb-24`}>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="text-[22px] font-normal text-[#111111]" style={{ fontFamily: serifFont }}>Frames</h2>
          <div className="text-[14px] md:text-[15px] leading-relaxed text-[#111111] space-y-6">
            <p>
              Our <strong>frames</strong> are made to do justice to the art they hold. Whatever your style, wall, or budget, there's a frame made to fit.
            </p>
            <p>
              The <strong>Wavy Frame</strong> stands out with its soft, sculptural curves, turning any poster into a piece of art in its own right. The <strong>Ribbed Frame</strong> offers a quieter kind of character – subtle grooves that add texture and depth.
            </p>
            <p>
              For a more classic look, our <strong>wooden frames</strong> come in genuine black, white, and oak, bringing natural warmth to any room. Our <strong>aluminium frames</strong> in black, white, gold, space grey, and silver offer a clean, modern finish that suits any interior.
            </p>
            <p>
              If you want to bring more personality to your walls, our <strong>coloured frames</strong> are a great choice. From fresh greens and warm oranges to soft pastel blues, they work just as well on their own as part of a gallery wall.
            </p>
            <p>
              Every Postery frame is made with solid materials and clear <strong>1,2 mm plexiglass</strong> that protects your print while letting every detail shine through.
            </p>
          </div>
        </div>
      </section>

      {/* Highlighted Product: The Wavy Frame */}
      <section className="bg-[#f0ede6] mb-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_minmax(320px,420px)] items-stretch min-h-[480px]">
            {/* Left image: bedroom with framed artwork */}
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2080&auto=format&fit=crop"
                alt="Bedroom with framed artwork"
                className="w-full h-full object-cover"
                style={{ minHeight: '480px' }}
              />
            </div>
            {/* Right image: close-up of wavy frame */}
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1629196914555-52054ff456e7?q=80&w=1964&auto=format&fit=crop"
                alt="Wavy Frame close-up"
                className="w-full h-full object-cover"
                style={{ minHeight: '480px' }}
              />
            </div>
            {/* Text panel */}
            <div className="flex flex-col items-center justify-center text-center px-10 py-14 bg-[#f0ede6]">
              <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#555555] mb-3">POSTERY ATELIER</span>
              <h2 className="text-[28px] font-normal text-[#111111] mb-5" style={{ fontFamily: serifFont }}>The Wavy Frame</h2>
              <p className="text-[13px] leading-relaxed text-[#333333] mb-8">
                Discover the{" "}
                <span className="underline">Wavy Frame</span> by Postery – a premium picture
                frame featuring a unique wavy design. Its innovative design
                can elevate any space and become the centerpiece of your
                home.{" "}
                <span className="underline">Made for the bold and playful; Wavy Frame</span> comes
                available in a diverse palette of colors. Perfect for creating a
                truly unique{" "}
                <span className="underline">gallery wall</span>.
              </p>
              <Link
                to="/products"
                className="inline-block px-7 py-2.5 rounded-full border border-[#111111] text-[#111111] text-[12px] hover:bg-[#111111] hover:text-white transition-colors"
              >
                Discover the Wavy Frame
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlighted Product: Ribbed Frames */}
      <section className={`${containerClass} mb-24`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="flex flex-col text-left pr-0 md:pr-8 order-2 md:order-1">
            <h2 className="text-[26px] font-normal text-[#111111] mb-6" style={{ fontFamily: serifFont }}>Ribbed Frames</h2>
            <div className="text-[14px] md:text-[15px] leading-relaxed text-[#111111] space-y-6 mb-8">
              <p>
                Defined by its elegant ribbed structure, the Ribbed Frame introduces a sculptural dimension to wall art. Its textured surface catches the light softly, adding depth while maintaining a clean, minimal silhouette inspired by Scandinavian design. A distinctive frame designed to elevate your prints and bring a refined, sophisticated touch to your home. Crafted from yellow poplar wood, the Ribbed Frame combines natural materials with a refined, sculptural design.
              </p>
              <p>
                The Ribbed Frame is available in a selection of carefully chosen wood finishes, from natural oak to black, white and dark oak. Explore our ribbed frames.
              </p>
            </div>
            <Link to="/products" className="inline-block self-start px-8 py-3 rounded-full border border-[#111111] text-[#111111] text-[13px] font-bold hover:bg-[#111111] hover:text-white transition-colors">
              Explore Ribbed Frames
            </Link>
          </div>
          <div className="w-full bg-[#f2f2f2] rounded-[16px] overflow-hidden order-1 md:order-2" style={{ aspectRatio: '4/5' }}>
            <img 
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop" 
              alt="Ribbed Frames" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className={`${containerClass} mb-12`}>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="text-[22px] font-normal text-[#111111]" style={{ fontFamily: serifFont }}>Accessories</h2>
          <div className="text-[14px] md:text-[15px] leading-relaxed text-[#111111] space-y-6">
            <p>
              We offer great alternatives to traditional nails when mounting frames and posters onto a wall. Discover the innovative self-adhesive Tesa products you can easily apply to your wall and remove without a trace, or check out the easy-to-use picture hooks compatible with all types of picture frames.
            </p>
          </div>
        </div>
      </section>

      {/* Poster Hangers */}
      <section className={`${containerClass} mb-24`}>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="text-[22px] font-normal text-[#111111]" style={{ fontFamily: serifFont }}>Poster Hangers</h2>
          <div className="text-[14px] md:text-[15px] leading-relaxed text-[#111111] space-y-6">
            <p>
              We offer great alternatives to traditional nails when mounting frames and posters onto a wall. Discover the innovative self-adhesive Tesa products you can easily apply to your wall and remove without a trace, or check out the easy-to-use picture hooks compatible with all types of picture frames.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom 3 Columns */}
      <BottomThreeColumns />

    </main>
  );
};

export default OurProducts;
