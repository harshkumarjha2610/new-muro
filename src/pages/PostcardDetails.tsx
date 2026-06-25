import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronRight, Tag } from "lucide-react";
import { toast } from "sonner";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "https://muroposter.com/api";

type ActiveOffer = {
  id?: number;
  label: string;
  discount_percent: number;
  from_date?: string;
  to_date?: string;
};

type CouponResult = {
  valid: boolean;
  code?: string;
  discount_percent?: number;
  message?: string;
};

type PostcardProduct = {
  id: number;
  product_type: "postcard" | "cutout" | "sqft";
  product_name: string;
  quality_of_paper?: string;
  size?: string;
  description?: string;
  short_description?: string;
  full_description?: string;
  price?: string | number;
  total_price?: string | number;
  front_image_url?: string;
  back_image_url?: string;
  image_url?: string;
  width?: string | number;
  height?: string | number;
  sqft_price?: string | number;
  active_offer?: ActiveOffer | null;
  variations?: PostcardProduct[];
  variation_count?: number;
  variation_ids?: number[];
  current_variation_id?: number;
  parent_id?: number;
};

const detailFontCss = `
  #muro-detail-page,
  #muro-detail-page * {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
    letter-spacing: normal !important;
    font-style: normal !important;
  }

  #muro-detail-page .muro-detail-title {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
    font-weight: 500 !important;
    letter-spacing: normal !important;
    text-transform: none !important;
    color: #1C1C1C !important;
  }

  #muro-detail-page .muro-detail-body,
  #muro-detail-page .muro-detail-value,
  #muro-detail-page .muro-detail-category,
  #muro-detail-page .muro-detail-muted {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
    font-weight: 400 !important;
    letter-spacing: normal !important;
    text-transform: none !important;
  }

  #muro-detail-page .muro-detail-label,
  #muro-detail-page .muro-detail-badge,
  #muro-detail-page .muro-detail-price {
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif !important;
    letter-spacing: normal !important;
  }

  #muro-detail-page .muro-detail-label,
  #muro-detail-page .muro-detail-badge {
    font-weight: 600 !important;
  }

  #muro-detail-page .muro-detail-price {
    font-weight: 600 !important;
    color: #1C1C1C !important;
  }
`;

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

const getFullImageUrl = (path?: string) => {
  if (!path) return "https://via.placeholder.com/600x800?text=No+Image";
  if (path.startsWith("http")) return path;

  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `https://muroposter.com/${cleanPath}`;
};

const safeNumber = (value?: string | number) => {
  const cleanValue = String(value ?? "")
    .replace(/[₹,\s]/g, "")
    .trim();

  const num = Number(cleanValue);
  return Number.isFinite(num) && num > 0 ? num : 0;
};

const formatPrice = (value?: string | number) => {
  const price = safeNumber(value);
  return `₹${price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
};

const getActiveOfferPrice = (price: number, offer?: ActiveOffer | null) => {
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

  const finalPrice =
    Math.max(0, Math.round((price - discountAmount) * 100) / 100);

  return {
    originalPrice: price,
    finalPrice,
    discountAmount,
    hasOffer: finalPrice < price,
  };
};

const fetchActiveOffers = async (): Promise<ActiveOffer[]> => {
  try {
    const response = await fetch(`${API_BASE}/offers/active`);
    const json = await response.json().catch(() => null);
    const rows = Array.isArray(json?.data)
      ? json.data
      : json?.data?.items || [];

    return Array.isArray(rows) ? rows : [];
  } catch (error) {
    console.error("Failed to fetch active offers:", error);
    return [];
  }
};

const validateCouponCode = async (code: string): Promise<CouponResult> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return {
      valid: false,
      message: "Please login to apply coupon",
    };
  }

  const response = await fetch(`${API_BASE}/coupons/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code, use_now: true }),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || json?.success === false) {
    return {
      valid: false,
      message: json?.message || "Coupon is not valid or already used",
    };
  }

  return {
    valid: true,
    code: json?.data?.code || code,
    discount_percent: safeNumber(json?.data?.discount_percent),
    message: json?.message || "Coupon applied successfully",
  };
};

const getProductImage = (item?: PostcardProduct | null) => {
  return item?.front_image_url || item?.image_url || item?.back_image_url || "";
};

const getListPath = (product?: PostcardProduct | null, pathname = "") => {
  const type = String(product?.product_type || "").toLowerCase();

  if (pathname.includes("/cutouts") || type === "cutout" || type === "sqft") {
    return "/cutouts";
  }

  return "/postcards";
};

const getDetailPath = (item: PostcardProduct, pathname = "") => {
  const base = getListPath(item, pathname);
  return `${base}/${item.id}`;
};

const PostcardDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();

  const [product, setProduct] = useState<PostcardProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeOffers, setActiveOffers] = useState<ActiveOffer[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState<CouponResult | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const listPath = getListPath(product, location.pathname);
  const listLabel = listPath === "/cutouts" ? "CutOuts" : "Postcards";

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setCouponCode("");
      setCouponResult(null);

      try {
        const endpoint = location.pathname.includes("/cutouts")
          ? "cutouts"
          : "postcards";

        const response = await fetch(`${API_BASE}/${endpoint}/${id}`);
        const json = await response.json().catch(() => null);

        setProduct(json?.data?.product || null);
      } catch (error) {
        console.error("Failed to fetch postcard/cutout product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, location.pathname]);

  useEffect(() => {
    fetchActiveOffers().then(setActiveOffers);
  }, []);

  const handleApplyCoupon = async () => {
    const cleanCode = couponCode.trim().toUpperCase();

    if (!cleanCode) {
      toast.error("Enter coupon code");
      return;
    }

    setCouponLoading(true);
    setCouponResult(null);

    try {
      const result = await validateCouponCode(cleanCode);
      setCouponResult(result);

      if (result.valid) {
        toast.success(result.message || "Coupon applied");
      } else {
        toast.error(result.message || "Coupon is not valid");
      }
    } catch (error: any) {
      console.error("Coupon validation failed:", error);
      toast.error(error?.message || "Coupon validation failed");
    } finally {
      setCouponLoading(false);
    }
  };

  if (loading) {
    return (
      <main
        id="muro-detail-page"
        className="flex min-h-screen items-center justify-center bg-[#F0EEE9]"
      >
        <style>{detailFontCss}</style>
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#1C1C1C] border-t-transparent" />
      </main>
    );
  }

  if (!product) {
    return (
      <main
        id="muro-detail-page"
        className="flex min-h-screen items-center justify-center bg-[#F0EEE9] px-6"
      >
        <style>{detailFontCss}</style>

        <div className="text-center">
          <h1 className="muro-detail-title mb-4 text-[28px] font-semibold text-[#1C1C1C]">
            Product Not Found
          </h1>

          <Link
            to={listPath}
            className="inline-flex items-center justify-center bg-[#1C1C1C] px-8 py-3 text-[12px] uppercase tracking-[0.18em] text-white"
          >
            Back To {listLabel}
          </Link>
        </div>
      </main>
    );
  }

  const basePrice = safeNumber(product.total_price || product.price);
  const activeOffer = product.active_offer || activeOffers[0] || null;
  const offerPreview = getActiveOfferPrice(basePrice, activeOffer);

  const couponPreview = couponResult?.valid
    ? getActiveOfferPrice(offerPreview.finalPrice, {
        label: couponResult.code || "Coupon",
        discount_percent: couponResult.discount_percent || 0,
      })
    : null;

  const shortDescription =
    product.short_description || product.description || "Premium product.";

  const fullDescription =
    product.full_description || product.description || shortDescription;

  const variations = Array.isArray(product.variations)
    ? product.variations
    : [];

  const visibleVariations = variations.filter((item) => Number(item.id) > 0);

  return (
    <main
      id="muro-detail-page"
      className="min-h-screen bg-[#F0EEE9] text-[#1C1C1C]"
    >
      <style>{detailFontCss}</style>

      <section className="w-full py-8 md:py-12">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="muro-detail-muted mb-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#1C1C1C]/45">
            <Link to="/" className="transition-colors hover:text-[#1C1C1C]">
              Home
            </Link>

            <ChevronRight size={13} />

            <Link
              to={listPath}
              className="transition-colors hover:text-[#1C1C1C]"
            >
              {listLabel}
            </Link>

            <ChevronRight size={13} />

            <span className="font-semibold text-[#1C1C1C]">
              {toTitleCase(product.product_name)}
            </span>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {(product.front_image_url || product.image_url) && (
                <div className="overflow-hidden rounded-[24px] bg-white p-4">
                  <img
                    src={getFullImageUrl(
                      product.front_image_url || product.image_url,
                    )}
                    alt={product.product_name}
                    className="block h-auto w-full object-contain"
                  />
                </div>
              )}

              {product.back_image_url && (
                <div className="overflow-hidden rounded-[24px] bg-white p-4">
                  <img
                    src={getFullImageUrl(product.back_image_url)}
                    alt={`${product.product_name} back`}
                    className="block h-auto w-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="w-full lg:pt-2">
              <p className="muro-detail-category mb-5 text-[11px] uppercase tracking-[0.24em] text-[#1C1C1C]/40">
                {product.product_type === "sqft" ||
                product.product_type === "cutout"
                  ? "CutOut Product"
                  : "Postcard"}
              </p>

              <h1 className="muro-detail-title mb-5 text-[34px] leading-tight text-[#1C1C1C] md:text-[42px] lg:text-[46px]">
                {toTitleCase(product.product_name)}
              </h1>

              <div className="mb-5">
                <div className="flex flex-wrap items-end gap-3">
                  {offerPreview.hasOffer && (
                    <span className="muro-detail-muted mb-1 text-[18px] text-[#1C1C1C]/35 line-through">
                      {formatPrice(offerPreview.originalPrice)}
                    </span>
                  )}

                  <span className="muro-detail-price text-[28px] md:text-[32px]">
                    {formatPrice(
                      couponPreview?.finalPrice || offerPreview.finalPrice,
                    )}
                  </span>
                </div>

                {activeOffer && offerPreview.hasOffer && (
                  <div className="muro-detail-badge mt-2 inline-flex items-center gap-2 rounded-full border border-[#006039]/20 bg-[#006039]/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-[#006039]">
                    <Tag size={13} />
                    {toUpperText(activeOffer.label)} -{" "}
                    {activeOffer.discount_percent}% OFF
                  </div>
                )}

                {couponPreview?.hasOffer && couponResult?.valid && (
                  <div className="muro-detail-badge mt-2 text-[12px] uppercase tracking-[0.12em] text-[#006039]">
                    Coupon {toUpperText(couponResult.code)} Applied:{" "}
                    {couponResult.discount_percent}% Extra Off
                  </div>
                )}
              </div>

              <p className="muro-detail-body mb-7 max-w-[650px] whitespace-pre-wrap text-[15px] leading-relaxed text-[#1C1C1C]/65 md:text-[16px]">
                {toTitleCase(shortDescription)}
              </p>

              {visibleVariations.length > 1 && (
                <div className="mb-7 rounded-[22px] border border-[#1C1C1C]/8 bg-white/65 p-5 md:p-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="muro-detail-label text-[12px] uppercase tracking-[0.22em] text-[#1C1C1C]">
                      Variations
                    </p>

                    <span className="muro-detail-muted text-[11px] uppercase tracking-[0.18em] text-[#1C1C1C]/45">
                      {visibleVariations.length} Options
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
                    {visibleVariations.map((variation) => {
                      const isActive =
                        Number(variation.id) === Number(product.id);

                      const image = getProductImage(variation);

                      return (
                        <Link
                          key={variation.id}
                          to={getDetailPath(variation, location.pathname)}
                          className={`group rounded-[14px] border bg-white p-2 transition-all ${
                            isActive
                              ? "border-[#006039] ring-2 ring-[#006039]/15"
                              : "border-[#1C1C1C]/10 hover:border-[#006039]/45"
                          }`}
                        >
                          <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[10px] bg-[#F0EEE9]">
                            <img
                              src={getFullImageUrl(image)}
                              alt={variation.product_name}
                              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          </div>

                          <p className="muro-detail-muted mt-2 truncate text-center text-[10px] uppercase tracking-[0.12em] text-[#1C1C1C]/65">
                            {toTitleCase(
                              variation.size ||
                                variation.quality_of_paper ||
                                `Option ${variation.id}`,
                            )}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Coupon Code Section */}
              {/* 
              <div className="mb-7 rounded-[20px] border border-[#1C1C1C]/8 bg-white/65 p-4 md:p-5">
                <p className="muro-detail-label mb-3 text-[12px] uppercase tracking-[0.22em] text-[#1C1C1C]">
                  Coupon Code
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponResult(null);
                    }}
                    placeholder="Enter coupon code"
                    className="h-[48px] flex-1 border border-[#1C1C1C]/15 bg-white px-4 text-[13px] uppercase tracking-[0.14em] outline-none focus:border-[#1C1C1C]"
                  />

                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="h-[48px] bg-[#1C1C1C] px-6 text-[11px] uppercase tracking-[0.18em] text-white disabled:opacity-60"
                  >
                    {couponLoading ? "Checking..." : "Apply"}
                  </button>
                </div>

                {couponResult && (
                  <p
                    className={`mt-3 text-[12px] ${
                      couponResult.valid ? "text-[#006039]" : "text-red-600"
                    }`}
                  >
                    {couponResult.message ||
                      (couponResult.valid
                        ? "Coupon applied"
                        : "Coupon is not valid")}
                  </p>
                )}
              </div> 
              */}

              <div className="mb-7 space-y-4 rounded-[22px] border border-[#1C1C1C]/8 bg-white/65 p-6 md:p-7">
                {product.quality_of_paper && (
                  <InfoRow
                    label="Quality Of Paper"
                    value={toTitleCase(product.quality_of_paper)}
                  />
                )}

                {product.size && (
                  <InfoRow label="Size" value={toTitleCase(product.size)} />
                )}

                {(product.product_type === "sqft" ||
                  product.product_type === "cutout") && (
                  <>
                    <InfoRow label="Width" value={String(product.width || 0)} />
                    <InfoRow
                      label="Height"
                      value={String(product.height || 0)}
                    />
                    <InfoRow
                      label="Sqft Price"
                      value={formatPrice(product.sqft_price)}
                    />
                  </>
                )}
              </div>

              <div className="rounded-[22px] border border-[#1C1C1C]/8 bg-white/65 p-6 md:p-7">
                <h2 className="muro-detail-label mb-4 text-[13px] uppercase tracking-[0.18em]">
                  Long Description
                </h2>

                <p className="muro-detail-body whitespace-pre-wrap text-[14px] leading-relaxed text-[#1C1C1C]/65 md:text-[15px]">
                  {toTitleCase(fullDescription)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-5 border-b border-[#1C1C1C]/8 pb-3 last:border-b-0 last:pb-0">
    <span className="muro-detail-muted text-[11px] uppercase tracking-[0.18em] text-[#1C1C1C]/45">
      {label}
    </span>

    <span className="muro-detail-value text-right text-[14px] text-[#1C1C1C]">
      {value}
    </span>
  </div>
);

export default PostcardDetails;