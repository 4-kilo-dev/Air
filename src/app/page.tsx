"use client";

import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bath,
  Bed,
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  Droplets,
  ExternalLink,
  Heart,
  MapPin,
  Phone,
  Plane,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import {
  INITIAL_PROPERTIES,
  RECENT_BOOKINGS,
  type PropertyItem,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AppView = "explore" | "manage";
type Currency = "USD" | "ETB";

const neighborhoods = [
  "All",
  "Bole",
  "Kazanchis",
  "Old Airport",
  "Sarbet",
  "CMC",
  "Piassa",
];

function PropertyCard({
  property,
  isSaved,
  onBook,
  onToggleSaved,
  formatPrice,
}: {
  property: PropertyItem;
  isSaved: boolean;
  onBook: (property: PropertyItem) => void;
  onToggleSaved: (propertyId: number) => void;
  formatPrice: (usd: number, etb: number) => string;
}) {
  return (
    <article className="property-card group h-full">
      <Card className="apple-card h-full overflow-hidden border-white/80 bg-white">
        <div className="relative aspect-[1.22] overflow-hidden bg-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <Badge className="glass-pill border-white/40 text-[11px] font-semibold text-white">
              {property.neighborhood}
            </Badge>
            <button
              type="button"
              aria-label={isSaved ? "Remove from saved stays" : "Save this stay"}
              aria-pressed={isSaved}
              onClick={() => onToggleSaved(property.id)}
              className="glass-icon grid size-9 place-items-center text-white transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Heart
                className={isSaved ? "size-4 fill-rose-500 text-rose-500" : "size-4"}
              />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-black/5 to-transparent px-4 pb-4 pt-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white">
              <Plane className="size-3.5" />
              {property.proximityAirportMin} min to Bole
            </span>
            {property.isSuperhost && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/18 px-2 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                <Sparkles className="size-3" />
                Guest favourite
              </span>
            )}
          </div>
        </div>

        <CardHeader className="p-5 pb-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-[#6e6e73]">
              {property.propertyType}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#1d1d1f]">
              <Star className="size-3.5 fill-[#ffb340] text-[#ffb340]" />
              {property.rating}
              <span className="font-normal text-[#6d6e73]">
                ({property.reviewCount})
              </span>
            </span>
          </div>
          <CardTitle className="property-title line-clamp-1 text-[17px] font-semibold tracking-[-0.025em] text-[#1d1d1f]">
            {property.title}
          </CardTitle>
          <CardDescription className="property-description mt-1 line-clamp-2 text-sm leading-5 text-[#6e6e73]">
            {property.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col px-5 pb-4 pt-0">
          <div className="flex items-center gap-3 border-y border-[#e5e5ea] py-3 text-xs text-[#6e6e73]">
            <span className="inline-flex items-center gap-1.5">
              <Bed className="size-3.5" />
              {property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bath className="size-3.5" />
              {property.bathrooms} bath{property.bathrooms > 1 ? "s" : ""}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5" />
              {property.maxGuests}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {property.hasGenerator && (
              <span className="feature-chip">
                <Zap className="size-3 text-[#0071e3]" />
                Backup power
              </span>
            )}
            {property.hasWaterReserve && (
              <span className="feature-chip">
                <Droplets className="size-3 text-[#0071e3]" />
                Water reserve
              </span>
            )}
            <span className="feature-chip">
              <Wifi className="size-3 text-[#0071e3]" />
              Fast Wi-Fi
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex items-end justify-between gap-3 border-t border-[#e5e5ea] px-5 pb-5 pt-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-semibold tracking-[-0.035em] text-[#1d1d1f]">
                {formatPrice(property.priceUSD, property.priceETB)}
              </span>
              <span className="text-xs text-[#6d6e73]">night</span>
            </div>
            <span className="text-[11px] font-medium text-[#0071e3]">
              Airport pickup available
            </span>
          </div>
          <Button
            onClick={() => onBook(property)}
            className="apple-button h-10 rounded-full bg-[#0071e3] px-4 text-xs font-semibold text-white hover:bg-[#0077ed]"
          >
            Reserve
            <ArrowRight className="size-3.5" />
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}

export default function AddisPropertyApp() {
  const [activeTab, setActiveTab] = useState<AppView>("explore");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [guestCountFilter, setGuestCountFilter] = useState(1);
  const [savedPropertyIds, setSavedPropertyIds] = useState<Set<number>>(
    () => new Set(),
  );
  const [selectedPropertyForBooking, setSelectedPropertyForBooking] =
    useState<PropertyItem | null>(null);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [ownerFormSubmitted, setOwnerFormSubmitted] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [bookingDays, setBookingDays] = useState(3);
  const bookingSuccessHeading = useRef<HTMLHeadingElement>(null);
  const ownerSuccessHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isBookingSuccess) bookingSuccessHeading.current?.focus();
  }, [isBookingSuccess]);

  useEffect(() => {
    if (ownerFormSubmitted) ownerSuccessHeading.current?.focus();
  }, [ownerFormSubmitted]);

  const filteredProperties = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return INITIAL_PROPERTIES.filter((property) => {
      const matchesNeighborhood =
        selectedNeighborhood === "All" ||
        property.neighborhood === selectedNeighborhood;
      const matchesGuests = property.maxGuests >= guestCountFilter;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        property.title.toLowerCase().includes(normalizedQuery) ||
        property.neighborhood.toLowerCase().includes(normalizedQuery) ||
        property.address.toLowerCase().includes(normalizedQuery) ||
        property.description.toLowerCase().includes(normalizedQuery) ||
        property.amenities.some((amenity) =>
          amenity.toLowerCase().includes(normalizedQuery),
        );
      return matchesNeighborhood && matchesGuests && matchesSearch;
    });
  }, [guestCountFilter, searchQuery, selectedNeighborhood]);

  const formatPrice = (usd: number, etb: number) =>
    currency === "USD" ? "$" + usd.toLocaleString() : etb.toLocaleString() + " Br";

  const formatPayout = (payoutUSD: number) =>
    currency === "USD"
      ? "$" + payoutUSD.toLocaleString()
      : (payoutUSD * 120).toLocaleString() + " Br";

  const scrollToStays = () => {
    document
      .getElementById("stays")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    scrollToStays();
  };

  const handleBookingSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBookingSuccess(true);
  };

  const handleOwnerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOwnerFormSubmitted(true);
  };

  const closeBookingDialog = () => {
    setIsBookingSuccess(false);
    setSelectedPropertyForBooking(null);
    setGuestName("");
    setGuestEmail("");
  };

  const closeOwnerModal = () => {
    setOwnerFormSubmitted(false);
    setIsOwnerModalOpen(false);
  };

  const toggleSavedProperty = (propertyId: number) => {
    setSavedPropertyIds((currentSaved) => {
      const nextSaved = new Set(currentSaved);
      if (nextSaved.has(propertyId)) {
        nextSaved.delete(propertyId);
      } else {
        nextSaved.add(propertyId);
      }
      return nextSaved;
    });
  };

  const selectExplore = () => {
    setActiveTab("explore");
    window.setTimeout(scrollToStays, 0);
  };

  const heroProperty = INITIAL_PROPERTIES[0];

  return (
    <div className="app-shell min-h-screen overflow-x-clip bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="bg-[#1d1d1f] px-4 py-2 text-center text-xs font-medium tracking-[0.01em] text-white">
        <span className="inline-flex items-center justify-center gap-2">
          <ShieldCheck className="size-3.5 text-[#6ad5ff]" />
          Every Addis Living stay includes backup power, water reserve, and local support.
        </span>
      </div>

      <header className="app-header sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-2xl">
        <div className="mx-auto flex min-h-[68px] max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={selectExplore}
            className="flex shrink-0 items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2"
            aria-label="Return to Addis Living stays"
          >
            <span className="logo-mark grid size-9 place-items-center rounded-[12px] text-white shadow-sm">
              <Building2 className="size-[18px]" />
            </span>
            <span className="hidden min-[420px]:block">
              <span className="block text-[15px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                Addis Living
              </span>
              <span className="block text-[11px] font-medium text-[#6d6e73]">
                Thoughtful stays in Addis Ababa
              </span>
            </span>
          </button>

          <nav
            aria-label="Application view"
            className="hidden rounded-full bg-[#f5f5f7] p-1 md:flex"
          >
            <button
              type="button"
              onClick={() => setActiveTab("explore")}
              aria-pressed={activeTab === "explore"}
              className={
                "nav-segment " +
                (activeTab === "explore"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#6e6e73] hover:text-[#1d1d1f]")
              }
            >
              <Search className="size-3.5" />
              Explore stays
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("manage")}
              aria-pressed={activeTab === "manage"}
              className={
                "nav-segment " +
                (activeTab === "manage"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#6e6e73] hover:text-[#1d1d1f]")
              }
            >
              <TrendingUp className="size-3.5" />
              Owner portal
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              aria-label="Currency"
              className="hidden rounded-full bg-[#f5f5f7] p-1 sm:flex"
            >
              {(["USD", "ETB"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCurrency(option)}
                  aria-pressed={currency === option}
                  className={
                    "currency-switch " +
                    (currency === option
                      ? "bg-white text-[#1d1d1f] shadow-sm"
                      : "text-[#6e6e73]")
                  }
                >
                  {option}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setIsOwnerModalOpen(true)}
              className="apple-button h-9 rounded-full bg-[#1d1d1f] px-3.5 text-xs font-semibold text-white hover:bg-[#333336] sm:px-4"
            >
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">List a property</span>
              <span className="sm:hidden">List</span>
            </Button>
          </div>
        </div>

        <div className="border-t border-black/[0.05] px-4 py-2 md:hidden">
          <div className="mx-auto flex max-w-[1200px] rounded-full bg-[#f5f5f7] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("explore")}
              aria-pressed={activeTab === "explore"}
              className={
                "nav-segment flex-1 justify-center " +
                (activeTab === "explore"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#6e6e73]")
              }
            >
              <Search className="size-3.5" />
              Stays
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("manage")}
              aria-pressed={activeTab === "manage"}
              className={
                "nav-segment flex-1 justify-center " +
                (activeTab === "manage"
                  ? "bg-white text-[#1d1d1f] shadow-sm"
                  : "text-[#6e6e73]")
              }
            >
              <TrendingUp className="size-3.5" />
              Portal
            </button>
          </div>
        </div>
      </header>

      <main>
        {activeTab === "explore" ? (
          <>
            <section className="px-4 pb-8 pt-5 sm:px-6 sm:pb-12 sm:pt-8">
              <div className="hero-surface mx-auto max-w-[1200px] overflow-hidden rounded-[30px]">
                <div className="relative grid min-h-[520px] items-end lg:grid-cols-[1.05fr_.95fr]">
                  <div className="relative z-10 px-6 pb-11 pt-12 sm:px-10 sm:pb-14 sm:pt-16 lg:px-14">
                    <span className="eyebrow-pill">
                      <Sparkles className="size-3.5" />
                      Made for an easy arrival
                    </span>
                    <h1 className="mt-5 max-w-2xl text-balance text-[clamp(2.6rem,6vw,5.15rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-white">
                      Stay beautifully in{" "}
                      <span className="text-[#91d7ff]">Addis.</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-pretty text-[15px] leading-6 text-white/72 sm:text-[17px] sm:leading-7">
                      Considered homes for work trips, reunions, and slower weekends—
                      all prepared with reliable essentials and a local team.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-white/80">
                      <span className="inline-flex items-center gap-2">
                        <ShieldCheck className="size-4 text-[#6ad5ff]" />
                        Verified homes
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Plane className="size-4 text-[#6ad5ff]" />
                        Airport coordination
                      </span>
                    </div>
                  </div>

                  <div className="relative min-h-[260px] self-stretch lg:min-h-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroProperty.imageUrl}
                      alt="Sunlit interior of an Addis Living residence"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#161a20] via-[#161a20]/28 to-transparent lg:from-[#161a20]/70 lg:via-transparent" />
                    <div className="hero-arrival-note absolute bottom-5 left-5 right-5 rounded-[20px] border border-white/20 bg-black/55 p-4 text-white sm:left-auto sm:max-w-[260px]">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#a8e0ff]">
                        <Star className="size-3 fill-current" />
                        4.98 guest rating
                      </div>
                      <p className="mt-1 text-sm font-semibold tracking-[-0.02em]">
                        Bole Skyline Penthouse
                      </p>
                      <p className="mt-0.5 text-xs text-white/65">
                        6 minutes from the airport
                      </p>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSearch}
                    className="search-dock relative z-20 mx-4 mb-4 rounded-[22px] p-2 sm:mx-8 sm:mb-7 sm:p-2.5 lg:col-span-2 lg:mx-10"
                  >
                    <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-[.9fr_1.35fr_.7fr_auto]">
                      <label className="search-field">
                        <span className="field-label">
                          <MapPin className="size-3.5" />
                          Where
                        </span>
                        <select
                          value={selectedNeighborhood}
                          onChange={(event) =>
                            setSelectedNeighborhood(event.target.value)
                          }
                          className="field-control cursor-pointer"
                          aria-label="Neighborhood"
                        >
                          {neighborhoods.map((neighborhood) => (
                            <option key={neighborhood} value={neighborhood}>
                              {neighborhood === "All"
                                ? "Anywhere in Addis"
                                : neighborhood}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="search-field">
                        <span className="field-label">
                          <Search className="size-3.5" />
                          Search
                        </span>
                        <Input
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          placeholder="Apartment, balcony, generator..."
                          className="field-control h-auto border-0 bg-transparent px-0 py-0 text-[13px] shadow-none focus-visible:ring-0"
                        />
                      </label>
                      <label className="search-field">
                        <span className="field-label">
                          <Users className="size-3.5" />
                          Guests
                        </span>
                        <select
                          value={guestCountFilter}
                          onChange={(event) =>
                            setGuestCountFilter(Number(event.target.value))
                          }
                          className="field-control cursor-pointer"
                          aria-label="Number of guests"
                        >
                          <option value={1}>1+ guest</option>
                          <option value={2}>2+ guests</option>
                          <option value={4}>4+ guests</option>
                          <option value={6}>6+ guests</option>
                        </select>
                      </label>
                      <Button
                        type="submit"
                        className="apple-button h-12 rounded-[15px] bg-[#0071e3] px-5 text-sm font-semibold text-white hover:bg-[#0077ed] sm:col-span-2 lg:col-span-1"
                      >
                        Find a stay
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </section>

            <section id="stays" className="scroll-mt-28 px-4 pb-12 sm:px-6 sm:pb-16">
              <div className="mx-auto max-w-[1200px]">
                <div
                  role="group"
                  aria-label="Filter stays by neighborhood"
                  className="neighborhood-filter-row flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {neighborhoods.map((neighborhood) => (
                    <button
                      key={neighborhood}
                      type="button"
                      onClick={() => setSelectedNeighborhood(neighborhood)}
                      aria-pressed={selectedNeighborhood === neighborhood}
                      className={
                        "filter-chip " +
                        (selectedNeighborhood === neighborhood
                          ? "bg-[#1d1d1f] text-white shadow-sm"
                          : "border-[#d2d2d7] bg-white text-[#424245] hover:border-[#6d6e73]")
                      }
                    >
                      {neighborhood}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <p className="section-kicker">Stay collection</p>
                    <h2 className="mt-1 text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold tracking-[-0.052em] text-[#1d1d1f]">
                      Find your place in the city.
                    </h2>
                    <p aria-live="polite" aria-atomic="true" className="mt-2 text-sm text-[#6e6e73]">
                      {filteredProperties.length} curated home
                      {filteredProperties.length === 1 ? "" : "s"}
                      {selectedNeighborhood === "All"
                        ? " across Addis Ababa"
                        : " in " + selectedNeighborhood}
                      .
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#6e6e73]">
                    <span className="rounded-full bg-white px-3 py-2 shadow-sm">
                      Prices in {currency}
                    </span>
                    {savedPropertyIds.size > 0 && (
                      <span className="rounded-full bg-[#e8f4ff] px-3 py-2 text-[#0071e3]">
                        {savedPropertyIds.size} saved
                      </span>
                    )}
                  </div>
                </div>

                {filteredProperties.length > 0 ? (
                  <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isSaved={savedPropertyIds.has(property.id)}
                        onBook={setSelectedPropertyForBooking}
                        onToggleSaved={toggleSavedProperty}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-7 rounded-[24px] border border-dashed border-[#c7c7cc] bg-white px-6 py-14 text-center">
                    <Search className="mx-auto size-6 text-[#0071e3]" />
                    <h3 className="mt-3 text-lg font-semibold tracking-[-0.025em]">
                      No stays match that search.
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6e6e73]">
                      Try another neighborhood, a lower guest count, or fewer keywords.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedNeighborhood("All");
                        setSearchQuery("");
                        setGuestCountFilter(1);
                      }}
                      className="mt-5 rounded-full px-4"
                    >
                      Reset filters
                    </Button>
                  </div>
                )}
              </div>
            </section>

            <section className="px-4 pb-14 sm:px-6 sm:pb-20">
              <div className="mx-auto max-w-[1200px] rounded-[30px] bg-white px-6 py-9 shadow-[0_1px_1px_rgba(0,0,0,0.04)] sm:px-10 sm:py-12">
                <div className="max-w-2xl">
                  <p className="section-kicker">The Addis Living standard</p>
                  <h2 className="mt-1 text-balance text-[clamp(1.85rem,4vw,2.8rem)] font-semibold tracking-[-0.052em] text-[#1d1d1f]">
                    The details you should never have to chase.
                  </h2>
                  <p className="mt-3 text-[15px] leading-6 text-[#6e6e73]">
                    Every home is checked before arrival, so work days and rest days
                    both run smoothly.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  <div className="trust-card">
                    <span className="icon-orb bg-[#e8f4ff] text-[#0071e3]">
                      <Zap className="size-5" />
                    </span>
                    <h3>Ready when the grid is not</h3>
                    <p>
                      Generator-backed essentials keep your lights, lift, and internet
                      working without a second thought.
                    </p>
                  </div>
                  <div className="trust-card">
                    <span className="icon-orb bg-[#eefbf2] text-[#0e7a3d]">
                      <Droplets className="size-5" />
                    </span>
                    <h3>Water that is planned for</h3>
                    <p>
                      Water storage and quality checks are part of our regular home
                      readiness routine.
                    </p>
                  </div>
                  <div className="trust-card">
                    <span className="icon-orb bg-[#fff6e5] text-[#955000]">
                      <ShieldCheck className="size-5" />
                    </span>
                    <h3>A real person nearby</h3>
                    <p>
                      From airport coordination to local recommendations, our hosts
                      answer when you need them.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="px-4 py-7 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-[1200px]">
              <div className="owner-hero rounded-[30px] px-6 py-8 sm:px-10 sm:py-10">
                <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
                  <div className="max-w-2xl">
                    <span className="eyebrow-pill border-[#82caff]/35 bg-[#0071e3]/12 text-[#0071e3]">
                      <Activity className="size-3.5" />
                      Owner portal
                    </span>
                    <h1 className="mt-4 text-balance text-[clamp(2.15rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-[#1d1d1f]">
                      A calmer way to run a great portfolio.
                    </h1>
                    <p className="mt-3 text-[15px] leading-6 text-[#515154] sm:text-base">
                      A clear picture of bookings, revenue, and the work happening
                      behind each excellent stay.
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsOwnerModalOpen(true)}
                    className="apple-button h-11 shrink-0 rounded-full bg-[#0071e3] px-5 text-sm font-semibold text-white hover:bg-[#0077ed]"
                  >
                    <Plus className="size-4" />
                    Add a property
                  </Button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="metric-card">
                  <div className="metric-icon bg-[#e8f4ff] text-[#0071e3]">
                    <Building2 className="size-4" />
                  </div>
                  <p>Managed homes</p>
                  <strong>18</strong>
                  <span className="metric-note text-[#0e7a3d]">
                    <TrendingUp className="size-3.5" />
                    3 new this quarter
                  </span>
                </Card>
                <Card className="metric-card">
                  <div className="metric-icon bg-[#eefbf2] text-[#0e7a3d]">
                    <Activity className="size-4" />
                  </div>
                  <p>September occupancy</p>
                  <strong>91.4%</strong>
                  <span className="metric-note text-[#6e6e73]">
                    Above the 85% goal
                  </span>
                </Card>
                <Card className="metric-card">
                  <div className="metric-icon bg-[#fff6e5] text-[#955000]">
                    <DollarSign className="size-4" />
                  </div>
                  <p>Monthly gross payout</p>
                  <strong>{currency === "USD" ? "$34.85k" : "4.18m Br"}</strong>
                  <span className="metric-note text-[#0e7a3d]">
                    <TrendingUp className="size-3.5" />
                    18.2% vs last quarter
                  </span>
                </Card>
                <Card className="metric-card">
                  <div className="metric-icon bg-[#fff1f2] text-[#d12c49]">
                    <Star className="size-4 fill-current" />
                  </div>
                  <p>Portfolio rating</p>
                  <strong>4.96</strong>
                  <span className="metric-note text-[#6e6e73]">
                    From 322 guest reviews
                  </span>
                </Card>
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_.85fr]">
                <Card className="apple-card overflow-hidden border-white bg-white">
                  <CardHeader className="flex-row items-start justify-between gap-4 px-6 py-5 sm:px-7">
                    <div>
                      <p className="section-kicker">Reservations</p>
                      <CardTitle className="mt-1 text-xl font-semibold tracking-[-0.04em]">
                        What is happening next.
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        Live channel updates from direct, Airbnb, and Booking.com
                      </CardDescription>
                    </div>
                    <Badge className="hidden border-[#b9e7c8] bg-[#eefbf2] text-[11px] font-semibold text-[#0e7a3d] sm:inline-flex">
                      Live sync
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-[#e5e5ea] md:hidden">
                      {RECENT_BOOKINGS.map((booking) => (
                        <article key={booking.id} className="px-5 py-4 sm:px-6">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f5f5f7] text-sm font-semibold text-[#515154]">
                                {booking.guestName.charAt(0)}
                              </span>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-[#1d1d1f]">
                                  {booking.guestName}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-[#6d6e73]">
                                  {booking.propertyTitle}
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={
                                "shrink-0 border-0 text-[11px] font-semibold " +
                                (booking.status === "Confirmed" ||
                                booking.status === "Checked-in"
                                  ? "bg-[#eefbf2] text-[#0e7a3d]"
                                  : "bg-[#f5f5f7] text-[#6e6e73]")
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <dl className="mt-4 grid grid-cols-2 gap-3 rounded-[16px] bg-[#f5f5f7] px-3.5 py-3">
                            <div>
                              <dt className="text-[11px] font-medium text-[#6d6e73]">
                                Arrival
                              </dt>
                              <dd className="mt-0.5 text-sm font-semibold text-[#1d1d1f]">
                                {booking.checkIn}
                              </dd>
                              <dd className="mt-0.5 text-xs text-[#6d6e73]">
                                {booking.nights} nights · {booking.channel}
                              </dd>
                            </div>
                            <div className="text-right">
                              <dt className="text-[11px] font-medium text-[#6d6e73]">
                                Payout
                              </dt>
                              <dd className="mt-0.5 text-sm font-semibold text-[#1d1d1f]">
                                {formatPayout(booking.payoutUSD)}
                              </dd>
                              <dd className="mt-0.5 text-xs text-[#6d6e73]">
                                {booking.neighborhood}
                              </dd>
                            </div>
                          </dl>
                        </article>
                      ))}
                    </div>

                    <div className="hidden md:block">
                      <Table className="min-w-[690px]">
                        <caption className="sr-only">
                          Upcoming reservations with guest, stay, dates, payout, and
                          status.
                        </caption>
                      <TableHeader>
                        <TableRow className="border-y border-[#e5e5ea] bg-[#fbfbfd] hover:bg-[#fbfbfd]">
                          <TableHead className="px-6 text-[11px] font-semibold uppercase tracking-[0.08em]">
                            Guest
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                            Stay
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                            Dates
                          </TableHead>
                          <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                            Payout
                          </TableHead>
                          <TableHead className="pr-6 text-[11px] font-semibold uppercase tracking-[0.08em]">
                            Status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {RECENT_BOOKINGS.map((booking) => (
                          <TableRow key={booking.id} className="border-[#e5e5ea]">
                            <TableCell className="px-6 py-4">
                              <span className="flex items-center gap-3">
                                <span className="grid size-8 place-items-center rounded-full bg-[#f5f5f7] text-xs font-semibold text-[#515154]">
                                  {booking.guestName.charAt(0)}
                                </span>
                                <span className="max-w-[120px] truncate text-[13px] font-semibold text-[#1d1d1f]">
                                  {booking.guestName}
                                </span>
                              </span>
                            </TableCell>
                            <TableCell className="py-4">
                              <p className="max-w-[170px] truncate text-[13px] font-medium text-[#1d1d1f]">
                                {booking.propertyTitle}
                              </p>
                              <p className="mt-0.5 text-[11px] text-[#6d6e73]">
                                {booking.neighborhood} · {booking.channel}
                              </p>
                            </TableCell>
                            <TableCell className="py-4">
                              <p className="text-[12px] font-medium text-[#424245]">
                                {booking.checkIn}
                              </p>
                              <p className="mt-0.5 text-[11px] text-[#6d6e73]">
                                {booking.nights} nights
                              </p>
                            </TableCell>
                            <TableCell className="py-4 text-[13px] font-semibold text-[#1d1d1f]">
                              {formatPayout(booking.payoutUSD)}
                            </TableCell>
                            <TableCell className="py-4 pr-6">
                              <Badge
                                className={
                                  "border-0 text-[11px] font-semibold " +
                                  (booking.status === "Confirmed" ||
                                  booking.status === "Checked-in"
                                    ? "bg-[#eefbf2] text-[#0e7a3d]"
                                    : "bg-[#f5f5f7] text-[#6e6e73]")
                                }
                              >
                                {booking.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-5">
                  <Card className="apple-card border-white bg-white p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="section-kicker">Home readiness</p>
                        <h2 className="mt-1 text-lg font-semibold tracking-[-0.035em]">
                          Today’s operations
                        </h2>
                      </div>
                      <span className="grid size-9 place-items-center rounded-full bg-[#eefbf2] text-[#0e7a3d]">
                        <CheckCircle2 className="size-4" />
                      </span>
                    </div>
                    <div className="mt-5 space-y-4">
                      <div className="operation-row">
                        <span className="operation-icon bg-[#e8f4ff] text-[#0071e3]">
                          <Sparkles className="size-3.5" />
                        </span>
                        <div>
                          <p>Turnover ready</p>
                          <span>Bole Skyline · linen and key check complete</span>
                        </div>
                        <Badge className="border-0 bg-[#eefbf2] text-[11px] font-semibold text-[#0e7a3d]">
                          Done
                        </Badge>
                      </div>
                      <div className="operation-row">
                        <span className="operation-icon bg-[#fff6e5] text-[#955000]">
                          <Calendar className="size-3.5" />
                        </span>
                        <div>
                          <p>Villa refresh</p>
                          <span>Old Airport · scheduled for 10:00</span>
                        </div>
                        <Badge className="border-0 bg-[#fff6e5] text-[11px] font-semibold text-[#955000]">
                          Next
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="apple-card border-white bg-white p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="section-kicker">Utilities</p>
                        <h2 className="mt-1 text-lg font-semibold tracking-[-0.035em]">
                          Portfolio health
                        </h2>
                      </div>
                      <span className="text-xs font-semibold text-[#0e7a3d]">
                        All clear
                      </span>
                    </div>
                    <div className="mt-5 space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#424245]">
                            Generator reserve
                          </span>
                          <span className="font-semibold text-[#1d1d1f]">95%</span>
                        </div>
                        <div className="progress-track mt-2">
                          <span className="block h-full w-[95%] rounded-full bg-[#0e7a3d]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-[#424245]">
                            Fibre network uptime
                          </span>
                          <span className="font-semibold text-[#1d1d1f]">99.98%</span>
                        </div>
                        <div className="progress-track mt-2">
                          <span className="block h-full w-[99%] rounded-full bg-[#0071e3]" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Dialog
        open={selectedPropertyForBooking !== null}
        onOpenChange={(open) => {
          if (!open) closeBookingDialog();
        }}
      >
        {selectedPropertyForBooking && (
          <DialogContent className="max-w-xl overflow-hidden rounded-[28px] border-white bg-white p-0">
            <div className="relative h-36 overflow-hidden sm:h-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPropertyForBooking.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/5" />
              <div className="absolute inset-x-6 bottom-5 text-white">
                <span className="text-xs font-medium text-white/75">
                  {selectedPropertyForBooking.neighborhood} ·{" "}
                  {selectedPropertyForBooking.propertyType}
                </span>
                <h2 className="mt-1 text-xl font-semibold tracking-[-0.035em]">
                  {selectedPropertyForBooking.title}
                </h2>
              </div>
            </div>

            {isBookingSuccess ? (
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="px-6 py-11 text-center sm:px-8"
              >
                <DialogHeader className="sr-only">
                  <DialogTitle>Reservation request sent</DialogTitle>
                  <DialogDescription>
                    Your reservation request is on its way to Addis Living.
                  </DialogDescription>
                </DialogHeader>
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#eefbf2] text-[#0e7a3d]">
                  <CheckCircle2 className="size-7" />
                </span>
                <h3
                  ref={bookingSuccessHeading}
                  tabIndex={-1}
                  className="mt-4 text-xl font-semibold tracking-[-0.035em] outline-none"
                >
                  Your request is on its way.
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6e6e73]">
                  We will send the next steps and arrival details to{" "}
                  {guestEmail || "your email"}.
                </p>
                <Button
                  type="button"
                  onClick={closeBookingDialog}
                  className="apple-button mt-6 rounded-full bg-[#0071e3] px-5 text-white hover:bg-[#0077ed]"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8">
                <DialogHeader className="mb-5">
                  <DialogTitle className="text-xl font-semibold tracking-[-0.035em]">
                    Start your reservation
                  </DialogTitle>
                  <DialogDescription className="text-sm leading-6">
                    Tell us a few details. Your local host will confirm availability
                    and coordinate your arrival.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="form-field sm:col-span-2">
                    <span>Full name</span>
                    <Input
                      required
                      data-dialog-initial-focus
                      autoComplete="name"
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                      placeholder="Your name"
                      className="apple-input"
                    />
                  </label>
                  <label className="form-field sm:col-span-2">
                    <span>Email address</span>
                    <Input
                      required
                      type="email"
                      autoComplete="email"
                      value={guestEmail}
                      onChange={(event) => setGuestEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="apple-input"
                    />
                  </label>
                  <label className="form-field">
                    <span>Length of stay</span>
                    <select
                      value={bookingDays}
                      onChange={(event) => setBookingDays(Number(event.target.value))}
                      className="apple-input"
                    >
                      <option value={2}>2 nights</option>
                      <option value={3}>3 nights</option>
                      <option value={5}>5 nights</option>
                      <option value={7}>1 week</option>
                      <option value={14}>2 weeks</option>
                      <option value={30}>1 month</option>
                    </select>
                  </label>
                  <label className="form-field">
                    <span>Preferred payment</span>
                    <select className="apple-input">
                      <option>Credit or debit card</option>
                      <option>Telebirr</option>
                      <option>Bank transfer</option>
                      <option>Airbnb direct link</option>
                    </select>
                  </label>
                </div>

                <div className="mt-5 rounded-[18px] bg-[#f5f5f7] p-4">
                  <div className="flex justify-between gap-4 text-xs text-[#6e6e73]">
                    <span>
                      {formatPrice(
                        selectedPropertyForBooking.priceUSD,
                        selectedPropertyForBooking.priceETB,
                      )}{" "}
                      × {bookingDays} nights
                    </span>
                    <span>
                      {formatPrice(
                        selectedPropertyForBooking.priceUSD * bookingDays,
                        selectedPropertyForBooking.priceETB * bookingDays,
                      )}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between gap-4 text-xs text-[#6e6e73]">
                    <span>Concierge and cleaning</span>
                    <span className="font-semibold text-[#0e7a3d]">Included</span>
                  </div>
                  <div className="mt-3 flex justify-between gap-4 border-t border-[#d2d2d7] pt-3 text-sm font-semibold text-[#1d1d1f]">
                    <span>Estimated total</span>
                    <span>
                      {formatPrice(
                        selectedPropertyForBooking.priceUSD * bookingDays,
                        selectedPropertyForBooking.priceETB * bookingDays,
                      )}
                    </span>
                  </div>
                </div>

                <DialogFooter className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeBookingDialog}
                    className="rounded-full"
                  >
                    Not now
                  </Button>
                  <Button
                    type="submit"
                    className="apple-button rounded-full bg-[#0071e3] px-5 text-white hover:bg-[#0077ed]"
                  >
                    Request reservation
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        )}
      </Dialog>

      <Dialog
        open={isOwnerModalOpen}
        onOpenChange={(open) => {
          setIsOwnerModalOpen(open);
          if (!open) setOwnerFormSubmitted(false);
        }}
      >
        <DialogContent className="max-w-lg rounded-[28px] border-white bg-white p-0">
          <div className="rounded-t-[28px] bg-[#e8f4ff] px-6 py-7 sm:px-8">
            <span className="icon-orb bg-white text-[#0071e3] shadow-sm">
              <Building2 className="size-5" />
            </span>
            <DialogHeader className="mt-4">
              <DialogTitle className="text-2xl font-semibold tracking-[-0.045em] text-[#1d1d1f]">
                Bring your property into the collection.
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-[#515154]">
                Share the basics and our team will prepare a thoughtful, no-pressure
                assessment.
              </DialogDescription>
            </DialogHeader>
          </div>

          {ownerFormSubmitted ? (
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="px-6 py-11 text-center sm:px-8"
            >
              <DialogHeader className="sr-only">
                <DialogTitle>Property assessment request sent</DialogTitle>
                <DialogDescription>
                  Your property details are on their way to Addis Living.
                </DialogDescription>
              </DialogHeader>
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#eefbf2] text-[#0e7a3d]">
                <CheckCircle2 className="size-7" />
              </span>
              <h3
                ref={ownerSuccessHeading}
                tabIndex={-1}
                className="mt-4 text-xl font-semibold tracking-[-0.035em] outline-none"
              >
                We have your details.
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6e6e73]">
                An Addis Living specialist will follow up with a tailored revenue
                projection within one business day.
              </p>
              <Button
                type="button"
                onClick={closeOwnerModal}
                className="apple-button mt-6 rounded-full bg-[#0071e3] px-5 text-white hover:bg-[#0077ed]"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleOwnerSubmit} className="p-6 sm:p-8">
              <div className="grid gap-4">
                <label className="form-field">
                  <span>Your name</span>
                  <Input
                    required
                    data-dialog-initial-focus
                    autoComplete="name"
                    placeholder="Owner name"
                    className="apple-input"
                  />
                </label>
                <label className="form-field">
                  <span>Phone number</span>
                  <Input
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+251 9… or international number"
                    className="apple-input"
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="form-field">
                    <span>Neighborhood</span>
                    <select className="apple-input">
                      <option>Bole</option>
                      <option>Kazanchis</option>
                      <option>Old Airport</option>
                      <option>Sarbet</option>
                      <option>CMC / Summit</option>
                      <option>Another area</option>
                    </select>
                  </label>
                  <label className="form-field">
                    <span>Home type</span>
                    <select className="apple-input">
                      <option>Furnished apartment</option>
                      <option>Penthouse</option>
                      <option>Villa</option>
                      <option>Studio</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="mt-5 rounded-[18px] bg-[#f5f5f7] p-4 text-xs leading-5 text-[#515154]">
                <span className="font-semibold text-[#1d1d1f]">What happens next:</span>{" "}
                styling advice, a revenue plan, professional photography, and
                full-service guest operations.
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeOwnerModal}
                  className="rounded-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="apple-button rounded-full bg-[#0071e3] px-5 text-white hover:bg-[#0077ed]"
                >
                  Request assessment
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t border-black/[0.06] bg-white px-4 py-10 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-9 md:grid-cols-[1.45fr_.8fr_.8fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="logo-mark grid size-9 place-items-center rounded-[12px] text-white">
                  <Building2 className="size-[18px]" />
                </span>
                <span className="text-[15px] font-semibold tracking-[-0.03em]">
                  Addis Living
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[#6e6e73]">
                Well-prepared homes and unhurried local hosting for the way people
                really travel in Addis Ababa.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#515154]">
                <MapPin className="size-3.5 text-[#0071e3]" />
                Bole Sub-City, Addis Ababa
              </p>
            </div>
            <div>
              <h2 className="footer-heading">Explore</h2>
              <div className="footer-links">
                <button type="button" onClick={selectExplore}>
                  All stays
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("explore");
                    setSelectedNeighborhood("Bole");
                    window.setTimeout(scrollToStays, 0);
                  }}
                >
                  Bole
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("explore");
                    setSelectedNeighborhood("Kazanchis");
                    window.setTimeout(scrollToStays, 0);
                  }}
                >
                  Kazanchis
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("explore");
                    setSelectedNeighborhood("Old Airport");
                    window.setTimeout(scrollToStays, 0);
                  }}
                >
                  Old Airport
                </button>
              </div>
            </div>
            <div>
              <h2 className="footer-heading">For owners</h2>
              <div className="footer-links">
                <button type="button" onClick={() => setIsOwnerModalOpen(true)}>
                  List a property
                </button>
                <button type="button" onClick={() => setActiveTab("manage")}>
                  Owner portal
                </button>
                <button type="button" onClick={() => setIsOwnerModalOpen(true)}>
                  Revenue assessment
                </button>
              </div>
            </div>
            <div>
              <h2 className="footer-heading">Need a hand?</h2>
              <div className="space-y-3 text-sm text-[#6e6e73]">
                <a
                  className="inline-flex items-center gap-2 transition hover:text-[#0071e3]"
                  href="tel:+251911234567"
                >
                  <Phone className="size-3.5" />
                  +251 911 234 567
                </a>
                <a
                  className="inline-flex items-center gap-2 transition hover:text-[#0071e3]"
                  href="/api/healthz"
                  target="_blank"
                  rel="noreferrer"
                >
                  System status
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-[#e5e5ea] pt-5 text-xs text-[#6d6e73] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Addis Living. All rights reserved.</p>
            <p>Backup power · Water reserve · 24/7 local support</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
