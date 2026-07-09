import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://muroposter.com/api";

const SITE_ORIGIN = "https://muroposter.com";

type ActiveOffer = {
  id?: number;
  label: string;
  discount_percent: number | string;
  from_date?: string;
  to_date?: string;
};

type OfferPrice = {
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  hasOffer: boolean;
};

type CutoutProduct = {
  id: number;
  source?: string;
  source_key?: string;
  product_id?: number;
  image_id?: number;
  product_type?: "cutout" | "sqft";
  product_name: string;
  size?: string;
  description?: string;
  short_description?: string;
  full_description?: string;
  price?: string | number;
  total_price?: string | number;
  offer_price?: string | number;
  final_price?: string | number;
  image_url?: string;
  front_image_url?: string;
  back_image_url?: string;
  detail_url?: string;
  width?: string | number;
  height?: string | number;
  sqft_price?: string | number;
  active_offer?: ActiveOffer | null;
  images?: Array<{
    image_url?: string;
    url?: string;
    file_url?: string;
    path?: string;
    sort_order?: number;
  }>;
  product_images?: Array<{
    image_url?: string;
    url?: string;
    file_url?: string;
    path?: string;
    sort_order?: number;
  }>;
};

const serifFont = "Georgia, 'Times New Roman', serif";

const getFullImageUrl = (path?: string) => {
  if (!path) {
    return "https://via.placeholder.com/300x400?text=No+Image";
  }

  if (path.startsWith("http")) {
    return path;
  }

  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  if (cleanPath.startsWith("images/") || cleanPath.startsWith("assets/")) {
    return `/${cleanPath}`;
  }

  if (
    cleanPath.includes("api/public/uploads") ||
    cleanPath.includes("uploads/")
  ) {
    return `${SITE_ORIGIN}/${cleanPath}`;
  }

  return `${SITE_ORIGIN}/${cleanPath}`;
};

const safeNumber = (value?: string | number) => {
  const cleanValue = String(value ?? "")
    .replace(/[₹,\s]/g, "")
    .trim();

  const num = Number(cleanValue);

  return Number.isFinite(num) ? num : 0;
};

const formatPrice = (value?: string | number) => {
  const price = safeNumber(value);

  return `₹${price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

const toTitleCase = (value?: string) => {
  const text = String(value || "").trim();

  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/(^|[\s-])([a-z])/g, (_, space, letter) => {
      return `${space}${letter.toUpperCase()}`;
    });
};

const getActiveOfferPrice = (
  price: number,
  offer?: ActiveOffer | null,
  apiFinalPrice?: number,
): OfferPrice => {
  if (apiFinalPrice && apiFinalPrice > 0 && apiFinalPrice < price) {
    return {
      originalPrice: price,
      finalPrice: apiFinalPrice,
      discountAmount:
        Math.round((price - apiFinalPrice) * 100) / 100,
      hasOffer: true,
    };
  }

  const discountPercent = safeNumber(offer?.discount_percent);

  if (!offer || discountPercent <= 0 || price <= 0) {
    return {
      originalPrice: price,
      finalPrice: price,
      discountAmount: 0,
      hasOffer: false,
    };
  }

  const discountAmount =
    Math.round(((price * discountPercent) / 100) * 100) / 100;

  const finalPrice = Math.max(
    0,
    Math.round((price - discountAmount) * 100) / 100,
  );

  return {
    originalPrice: price,
    finalPrice,
    discountAmount,
    hasOffer: finalPrice < price,
  };
};

const fetchActiveOffers = async (): Promise<ActiveOffer[]> => {
  try {
    const response = await fetch(`${API_BASE}/offers/active`, {
      headers: {
        Accept: "application/json",
      },
    });

    const json = await response.json().catch(() => null);

    const rows = Array.isArray(json?.data)
      ? json.data
      : Array.isArray(json?.data?.items)
        ? json.data.items
        : [];

    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("Failed to fetch active offers:", error);
    return [];
  }
};

const fetchCutoutRows = async (): Promise<CutoutProduct[]> => {
  const response = await fetch(`${API_BASE}/cutouts`, {
    headers: {
      Accept: "application/json",
    },
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || json?.success === false) {
    throw new Error(json?.message || "Failed to fetch cutouts");
  }

  const items = Array.isArray(json?.data?.items)
    ? json.data.items
    : Array.isArray(json?.items)
      ? json.items
      : [];

  return items;
};

const getCutoutImages = (product: CutoutProduct): string[] => {
  const imageRows = Array.isArray(product.product_images)
    ? product.product_images
    : Array.isArray(product.images)
      ? product.images
      : [];

  const uploadedImages = imageRows
    .slice()
    .sort(
      (a, b) =>
        Number(a.sort_order || 0) - Number(b.sort_order || 0),
    )
    .map(
      (image) =>
        image.image_url ||
        image.url ||
        image.file_url ||
        image.path ||
        "",
    )
    .filter(Boolean);

  const fallbackImages = [
    product.image_url,
    product.front_image_url,
    product.back_image_url,
  ].filter(Boolean) as string[];

  return [...new Set([...uploadedImages, ...fallbackImages])];
};

const CutoutCard = ({
  product,
  activeOffer,
  index,
}: {
  product: CutoutProduct;
  activeOffer: ActiveOffer | null;
  index: number;
}) => {
  const allImages = getCutoutImages(product).map(getFullImageUrl);

  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);

  const basePrice = safeNumber(
    product.total_price || product.price,
  );

  const apiFinalPrice = safeNumber(
    product.final_price || product.offer_price,
  );

  const currentOffer =
    product.active_offer || activeOffer || null;

  const offerPrice = getActiveOfferPrice(
    basePrice,
    currentOffer,
    apiFinalPrice,
  );

  const title = toTitleCase(product.product_name || "CutOut");

  const brand =
    product.product_type === "sqft"
      ? "Sqft CutOut"
      : "Muro CutOut";

  const detailUrl =
    product.detail_url || `/cutouts/${product.id}`;

  const handlePrev = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setImgIdx(
      (previous) =>
        (previous - 1 + allImages.length) % allImages.length,
    );
  };

  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setImgIdx(
      (previous) => (previous + 1) % allImages.length,
    );
  };

  const handleMouseEnter = () => {
    setHovered(true);

    if (allImages.length > 1) {
      setImgIdx(1);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setImgIdx(0);
  };

  if (allImages.length === 0) {
    return null;
  }

  const isHovered = hovered && allImages.length > 1;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.025, 0.25),
      }}
    >
      <Link
        to={detailUrl}
        state={{
          productData: product,
        }}
        className="group block w-full"
      >
        <article className="w-full">
          <div
            className="relative w-full overflow-hidden rounded-[13px] bg-[#F3F3F1]"
            style={{
              aspectRatio: "0.72",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="absolute inset-0 m-0 list-none p-0">
              {allImages.map((src, imageIndex) => (
                <li
                  key={`${src}-${imageIndex}`}
                  className="absolute inset-0"
                  style={{
                    opacity: imageIndex === imgIdx ? 1 : 0,
                    zIndex: imageIndex === imgIdx ? 1 : 0,
                    transition: "opacity 0s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: isHovered ? "0" : "48px",
                  }}
                >
                  <img
                    src={src}
                    alt={`${title} ${imageIndex + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: isHovered ? "cover" : "contain",
                      display: "block",
                      borderRadius: isHovered ? "13px" : "0",
                    }}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>

            {allImages.length > 1 && (
              <div
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.15s",
                }}
              >
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={handlePrev}
                  className="pointer-events-auto absolute left-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#111] shadow-sm transition-colors hover:bg-white"
                >
                  <ChevronLeft
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </button>

                <button
                  type="button"
                  aria-label="Next image"
                  onClick={handleNext}
                  className="pointer-events-auto absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#111] shadow-sm transition-colors hover:bg-white"
                >
                  <ChevronRight
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </button>
              </div>
            )}

            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              className="absolute right-3 top-3 z-40 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-[#111]/70 backdrop-blur-sm transition-colors hover:bg-white hover:text-[#006039]"
            >
              <Heart
                className="h-4 w-4"
                strokeWidth={1.45}
              />
            </button>

            {allImages.length > 1 && (
              <ol
                className="absolute bottom-2.5 left-1/2 z-40 m-0 flex -translate-x-1/2 list-none gap-1 p-0"
                style={{
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.15s",
                }}
              >
                {allImages.map((_, imageIndex) => (
                  <li key={imageIndex}>
                    <button
                      type="button"
                      aria-label={`Go to image ${imageIndex + 1}`}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setImgIdx(imageIndex);
                      }}
                      className="block h-1.5 rounded-full bg-white transition-all duration-200"
                      style={{
                        width:
                          imageIndex === imgIdx ? "16px" : "6px",
                        opacity:
                          imageIndex === imgIdx ? 1 : 0.55,
                      }}
                    />
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="mt-3 grid grid-cols-[1fr_auto] items-start gap-3 px-1">
            <div className="min-w-0">
              <p className="truncate text-[13px] leading-none text-[#A19D96]">
                {brand}
              </p>

              <h3 className="muro-apple-product-title mt-1.5 min-h-[34px] text-[14px] leading-snug text-[#101010]">
                {title}
              </h3>
            </div>

            <div className="text-right">
              <div className="flex flex-wrap items-center justify-end gap-1.5">
                <span className="text-[13px] font-semibold text-[#101010]">
                  {formatPrice(offerPrice.finalPrice)}
                </span>

                {offerPrice.hasOffer && (
                  <span className="text-[12px] text-[#A19D96] line-through">
                    {formatPrice(offerPrice.originalPrice)}
                  </span>
                )}
              </div>

              {currentOffer && offerPrice.hasOffer && (
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#006039]">
                  {currentOffer.label}
                </p>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

const Cutouts: React.FC = () => {
  const [products, setProducts] = useState<CutoutProduct[]>([]);

  const [activeOffers, setActiveOffers] = useState<
    ActiveOffer[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [errorText, setErrorText] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 40;

  useEffect(() => {
    const fetchCutouts = async () => {
      setLoading(true);
      setErrorText("");

      try {
        const [items, offers] = await Promise.all([
          fetchCutoutRows(),
          fetchActiveOffers(),
        ]);

        setProducts(items);
        setActiveOffers(offers);
      } catch (error: any) {
        console.error("Failed to fetch cutouts:", error);

        setErrorText(
          error?.message || "Failed to fetch cutouts",
        );

        setProducts([]);
        setActiveOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCutouts();
  }, []);

  const totalItems = products.length;

  const totalPages = Math.ceil(
    totalItems / itemsPerPage,
  );

  const visibleCount =
    currentPage * itemsPerPage;

  const currentItems = products.slice(
    0,
    visibleCount,
  );

  const hasMore = visibleCount < totalItems;

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(
        (previous) => previous + 1,
      );
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#101010] selection:bg-[#101010] selection:text-white">
      <style>
        {`
          .muro-apple-product-title {
            font-family:
              -apple-system,
              BlinkMacSystemFont,
              "SF Pro Display",
              "SF Pro Text",
              "Helvetica Neue",
              Arial,
              sans-serif !important;

            font-weight: 500 !important;
            letter-spacing: 0 !important;
            text-transform: none !important;
          }
        `}
      </style>

      {/* PAGE HEADING */}

      <section className="mx-auto max-w-[1320px] px-5 pb-8 pt-5 md:px-7 md:pb-10 md:pt-6 lg:px-8">
        <div className="relative grid gap-4 md:min-h-[72px] md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <motion.h1
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="font-normal leading-tight text-[#101010]"
            style={{
              fontSize: "32.0924px",
              fontFamily: serifFont,
            }}
          >
            CutOuts
          </motion.h1>

          <p
            className="max-w-[670px] font-normal leading-relaxed text-[#101010] md:absolute md:left-[calc(50%+2.5rem)] md:top-0 md:max-w-[min(670px,calc(50%-2.5rem-1rem))] lg:left-[calc(50%+5rem)] lg:max-w-[min(670px,calc(50%-5rem-1rem))]"
            style={{
              fontSize: "14px",
            }}
          >
            Discover our collection of premium CutOuts from MURO
            Poster. Explore unique decorative designs created to add
            personality, creativity and visual impact to modern
            spaces.
          </p>
        </div>
      </section>

      {/* DIVIDER */}

      <section className="mx-auto mb-5 max-w-[1320px] px-5 pt-2 md:px-7 md:pt-4 lg:px-8">
        <div className="border-b border-[#E8E8E8] pb-3">
          <p className="text-[13px] font-medium tracking-wide text-[#101010] md:text-[14px]">
            All CutOuts
          </p>
        </div>
      </section>

      {/* PRODUCTS */}

      <section className="mx-auto max-w-[1320px] px-5 pb-16 md:px-7 lg:px-8">
        {loading ? (
          <div className="flex min-h-[45vh] items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#101010] border-t-transparent" />
          </div>
        ) : currentItems.length === 0 ? (
          <div className="flex min-h-[45vh] items-center justify-center rounded-[14px] bg-[#F3F3F1] px-6 text-center">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#77736B]">
                No cutout products found
              </p>

              {errorText && (
                <p className="mt-3 text-[12px] text-red-600">
                  {errorText}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-5 md:grid-cols-3 lg:grid-cols-4">
            {currentItems.map((product, index) => {
              const key =
                product.source_key ||
                `${product.source || "cutout"}-${product.id}-${product.image_id || index
                }`;

              return (
                <CutoutCard
                  key={key}
                  product={product}
                  activeOffer={
                    product.active_offer ||
                    activeOffers[0] ||
                    null
                  }
                  index={index}
                />
              );
            })}
          </div>
        )}

        {/* SHOW MORE */}

        {totalItems > 0 && (
          <div className="mt-14 flex flex-col items-center gap-5">
            <p className="text-[14px] text-[#101010]">
              You have viewed{" "}
              <span className="font-semibold">
                {Math.min(
                  visibleCount,
                  totalItems,
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold">
                {totalItems}
              </span>{" "}
              products
            </p>

            <div className="h-[3px] w-full max-w-[320px] overflow-hidden rounded-full bg-[#E5E5E5]">
              <div
                className="h-full rounded-full bg-[#101010] transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (Math.min(
                      visibleCount,
                      totalItems,
                    ) /
                      totalItems) *
                    100,
                    100,
                  )}%`,
                }}
              />
            </div>

            {hasMore && (
              <button
                type="button"
                onClick={handleShowMore}
                className="rounded-full border border-[#101010] px-8 py-2.5 text-[13px] font-semibold text-[#101010] transition-colors hover:bg-[#101010] hover:text-white"
              >
                Show more
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Cutouts;