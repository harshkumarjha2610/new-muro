import React, { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, SlidersHorizontal, ChevronDown } from "lucide-react";
import { API } from "@/services/api";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://muroposter.com/api";
const SITE_ORIGIN = "https://muroposter.com";

type ActiveOffer = { label: string; discount_percent: number };

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
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getUploadedProductImage = (product: any) => {
  const imageRows = Array.isArray(product?.product_images)
    ? product.product_images
    : Array.isArray(product?.images)
    ? product.images
    : [];

  const firstUploaded = imageRows
    .slice()
    .sort((a: any, b: any) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
    .find((img: any) => Boolean(img.image_url || img.url || img.file_url || img.path));

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

  const prices = sizeRows.map((size: any) => safeNumber(size.price)).filter((price: number) => price > 0);

  if (prices.length > 0) {
    return Math.min(...prices);
  }

  return safeNumber(product?.price || product?.base_price) || 500;
};

const getOfferPrice = (price: number, offer?: ActiveOffer | null) => {
  const discount = safeNumber(offer?.discount_percent);

  if (!offer || discount <= 0 || price <= 0) {
    return { originalPrice: price, finalPrice: price, hasOffer: false };
  }

  return {
    originalPrice: price,
    finalPrice: Math.max(0, Math.round((price - (price * discount) / 100) * 100) / 100),
    hasOffer: true,
  };
};

const fetchActiveOffer = async (): Promise<ActiveOffer | null> => {
  try {
    const response = await fetch(`${API_BASE}/offers/active`);
    const json = await response.json().catch(() => null);
    const rows = Array.isArray(json?.data) ? json.data : json?.data?.items || [];
    return rows[0] || null;
  } catch (error) {
    console.error("Failed to fetch active offer:", error);
    return null;
  }
};

const getProductId = (product: any) => {
  return product?.id || product?.product_id || product?.productId;
};

const ProductCard = ({ product, activeOffer, index }: { product: any; activeOffer: ActiveOffer | null; index: number }) => {
  const productImage = getUploadedProductImage(product);
  const productId = getProductId(product);
  const productPrice = getLowestProductPrice(product);
  const currentOffer = (product.active_offer || activeOffer) as ActiveOffer | null;
  const offerPrice = getOfferPrice(productPrice, currentOffer);
  const title = product.title || product.name || "Product";
  const brand = product.category || product.subcategory || "Muro Poster";

  if (!productImage || !productId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.025, 0.25) }}
    >
      <Link to={`/product/${productId}`} state={{ productData: product }} className="group block w-full">
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
              <p className="truncate text-[13px] leading-none text-[#A19D96]">{brand}</p>
              <h3 className="mt-2 min-h-[38px] text-[14px] font-medium leading-snug text-[#101010] md:text-[15px]">{title}</h3>
            </div>

            <div className="text-right">
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="text-[13px] font-semibold text-[#101010] md:text-[14px]">{formatPrice(offerPrice.finalPrice)}</span>
                {offerPrice.hasOffer && <span className="text-[12px] text-[#A19D96] line-through">{formatPrice(offerPrice.originalPrice)}</span>}
              </div>

              {currentOffer && offerPrice.hasOffer && (
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#006039]">{currentOffer.label}</p>
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

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(urlSubcategory);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 40;

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("default");
  const [selectedSize, setSelectedSize] = useState<string>("ALL");

  const sortDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClearFilters = () => {
    setSelectedCategory("ALL");
    setSelectedSubCategory("ALL");
    setSelectedSize("ALL");
    setSortBy("default");
    setCurrentPage(1);
    setSearchParams({});
  };

  useEffect(() => {
    if (urlCategory !== selectedCategory || urlSubcategory !== selectedSubCategory) {
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

        setProducts(Array.isArray(prodRes) ? prodRes : prodRes?.data?.items || prodRes?.data || []);
        setCategories(Array.isArray(catRes) ? catRes : catRes?.data || []);
        setSubcategories(Array.isArray(subcatRes) ? subcatRes : subcatRes?.data || []);
        setActiveOffer(offerRes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubCategory("ALL");
    setCurrentPage(1);

    if (cat === "ALL") {
      setSearchParams({});
    } else {
      setSearchParams({ cat: cat.toLowerCase() });
    }
  };

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

  const currentCatObj = uniqueCategories.find((cat) => cat.name?.toUpperCase() === selectedCategory);

  const availableSubcats = useMemo(() => {
    if (!currentCatObj) return [];

    return subcategories
      .filter((sub) => String(sub.category_id) === String(currentCatObj.id || currentCatObj.category_id))
      .filter((sub, index, arr) => {
        const name = String(sub.name || "").trim().toUpperCase();

        if (!name || name === selectedCategory) return false;

        return arr.findIndex((item) => String(item.name || "").trim().toUpperCase() === name) === index;
      });
  }, [currentCatObj, selectedCategory, subcategories]);

  const allSizes = useMemo(() => {
    const sizesSet = new Set<string>();
    products.forEach((product) => {
      const rawSizes = Array.isArray(product.size_prices)
        ? product.size_prices
        : Array.isArray(product.sizes)
        ? product.sizes
        : [];
      rawSizes.forEach((sz: any) => {
        const name = String(sz.size_name || sz.name || sz.size_code || sz.code || "").trim();
        if (name) sizesSet.add(name);
      });
    });
    return Array.from(sizesSet).sort((a, b) => {
      const aNum = parseInt(a, 10) || 0;
      const bNum = parseInt(b, 10) || 0;
      return aNum - bNum;
    });
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCat = selectedCategory === "ALL" || product.category?.toUpperCase() === selectedCategory;
      const matchSubCat = selectedSubCategory === "ALL" || product.subcategory?.toUpperCase() === selectedSubCategory;

      let matchSize = true;
      if (selectedSize !== "ALL") {
        const rawSizes = Array.isArray(product.size_prices)
          ? product.size_prices
          : Array.isArray(product.sizes)
          ? product.sizes
          : [];
        matchSize = rawSizes.some((sz: any) => {
          const name = String(sz.size_name || sz.name || sz.size_code || sz.code || "").trim().toUpperCase();
          return name === selectedSize.toUpperCase();
        });
      }

      return matchCat && matchSubCat && matchSize && Boolean(getUploadedProductImage(product));
    });
  }, [products, selectedCategory, selectedSubCategory, selectedSize]);

  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    if (sortBy === "price-asc") {
      return items.sort((a, b) => getLowestProductPrice(a) - getLowestProductPrice(b));
    }
    if (sortBy === "price-desc") {
      return items.sort((a, b) => getLowestProductPrice(b) - getLowestProductPrice(a));
    }
    return items;
  }, [filteredProducts, sortBy]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const pageHeading =
    selectedSubCategory !== "ALL"
      ? toTitleCase(selectedSubCategory)
      : selectedCategory === "ALL"
      ? "Posters"
      : toTitleCase(selectedCategory);

  const pageDescription =
    selectedSubCategory !== "ALL"
      ? `Explore ${toTitleCase(selectedSubCategory)} posters from MURO Poster. Browse premium wall art prints with clean styling, dynamic size pricing and curated visual themes.`
      : selectedCategory === "ALL"
      ? "Discover a wide range of posters online, featuring popular motifs such as motivational quotes, mindset art, typography, lifestyle prints and more. Explore styles for every room and mood at MURO Poster."
      : `Discover curated ${toTitleCase(selectedCategory)} posters for modern spaces. Choose from premium wall art prints designed for homes, offices, studios and creative rooms.`;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    const pages = [];

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <main className="min-h-screen bg-white text-[#101010] selection:bg-[#101010] selection:text-white">
      <section className="mx-auto max-w-[1320px] px-5 pb-8 pt-12 md:px-7 md:pb-10 md:pt-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <motion.h1
            key={`${selectedCategory}-${selectedSubCategory}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-[34px] leading-none text-[#101010] md:text-[42px] lg:text-[48px] tracking-[2px]"
            style={{ fontFamily: serifFont }}
          >
            {pageHeading}
          </motion.h1>

          <p className="max-w-[670px] text-[14px] font-medium leading-relaxed text-[#101010] md:text-[15px]">{pageDescription}</p>
        </div>

      

      
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-16 md:px-7 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E2DF] pb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 border px-4 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-205 ${
                isFilterOpen
                  ? "bg-[#101010] border-[#101010] text-white"
                  : "bg-white border-[#E2E2DF] text-[#101010] hover:border-[#101010]"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>Filters</span>
              {(selectedCategory !== "ALL" || selectedSubCategory !== "ALL" || selectedSize !== "ALL") && (
                <span className={`ml-1 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] font-bold ${isFilterOpen ? "bg-white text-[#101010]" : "bg-[#006039] text-white"}`}>
                  {[
                    selectedCategory !== "ALL" ? 1 : 0,
                    selectedSubCategory !== "ALL" ? 1 : 0,
                    selectedSize !== "ALL" ? 1 : 0,
                  ].reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>
          </div>
          </div>
                <motion.div
          initial={false}
          animate={{ height: isFilterOpen ? "auto" : 0, opacity: isFilterOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="overflow-hidden"
        >
          <div className="border-b border-[#E2E2DF] pb-8 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A19D96] mb-4">Categories</h4>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => handleCategoryClick("ALL")}
                  className={`text-[13px] text-left hover:underline tracking-wide transition-colors ${
                    selectedCategory === "ALL" ? "font-bold text-[#006039]" : "text-[#101010] font-medium"
                  }`}
                >
                  All Categories
                </button>
                {uniqueCategories.map((cat) => {
                  const name = cat.name || "";
                  const nameUpper = name.toUpperCase();
                  return (
                    <button
                      key={cat.id || name}
                      onClick={() => handleCategoryClick(nameUpper)}
                      className={`text-[13px] text-left hover:underline tracking-wide transition-colors ${
                        selectedCategory === nameUpper ? "font-bold text-[#006039]" : "text-[#101010] font-medium"
                      }`}
                    >
                      {toTitleCase(name)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A19D96] mb-4">Subcategories</h4>
              {selectedCategory === "ALL" ? (
                <p className="text-[12px] text-[#A19D96] italic font-medium">Select a category to view subcategories</p>
              ) : availableSubcats.length === 0 ? (
                <p className="text-[12px] text-[#A19D96] italic font-medium">No subcategories available</p>
              ) : (
                <div className="flex flex-col gap-2.5 max-h-[200px] overflow-y-auto pr-2 animate-none">
                  <button
                    onClick={() => handleSubCategoryClick("ALL")}
                    className={`text-[13px] text-left hover:underline tracking-wide transition-colors ${
                      selectedSubCategory === "ALL" ? "font-bold text-[#006039]" : "text-[#101010] font-medium"
                    }`}
                  >
                    All {toTitleCase(selectedCategory)}
                  </button>
                  {availableSubcats.map((sub) => {
                    const name = sub.name || "";
                    const nameUpper = name.toUpperCase();
                    return (
                      <button
                        key={sub.id || name}
                        onClick={() => handleSubCategoryClick(nameUpper)}
                        className={`text-[13px] text-left hover:underline tracking-wide transition-colors ${
                          selectedSubCategory === nameUpper ? "font-bold text-[#006039]" : "text-[#101010] font-medium"
                        }`}
                      >
                        {toTitleCase(name)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            
              {(selectedCategory !== "ALL" || selectedSubCategory !== "ALL" || selectedSize !== "ALL") && (
                <button
                  onClick={handleClearFilters}
                  className="mt-6 inline-block text-[11px] font-bold uppercase tracking-[0.14em] text-[#006039] hover:underline"
                >
                  Clear All Filters
                </button>
              )}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex min-h-[45vh] items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#101010] border-t-transparent" />
          </div>
        ) : currentItems.length === 0 ? (
          <div className="flex min-h-[45vh] items-center justify-center rounded-[14px] bg-[#F3F3F1] px-6 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#77736B]">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
            {currentItems.map((product, index) => (
              <ProductCard key={String(getProductId(product) || index)} product={product} activeOffer={activeOffer} index={index} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="rounded-full border border-[#101010] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#101010] transition-colors hover:bg-[#101010] hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              Prev
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={`h-9 w-9 rounded-full border text-[12px] font-semibold transition-colors ${
                  currentPage === page ? "border-[#101010] bg-[#101010] text-white" : "border-[#101010] text-[#101010] hover:bg-[#101010] hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="rounded-full border border-[#101010] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#101010] transition-colors hover:bg-[#101010] hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default Products;
