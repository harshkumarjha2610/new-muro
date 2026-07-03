import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { API } from "@/services/api";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://muroposter.com/api";

const SITE_ORIGIN = "https://muroposter.com";

type ActiveOffer = {
  label: string;
  discount_percent: number;
};

const serifFont = "Georgia, 'Times New Roman', serif";

const getFullImageUrl = (path?: string) => {
  if (!path) return "https://via.placeholder.com/300x400?text=No+Image";

  if (path.startsWith("http")) return path;

  const cleanPath = path.startsWith("/") ? path.substring(1) : path;

  if (cleanPath.startsWith("images/") || cleanPath.startsWith("assets/")) {
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

  return Number.isFinite(num) && num > 0 ? num : 0;
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
    .replace(/(^|[\s-])([a-z])/g, (_, space, letter) => {
      return `${space}${letter.toUpperCase()}`;
    });
};

const getUploadedProductImage = (product: any) => {
  const imageRows = Array.isArray(product?.product_images)
    ? product.product_images
    : Array.isArray(product?.images)
      ? product.images
      : [];

  const firstUploaded = imageRows
    .slice()
    .sort(
      (a: any, b: any) => Number(a.sort_order || 0) - Number(b.sort_order || 0),
    )
    .find((img: any) =>
      Boolean(img.image_url || img.url || img.file_url || img.path),
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

  return safeNumber(product?.price || product?.base_price) || 500;
};

const getOfferPrice = (price: number, offer?: ActiveOffer | null) => {
  const discount = safeNumber(offer?.discount_percent);

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
      Math.round((price - (price * discount) / 100) * 100) / 100,
    ),
    hasOffer: true,
  };
};

const fetchActiveOffer = async (): Promise<ActiveOffer | null> => {
  try {
    const response = await fetch(`${API_BASE}/offers/active`);
    const json = await response.json().catch(() => null);

    const rows = Array.isArray(json?.data)
      ? json.data
      : json?.data?.items || [];

    return rows[0] || null;
  } catch (error) {
    console.error("Failed to fetch active offer:", error);
    return null;
  }
};

const getProductId = (product: any) => {
  return product?.id || product?.product_id || product?.productId;
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
  const productImage = getUploadedProductImage(product);
  const productId = getProductId(product);
  const productPrice = getLowestProductPrice(product);

  const currentOffer = (product.active_offer ||
    activeOffer) as ActiveOffer | null;

  const offerPrice = getOfferPrice(productPrice, currentOffer);
  const title = toTitleCase(product.title || product.name || "Product");
  const brand = product.category || product.subcategory || "Muro Poster";

  if (!productImage || !productId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.25) }}
    >
      <Link
        to={`/product/${productId}`}
        state={{ productData: product }}
        className="group block w-full"
      >
        <article className="w-full">
          <div className="relative flex aspect-[0.78] w-full items-center justify-center overflow-hidden rounded-[13px] bg-[#F3F3F1] px-8 py-9 md:px-10 md:py-11">
            <button
              type="button"
              aria-label="Add to wishlist"
              onClick={(event) => event.preventDefault()}
              className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#111]/70 transition-colors hover:bg-white hover:text-[#006039]"
            >
              <Heart className="h-5 w-5" strokeWidth={1.45} />
            </button>

            <img
              src={getFullImageUrl(productImage)}
              alt={title}
              className="max-h-full max-w-full object-contain drop-shadow-[0_14px_16px_rgba(0,0,0,0.10)] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              loading="lazy"
            />
          </div>

          <div className="mt-4 grid grid-cols-[1fr_auto] items-start gap-4 px-1">
            <div className="min-w-0">
              <p className="truncate text-[13px] leading-none text-[#A19D96]">
                {brand}
              </p>

              <h3 className="muro-apple-product-title mt-2 min-h-[38px] text-[14px] leading-snug text-[#101010] md:text-[15px]">
                {title}
              </h3>
            </div>

            <div className="text-right">
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="text-[13px] font-semibold text-[#101010] md:text-[14px]">
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

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get("cat")?.toUpperCase() || "ALL";
  const urlSubcategory = searchParams.get("subcat")?.toUpperCase() || "ALL";

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeOffer, setActiveOffer] = useState<ActiveOffer | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<string>(urlCategory);

  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>(urlSubcategory);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy] = useState<string>("default");
  const [selectedSize] = useState<string>("ALL");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const itemsPerPage = 40;

  const handleClearFilters = () => {
    setSelectedCategory("ALL");
    setSelectedSubCategory("ALL");
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
  }, [urlCategory, urlSubcategory, selectedCategory, selectedSubCategory]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      try {
        const [prodRes, catRes, subcatRes, offerRes] = await Promise.all([
          API.getProducts().catch(() => []),
          API.adminGetCategories().catch(() => []),
          API.adminGetSubcategories().catch(() => []),
          fetchActiveOffer(),
        ]);

        setProducts(
          Array.isArray(prodRes)
            ? prodRes
            : prodRes?.data?.items || prodRes?.data || [],
        );

        setCategories(Array.isArray(catRes) ? catRes : catRes?.data || []);

        setSubcategories(
          Array.isArray(subcatRes) ? subcatRes : subcatRes?.data || [],
        );

        setActiveOffer(offerRes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleSubCategoryClick = (subCat: string) => {
    setSelectedSubCategory(subCat);
    setCurrentPage(1);

    const params: Record<string, string> = {};

    if (selectedCategory !== "ALL") {
      params.cat = selectedCategory.toLowerCase();
    }

    if (subCat !== "ALL") {
      params.subcat = subCat.toLowerCase();
    }

    setSearchParams(params);
  };

  const uniqueCategories = useMemo(() => {
    const seen = new Set<string>();

    return categories.filter((cat) => {
      const name = String(cat.name || "").trim();
      const key = name.toUpperCase();

      if (!name || seen.has(key)) return false;

      seen.add(key);
      return true;
    });
  }, [categories]);

  const currentCatObj = uniqueCategories.find(
    (cat) => cat.name?.toUpperCase() === selectedCategory,
  );

  const availableSubcats = useMemo(() => {
    let list = [];
    if (!currentCatObj) {
      list = subcategories;
    } else {
      list = subcategories.filter(
        (sub) =>
          String(sub.category_id) ===
          String(currentCatObj.id || currentCatObj.category_id),
      );
    }

    return list.filter((sub, index, arr) => {
      const name = String(sub.name || "").trim().toUpperCase();

      if (!name) return false;
      if (currentCatObj && name === selectedCategory) return false;

      return (
        arr.findIndex(
          (item) => String(item.name || "").trim().toUpperCase() === name,
        ) === index
      );
    });
  }, [currentCatObj, selectedCategory, subcategories]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCat =
        selectedCategory === "ALL" ||
        product.category?.toUpperCase() === selectedCategory;

      const matchSubCat =
        selectedSubCategory === "ALL" ||
        product.subcategory?.toUpperCase() === selectedSubCategory;

      let matchSize = true;

      if (selectedSize !== "ALL") {
        const rawSizes = Array.isArray(product.size_prices)
          ? product.size_prices
          : Array.isArray(product.sizes)
            ? product.sizes
            : [];

        matchSize = rawSizes.some((sz: any) => {
          const name = String(
            sz.size_name || sz.name || sz.size_code || sz.code || "",
          )
            .trim()
            .toUpperCase();

          return name === selectedSize.toUpperCase();
        });
      }

      return (
        matchCat &&
        matchSubCat &&
        matchSize &&
        Boolean(getUploadedProductImage(product))
      );
    });
  }, [products, selectedCategory, selectedSubCategory, selectedSize]);

  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];

    if (sortBy === "price-asc") {
      return items.sort(
        (a, b) => getLowestProductPrice(a) - getLowestProductPrice(b),
      );
    }

    if (sortBy === "price-desc") {
      return items.sort(
        (a, b) => getLowestProductPrice(b) - getLowestProductPrice(a),
      );
    }

    return items;
  }, [filteredProducts, sortBy]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const visibleCount = currentPage * itemsPerPage;

  const currentItems = sortedProducts.slice(0, visibleCount);

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
      setCurrentPage((prev) => prev + 1);
    }
  };

  const hasMore = visibleCount < totalItems;

  return (
    <>
    <main className="min-h-screen bg-white text-[#101010] selection:bg-[#101010] selection:text-white">
      <style>
        {`
          .muro-apple-product-title {
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
            font-weight: 500 !important;
            letter-spacing: 0 !important;
            text-transform: none !important;
          }
          #muro-category-scroll::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <section className="mx-auto max-w-[1320px] px-5 pb-6 pt-12 md:px-7 md:pb-8 md:pt-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <motion.h1
            key={`${selectedCategory}-${selectedSubCategory}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-[36px] font-normal leading-tight text-[#101010] md:text-[44px] lg:text-[48px]"
            style={{ fontFamily: serifFont }}
          >
            {pageHeading}
          </motion.h1>

          <p className="max-w-[670px] text-[13px] font-normal leading-relaxed text-[#1C1C1C]/75 md:text-[14px]">
            {pageDescription}
          </p>
        </div>
      </section>

      {/* HORIZONTAL CATEGORY SCROLL BAR */}
      <section className="mx-auto max-w-[1320px] px-5 mb-8 md:px-7 lg:px-8">
        <div className="relative flex items-center border-b border-[#E5E5E5] pb-4">
          {/* Left Arrow */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-[#101010] hover:opacity-60"
            onClick={() => {
              const el = document.getElementById("muro-category-scroll");
              if (el) el.scrollBy({ left: -150, behavior: "smooth" });
            }}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
          </button>

          {/* Scrollable Container */}
          <div
            id="muro-category-scroll"
            className="flex-1 overflow-x-auto flex items-center gap-8 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Show "All" as first option */}
            <button
              type="button"
              onClick={handleClearFilters}
              className={`whitespace-nowrap text-[13px] md:text-[14px] font-normal tracking-wide transition-colors ${
                selectedSubCategory === "ALL"
                  ? "border-b-2 border-black pb-0.5 font-semibold text-black"
                  : "text-[#77736B] hover:text-black"
              }`}
            >
              All Posters
            </button>

            {availableSubcats.map((sub) => {
              const name = sub.name || "";
              const nameUpper = name.toUpperCase();
              const isActive = selectedSubCategory === nameUpper;

              return (
                <button
                  key={sub.id || name}
                  type="button"
                  onClick={() => handleSubCategoryClick(nameUpper)}
                  className={`whitespace-nowrap text-[13px] md:text-[14px] font-normal tracking-wide transition-colors ${
                    isActive
                      ? "border-b-2 border-black pb-0.5 font-semibold text-black"
                      : "text-[#77736B] hover:text-black"
                  }`}
                >
                  {toTitleCase(name)}
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-[#101010] hover:opacity-60"
            onClick={() => {
              const el = document.getElementById("muro-category-scroll");
              if (el) el.scrollBy({ left: 150, behavior: "smooth" });
            }}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </button>

          {/* Vertical Separator */}
          <div className="h-4 w-[1px] bg-[#E5E5E5] mx-3" />

          {/* Filter Icon */}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center text-[#101010] hover:opacity-60"
            aria-label="Filters"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-16 md:px-7 lg:px-8">

        {loading ? (
          <div className="flex min-h-[45vh] items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#101010] border-t-transparent" />
          </div>
        ) : currentItems.length === 0 ? (
          <div className="flex min-h-[45vh] items-center justify-center rounded-[14px] bg-[#F3F3F1] px-6 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#77736B]">
              No products found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
            {currentItems.map((product, index) => (
              <ProductCard
                key={String(getProductId(product) || index)}
                product={product}
                activeOffer={activeOffer}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Show More section */}
        {totalItems > 0 && (
          <div className="mt-14 flex flex-col items-center gap-5">
            <p className="text-[14px] text-[#101010]">
              You have viewed{" "}
              <span className="font-semibold">
                {Math.min(visibleCount, totalItems)}
              </span>{" "}
              of{" "}
              <span className="font-semibold">{totalItems}</span>{" "}
              products
            </p>

            {/* Progress bar */}
            <div className="h-[3px] w-full max-w-[320px] bg-[#E5E5E5] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#101010] rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((Math.min(visibleCount, totalItems) / totalItems) * 100, 100)}%`,
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

    {/* FILTER SIDE PANEL */}
    <AnimatePresence>
      {filterOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/30"
            onClick={() => setFilterOpen(false)}
          />

          {/* Slide-in panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 z-[90] flex h-screen w-[380px] max-w-[90vw] flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[#E5E5E5] px-6">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-semibold text-[#101010]">Filter</span>
                <span className="text-[14px] font-normal text-[#77736B]">0</span>
              </div>
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F4F4F2]"
                aria-label="Close filters"
              >
                <X className="h-5 w-5 text-[#101010]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Filter options */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {[
                "Colour",
                "Occasion",
                "Orientation",
                "Price",
                "Room",
                "Size",
                "Theme",
              ].map((filterName) => (
                <div key={filterName} className="border-b border-[#F0F0F0]">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedFilter(
                        expandedFilter === filterName ? null : filterName,
                      )
                    }
                    className="flex w-full items-center justify-between py-4 text-left"
                  >
                    <span className="text-[14px] font-medium text-[#101010]">
                      {filterName}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#77736B] transition-transform duration-200 ${
                        expandedFilter === filterName ? "rotate-180" : ""
                      }`}
                      strokeWidth={2}
                    />
                  </button>

                  {/* Expanded content placeholder */}
                  <AnimatePresence>
                    {expandedFilter === filterName && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-[13px] text-[#77736B]">
                          No {filterName.toLowerCase()} filters available yet.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer button */}
            <div className="shrink-0 border-t border-[#E5E5E5] p-5">
              <button
                type="button"
                onClick={() => setFilterOpen(false)}
                className="flex h-[50px] w-full items-center justify-center rounded-full bg-[#101010] text-[14px] font-semibold text-white transition-colors hover:bg-[#333]"
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