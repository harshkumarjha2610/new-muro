import React from "react";
import { Link } from "react-router-dom";

const serifFont = "Georgia, 'Times New Roman', serif";
const containerClass =
  "max-w-[1440px] mx-auto px-6 md:px-12 lg:px-[80px] xl:px-[96px]";

const BottomThreeColumns = () => (
  <section className={`${containerClass} mb-8 mt-16`}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-4">
      {/* Item 1 */}
      <div className="flex flex-col">
        <div className="bg-[#f2f2f2] rounded-[12px] overflow-hidden aspect-square mb-5">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="About us"
            className="w-full h-full object-cover"
          />
        </div>

        <h3
          className="text-[22px] md:text-[24px] font-normal text-[#111111] mb-3"
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
          className="text-[12px] font-bold tracking-wider uppercase text-[#111111] hover:underline"
        >
          Read More
        </Link>
      </div>

      {/* Item 2 */}
      <div className="flex flex-col">
        <div className="bg-[#f2f2f2] rounded-[12px] overflow-hidden aspect-square mb-5">
          <img
            src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2070&auto=format&fit=crop"
            alt="Our products"
            className="w-full h-full object-cover"
          />
        </div>

        <h3
          className="text-[22px] md:text-[24px] font-normal text-[#111111] mb-3"
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
          className="text-[12px] font-bold tracking-wider uppercase text-[#111111] hover:underline"
        >
          Read More
        </Link>
      </div>

      {/* Item 3 */}
      <div className="flex flex-col">
        <div className="bg-[#f2f2f2] rounded-[12px] overflow-hidden aspect-square mb-5">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
            alt="Sustainability"
            className="w-full h-full object-cover"
          />
        </div>

        <h3
          className="text-[22px] md:text-[24px] font-normal text-[#111111] mb-3"
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
          className="text-[12px] font-bold tracking-wider uppercase text-[#111111] hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  </section>
);

const collabData = [
  {
    title: "Moomin™",
    description: "Step into the wonderful world of Moomin and his friends!",
    image: "/moomin_grid_poster_1783128981101.png",
  },
  {
    title: "Pippi Longstocking™",
    description:
      "Pippi Longstocking is a timeless character created by Swedish author Astrid Lindgren.",
    image: "/pippi_longstocking_wavy_1783128965148.png",
  },
  {
    title: "The Beatles™",
    description:
      "The Postery Beatles Collection is a curated tribute to one of the most iconic bands in music history.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
  },
  {
    title: "Yellow Submarine™",
    description:
      "The Yellow Submarine Collection is a vibrant celebration of imagination, music, and visual storytelling.",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Smiley®",
    description:
      "Smiley® celebrates creativity and individuality through design-led lifestyle collections, limited edition ranges and collaborations with world-renowned designers.",
    image:
      "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=2052&auto=format&fit=crop",
  },
  {
    title: "SmileyWorld®",
    description:
      "Born from The Original Smiley® Brand, SmileyWorld® is a creative universe filled with thousands of unique icons.",
    image:
      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=2070&auto=format&fit=crop",
  },
];

const Collaborations: React.FC = () => {
  return (
    <main className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#111111] selection:text-white pb-20">
      {/* Hero Section */}
      <section className={`${containerClass} pt-10 md:pt-12 mb-20`}>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[615px_minmax(0,1fr)] gap-y-10 md:gap-x-12 lg:gap-x-16 items-start">
          {/* Left Image */}
          <div
            className="w-full bg-[#f2f2f2] rounded-[12px] overflow-hidden"
            style={{ aspectRatio: "881 / 945" }}
          >
            <img
              src="/hero_moomin_poster_1783128948876.png"
              alt="Collaborations Hero"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col justify-start max-w-[560px] mx-auto md:max-w-none md:mx-0">
            <h1
              className="text-[32px] md:text-[36px] lg:text-[40px] leading-[1.1] font-normal text-[#111111] mb-8 text-center"
              style={{ fontFamily: serifFont }}
            >
              Collaborations
            </h1>

            <div className="text-[14px] leading-[1.55] text-[#111111] space-y-[14px]">
              <p>
                At Postery, collaboration is an important part of how we explore
                new artistic perspectives and bring meaningful stories into our
                collections. By working with cultural institutions, iconic
                brands and creative partners, we create art prints that
                celebrate beloved characters, timeless artworks and distinctive
                visual expressions.
              </p>

              <p>
                Our collaborations have included projects inspired by the worlds
                of Pippi Longstocking and Astrid Lindgren, Moomin, The Beatles,
                Smiley®, and artworks connected to Henri Matisse through
                Rosenstiels, among others. Each collaboration allows us to
                reinterpret cultural icons through the lens of contemporary
                design, creating collections that bring both nostalgia and
                creativity into modern interiors.
              </p>

              <p>
                Through these partnerships we continue to celebrate art,
                storytelling and creativity, bringing inspiring collections to
                homes around the world. Discover our collaborations and the
                creative worlds that inspire them.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <button className="inline-flex items-center justify-center min-w-[220px] h-[46px] px-7 rounded-full border border-[#999999] text-[#111111] text-[14px] font-medium hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors">
                Discover our collaborations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Grid */}
      <section className={`${containerClass} mb-24`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-3">
          {collabData.map((collab, idx) => (
            <Link
              to="/products"
              key={idx}
              className="group relative w-full bg-[#f2f2f2] rounded-[12px] overflow-hidden block"
              style={{ aspectRatio: "1 / 1" }}
            >
              <img
                src={collab.image}
                alt={collab.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full px-6 pb-6 text-white">
                <h3 className="text-[20px] font-bold mb-2">
                  {collab.title}
                </h3>

                <p className="text-[13px] leading-[1.4] text-white/90 mb-4 line-clamp-2">
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

      {/* Information Sections */}
      <section className={`${containerClass} mb-16`}>
        {/* Artists */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_minmax(0,760px)] lg:grid-cols-[300px_minmax(0,760px)] xl:grid-cols-[320px_minmax(0,760px)] gap-y-4 md:gap-x-[40px] lg:gap-x-[48px] xl:gap-x-[56px] items-start">
          <h2
            className="text-[28px] md:text-[29px] lg:text-[30px] font-normal text-[#111111] leading-[1.2]"
            style={{ fontFamily: serifFont }}
          >
            Artists
          </h2>

          <div className="max-w-[760px]">
            <div className="text-[14px] leading-[1.45] text-[#111111] space-y-[10px]">
              <p>
                At Postery, we are proud to collaborate with both aspiring and
                established artists worldwide. We're always looking for new
                creatives to join us. Our art directors at the Postery head
                office continuously review and curate submitted artwork. In case
                of an agreed collaboration, it's of great importance to us to
                maintain a personal relationship with the artists and provide
                feedback and support.
              </p>

              <p>
                If you are interested in collaborating with us, please send us
                an e-mail to{" "}
                <a
                  href="mailto:artists@postery.com"
                  className="text-blue-600 hover:underline font-medium"
                >
                  artists@postery.com
                </a>{" "}
                with your artist background and portfolio or a selection of your
                works. We will get back to you as soon as we have reviewed your
                artwork. Please note that we sometimes need a couple of weeks to
                come to a decision since we at times receive a high amount of
                submissions.
              </p>
            </div>

            <button className="inline-flex items-center justify-center mt-8 min-w-[185px] h-[46px] px-7 rounded-full border border-[#999999] text-[#111111] text-[14px] font-medium hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors">
              Discover our artists
            </button>
          </div>
        </div>

        {/* Influencers */}
        <div className="mt-[52px] grid grid-cols-1 md:grid-cols-[260px_minmax(0,760px)] lg:grid-cols-[300px_minmax(0,760px)] xl:grid-cols-[320px_minmax(0,760px)] gap-y-4 md:gap-x-[40px] lg:gap-x-[48px] xl:gap-x-[56px] items-start">
          <h2
            className="text-[28px] md:text-[29px] lg:text-[30px] font-normal text-[#111111] leading-[1.2]"
            style={{ fontFamily: serifFont }}
          >
            Influencers
          </h2>

          <div className="max-w-[760px] text-[14px] leading-[1.45] text-[#111111]">
            <p>
              We love collaborating with skilled influencers, and we are always
              looking for new talent to collaborate with. You're welcome to
              direct your inquiry to our social media team in charge of
              influencer marketing at{" "}
              <a
                href="mailto:collabs@postery.com"
                className="text-blue-600 hover:underline font-medium"
              >
                collabs@postery.com
              </a>
              . They will get back to you if they see a possible opportunity for
              us to collaborate. If there are no current openings for new
              partnerships we will keep your profile and contact you if an
              opportunity arises.
            </p>
          </div>
        </div>

        {/* Press */}
        <div className="mt-[52px] grid grid-cols-1 md:grid-cols-[260px_minmax(0,760px)] lg:grid-cols-[300px_minmax(0,760px)] xl:grid-cols-[320px_minmax(0,760px)] gap-y-4 md:gap-x-[40px] lg:gap-x-[48px] xl:gap-x-[56px] items-start">
          <h2
            className="text-[28px] md:text-[29px] lg:text-[30px] font-normal text-[#111111] leading-[1.2]"
            style={{ fontFamily: serifFont }}
          >
            Press
          </h2>

          <div className="max-w-[760px] text-[14px] leading-[1.45] text-[#111111]">
            <p>
              We welcome media representatives to contact us at{" "}
              <a
                href="mailto:sales@postery.com"
                className="text-blue-600 hover:underline font-medium"
              >
                sales@postery.com
              </a>{" "}
              for all types of press-related inquiries such as press loans,
              press photos, and other PR-related content. When using our images,
              we ask you to include a reference to us.
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