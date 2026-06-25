import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, Variants } from "framer-motion";

import { Award, Heart, Package, Star, X, ChevronLeft, ChevronRight } from "lucide-react";

import heroBanner from "@/assets/hero-banner.jpg";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://muroposter.com/api";

const SITE_ORIGIN = "https://muroposter.com";

type ActiveOffer = { label: string; discount_percent: number };

type SizePriceItem = {
  id?: string | number;
  size_id?: string | number;
  size_name?: string;
  name?: string;
  size_code?: string;
  code?: string;
  price?: string | number;
  is_active?: string | number;
};

type ProductImageItem = {
  id?: string | number;
  image_title?: string;
  title?: string;
  image_url?: string;
  url?: string;
  file_url?: string;
  path?: string;
  sort_order?: string | number;
};

type ProductItem = {
  id?: string | number;
  product_id?: string | number;
  productId?: string | number;
  title?: string;
  name?: string;
  price?: string | number;
  base_price?: string | number;
  original_price?: string | number;
  originalPrice?: string | number;
  zoom_in_url?: string;
  wall_poster_url?: string;
  hoverImg?: string;
  main_poster_url?: string;
  defaultImg?: string;
  image_url?: string;
  category?: string;
  subcategory?: string;
  product_images?: ProductImageItem[];
  images?: ProductImageItem[];
  size_prices?: SizePriceItem[];
  sizes?: SizePriceItem[];
};

type HomeHeroSlide = {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  image_url: string;
};

type HomeCategoryTile = {
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  image_url: string;
};

type HomeProduct = {
  id: number;
  product_type?: "poster" | "postcard" | "cutout" | "sqft";
  product_name?: string;
  title?: string;
  category?: string;
  subcategory?: string;
  price?: string | number;
  total_price?: string | number;
  original_price?: string | number;
  final_price?: string | number;
  offer_price?: string | number;
  image_url?: string;
  main_poster_url?: string;
  front_image_url?: string;
  back_image_url?: string;
  product_images?: ProductImageItem[];
  size_prices?: SizePriceItem[];
  size?: string;
};

type HomeContent = {
  hero_slides: HomeHeroSlide[];
  category_tiles: HomeCategoryTile[];
  featured_new_arrival_ids: number[];
  featured_postcard_ids: number[];
  featured_cutout_ids: number[];
  featured_new_arrivals: HomeProduct[];
  featured_postcards: HomeProduct[];
  featured_cutouts: HomeProduct[];
};

const COLORS = {
  page: "#FFFFFF",
  paper: "#F4F4F2",
  ink: "#101010",
  muted: "#9A9A94",
  line: "#E7E4DC",
  accent: "#F1F1F1",
  green: "#006039",
};

const sectionContainerClass = "muro-postery-container";

const pageContainerClass = sectionContainerClass;

const productGridContainerClass = sectionContainerClass;

const productGridClass =
  "grid w-full grid-cols-2 gap-x-[14px] gap-y-[34px] sm:gap-x-[16px] md:grid-cols-4 xl:gap-x-[16px]";

const sectionSpacingClass = "w-full bg-white py-5 md:py-7";

const headingStyle: React.CSSProperties = {
  letterSpacing: "2px",
};

const PRODUCT_ROW_LIMIT = 4;

const productImageBoxStyle: React.CSSProperties = {
  // 3px taller than the previous Postery-size image box.
  aspectRatio: "317.5 / 447.5",
};

const productImageBoxClass =
  "relative flex w-full items-center justify-center overflow-hidden rounded-[12px] bg-[#F4F4F2] p-[26px] sm:p-[34px] lg:p-[42px]";

const editorialThreeTileStyle: React.CSSProperties = {
  // 3px taller than before at the target 428px width.
  aspectRatio: "428 / 579.15",
};

const editorialTwoTileStyle: React.CSSProperties = {
  // 3px taller than before at the target 649px width.
  aspectRatio: "649 / 701.21",
};

const NEWSLETTER_SUBMITTED_KEY = "muro_newsletter_popup_submitted";
const NEWSLETTER_CLOSED_KEY = "muro_newsletter_popup_closed";

type NewsletterPopupPayload = {
  firstName: string;
  lastName: string;
  email: string;
};

const toTitleCase = (value?: string | number) => {
  return String(value || "")
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const toUpperText = (value?: string | number) => {
  return String(value || "").trim().toUpperCase();
};

const toSentenceCase = (value?: string | number) => {
  const text = String(value || "").trim().toLowerCase();
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

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

  if (
    cleanPath.includes("uploads/product") ||
    cleanPath.includes("uploads/postcards") ||
    cleanPath.includes("uploads/home")
  ) {
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
  const price = safeNumber(value) || 500;
  return `₹${price.toLocaleString("en-IN")}`;
};

const getOfferPrice = (price: number, offer?: ActiveOffer | null) => {
  const discount = safeNumber(offer?.discount_percent);

  if (!offer || discount <= 0 || price <= 0) {
    return { originalPrice: price, finalPrice: price, hasOffer: false };
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

const getProductId = (product: ProductItem) => {
  return product.id || product.product_id || product.productId;
};

const getFirstProductImageTitle = (product?: ProductItem | null) => {
  const imageRows = Array.isArray(product?.product_images)
    ? product?.product_images
    : Array.isArray(product?.images)
      ? product?.images
      : [];

  const firstImage = imageRows
    .slice()
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
    .find((img) => Boolean(img.image_title || img.title));

  return String(firstImage?.image_title || firstImage?.title || "").trim();
};

const looksLikeUploadedFileName = (title?: string) => {
  const value = String(title || "").trim();

  return (
    /^screenshot\s+\d{4}/i.test(value) ||
    /^img[_\-\s]?\d+/i.test(value) ||
    /^dsc[_\-\s]?\d+/i.test(value) ||
    /\.(jpg|jpeg|png|webp|pdf)$/i.test(value)
  );
};

const getProductTitle = (product?: ProductItem | null) => {
  const title = String(product?.title || product?.name || "").trim();
  const imageTitle = getFirstProductImageTitle(product);

  if (!title || looksLikeUploadedFileName(title)) {
    return imageTitle || "Product";
  }

  return title;
};

const getUploadedProductImage = (product?: ProductItem | null) => {
  const imageRows = Array.isArray(product?.product_images)
    ? product?.product_images
    : Array.isArray(product?.images)
      ? product?.images
      : [];

  const firstUploaded = imageRows
    .slice()
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
    .find((img) =>
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

const getLowestSizePrice = (product?: ProductItem | null) => {
  const sizeRows = Array.isArray(product?.size_prices)
    ? product?.size_prices
    : Array.isArray(product?.sizes)
      ? product?.sizes
      : [];

  const prices = sizeRows
    .map((size) => safeNumber(size.price))
    .filter((price) => price > 0);

  if (prices.length > 0) {
    return Math.min(...prices);
  }

  return safeNumber(product?.price || product?.base_price) || 500;
};

const getHomeProductImage = (item?: HomeProduct | null) => {
  const imageRows = Array.isArray(item?.product_images)
    ? item?.product_images
    : [];
  const firstUploaded = imageRows
    .slice()
    .sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0))
    .find((img) =>
      Boolean(img.image_url || img.url || img.file_url || img.path),
    );

  return (
    firstUploaded?.image_url ||
    firstUploaded?.url ||
    firstUploaded?.file_url ||
    firstUploaded?.path ||
    item?.image_url ||
    item?.main_poster_url ||
    item?.front_image_url ||
    item?.back_image_url ||
    ""
  );
};

const getHomeProductPrice = (item?: HomeProduct | null) => {
  const sizeRows = Array.isArray(item?.size_prices) ? item?.size_prices : [];
  const sizePrices = sizeRows
    .map((size) => safeNumber(size.price))
    .filter((price) => price > 0);

  if (sizePrices.length > 0) {
    return Math.min(...sizePrices);
  }

  return (
    safeNumber(item?.final_price) ||
    safeNumber(item?.offer_price) ||
    safeNumber(item?.total_price) ||
    safeNumber(item?.price) ||
    500
  );
};

const getHomeProductTitle = (item?: HomeProduct | null) => {
  return (
    String(item?.product_name || item?.title || "Product").trim() || "Product"
  );
};

const getHomeProductBrand = (item?: HomeProduct | null) => {
  if (item?.product_type === "postcard") return "Postcard";
  if (item?.product_type === "cutout" || item?.product_type === "sqft")
    return "CutOut";
  return item?.category || "Muro Poster";
};

const getHomeProductLink = (item: HomeProduct, fallback: string) => {
  if (item.product_type === "postcard") return `/postcards/${item.id}`;
  if (item.product_type === "cutout" || item.product_type === "sqft")
    return `/cutouts/${item.id}`;
  return item.id ? `/product/${item.id}` : fallback;
};

const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: smoothEase },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const defaultHeroSlides: HomeHeroSlide[] = [
  {
    image_url: heroBanner,
    title: "Transform Your Walls.",
    subtitle: "Premium poster prints curated for beautiful living.",
    button_text: "Start Curating →",
    button_link: "/products",
  },
  {
    image_url:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1800&auto=format&fit=crop",
    title: "Art For Every Space.",
    subtitle: "Bring warmth, mood and personality into your room.",
    button_text: "Explore Posters →",
    button_link: "/products",
  },
  {
    image_url:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1800&auto=format&fit=crop",
    title: "Curated Wall Prints.",
    subtitle: "Simple, premium and meaningful posters for modern homes.",
    button_text: "Shop Now →",
    button_link: "/products",
  },
];

const defaultCategoryTiles: HomeCategoryTile[] = [
  {
    title: "Posters",
    subtitle: "New prints to refresh your walls",
    button_text: "Discover",
    button_link: "/new-arrivals",
    image_url: "images/posters.webp",
  },
  {
    title: "Cutouts",
    subtitle: "Playful prints to bring joy to their space",
    button_text: "Explore",
    button_link: "/products?cat=Kids%20Art%20Prints",
    image_url: "images/cutouts.webp",
  },
  {
    title: "Postcard",
    subtitle: "Front and back postcard products ",
    button_text: "Explore",
    button_link: "/postcards",
    image_url: "images/postcards.webp",
  },
];

const collectionHighlightTiles: HomeCategoryTile[] = [
  {
    title: "New Arrivals",
    subtitle: "A curated wall-art story for modern rooms.",
    button_text: "Discover",
    button_link: "/products",
    image_url:
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1400&auto=format&fit=crop",
  },
  {
    title: "Bestsellers",
    subtitle: "Our most-loved art prints",
    button_text: "Explore",
    button_link: "/products",
    image_url:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1400&auto=format&fit=crop",
  },
];

const roomEditorialTiles: HomeCategoryTile[] = [
  {
    title: "Art Magazine",
    subtitle: "Discover stories, ideas and inspiration for your home",
    button_text: "Discover",
    button_link: "/products?cat=Art%20Magazine",
    image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1400&auto=format&fit=crop",
  },
  {
    title: "Curated For Summer",
    subtitle: "Bright, breezy prints for warmer days",
    button_text: "Explore",
    button_link: "/products?cat=Summer",
    image_url: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1400&auto=format&fit=crop",
  },
  {
    title: "Photo Art",
    subtitle: "Photography that turns everyday walls into timeless art",
    button_text: "Explore",
    button_link: "/products?cat=Photo%20Art",
    image_url: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1400&auto=format&fit=crop",
  },
];

const whyBuyItems = [
  {
    icon: Award,
    title: "Elite Print Quality",
    text: "Sharp, vibrant and long-lasting prints made for modern homes.",
  },
  {
    icon: Package,
    title: "Safe Packaging",
    text: "Every poster is packed carefully so it reaches you safely.",
  },
  {
    icon: Heart,
    title: "Made With Intention",
    text: "Simple wall art designed to add warmth and personality.",
  },
  {
    icon: Star,
    title: "Easy Support",
    text: "Quick help available through Email and WhatsApp.",
  },
];

const normalizeHeroSlides = (items: any): HomeHeroSlide[] => {
  const rows = Array.isArray(items) ? items : [];
  const normalized = rows
    .slice(0, 3)
    .map((row: any, index: number) => ({
      title: String(row?.title || defaultHeroSlides[index]?.title || ""),
      subtitle: String(
        row?.subtitle || defaultHeroSlides[index]?.subtitle || "",
      ),
      button_text: String(
        row?.button_text ||
        row?.buttonText ||
        defaultHeroSlides[index]?.button_text ||
        "Explore",
      ),
      button_link: String(
        row?.button_link ||
        row?.buttonLink ||
        defaultHeroSlides[index]?.button_link ||
        "/products",
      ),
      image_url: String(
        row?.image_url ||
        row?.image ||
        defaultHeroSlides[index]?.image_url ||
        "",
      ),
    }))
    .filter((row) => row.image_url);

  return normalized.length > 0 ? normalized : defaultHeroSlides;
};

const normalizeCategoryTiles = (items: any): HomeCategoryTile[] => {
  const rows = Array.isArray(items) ? items : [];
  const normalized = rows
    .slice(0, 3)
    .map((row: any, index: number) => ({
      title: String(row?.title || defaultCategoryTiles[index]?.title || ""),
      subtitle: String(
        row?.subtitle || defaultCategoryTiles[index]?.subtitle || "",
      ),
      button_text: String(
        row?.button_text ||
        row?.buttonText ||
        row?.cta ||
        defaultCategoryTiles[index]?.button_text ||
        "Explore",
      ),
      button_link: String(
        row?.button_link ||
        row?.buttonLink ||
        row?.to ||
        defaultCategoryTiles[index]?.button_link ||
        "/products",
      ),
      image_url: String(
        row?.image_url ||
        row?.image ||
        row?.img ||
        defaultCategoryTiles[index]?.image_url ||
        "",
      ),
    }))
    .filter((row) => row.image_url);

  // Keep this section fixed at exactly 3 boxes.
  // If admin/API sends only 1 or 2 tiles, fill remaining slots with default tiles.
  const filled = [...normalized];
  defaultCategoryTiles.forEach((tile) => {
    if (filled.length >= 3) return;
    const alreadyExists = filled.some(
      (item) => item.title.trim().toLowerCase() === tile.title.trim().toLowerCase(),
    );
    if (!alreadyExists) filled.push(tile);
  });

  return filled.slice(0, 3);
};

const emptyHomeContent = (): HomeContent => ({
  hero_slides: defaultHeroSlides,
  category_tiles: defaultCategoryTiles,
  featured_new_arrival_ids: [],
  featured_postcard_ids: [],
  featured_cutout_ids: [],
  featured_new_arrivals: [],
  featured_postcards: [],
  featured_cutouts: [],
});

const fetchHomeContent = async (): Promise<HomeContent> => {
  try {
    const response = await fetch(`${API_BASE}/home-content`);
    const json = await response.json().catch(() => null);
    const data = json?.data || json || {};

    return {
      hero_slides: normalizeHeroSlides(data.hero_slides),
      category_tiles: defaultCategoryTiles,
      featured_new_arrival_ids: Array.isArray(data.featured_new_arrival_ids)
        ? data.featured_new_arrival_ids.map(Number).filter(Boolean)
        : [],
      featured_postcard_ids: Array.isArray(data.featured_postcard_ids)
        ? data.featured_postcard_ids.map(Number).filter(Boolean)
        : [],
      featured_cutout_ids: Array.isArray(data.featured_cutout_ids)
        ? data.featured_cutout_ids.map(Number).filter(Boolean)
        : [],
      featured_new_arrivals: Array.isArray(data.featured_new_arrivals)
        ? data.featured_new_arrivals
        : [],
      featured_postcards: Array.isArray(data.featured_postcards)
        ? data.featured_postcards
        : [],
      featured_cutouts: Array.isArray(data.featured_cutouts)
        ? data.featured_cutouts
        : [],
    };
  } catch (error) {
    console.error("Failed to fetch home content:", error);
    return emptyHomeContent();
  }
};

const fetchPublicItems = async (endpoint: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`);
    const json = await response.json().catch(() => null);

    if (Array.isArray(json?.data?.items)) return json.data.items;
    if (Array.isArray(json?.data)) return json.data;
    if (Array.isArray(json?.items)) return json.items;
    if (Array.isArray(json)) return json;

    return [];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return [];
  }
};

const normalizePosterProductForHome = (item: any): HomeProduct | null => {
  const id = Number(item?.id || item?.product_id || item?.productId || 0);
  const image = getUploadedProductImage(item);

  if (!id || !image) return null;

  return {
    ...item,
    id,
    product_type: "poster",
    product_name: getProductTitle(item),
    title: getProductTitle(item),
    image_url: image,
    main_poster_url: item?.main_poster_url || item?.image_url || image,
    price: item?.price || item?.base_price || getLowestSizePrice(item),
    original_price: item?.original_price || item?.originalPrice,
    final_price: item?.final_price,
    offer_price: item?.offer_price,
    product_images: Array.isArray(item?.product_images)
      ? item.product_images
      : Array.isArray(item?.images)
        ? item.images
        : [],
    size_prices: Array.isArray(item?.size_prices)
      ? item.size_prices
      : Array.isArray(item?.sizes)
        ? item.sizes
        : [],
  };
};

const normalizePostcardProductForHome = (
  item: any,
  fallbackType: "postcard" | "cutout",
): HomeProduct | null => {
  const id = Number(item?.id || item?.product_id || item?.productId || 0);
  const productType = String(
    item?.product_type || fallbackType,
  ).toLowerCase() as "postcard" | "cutout" | "sqft";
  const image = String(
    item?.image_url ||
    item?.front_image_url ||
    item?.main_poster_url ||
    item?.back_image_url ||
    "",
  );

  if (!id || !image) return null;

  return {
    ...item,
    id,
    product_type: productType,
    product_name: String(
      item?.product_name || item?.title || item?.name || "Product",
    ),
    title: String(item?.title || item?.product_name || item?.name || "Product"),
    image_url: image,
    front_image_url: item?.front_image_url || "",
    back_image_url: item?.back_image_url || "",
    price: item?.price,
    total_price: item?.total_price,
    final_price: item?.final_price,
    offer_price: item?.offer_price,
    size: item?.size || "",
  };
};

const uniqueHomeItems = (items: HomeProduct[]): HomeProduct[] => {
  const seen = new Set<string>();
  const clean: HomeProduct[] = [];

  items.forEach((item) => {
    const key = `${item.product_type || "poster"}-${Number(item.id || 0)}`;
    if (!item.id || seen.has(key) || !getHomeProductImage(item)) return;
    seen.add(key);
    clean.push(item);
  });

  return clean;
};

const homeItemKey = (item: HomeProduct) =>
  `${item.product_type || "poster"}-${Number(item.id || 0)}`;

const fillHomeProductRow = ({
  primary,
  fallback,
  startIndex = 0,
  limit = PRODUCT_ROW_LIMIT,
}: {
  primary?: HomeProduct[];
  fallback?: HomeProduct[];
  startIndex?: number;
  limit?: number;
}) => {
  const output = uniqueHomeItems(primary || []).slice(0, limit);
  const outputKeys = new Set(output.map(homeItemKey));
  const fallbackItems = uniqueHomeItems(fallback || []);

  if (output.length >= limit || fallbackItems.length === 0) {
    return output.slice(0, limit);
  }

  for (let step = 0; output.length < limit && step < fallbackItems.length * 2; step += 1) {
    const item = fallbackItems[(startIndex + step) % fallbackItems.length];
    const key = homeItemKey(item);

    if (!outputKeys.has(key)) {
      output.push(item);
      outputKeys.add(key);
    }
  }

  return output.slice(0, limit);
};

const fetchHomeProductById = async (
  id: number,
  type: "poster" | "postcard" | "cutout",
): Promise<HomeProduct | null> => {
  try {
    const endpoint =
      type === "poster"
        ? `/products/view?id=${id}`
        : type === "postcard"
          ? `/postcards/${id}`
          : `/cutouts/${id}`;
    const response = await fetch(`${API_BASE}${endpoint}`);
    const json = await response.json().catch(() => null);
    const item = json?.data?.product || json?.data || json?.product || null;

    if (!item) return null;

    if (type === "poster") {
      return normalizePosterProductForHome(item);
    }

    return normalizePostcardProductForHome(item, type);
  } catch (error) {
    console.error(`Failed to fetch home ${type} ${id}:`, error);
    return null;
  }
};

const resolveFeaturedHomeItems = async ({
  provided,
  selectedIds,
  pool,
  type,
  fallbackLimit = 8,
}: {
  provided: HomeProduct[];
  selectedIds: number[];
  pool: HomeProduct[];
  type: "poster" | "postcard" | "cutout";
  fallbackLimit?: number;
}): Promise<HomeProduct[]> => {
  const cleanProvided = uniqueHomeItems(
    Array.isArray(provided) ? provided : [],
  );
  if (cleanProvided.length > 0) {
    return cleanProvided.slice(0, 12);
  }

  const ids = Array.isArray(selectedIds)
    ? selectedIds.map(Number).filter(Boolean)
    : [];
  const cleanPool = uniqueHomeItems(pool);

  if (ids.length > 0) {
    const poolById = new Map(cleanPool.map((item) => [Number(item.id), item]));
    const selectedFromPool = ids
      .map((id) => poolById.get(id))
      .filter(Boolean) as HomeProduct[];
    const missingIds = ids.filter((id) => !poolById.has(id));

    if (missingIds.length > 0) {
      const fetchedItems = await Promise.all(
        missingIds.map((id) => fetchHomeProductById(id, type)),
      );
      const fetchedById = new Map(
        fetchedItems.filter(Boolean).map((item) => [Number(item!.id), item!]),
      );
      const ordered = ids
        .map((id) => poolById.get(id) || fetchedById.get(id))
        .filter(Boolean) as HomeProduct[];
      return uniqueHomeItems(ordered).slice(0, 12);
    }

    return uniqueHomeItems(selectedFromPool).slice(0, 12);
  }

  return cleanPool.slice(0, fallbackLimit);
};

const SectionHeading = ({
  title,
  subtitle,
  center = false,
}: {
  title?: string;
  subtitle?: string;
  linkTo?: string;
  linkLabel?: string;
  center?: boolean;
}) => {
  return (
    <div
      className={`mb-5 md:mb-7 flex gap-5 ${center ? "justify-center text-center" : "justify-start text-left"
        }`}
    >
      <div className={center ? "mx-auto min-w-0" : "min-w-0"}>
        {title && (
          <h2
            className="uppercase text-[24px] leading-none tracking-[2px] text-[#101010] md:text-[34px]"
            style={headingStyle}
          >
            {toUpperText(title)}
          </h2>
        )}

        {subtitle && (
          <p
            className={`muro-section-subtitle mt-2 text-[13px] font-normal leading-relaxed text-[#A19D96] md:text-[14px] ${center ? "mx-auto max-w-[760px]" : "max-w-[620px]"
              }`}
          >
            {toTitleCase(subtitle)}
          </p>
        )}
      </div>
    </div>
  );
};

const HomeHeroSlider = ({ slides }: { slides: HomeHeroSlide[] }) => {
  const cleanSlides = slides.length > 0 ? slides : defaultHeroSlides;
  const activeSlide = cleanSlides[0] || defaultHeroSlides[0];

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F4F2]">
      <div className="relative h-[calc(100svh-110px)] min-h-[540px] w-full lg:min-h-[620px]">
        <Link
          to={activeSlide.button_link || "/products"}
          className="relative block h-full w-full"
        >
          {/* STATIC IMAGE ONLY - NO FADE, NO SCALE, NO SLIDER EFFECT */}
          <img
            src={getFullImageUrl(activeSlide.image_url)}
            alt={activeSlide.title}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {/* READABILITY OVERLAY ONLY */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black/72 via-black/28 to-transparent" />

          {/* TEXT ALIGNED WITH NAVBAR HAMBURGER */}
          <div className="absolute inset-0 z-10 flex items-end">
            <div className="mx-auto w-full max-w-[1600px] px-4 pb-10 sm:px-6 md:pb-14 2xl:px-0">
              <div className="max-w-[620px]">
                <h1
                  className="uppercase text-[30px] font-bold leading-[0.95] tracking-[2px] text-white md:text-[36px]"
                  style={headingStyle}
                >
                  {toUpperText(activeSlide.title)}
                </h1>

                {activeSlide.subtitle && (
                  <p className="mt-5 max-w-[620px] text-[13px] font-normal leading-relaxed text-white/90 md:text-[14px]">
                    {toTitleCase(activeSlide.subtitle)}
                  </p>
                )}

                {activeSlide.button_text && (
                  <span className="mt-4 inline-flex border-b border-white pb-1 text-[12px] font-bold uppercase tracking-[0.22em] text-white md:text-[13px]">
                    {toUpperText(activeSlide.button_text)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

const ProductSkeletonCard = ({ index }: { index: number }) => {
  return (
    <div
      className="animate-pulse"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="rounded-[12px] bg-[#F4F4F2]" style={productImageBoxStyle} />
      <div className="mt-4 h-3 w-2/3 rounded-full bg-[#F4F4F2]" />
      <div className="mt-3 h-3 w-1/2 rounded-full bg-[#F4F4F2]" />
    </div>
  );
};

const getProductImages = (item?: ProductItem | null): string[] => {
  const imageRows = Array.isArray(item?.product_images)
    ? item?.product_images
    : Array.isArray(item?.images)
      ? item.images
      : [];

  const sortedRows = imageRows.slice().sort((a, b) => {
    const orderA = typeof a === "object" && a !== null ? Number(a.sort_order || 0) : 0;
    const orderB = typeof b === "object" && b !== null ? Number(b.sort_order || 0) : 0;
    return orderA - orderB;
  });

  const urls: string[] = [];

  sortedRows.forEach((img) => {
    if (typeof img === "string") {
      if (img && !urls.includes(img)) urls.push(img);
    } else if (img && typeof img === "object") {
      const url = img.image_url || img.url || img.file_url || img.path;
      if (url && !urls.includes(url)) urls.push(url);
    }
  });

  if ((item as any)?.front_image_url && !urls.includes((item as any).front_image_url)) {
    urls.push((item as any).front_image_url);
  }
  if ((item as any)?.back_image_url && !urls.includes((item as any).back_image_url)) {
    urls.push((item as any).back_image_url);
  }

  if (urls.length === 0) {
    const fallback =
      item?.image_url ||
      item?.main_poster_url ||
      (item as any)?.front_image_url ||
      (item as any)?.back_image_url ||
      "";
    if (fallback) {
      urls.push(fallback);
    }
  }

  return urls;
};

const PosterProductCard = ({
  item,
  activeOffer,
  index = 0,
}: {
  item: ProductItem;
  activeOffer: ActiveOffer | null;
  index?: number;
}) => {
  const images = useMemo(() => getProductImages(item), [item]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productTitle = toTitleCase(getProductTitle(item));
  const productPrice = getLowestSizePrice(item);
  const currentOffer = ((item as any).active_offer ||
    activeOffer) as ActiveOffer | null;
  const offerPrice = getOfferPrice(productPrice, currentOffer);
  const productId = getProductId(item);
  const brandText = toTitleCase(item.category || item.subcategory || "Muro Poster");

  if (images.length === 0 || !productId) return null;
  const activeImage = images[currentImageIndex];

  return (
    <motion.div variants={fadeInUp} custom={index}>
      <Link
        to={`/product/${productId}`}
        state={{ productData: item }}
        className="group block w-full"
      >
        <article className="w-full">
          <div className={productImageBoxClass} style={productImageBoxStyle}>
            <button
              type="button"
              aria-label="Add to wishlist"
              className="absolute right-1 top-1 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#000000] transition-colors hover:bg-white hover:text-[#006039]"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Heart className="h-4 w-4" strokeWidth={1.45} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    );
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                  }}
                >
                  <ChevronRight size={16} />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${idx === currentImageIndex ? "bg-[#006039]" : "bg-black/20"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(idx);
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            <img
              src={getFullImageUrl(activeImage)}
              alt={productTitle}
              className="max-h-full max-w-full object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.10)] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              loading="lazy"
            />
          </div>

          <div className="mt-4 grid min-h-[78px] grid-cols-[minmax(0,1fr)_104px] items-start gap-4 px-1">
            <div className="min-w-0 muro-product-font">
              <p className="muro-product-category truncate text-[13px] leading-none">
                {brandText}
              </p>

              <h3 className="muro-product-title mt-2 min-h-[40px] text-[14px] leading-snug md:text-[14px]">
                {productTitle}
              </h3>
            </div>

            <div className="w-[104px] shrink-0 text-right">
              <p className="mb-2 text-[13px] font-medium leading-none text-[#A19D96]">
                {toTitleCase("New")}
              </p>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="muro-product-price text-[13px] text-[#101010] md:text-[14px]">
                  {formatPrice(offerPrice.finalPrice)}
                </span>

                {offerPrice.hasOffer && (
                  <span className="muro-product-old-price text-[12px] text-[#A19D96] line-through">
                    {formatPrice(offerPrice.originalPrice)}
                  </span>
                )}
              </div>

              {currentOffer && offerPrice.hasOffer && (
                <p className="muro-offer-label mt-2 text-[10px] uppercase tracking-[0.18em] text-[#006039]">
                  {toUpperText(currentOffer.label)}
                </p>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

const HomeProductCard = ({
  item,
  index = 0,
}: {
  item: HomeProduct;
  index?: number;
}) => {
  const image = getHomeProductImage(item);
  const titleText = toTitleCase(getHomeProductTitle(item));
  const brandText = toTitleCase(getHomeProductBrand(item));
  const finalPrice = getHomeProductPrice(item);
  const originalPrice =
    safeNumber(item.original_price) || safeNumber((item as any).originalPrice);
  const hasOffer = originalPrice > 0 && originalPrice > finalPrice;
  const offerLabel = String(
    (item as any)?.active_offer?.label || (item as any)?.offer_label || "",
  ).trim();

  if (!image) return null;

  return (
    <motion.div variants={fadeInUp} custom={index}>
      <Link
        to={getHomeProductLink(item, "/products")}
        className="group block w-full"
      >
        <article className="w-full">
          <div className={productImageBoxClass} style={productImageBoxStyle}>
            <button
              type="button"
              aria-label="Add to wishlist"
              className="absolute right-1 top-1 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#101010]/70 transition-colors hover:bg-white hover:text-[#006039]"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="h-4 w-4" strokeWidth={1.45} />
            </button>

            <img
              src={getFullImageUrl(image)}
              alt={titleText}
              className="max-h-full max-w-full object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.10)] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              loading="lazy"
            />
          </div>

          <div className="mt-4 grid min-h-[78px] grid-cols-[minmax(0,1fr)_104px] items-start gap-4 px-1">
            <div className="min-w-0 muro-product-font">
              <p className="muro-product-category truncate text-[13px] leading-none">
                {brandText}
              </p>

              <h3 className="muro-product-title mt-2 min-h-[40px] text-[14px] leading-snug md:text-[14px]">
                {titleText}
              </h3>
            </div>

            <div className="w-[104px] shrink-0 text-right">
              <p className="mb-2 text-[13px] font-medium leading-none text-[#A19D96]">
                {toTitleCase("New")}
              </p>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="muro-product-price text-[13px] text-[#101010] md:text-[14px]">
                  {formatPrice(finalPrice)}
                </span>

                {hasOffer && (
                  <span className="muro-product-old-price text-[12px] text-[#A19D96] line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>

              {hasOffer && offerLabel && (
                <p className="muro-offer-label mt-2 text-[10px] uppercase tracking-[0.18em] text-[#006039]">
                  {toUpperText(offerLabel)}
                </p>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};

const HomeProductShowcase = ({
  title,
  items,
  subtitle,
  limit = PRODUCT_ROW_LIMIT,
}: {
  title?: string;
  items: HomeProduct[];
  subtitle?: string;
  limit?: number;
}) => {
  const visibleItems = uniqueHomeItems(items).slice(0, limit);

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={sectionSpacingClass}
    >
      <div className={productGridContainerClass}>
        {(title || subtitle) && (
          <SectionHeading title={title} subtitle={subtitle} />
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={productGridClass}
        >
          {visibleItems.length > 0
            ? visibleItems.map((item, index) => (
              <HomeProductCard
                key={`${item.product_type || "home"}-${item.id || index}`}
                item={item}
                index={index}
              />
            ))
            : Array.from({ length: limit }).map((_, index) => (
              <ProductSkeletonCard key={`empty-${index}`} index={index} />
            ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const EditorialTile = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  imageUrl,
  index,
  aspectStyle,
}: {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl: string;
  index: number;
  aspectStyle?: React.CSSProperties;
}) => {
  return (
    <motion.div variants={fadeInUp} custom={index}>
      <Link
        to={buttonLink || "/products"}
        className="group relative block overflow-hidden rounded-[12px] bg-[#F4F4F2]"
        style={aspectStyle || editorialThreeTileStyle}
      >
        <img
          src={getFullImageUrl(imageUrl)}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

        <div className="absolute inset-x-6 bottom-7 text-white md:inset-x-8 md:bottom-8">
          <h3
            className="text-[24px] leading-none tracking-[2px] md:text-[30px]"
            style={headingStyle}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="muro-editorial-subtitle mt-3 max-w-[560px] overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-normal leading-relaxed text-white/90 md:text-[14px]">
              {toTitleCase(subtitle)}
            </p>
          )}
          <span className="mt-4 inline-flex text-[12px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4">
            {toUpperText(buttonText || "Explore")}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const FrameDiscoveryButton = () => {
  return (
    <div className="mt-6 flex justify-center md:mt-7">

    </div>
  );
};

const EditorialGridSection = ({
  items,
  columns = 3,
}: {
  items: HomeCategoryTile[];
  columns?: 2 | 3;
}) => {
  const visibleItems = items.slice(0, columns);

  if (!visibleItems.length) return null;

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={sectionSpacingClass}
    >
      <div className={pageContainerClass}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className={`grid grid-cols-1 gap-[16px] ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
            }`}
        >
          {visibleItems.map((item, index) => (
            <EditorialTile
              key={`${item.title}-${index}`}
              title={item.title}
              subtitle={item.subtitle}
              buttonText={item.button_text}
              buttonLink={item.button_link}
              imageUrl={item.image_url}
              index={index}
              aspectStyle={columns === 2 ? editorialTwoTileStyle : editorialThreeTileStyle}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export const CollectionHighlightsSection = () => {
  return <EditorialGridSection items={collectionHighlightTiles} columns={2} />;
};

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What paper quality do you use for posters?",
    answer: "We use 300 GSM matte paper for rich colors and a premium feel.",
  },
  {
    question: "Are your posters waterproof or laminated?",
    answer:
      "Our posters are printed on premium matte paper. They are not waterproof unless lamination or a protected frame is added.",
  },
  {
    question: "Do the posters come framed?",
    answer:
      "Frames depend on the selected product option. If a frame is not selected, the poster will be shipped as a print.",
  },
  {
    question: "What sizes are available?",
    answer:
      "Available sizes are shown on each product page. You can select the size before adding the poster to cart.",
  },
  {
    question: "Are the colors true to what I see online?",
    answer:
      "We try to display colors accurately, but slight variation may happen because every screen has different brightness and color settings.",
  },
  {
    question: "Is wall adhesive included?",
    answer:
      "Wall adhesive is not included by default unless it is specifically mentioned on the product page or offer details.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 5–10 business days after dispatch, depending on your location and courier service.",
  },
  {
    question: "Do you deliver across India?",
    answer: "Yes, we deliver across India through our shipping partners.",
  },
  {
    question: "Can I track my order after it is shipped?",
    answer:
      "Yes, once your order is shipped, tracking details will be shared with you.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept secure online payments including UPI, cards, wallets and other supported payment options through our payment gateway.",
  },
];

type ReviewItem = {
  name: string;
  rating: number;
  title: string;
  text: string;
  date: string;
};

const reviewItems: ReviewItem[] = [
  {
    name: "Sarah K.",
    rating: 5,
    title: "ABSOLUTELY STUNNING QUALITY!",
    text: "The quality of the prints is absolutely stellar. The colors are deep and vibrant, and the paper texture feels incredibly premium. It looks perfect in my living room!",
    date: "2 days ago",
  },
  {
    name: "David M.",
    rating: 5,
    title: "SECURE PACKAGING & FAST DELIVERY",
    text: "Fast shipping and secure packaging. The poster arrived in pristine condition. Excellent customer support too when I had a size customization question.",
    date: "1 week ago",
  },
  {
    name: "Elena R.",
    rating: 5,
    title: "HIGHLY UNIQUE DESIGNS",
    text: "MURO designs are so unique and inspiring. They aren't just decorations, they actually bring a modern character to my office space. I will definitely be ordering more.",
    date: "2 weeks ago",
  },
];

const HomeReviewsSection = () => {
  return (
    <div className="grid grid-cols-1 gap-[16px] md:grid-cols-3">
      {reviewItems.map((item) => (
        <div
          key={item.name}
          className="rounded-[12px] border border-[#E7E4DC] bg-[#F8F8F6] p-6 flex flex-col justify-between text-left md:p-7 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div>
            <div className="flex gap-1 mb-4">
              {[...Array(item.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#006039] text-[#006039]"
                />
              ))}
            </div>

            <h4 className="muro-review-title mb-2 text-[16px] leading-tight">
              {toSentenceCase(item.title)}
            </h4>
            <p className="mb-5 text-[13px] font-normal leading-relaxed text-[#A19D96]">
              "{toTitleCase(item.text)}"
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto border-t border-[#E7E4DC]/50 pt-4 text-[12px]">
            <div>
              <span className="font-bold text-black">{toTitleCase(item.name)}</span>
              <span className="ml-2 font-sans font-semibold text-[#006039]">✓ Verified Buyer</span>
            </div>
            <span className="text-[#A19D96]">{toTitleCase(item.date)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const HomeFAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className="border-b border-[#D7D7D7]">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-8 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[16px] font-semibold leading-relaxed text-[#101010] md:text-[16px]">
                {toTitleCase(item.question)}
              </span>

              <span className="shrink-0 text-[24px] font-light leading-none text-[#77736B]">
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: smoothEase }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[760px] pb-7 text-[15px] font-normal leading-relaxed text-[#A19D96] md:text-[16px]">
                    {toTitleCase(item.answer)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

const NewsletterPopup = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: NewsletterPopupPayload) => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();

    if (!cleanFirstName || !cleanLastName || !cleanEmail) {
      setError("Please fill first name, last name and email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    onSubmit({
      firstName: cleanFirstName,
      lastName: cleanLastName,
      email: cleanEmail,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[140] flex items-center justify-center bg-white/75 px-4 py-6 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter signup"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: smoothEase }}
            className="relative grid w-full max-w-[860px] overflow-hidden rounded-[16px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.18)] md:grid-cols-[1.04fr_0.96fr]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close newsletter popup"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-[#111111] transition-colors hover:bg-[#F2F2F2]"
            >
              <X size={16} strokeWidth={1.8} />
            </button>

            <div className="hidden min-h-[520px] bg-[#F2F2F2] md:block">
              <img
                src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=1100&auto=format&fit=crop"
                alt="Muro Poster room inspiration"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex min-h-[520px] flex-col justify-center px-6 py-10 text-center md:px-9 lg:px-10">
              <h2
                className="text-[24px] font-bold leading-tight tracking-[2px] text-[#111111] md:text-[28px]"
                style={headingStyle}
              >
                {toUpperText("Your walls deserve better.")}
              </h2>

              <p className="mx-auto mt-5 max-w-[360px] text-[13px] leading-relaxed text-[#333333]">
                {toTitleCase(
                  "Join the Muro Poster community and get 10% off your first order. Discover new artists and collections, interior inspiration, and be the first to hear about offers.",
                )}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-3 text-left"
              >
                <input
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                    setError("");
                  }}
                  placeholder="First name"
                  className="h-[47px] w-full rounded-[8px] border border-[#D7D7D7]/55 bg-white px-4 text-[13px] text-[#111111] outline-none transition-colors placeholder:text-[#777777] focus:border-[#D7D7D7]"
                />

                <input
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                    setError("");
                  }}
                  placeholder="Last name"
                  className="h-[47px] w-full rounded-[8px] border border-[#D7D7D7]/55 bg-white px-4 text-[13px] text-[#111111] outline-none transition-colors placeholder:text-[#777777] focus:border-[#D7D7D7]"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="Email address"
                  className="h-[47px] w-full rounded-[8px] border border-[#D7D7D7]/55 bg-white px-4 text-[13px] text-[#111111] outline-none transition-colors placeholder:text-[#777777] focus:border-[#D7D7D7]"
                />

                {error && (
                  <p className="text-center text-[12px] font-semibold text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="h-[48px] w-full rounded-full bg-[#000000] text-[13px] font-semibold text-white transition-colors hover:bg-[#006039]"
                >
                  {toUpperText("Get my 10% off")}
                </button>
              </form>

              <button
                type="button"
                onClick={onClose}
                className="mx-auto mt-6 text-[12px] font-medium text-[#111111] transition-colors hover:text-[#006039]"
              >
                {toTitleCase("No thanks, maybe later")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Index: React.FC = () => {
  const [bestsellers, setBestsellers] = useState<ProductItem[]>([]);
  const [loadingBestsellers, setLoadingBestsellers] = useState(true);
  const [homeContent, setHomeContent] =
    useState<HomeContent>(emptyHomeContent());
  const [homeNewArrivals, setHomeNewArrivals] = useState<HomeProduct[]>([]);
  const [homePostcards, setHomePostcards] = useState<HomeProduct[]>([]);
  const [homeCutouts, setHomeCutouts] = useState<HomeProduct[]>([]);
  const [activeOffer, setActiveOffer] = useState<ActiveOffer | null>(null);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const newsletterTimerRef = useRef<number | null>(null);

  const isNewsletterCompletedOrClosed = () => {
    return (
      window.localStorage.getItem(NEWSLETTER_SUBMITTED_KEY) === "1" ||
      window.localStorage.getItem(NEWSLETTER_CLOSED_KEY) === "1"
    );
  };

  const clearNewsletterTimer = () => {
    if (newsletterTimerRef.current) {
      window.clearTimeout(newsletterTimerRef.current);
      newsletterTimerRef.current = null;
    }
  };

  const scheduleNewsletterPopup = (delay = 10000) => {
    clearNewsletterTimer();

    if (isNewsletterCompletedOrClosed()) {
      return;
    }

    newsletterTimerRef.current = window.setTimeout(() => {
      if (!isNewsletterCompletedOrClosed()) {
        setNewsletterOpen(true);
      }
    }, delay);
  };

  const handleNewsletterClose = () => {
    window.localStorage.setItem(NEWSLETTER_CLOSED_KEY, "1");
    clearNewsletterTimer();
    setNewsletterOpen(false);
  };

  const handleNewsletterSubmit = (payload: NewsletterPopupPayload) => {
    window.localStorage.setItem(NEWSLETTER_SUBMITTED_KEY, "1");
    window.localStorage.setItem(NEWSLETTER_CLOSED_KEY, "1");
    window.localStorage.setItem(
      "muro_newsletter_popup_data",
      JSON.stringify({
        ...payload,
        submitted_at: new Date().toISOString(),
      }),
    );

    clearNewsletterTimer();
    setNewsletterOpen(false);
  };

  const heroSlides = useMemo(
    () =>
      homeContent.hero_slides.length > 0
        ? homeContent.hero_slides
        : defaultHeroSlides,
    [homeContent.hero_slides],
  );
  const categoryTiles = useMemo(
    () =>
      homeContent.category_tiles.length > 0
        ? homeContent.category_tiles
        : defaultCategoryTiles,
    [homeContent.category_tiles],
  );

  useEffect(() => {
    scheduleNewsletterPopup(10000);

    return () => {
      clearNewsletterTimer();
    };
  }, []);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoadingBestsellers(true);

      try {
        const [homeRes, productsRes, offerRes, postcardRes, cutoutRes]: any =
          await Promise.all([
            fetchHomeContent(),
            fetchPublicItems("/products?limit=80"),
            fetchActiveOffer(),
            fetchPublicItems("/postcards"),
            fetchPublicItems("/cutouts"),
          ]);

        const posterPool = uniqueHomeItems(
          (Array.isArray(productsRes) ? productsRes : [])
            .map((item: any) => normalizePosterProductForHome(item))
            .filter(Boolean) as HomeProduct[],
        );

        const postcardPool = uniqueHomeItems(
          (Array.isArray(postcardRes) ? postcardRes : [])
            .map((item: any) =>
              normalizePostcardProductForHome(item, "postcard"),
            )
            .filter(Boolean) as HomeProduct[],
        );

        const cutoutPool = uniqueHomeItems(
          (Array.isArray(cutoutRes) ? cutoutRes : [])
            .map((item: any) => normalizePostcardProductForHome(item, "cutout"))
            .filter(Boolean) as HomeProduct[],
        );

        const newArrivalItems = await resolveFeaturedHomeItems({
          provided: homeRes.featured_new_arrivals || [],
          selectedIds: homeRes.featured_new_arrival_ids || [],
          pool: posterPool,
          type: "poster",
        });

        const postcardItems = await resolveFeaturedHomeItems({
          provided: homeRes.featured_postcards || [],
          selectedIds: homeRes.featured_postcard_ids || [],
          pool: postcardPool,
          type: "postcard",
        });

        const cutoutItems = await resolveFeaturedHomeItems({
          provided: homeRes.featured_cutouts || [],
          selectedIds: homeRes.featured_cutout_ids || [],
          pool: cutoutPool,
          type: "cutout",
        });

        const firstProductRow = fillHomeProductRow({
          primary: posterPool,
          fallback: posterPool,
          startIndex: 0,
        });

        const secondProductRow = fillHomeProductRow({
          primary: newArrivalItems,
          fallback: posterPool,
          startIndex: PRODUCT_ROW_LIMIT,
        });

        const thirdProductRow = fillHomeProductRow({
          primary: postcardItems,
          fallback: [...postcardPool, ...posterPool],
          startIndex: PRODUCT_ROW_LIMIT * 2,
        });

        const fourthProductRow = fillHomeProductRow({
          primary: cutoutItems,
          fallback: [...cutoutPool, ...posterPool],
          startIndex: PRODUCT_ROW_LIMIT * 3,
        });

        setHomeContent(homeRes);
        setActiveOffer(offerRes);
        setBestsellers(firstProductRow as unknown as ProductItem[]);
        setHomeNewArrivals(secondProductRow);
        setHomePostcards(thirdProductRow);
        setHomeCutouts(fourthProductRow);
      } catch (err) {
        console.error("Failed to fetch home data:", err);
      } finally {
        setLoadingBestsellers(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <main
      id="muro-home-page"
      className="min-h-screen overflow-x-hidden bg-white text-[#101010] selection:bg-[#101010] selection:text-white"
      style={{ backgroundColor: COLORS.page, color: COLORS.ink }}
    >
      <style>{`
        /* Exact Postery-size layout:
           - 4 product cards: (1320 - 3*16) / 4 = 318px, same as 317.5px target.
           - 3 editorial tiles: (1320 - 2*16) / 3 = 429.33px, matching the 428px screenshot size.
           - 2 editorial tiles: (1320 - 16) / 2 = 652px, matching the 649px screenshot size. */
        #muro-home-page .muro-postery-container {
          width: calc(100% - 32px) !important;
          max-width: 1320px !important;
          margin-left: auto !important;
          margin-right: auto !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          box-sizing: border-box !important;
        }

        @media (min-width: 640px) {
          #muro-home-page .muro-postery-container {
            width: calc(100% - 48px) !important;
          }
        }

        @media (min-width: 1024px) {
          #muro-home-page .muro-postery-container {
            width: calc(100% - 64px) !important;
          }
        }

        @media (min-width: 1440px) {
          #muro-home-page .muro-postery-container {
            width: 1320px !important;
          }
        }

        #muro-home-page .muro-product-font,
        #muro-home-page .muro-product-font * {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
          letter-spacing: 0px !important;
          text-transform: none !important;
          font-style: normal !important;
        }

        #muro-home-page .muro-product-category {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
          font-weight: 500 !important;
          letter-spacing: 0px !important;
          text-transform: capitalize !important;
          color: #A19D96 !important;
        }

        #muro-home-page .muro-product-title {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
          font-weight: 600 !important;
          letter-spacing: 0px !important;
          text-transform: capitalize !important;
          color: #101010 !important;
        }

        #muro-home-page .muro-product-price {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0px !important;
        }

        #muro-home-page .muro-product-old-price {
          font-weight: 500 !important;
        }

        #muro-home-page .muro-offer-label {
          font-weight: 800 !important;
        }

        #muro-home-page .muro-why-title {
          white-space: nowrap !important;
          font-size: 19px !important;
          font-weight: 800 !important;
          letter-spacing: 1.2px !important;
          color: #101010 !important;
        }

        #muro-home-page .muro-why-text {
          font-weight: 500 !important;
          color: #9A9690 !important;
        }

        @media (min-width: 768px) {
          #muro-home-page .muro-section-subtitle,
          #muro-home-page .muro-editorial-subtitle,
          #muro-home-page .muro-why-text {
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          #muro-home-page .muro-section-subtitle {
            max-width: none !important;
          }
        }

        #muro-home-page .muro-review-title {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
          font-weight: 700 !important;
          letter-spacing: 0px !important;
          text-transform: none !important;
          color: #101010 !important;
        }


        /* FOOTER PAYMENT / CURRENCY ICON FIX - equal box size + evenly spaced */
        footer .payment-icons,
        footer .footer-payment-icons,
        footer .muro-payment-icons,
        footer [class*="payment-icons" i],
        footer [class*="paymentIcons" i] {
          display: flex !important;
          align-items: center !important;
          justify-content: space-evenly !important;
          gap: 10px !important;
          width: 100% !important;
        }

        footer .payment-icons > *,
        footer .footer-payment-icons > *,
        footer .muro-payment-icons > *,
        footer [class*="payment-icons" i] > *,
        footer [class*="paymentIcons" i] > * {
          flex: 1 1 0 !important;
          min-height: 43px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        footer img[alt*="rupay" i],
        footer img[src*="rupay" i],
        footer img[alt*="rupay-logo" i],
        footer img[src*="rupay-logo" i],
        footer img[alt*="upi" i],
        footer img[src*="upi" i],
        footer img[alt*="paytm" i],
        footer img[src*="paytm" i],
        footer img[alt*="visa" i],
        footer img[src*="visa" i],
        footer img[alt*="master" i],
        footer img[src*="master" i],
        footer img[alt*="mastercard" i],
        footer img[src*="mastercard" i] {
          width: 60px !important;
          height: 30px !important;
          max-width: 60px !important;
          max-height: 30px !important;
          min-width: 60px !important;
          object-fit: contain !important;
          object-position: center !important;
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>

      <HomeHeroSlider slides={heroSlides} />

      <section className={sectionSpacingClass}>
        <div className={productGridContainerClass}>
          {loadingBestsellers ? (
            <div className={productGridClass}>
              {Array.from({ length: PRODUCT_ROW_LIMIT }).map((_, index) => (
                <ProductSkeletonCard key={index} index={index} />
              ))}
            </div>
          ) : bestsellers.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-[12px] bg-[#F4F4F2] px-6 text-center">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#77736B]">
                No products with uploaded images found
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className={productGridClass}
            >
              {bestsellers.map((item, index) => (
                <PosterProductCard
                  key={String(getProductId(item) || index)}
                  item={item}
                  activeOffer={activeOffer}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <div className="flex justify-center py-2 md:py-3 bg-white">
        <Link
          to="/products"
          className="inline-flex h-[50px] items-center justify-center rounded-full border border-black/30 bg-white px-12 text-[15px] font-medium text-black transition-all hover:border-black hover:bg-[#F4F4F2]"
        >
          Discover our posters
        </Link>
      </div>

      <div>
        <EditorialGridSection items={categoryTiles} columns={3} />
      </div>

      <HomeProductShowcase
        items={homeNewArrivals}
        limit={PRODUCT_ROW_LIMIT}
      />

      <div className="flex justify-center py-2 md:py-3 bg-white">
        <Link
          to="/cutouts"
          className="inline-flex h-[50px] items-center justify-center rounded-full border border-black/30 bg-white px-12 text-[15px] font-medium text-black transition-all hover:border-black hover:bg-[#F4F4F2]"
        >
          Discover our cutouts
        </Link>
      </div>


      <CollectionHighlightsSection />

      <HomeProductShowcase
        items={homePostcards}
        limit={PRODUCT_ROW_LIMIT}
      />

      <div className="flex justify-center py-2 md:py-3 bg-white">
        <Link
          to="/postcards"
          className="inline-flex h-[50px] items-center justify-center rounded-full border border-black/30 bg-white px-12 text-[15px] font-medium text-black transition-all hover:border-black hover:bg-[#F4F4F2]"
        >
          Discover our postcard
        </Link>
      </div>

      <EditorialGridSection items={roomEditorialTiles} columns={3} />

      <HomeProductShowcase
        items={homeCutouts}
        limit={PRODUCT_ROW_LIMIT}
      />

      <section className={sectionSpacingClass}>
        <div className={pageContainerClass}>
          <SectionHeading
            title="WHY MURO"
            subtitle="Premium posters, safe delivery and easy support — everything kept clean, simple and reliable."
            center
          />

          <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
            {whyBuyItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="min-h-[203px] rounded-[12px] border border-[#E7E4DC] bg-[#F8F8F6] p-6 text-center md:min-h-[215px] md:p-7"
                >
                  <div className="mx-auto mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#101010] shadow-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>

                  <h3
                    className="muro-why-title leading-none text-[#101010]"
                    style={headingStyle}
                  >
                    {toUpperText(item.title)}
                  </h3>

                  <p className="muro-why-text mt-3 text-[14px] leading-relaxed">
                    {toTitleCase(item.text)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={sectionSpacingClass}>
        <div className={pageContainerClass}>
          <SectionHeading
            title="CUSTOMER REVIEWS"
            subtitle="Authentic feedback from decorators who transformed their spaces with MURO."
            center
          />

          <HomeReviewsSection />
        </div>
      </section>

      <section className={sectionSpacingClass}>
        <div className={pageContainerClass}>
          <SectionHeading
            title="FREQUENTLY ASKED QUESTIONS"
            subtitle="Quick answers about posters, shipping, payments, support and order handling."
            center
          />

          <HomeFAQSection />
        </div>
      </section>

      <NewsletterPopup
        open={newsletterOpen}
        onClose={handleNewsletterClose}
        onSubmit={handleNewsletterSubmit}
      />
    </main>
  );
};

export default Index;




