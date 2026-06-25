import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Youtube,
  Instagram,
  Twitter,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

const pageContainerClass = "mx-auto max-w-[1400px] px-6 md:px-12";

const mainHeadingClass =
  "text-[40px] font-bold uppercase leading-none tracking-[2px] text-[#1C1C1C]";

const sectionHeadingClass =
  "text-[22px] font-bold uppercase leading-none tracking-[2px] text-[#1C1C1C] md:text-[24px]";

const labelClass =
  "mb-1 block text-[10px] font-bold uppercase tracking-[2px] text-gray-400";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        source: "MURO_CONTACT_FORM",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("https://muroposter.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Contact Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F0EEE9] pb-20 pt-24 text-[#1C1C1C] selection:bg-[#A0B695] selection:text-white">
      <div className={pageContainerClass}>
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-[12px] font-bold uppercase tracking-[2px] text-[#57663D]"
          >
            WE ARE HERE FOR YOU
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={mainHeadingClass}
          >
            GET IN TOUCH
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm lg:flex-row"
        >
          <div className="relative flex flex-col justify-between overflow-hidden bg-[#1C1C1C] p-10 text-white md:p-16 lg:w-2/5">
            <div className="absolute inset-0 z-0 opacity-20">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Background texture"
                className="h-full w-full object-cover grayscale"
              />
            </div>

            <div className="relative z-10">
              <h2 className="mb-10 text-[22px] font-bold uppercase leading-none tracking-[2px] text-white md:text-[24px]">
                CONTACT INFORMATION
              </h2>

              <div className="space-y-8">
                <div className="group flex cursor-pointer items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-[#A0B695] transition-colors group-hover:text-white" />

                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
                      EMAIL
                    </p>

                    <p className="text-[16px] font-medium leading-relaxed text-white">
                      helpmuroposter@gmail.com
                    </p>
                  </div>
                </div>

                <div className="group flex cursor-pointer items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-[#A0B695] transition-colors group-hover:text-white" />

                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
                      PHONE
                    </p>

                    <p className="text-[16px] font-medium leading-relaxed text-white">
                      (123) 1221 2323
                    </p>
                  </div>
                </div>

                <div className="group flex cursor-pointer items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 text-[#A0B695] transition-colors group-hover:text-white" />

                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[2px] text-gray-400">
                      STUDIO
                    </p>

                    <p className="text-[16px] font-medium leading-relaxed text-gray-300">
                      123 Innovation Avenue, Suite 456
                      <br />
                      Tech District, San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-16 flex gap-6 border-t border-white/20 pt-8">
              <Youtube className="h-5 w-5 cursor-pointer text-gray-400 transition-colors hover:text-white" />
              <Instagram className="h-5 w-5 cursor-pointer text-gray-400 transition-colors hover:text-white" />
              <Twitter className="h-5 w-5 cursor-pointer text-gray-400 transition-colors hover:text-white" />
            </div>
          </div>

          <div className="bg-white p-10 md:p-16 lg:w-3/5 lg:p-20">
            <h3 className={sectionHeadingClass}>SEND US A MESSAGE</h3>

            <p className="mb-10 mt-3 text-[14px] leading-relaxed text-gray-500">
              Our team typically responds within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="relative border-b border-gray-300 pb-2 transition-colors focus-within:border-[#1C1C1C]">
                  <label className={labelClass}>YOUR NAME</label>

                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full border-none bg-transparent text-[15px] text-[#1C1C1C] outline-none placeholder:text-gray-300"
                    placeholder="John Doe"
                  />
                </div>

                <div className="relative border-b border-gray-300 pb-2 transition-colors focus-within:border-[#1C1C1C]">
                  <label className={labelClass}>EMAIL ADDRESS</label>

                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border-none bg-transparent text-[15px] text-[#1C1C1C] outline-none placeholder:text-gray-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="relative border-b border-gray-300 pb-2 transition-colors focus-within:border-[#1C1C1C]">
                <label className={labelClass}>MESSAGE</label>

                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="mt-2 w-full resize-none border-none bg-transparent text-[15px] text-[#1C1C1C] outline-none placeholder:text-gray-300"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                disabled={loading}
                type="submit"
                className="flex w-full items-center justify-center gap-3 bg-[#1C1C1C] px-10 py-4 text-[12px] font-bold uppercase tracking-[2px] text-white transition-colors hover:bg-[#57663D] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {loading ? "SENDING..." : "SEND MESSAGE"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </motion.div>

        <div className="mt-12 rounded-[22px] bg-[#F1F1F1] p-6 text-[#111111] md:p-8">
          <h2 className="mb-4 text-[22px] font-bold leading-none tracking-[2px] text-[#111111] md:text-[24px]">
            Muro Promise
          </h2>

          <p className="font-bold tracking-[2px]">
            We respond with care, clarity, and intention.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Contact;