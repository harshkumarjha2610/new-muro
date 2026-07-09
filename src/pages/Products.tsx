import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  ChevronDown,
  Check,
} from "lucide-react";
import { API } from "@/services/api";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://muroposter.com/api";

const SITE_ORIGIN = "https://muroposter.com";

type ActiveOffer = {
  label: string;
  discount_percent: number;
};

type PriceRangeId =
  | "under-500"
  | "500-1000"
  | "1000-2000"
  | "2000-5000"
  | "above-5000";

type PriceRange = {
  id: PriceRangeId;
  label: string;
  min: number;
  max: number | null;
};

const PRICE_RANGES: PriceRange[] = [
  {
    id: "under-500",
    label: "Under ₹500",
    min: 0,
    max: 499.99,
  },
  {
    id: "500-1000",
    label: "₹500 – ₹1,000",
    min: 500,
    max: 1000,
  },
  {
    id: "1000-2000",
    label: "₹1,000 – ₹2,000",
    min: 1000.01,
    max: 2000,
  },
  {
    id: "2000-5000",
    label: "₹2,000 – ₹5,000",
    min: 2000.01,
    max: 5000,
  },
  {
    id: "above-5000",
    label: "Above ₹5,000",
    min: 5000.01,
    max: null,
  },
];

const serifFont =
  "Georgia, 'Times New Roman', serif";

const getFullImageUrl = (path?: string) => {
  if (!path)
    return "https://via.placeholder.com/300x400?text=No+Image";

  if (path.startsWith("http")) return path;

  const cleanPath = path.startsWith("/")
    ? path.substring(1)
    : path;

  if (
    cleanPath.startsWith("images/") ||
    cleanPath.startsWith("assets/")
  ) {
    return `/${cleanPath}`;
  }

  if (cleanPath.includes("api/public/uploads")) {
    return `${SITE_ORIGIN}/${cleanPath}`;
  }

  if (cleanPath.includes("uploads/product")) {
    return `${SITE_ORIGIN}/${cleanPath}`;
  }

  return `${SITE_ORIGIN}/uploads/product/${cleanPath}`;
};

const safeNumber = (value?: string | number) => {
  const cleanValue = String(value ?? "")
    .replace(/[₹,\s]/g, "")
    .trim();

  const num = Number(cleanValue);

  return Number.isFinite(num) && num > 0
    ? num
    : 0;
};

const formatPrice = (value?: string | number) => {
  const numericValue = safeNumber(value) || 500;

  return `₹${numericValue.toLocaleString("en-IN")}`;
};

const toTitleCase = (value?: string) => {
  const text = String(value || "").trim();

  if (!text) return "";

  return text
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(
      /(^|[\s-])([a-z])/g,
      (_, space, letter) =>
        `${space}${letter.toUpperCase()}`,
    );
};

const getUploadedProductImage = (product: any) => {
  const imageRows = Array.isArray(
    product?.product_images,
  )
    ? product.product_images
    : Array.isArray(product?.images)
      ? product.images
      : [];

  const firstUploaded = imageRows
    .slice()
    .sort(
      (a: any, b: any) =>
        Number(a.sort_order || 0) -
        Number(b.sort_order || 0),
    )
    .find((img: any) =>
      Boolean(
        img.image_url ||
        img.url ||
        img.file_url ||
        img.path,
      ),
    );

  return (
    firstUploaded?.image_url ||
    firstUploaded?.url ||
    firstUploaded?.file_url ||
    firstUploaded?.path ||
    product?.main_poster_url ||
    product?.zoom_in_url ||
    product?.image_url ||
    product?.wall_poster_url ||
    ""
  );
};

const getProductImages = (
  product: any,
): string[] => {
  const imageRows = Array.isArray(
    product?.product_images,
  )
    ? product.product_images
    : Array.isArray(product?.images)
      ? product.images
      : [];

  const sorted = imageRows
    .slice()
    .sort(
      (a: any, b: any) =>
        Number(a.sort_order || 0) -
        Number(b.sort_order || 0),
    );

  const urls = sorted
    .map(
      (img: any) =>
        img.image_url ||
        img.url ||
        img.file_url ||
        img.path ||
        "",
    )
    .filter(Boolean);

  const fallbacks = [
    product?.main_poster_url,
    product?.zoom_in_url,
    product?.image_url,
    product?.wall_poster_url,
  ].filter(Boolean);

  return [...new Set([...urls, ...fallbacks])];
};

const getLowestProductPrice = (product: any) => {
  const sizeRows = Array.isArray(product?.size_prices)
    ? product.size_prices
    : Array.isArray(product?.sizes)
      ? product.sizes
      : [];

  const prices = sizeRows
    .map((size: any) => safeNumber(size.price))
    .filter((price: number) => price > 0);

  if (prices.length > 0) {
    return Math.min(...prices);
  }

  return (
    safeNumber(product?.price || product?.base_price) ||
    500
  );
};

const getOfferPrice = (
  price: number,
  offer?: ActiveOffer | null,
) => {
  const discount = safeNumber(
    offer?.discount_percent,
  );

  if (!offer || discount <= 0 || price <= 0) {
    return {
      originalPrice: price,
      finalPrice: price,
      hasOffer: false,
    };
  }

  return {
    originalPrice: price,

    finalPrice: Math.max(
      0,
      Math.round(
        (price - (price * discount) / 100) * 100,
      ) / 100,
    ),

    hasOffer: true,
  };
};

const fetchActiveOffer =
  async (): Promise<ActiveOffer | null> => {
    try {
      const response = await fetch(
        `${API_BASE}/offers/active`,
      );

      const json = await response
        .json()
        .catch(() => null);

      const rows = Array.isArray(json?.data)
        ? json.data
        : json?.data?.items || [];

      return rows[0] || null;
    } catch (error) {
      console.error(
        "Failed to fetch active offer:",
        error,
      );

      return null;
    }
  };

const getProductId = (product: any) => {
  return (
    product?.id ||
    product?.product_id ||
    product?.productId
  );
};

const ProductCard = ({
  product,
  activeOffer,
  index,
}: {
  product: any;
  activeOffer: ActiveOffer | null;
  index: number;
}) => {
  const allImages =
    getProductImages(product).map(getFullImageUrl);

  const productId = getProductId(product);

  const productPrice =
    getLowestProductPrice(product);

  const [imgIdx, setImgIdx] =
    React.useState(0);

  const [hovered, setHovered] =
    React.useState(false);

  const currentOffer = (product.active_offer ||
    activeOffer) as ActiveOffer | null;

  const offerPrice = getOfferPrice(
    productPrice,
    currentOffer,
  );

  const title = toTitleCase(
    product.title ||
    product.name ||
    "Product",
  );

  const brand =
    product.category ||
    product.subcategory ||
    "Muro Poster";

  const handlePrev = (
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setImgIdx(
      (prev) =>
        (prev - 1 + allImages.length) %
        allImages.length,
    );
  };

  const handleNext = (
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setImgIdx(
      (prev) =>
        (prev + 1) % allImages.length,
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

  if (allImages.length === 0 || !productId) {
    return null;
  }

  const isHovered =
    hovered && allImages.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.025, 0.25),
      }}
    >
      <Link
        to={`/product/${productId}`}
        state={{ productData: product }}
        className="group block w-full"
      >
        <article className="w-full">
          <div
            className="relative w-full overflow-hidden rounded-[13px] bg-[#F3F3F1]"
            style={{ aspectRatio: "0.72" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="absolute inset-0 m-0 list-none p-0">
              {allImages.map((src, i) => (
                <li
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: i === imgIdx ? 1 : 0,
                    zIndex: i === imgIdx ? 1 : 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: isHovered
                      ? "0"
                      : "48px",
                  }}
                >
                  <img
                    src={src}
                    alt={`${title} ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: isHovered
                        ? "cover"
                        : "contain",
                      display: "block",
                      borderRadius: isHovered
                        ? "13px"
                        : "0",
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
                }}
              >
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={handlePrev}
                  className="pointer-events-auto absolute left-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  aria-label="Next image"
                  onClick={handleNext}
                  className="pointer-events-auto absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/85"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={(event) =>
                event.preventDefault()
              }
              className="absolute right-3 top-3 z-40 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/70"
            >
              <Heart
                className="h-4 w-4"
                strokeWidth={1.45}
              />
            </button>
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
                  {formatPrice(
                    offerPrice.finalPrice,
                  )}
                </span>

                {offerPrice.hasOffer && (
                  <span className="text-[12px] text-[#A19D96] line-through">
                    {formatPrice(
                      offerPrice.originalPrice,
                    )}
                  </span>
                )}
              </div>

              {currentOffer &&
                offerPrice.hasOffer && (
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

const Products: React.FC = () => {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const urlCategory =
    searchParams.get("cat")?.toUpperCase() ||
    "ALL";

  const urlSubcategory =
    searchParams
      .get("subcat")
      ?.toUpperCase() || "ALL";

  const [products, setProducts] =
    useState<any[]>([]);

  const [categories, setCategories] =
    useState<any[]>([]);

  const [subcategories, setSubcategories] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeOffer, setActiveOffer] =
    useState<ActiveOffer | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState(urlCategory);

  const [
    selectedSubCategory,
    setSelectedSubCategory,
  ] = useState(urlSubcategory);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedSize] =
    useState("ALL");

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [expandedFilter, setExpandedFilter] =
    useState<string | null>(null);

  // PRICE FILTER STATE
  const [
    selectedPriceRanges,
    setSelectedPriceRanges,
  ] = useState<PriceRangeId[]>([]);

  const itemsPerPage = 40;

  const togglePriceRange = (
    rangeId: PriceRangeId,
  ) => {
    setSelectedPriceRanges((current) =>
      current.includes(rangeId)
        ? current.filter((id) => id !== rangeId)
        : [...current, rangeId],
    );

    setCurrentPage(1);
  };

  const clearPriceFilters = () => {
    setSelectedPriceRanges([]);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedCategory("ALL");
    setSelectedSubCategory("ALL");
    setSelectedPriceRanges([]);
    setCurrentPage(1);
    setSearchParams({});
  };

  useEffect(() => {
    if (
      urlCategory !== selectedCategory ||
      urlSubcategory !== selectedSubCategory
    ) {
      setSelectedCategory(urlCategory);
      setSelectedSubCategory(urlSubcategory);
      setCurrentPage(1);
    }
  }, [
    urlCategory,
    urlSubcategory,
    selectedCategory,
    selectedSubCategory,
  ]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const [
          prodRes,
          catRes,
          subcatRes,
          offerRes,
        ] = await Promise.all([
          API.getProducts().catch(() => []),
          API.adminGetCategories().catch(
            () => [],
          ),
          API.adminGetSubcategories().catch(
            () => [],
          ),
          fetchActiveOffer(),
        ]);

        setProducts(
          Array.isArray(prodRes)
            ? prodRes
            : prodRes?.data?.items ||
            prodRes?.data ||
            [],
        );

        setCategories(
          Array.isArray(catRes)
            ? catRes
            : catRes?.data || [],
        );

        setSubcategories(
          Array.isArray(subcatRes)
            ? subcatRes
            : subcatRes?.data || [],
        );

        setActiveOffer(offerRes);
      } catch (error) {
        console.error(
          "Failed to fetch data:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleSubCategoryClick = (
    subCat: string,
  ) => {
    setSelectedSubCategory(subCat);
    setCurrentPage(1);

    const params: Record<string, string> = {};

    if (selectedCategory !== "ALL") {
      params.cat =
        selectedCategory.toLowerCase();
    }

    if (subCat !== "ALL") {
      params.subcat =
        subCat.toLowerCase();
    }

    setSearchParams(params);
  };

  const uniqueCategories = useMemo(() => {
    const seen = new Set<string>();

    return categories.filter((cat) => {
      const name = String(
        cat.name || "",
      ).trim();

      const key = name.toUpperCase();

      if (!name || seen.has(key)) return false;

      seen.add(key);
      return true;
    });
  }, [categories]);

  const currentCatObj =
    uniqueCategories.find(
      (cat) =>
        cat.name?.toUpperCase() ===
        selectedCategory,
    );

  const availableSubcats = useMemo(() => {
    let list;

    if (!currentCatObj) {
      list = subcategories;
    } else {
      list = subcategories.filter(
        (sub) =>
          String(sub.category_id) ===
          String(
            currentCatObj.id ||
            currentCatObj.category_id,
          ),
      );
    }

    return list.filter(
      (sub, index, arr) => {
        const name = String(
          sub.name || "",
        )
          .trim()
          .toUpperCase();

        if (!name) return false;

        if (
          currentCatObj &&
          name === selectedCategory
        )
          return false;

        return (
          arr.findIndex(
            (item) =>
              String(item.name || "")
                .trim()
                .toUpperCase() === name,
          ) === index
        );
      },
    );
  }, [
    currentCatObj,
    selectedCategory,
    subcategories,
  ]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCat =
        selectedCategory === "ALL" ||
        product.category?.toUpperCase() ===
        selectedCategory;

      const matchSubCat =
        selectedSubCategory === "ALL" ||
        product.subcategory?.toUpperCase() ===
        selectedSubCategory;

      let matchSize = true;

      if (selectedSize !== "ALL") {
        const rawSizes = Array.isArray(
          product.size_prices,
        )
          ? product.size_prices
          : Array.isArray(product.sizes)
            ? product.sizes
            : [];

        matchSize = rawSizes.some(
          (sz: any) => {
            const name = String(
              sz.size_name ||
              sz.name ||
              sz.size_code ||
              sz.code ||
              "",
            )
              .trim()
              .toUpperCase();

            return (
              name === selectedSize.toUpperCase()
            );
          },
        );
      }

      // PRICE FILTER
      const productPrice =
        getLowestProductPrice(product);

      const matchPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some(
          (selectedId) => {
            const range = PRICE_RANGES.find(
              (item) =>
                item.id === selectedId,
            );

            if (!range) return true;

            if (range.max === null) {
              return productPrice >= range.min;
            }

            return (
              productPrice >= range.min &&
              productPrice <= range.max
            );
          },
        );

      return (
        matchCat &&
        matchSubCat &&
        matchSize &&
        matchPrice &&
        Boolean(
          getUploadedProductImage(product),
        )
      );
    });
  }, [
    products,
    selectedCategory,
    selectedSubCategory,
    selectedSize,
    selectedPriceRanges,
  ]);

  const totalItems = filteredProducts.length;

  const totalPages = Math.ceil(
    totalItems / itemsPerPage,
  );

  const visibleCount =
    currentPage * itemsPerPage;

  const currentItems =
    filteredProducts.slice(0, visibleCount);

  const pageHeading =
    selectedSubCategory !== "ALL"
      ? toTitleCase(selectedSubCategory)
      : selectedCategory === "ALL"
        ? "Posters"
        : toTitleCase(selectedCategory);

  const pageDescription =
    selectedSubCategory !== "ALL"
      ? `Explore ${toTitleCase(
        selectedSubCategory,
      )} posters from MURO Poster. Browse premium wall art prints with clean styling, dynamic size pricing and curated visual themes.`
      : selectedCategory === "ALL"
        ? "Discover a wide range of posters online, featuring popular motifs such as motivational quotes, mindset art, typography, lifestyle prints and more. Explore styles for every room and mood at MURO Poster."
        : `Discover curated ${toTitleCase(
          selectedCategory,
        )} posters for modern spaces. Choose from premium wall art prints designed for homes, offices, studios and creative rooms.`;

  const handleShowMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(
        (previous) => previous + 1,
      );
    }
  };

  const hasMore = visibleCount < totalItems;

  const activeFilterCount =
    selectedPriceRanges.length;

  return (
    <>
      <main className="min-h-screen bg-white text-[#101010]">
        <style>
          {`
            .muro-apple-product-title {
              font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
              font-weight: 500 !important;
            }

            #muro-category-scroll::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        <section className="mx-auto max-w-[1320px] px-5 pb-8 pt-5 md:px-7 lg:px-8">
          <div className="relative grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
            <h1
              className="font-normal leading-tight"
              style={{
                fontSize: "32.0924px",
                fontFamily: serifFont,
              }}
            >
              {pageHeading}
            </h1>

            <p className="max-w-[670px] text-[14px] leading-relaxed">
              {pageDescription}
            </p>
          </div>
        </section>

        <section className="mx-auto mb-5 max-w-[1320px] px-5 md:px-7 lg:px-8">
          <div className="flex items-center border-b border-[#E8E8E8] pb-3">
            <div
              id="muro-category-scroll"
              className="flex flex-1 items-center gap-7 overflow-x-auto"
            >
              <button
                onClick={handleClearFilters}
                className="whitespace-nowrap text-[14px]"
              >
                All Posters
              </button>

              {availableSubcats.map((sub) => (
                <button
                  key={sub.id || sub.name}
                  onClick={() =>
                    handleSubCategoryClick(
                      sub.name.toUpperCase(),
                    )
                  }
                  className="whitespace-nowrap text-[14px]"
                >
                  {toTitleCase(sub.name)}
                </button>
              ))}
            </div>

            <button
              onClick={() => setFilterOpen(true)}
              className="relative flex h-8 w-8 items-center justify-center"
            >
              <SlidersHorizontal className="h-4 w-4" />

              {activeFilterCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#101010] px-1 text-[9px] text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 pb-16 md:px-7 lg:px-8">
          {loading ? (
            <div className="flex min-h-[45vh] items-center justify-center">
              Loading...
            </div>
          ) : currentItems.length === 0 ? (
            <div className="flex min-h-[45vh] items-center justify-center">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {currentItems.map(
                (product, index) => (
                  <ProductCard
                    key={
                      getProductId(product) ||
                      index
                    }
                    product={product}
                    activeOffer={activeOffer}
                    index={index}
                  />
                ),
              )}
            </div>
          )}

          {hasMore && (
            <div className="mt-14 text-center">
              <button
                onClick={handleShowMore}
                className="rounded-full border border-black px-8 py-3"
              >
                Show more
              </button>
            </div>
          )}
        </section>
      </main>

      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/30"
              onClick={() =>
                setFilterOpen(false)
              }
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.3,
              }}
              className="fixed right-0 top-0 z-[90] flex h-screen w-[380px] max-w-[90vw] flex-col bg-white shadow-2xl"
            >
              <div className="flex h-[64px] items-center justify-between border-b px-6">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    Filter
                  </span>

                  <span className="text-[#77736B]">
                    {activeFilterCount}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setFilterOpen(false)
                  }
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-2">
                {[
                  "Orientation",
                  "Price",
                  "Room",
                  "Size",
                  "Theme",
                ].map((filterName) => (
                  <div
                    key={filterName}
                    className="border-b border-[#F0F0F0]"
                  >
                    <button
                      onClick={() =>
                        setExpandedFilter(
                          expandedFilter ===
                            filterName
                            ? null
                            : filterName,
                        )
                      }
                      className="flex w-full items-center justify-between py-4"
                    >
                      <span className="text-[14px] font-medium">
                        {filterName}

                        {filterName === "Price" &&
                          selectedPriceRanges.length >
                          0 && (
                            <span className="ml-2 text-[#77736B]">
                              (
                              {
                                selectedPriceRanges.length
                              }
                              )
                            </span>
                          )}
                      </span>

                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expandedFilter ===
                            filterName
                            ? "rotate-180"
                            : ""
                          }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedFilter ===
                        filterName && (
                          <motion.div
                            initial={{
                              height: 0,
                              opacity: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            className="overflow-hidden"
                          >
                            {filterName === "Price" ? (
                              <div className="pb-5">
                                <div className="space-y-3">
                                  {PRICE_RANGES.map(
                                    (range) => {
                                      const checked =
                                        selectedPriceRanges.includes(
                                          range.id,
                                        );

                                      return (
                                        <button
                                          key={
                                            range.id
                                          }
                                          type="button"
                                          onClick={() =>
                                            togglePriceRange(
                                              range.id,
                                            )
                                          }
                                          className="flex w-full items-center gap-3 text-left"
                                        >
                                          <span
                                            className={`flex h-[18px] w-[18px] items-center justify-center border ${checked
                                                ? "border-[#101010] bg-[#101010]"
                                                : "border-[#A19D96] bg-white"
                                              }`}
                                          >
                                            {checked && (
                                              <Check className="h-3 w-3 text-white" />
                                            )}
                                          </span>

                                          <span className="text-[13px] text-[#101010]">
                                            {range.label}
                                          </span>
                                        </button>
                                      );
                                    },
                                  )}
                                </div>

                                {selectedPriceRanges.length >
                                  0 && (
                                    <button
                                      type="button"
                                      onClick={
                                        clearPriceFilters
                                      }
                                      className="mt-5 text-[12px] underline"
                                    >
                                      Clear price filters
                                    </button>
                                  )}
                              </div>
                            ) : (
                              <div className="pb-4 text-[13px] text-[#77736B]">
                                No{" "}
                                {filterName.toLowerCase()}{" "}
                                filters available yet.
                              </div>
                            )}
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="border-t p-5">
                <button
                  onClick={() =>
                    setFilterOpen(false)
                  }
                  className="flex h-[50px] w-full items-center justify-center rounded-full bg-[#101010] text-[14px] font-semibold text-white"
                >
                  View results ({totalItems})
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Products;