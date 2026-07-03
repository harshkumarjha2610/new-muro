import React from "react";
import { motion, Variants } from "framer-motion";

import aboutHero from "@/assets/about-hero.jpg";
import aboutInterior from "@/assets/about-interior.jpg";

const serifFont = "Georgia, 'Times New Roman', serif";

const About: React.FC = () => {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Hero Section - Image left, text right */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left: Large Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-[24px] bg-[#F2F2F2]"
            >
              <img
                src={aboutHero}
                alt="Minimalist wall art"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </motion.div>

            {/* Right: Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col justify-center pt-4 lg:pt-12"
            >
              <h1
                className="mb-8 text-[32px] font-normal leading-[1.1] tracking-[1px] text-[#111111] md:text-[40px] lg:text-[48px]"
                style={{ fontFamily: serifFont }}
              >
                About us
              </h1>

              <p className="mb-6 text-[15px] font-normal leading-[1.7] text-[#333333] md:text-[16px]">
                Postery is a Swedish brand bringing together carefully curated and distinctive art prints. We are a curious and creative team based in Gothenburg, Sweden, and we believe in diversity, value and quality. We are united by our love for art, and we are passionate about trends, interiors and design that help create that personal space. We enjoy the aesthetics of the world, and we invite everyone to join and contribute – to explore the beauty of art and design.
              </p>

              <p className="mb-6 text-[15px] font-normal leading-[1.7] text-[#333333] md:text-[16px]">
                Inspired by Scandinavian design heritage, we curate art prints that combine timeless aesthetics with contemporary creativity. Each collection is thoughtfully selected by our art directors, bringing together influences from modern art, design and visual culture. Our posters, frames and hanging accessories are designed to complement modern living spaces and to stand the test of time as staples of a thoughtfully curated home.
              </p>

              <p className="text-[15px] font-normal leading-[1.7] text-[#333333] md:text-[16px]">
                Over the years, Postery&apos;s collections and gallery walls have been featured in several respected interior and design publications, including <strong>Elle Decoration</strong>, <strong>The World of Interiors</strong>, <strong>Residence</strong>, <strong>Nya Rum</strong> and <strong>Bo Living</strong>. These features reflect our ongoing commitment to bringing inspiring art and thoughtful design into modern interiors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-20">
            {/* Left: Heading */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2
                className="text-[24px] font-normal leading-[1.2] tracking-[0.5px] text-[#111111] md:text-[28px] lg:text-[32px]"
                style={{ fontFamily: serifFont }}
              >
                Our purpose
              </h2>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <p className="text-[15px] font-normal leading-[1.7] text-[#333333] md:text-[16px]">
                Our purpose is to make high-quality art accessible to homes around the world. We believe that beautiful design should be available to everyone and that art has the power to transform everyday spaces. At Postery, we aim to inspire creativity and help people discover pieces that reflect their personality and style. Our ambition is to share our passion for art and design while making it easier for people everywhere to create interiors that feel personal, inspiring and unique.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-20">
            {/* Left: Heading */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2
                className="text-[24px] font-normal leading-[1.2] tracking-[0.5px] text-[#111111] md:text-[28px] lg:text-[32px]"
                style={{ fontFamily: serifFont }}
              >
                Our partners
              </h2>
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <p className="text-[15px] font-normal leading-[1.7] text-[#333333] md:text-[16px]">
                Collaboration is an important part of Postery&apos;s journey. Over the years we have worked with selected global retailers and creative partners to bring curated art collections to new audiences. Our collaborations include projects with international brands such as <strong>H&amp;M</strong>, <strong>Lefties (Inditex)</strong> and <strong>Lagerhaus</strong>, where Postery collections have been introduced in retail environments across different markets. Through these partnerships we continue to explore new ways of sharing art and design with a wider community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20 lg:px-16 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
            className="relative aspect-[16/7] w-full overflow-hidden rounded-[24px] bg-[#F2F2F2]"
          >
            <img
              src={aboutInterior}
              alt="Gallery wall interior"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;