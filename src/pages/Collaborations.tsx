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

const collabData = [
  {
    title: "Moomin™",
    description: "Step into the wonderful world of Moomin and his friends!",
    image: "/moomin_grid_poster_1783128981101.png"
  },
  {
    title: "Pippi Longstocking™",
    description: "Pippi Longstocking is a timeless character created by Swedish author Astrid Lindgren.",
    image: "/pippi_longstocking_wavy_1783128965148.png"
  },
  {
    title: "The Beatles™",
    description: "The Postery Beatles Collection is a curated tribute to one of the most iconic bands in music history.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop"
  },
  {
    title: "Yellow Submarine™",
    description: "The Yellow Submarine Collection is a vibrant celebration of imagination, music, and visual storytelling.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Smiley®",
    description: "Smiley® celebrates creativity and individuality through design-led lifestyle collections, limited edition ranges and collaborations with world-renowned designers.",
    image: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=2052&auto=format&fit=crop"
  },
  {
    title: "SmileyWorld®",
    description: "Born from The Original Smiley® Brand, SmileyWorld® is a creative universe filled with thousands of unique icons.",
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=2070&auto=format&fit=crop"
  }
];

const Collaborations: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white pt-10 pb-20">
      
      {/* Hero Section */}
      <section className={`${containerClass} mb-16 mt-4 md:mt-8`}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">
          <div className="w-full bg-[#f2f2f2] rounded-[16px] overflow-hidden" style={{ aspectRatio: '1/1' }}>
            <img 
              src="/hero_moomin_poster_1783128948876.png" 
              alt="Collaborations Hero" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left px-0 md:px-8">
            <h1 className="text-[32px] md:text-[36px] font-normal text-[#111111] mb-8 text-center" style={{ fontFamily: serifFont }}>
              Collaborations
            </h1>
            <div className="text-[13px] md:text-[14px] leading-relaxed text-[#111111] space-y-5 mb-8">
              <p>
                At Postery, collaboration is an important part of how we explore new artistic perspectives and bring meaningful stories into our collections. By working with cultural institutions, iconic brands and creative partners, we create art prints that celebrate beloved characters, timeless artworks and distinctive visual expressions.
              </p>
              <p>
                Our collaborations have included projects inspired by the worlds of Pippi Longstocking and Astrid Lindgren, Moomin, The Beatles, Smiley®, and artworks connected to Henri Matisse through Rosenstiels, among others. Each collaboration allows us to reinterpret cultural icons through the lens of contemporary design, creating collections that bring both nostalgia and creativity into modern interiors.
              </p>
              <p>
                Through these partnerships we continue to celebrate art, storytelling and creativity, bringing inspiring collections to homes around the world. Discover our collaborations and the creative worlds that inspire them.
              </p>
            </div>
            <div className="flex justify-center">
              <button className="px-8 py-3 rounded-full border border-[#111111] text-[#111111] text-[13px] font-bold hover:bg-[#111111] hover:text-white transition-colors">
                Discover our collaborations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className={`${containerClass} mb-24`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collabData.map((collab, idx) => (
            <Link to="/products" key={idx} className="group relative w-full bg-[#f2f2f2] rounded-[16px] overflow-hidden block" style={{ aspectRatio: '4/5' }}>
              <img src={collab.image} alt={collab.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white flex flex-col items-start text-left">
                <h3 className="text-[20px] font-bold mb-2">{collab.title}</h3>
                <p className="text-[13px] leading-snug text-white/90 mb-4 line-clamp-2">
                  {collab.description}
                </p>
                <span className="text-[11px] font-bold tracking-widest uppercase border-b border-white pb-0.5 group-hover:border-transparent transition-colors">
                  EXPLORE
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Artists Section */}
      <section className={`${containerClass} mb-12`}>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="text-[22px] font-normal text-[#111111]" style={{ fontFamily: serifFont }}>Artists</h2>
          <div className="flex flex-col items-start">
            <div className="text-[14px] md:text-[15px] leading-relaxed text-[#111111] space-y-6 mb-8">
              <p>
                At Postery, we are proud to collaborate with both aspiring and established artists worldwide. We're always looking for new creatives to join us. Our art directors at the Postery head office continuously review and curate submitted artwork. In case of an agreed collaboration, it's of great importance to us to maintain a personal relationship with the artists and provide feedback and support.
              </p>
              <p>
                If you are interested in collaborating with us, please send us an e-mail to <a href="mailto:artists@postery.com" className="text-blue-600 hover:underline font-medium">artists@postery.com</a> with your artist background and portfolio or a selection of your works. We will get back to you as soon as we have reviewed your artwork. Please note that we sometimes need a couple of weeks to come to a decision since we at times receive a high amount of submissions.
              </p>
            </div>
            <button className="px-8 py-3 rounded-full border border-[#111111] text-[#111111] text-[13px] font-bold hover:bg-[#111111] hover:text-white transition-colors">
              Discover our artists
            </button>
          </div>
        </div>
      </section>

      {/* Influencers Section */}
      <section className={`${containerClass} mb-12`}>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="text-[22px] font-normal text-[#111111]" style={{ fontFamily: serifFont }}>Influencers</h2>
          <div className="text-[14px] md:text-[15px] leading-relaxed text-[#111111] space-y-6">
            <p>
              We love collaborating with skilled influencers, and we are always looking for new talent to collaborate with. You're welcome to direct your inquiry to our social media team in charge of influencer marketing at <a href="mailto:collabs@postery.com" className="text-blue-600 hover:underline font-medium">collabs@postery.com</a>. They will get back to you if they see a possible opportunity for us to collaborate. If there are no current openings for new partnerships we will keep your profile and contact you if an opportunity arises.
            </p>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className={`${containerClass} mb-12`}>
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-12 items-start">
          <h2 className="text-[22px] font-normal text-[#111111]" style={{ fontFamily: serifFont }}>Press</h2>
          <div className="text-[14px] md:text-[15px] leading-relaxed text-[#111111] space-y-6">
            <p>
              We welcome media representatives to contact us at <a href="mailto:sales@postery.com" className="text-blue-600 hover:underline font-medium">sales@postery.com</a> for all types of press-related inquiries such as press loans, press photos, and other PR-related content. When using our images, we ask you to include a reference to us.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom 3 Columns */}
      <BottomThreeColumns />

    </main>
  );
};

export default Collaborations;
