export interface PropertyItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  neighborhood: "Bole" | "Kazanchis" | "Old Airport" | "Sarbet" | "CMC" | "Piassa";
  address: string;
  propertyType: "Penthouse" | "Apartment" | "Villa" | "Studio";
  priceUSD: number;
  priceETB: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  reviewCount: number;
  isSuperhost: boolean;
  proximityAirportMin: number;
  hasGenerator: boolean;
  hasWaterReserve: boolean;
  amenities: string[];
  imageUrl: string;
  galleryUrls: string[];
  host: {
    name: string;
    avatar: string;
    superhost: boolean;
    responseRate: string;
  };
}

export interface BookingRecord {
  id: number;
  propertyTitle: string;
  neighborhood: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  payoutUSD: number;
  channel: "Airbnb" | "Direct" | "Booking.com";
  status: "Confirmed" | "Checked-in" | "Pending" | "Completed";
}

export const INITIAL_PROPERTIES: PropertyItem[] = [
  {
    id: 1,
    title: "Bole Medhanialem Skyline Penthouse",
    slug: "bole-skyline-penthouse",
    description: "Floor-to-ceiling glass offering breathtaking 270° views over Addis Ababa. Located 5 minutes from Bole International Airport, with 100% 24/7 dedicated generator backup, dual water reservoirs, and ultra-fast fiber WiFi.",
    neighborhood: "Bole",
    address: "Cameroon St, Near Medhanialem Cathedral, Bole",
    propertyType: "Penthouse",
    priceUSD: 135,
    priceETB: 16200,
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    rating: 4.98,
    reviewCount: 94,
    isSuperhost: true,
    proximityAirportMin: 6,
    hasGenerator: true,
    hasWaterReserve: true,
    amenities: ["Fiber Internet (100Mbps)", "Automatic Backup Generator", "Water Reservoir (5,000L)", "Private Balcony", "Smart TV + Netflix", "Washer/Dryer", "24/7 Security Guard", "Dedicated Workspace"],
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    ],
    host: {
      name: "Tewodros & Selam",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      superhost: true,
      responseRate: "100% within 15 min",
    },
  },
  {
    id: 2,
    title: "Kazanchis Diplomatic Luxury Suite",
    slug: "kazanchis-diplomatic-suite",
    description: "Quiet, secure executive apartment 3 minutes from UNECA, Hilton, and Radisson Blu. Built specifically for consultants, diplomats, and business travelers visiting Addis Ababa.",
    neighborhood: "Kazanchis",
    address: "Menelik II Ave, Kazanchis, Kirkos",
    propertyType: "Apartment",
    priceUSD: 95,
    priceETB: 11400,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.94,
    reviewCount: 68,
    isSuperhost: true,
    proximityAirportMin: 12,
    hasGenerator: true,
    hasWaterReserve: true,
    amenities: ["Dedicated High-Speed WiFi", "Soundproof Windows", "Elevator Power Backup", "Gym Access", "Airport Pickup Included", "Full Chef's Kitchen", "Keyless Smart Lock"],
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80",
    ],
    host: {
      name: "Addis Premier Hosts",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      superhost: true,
      responseRate: "100% within 30 min",
    },
  },
  {
    id: 3,
    title: "Old Airport Ambassadorial Private Villa",
    slug: "old-airport-private-villa",
    description: "An oasis of tranquility surrounded by lush private gardens in Addis Ababa's most prestigious diplomatic enclave. Features private parking, electric fencing, staff quarters, and a dedicated chef.",
    neighborhood: "Old Airport",
    address: "Bisrate Gabriel / Old Airport Diplomatic Quarter",
    propertyType: "Villa",
    priceUSD: 240,
    priceETB: 28800,
    bedrooms: 4,
    bathrooms: 4.5,
    maxGuests: 8,
    rating: 5.0,
    reviewCount: 31,
    isSuperhost: true,
    proximityAirportMin: 18,
    hasGenerator: true,
    hasWaterReserve: true,
    amenities: ["Private Garden & Patio", "Heavy Duty Generator", "Dedicated Chef on Demand", "Gated Security Guardhouse", "BBQ Grill", "Fireplace", "High Capacity Solar Heater"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    ],
    host: {
      name: "Bethlehem Assefa",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      superhost: true,
      responseRate: "99% within 1 hour",
    },
  },
  {
    id: 4,
    title: "Sarbet African Union Modern Loft",
    slug: "sarbet-au-modern-loft",
    description: "Stylish loft apartment steps from the African Union Headquarters, ICS Addis, and vibrant cafes like Tomoca. Ideal for long-term expat stays and visiting conference delegates.",
    neighborhood: "Sarbet",
    address: "Roosevelt St, Near AU Headquarters, Sarbet",
    propertyType: "Apartment",
    priceUSD: 78,
    priceETB: 9360,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.91,
    reviewCount: 52,
    isSuperhost: false,
    proximityAirportMin: 15,
    hasGenerator: true,
    hasWaterReserve: true,
    amenities: ["Walking Distance to AU", "Modern Kitchen", "Balcony View", "Smart TV", "Underground Parking", "Continuous Water & Power"],
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    ],
    host: {
      name: "Dawit Kebede",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      superhost: false,
      responseRate: "100% within 1 hour",
    },
  },
  {
    id: 5,
    title: "CMC Sunrise Panoramic High-Rise",
    slug: "cmc-sunrise-panoramic-highrise",
    description: "Expansive brand new high-rise flat with views over Mt. Entoto. Quiet gated community with green walking paths, fitness center, and high-speed elevator.",
    neighborhood: "CMC",
    address: "CMC Michael, Gated Community Zone 4",
    propertyType: "Apartment",
    priceUSD: 65,
    priceETB: 7800,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.88,
    reviewCount: 42,
    isSuperhost: false,
    proximityAirportMin: 22,
    hasGenerator: true,
    hasWaterReserve: true,
    amenities: ["Panoramic Mountain Views", "Fitness Center Access", "Children's Playground", "Quiet Neighborhood", "Full Security"],
    imageUrl: "https://images.unsplash.com/photo-1502005229762-ee1b2b93e00f?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1502005229762-ee1b2b93e00f?auto=format&fit=crop&w=800&q=80",
    ],
    host: {
      name: "Addis Premier Hosts",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      superhost: true,
      responseRate: "100% within 30 min",
    },
  },
  {
    id: 6,
    title: "Piassa Cultural Artisan Studio",
    slug: "piassa-cultural-artisan-studio",
    description: "Charming renovated vintage studio in historical Piassa. Close to St. George Cathedral, National Museum (Lucy), and traditional jazz clubs. Perfect for culture seekers and solo travelers.",
    neighborhood: "Piassa",
    address: "Churchill Ave, Historical District, Piassa",
    propertyType: "Studio",
    priceUSD: 50,
    priceETB: 6000,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.95,
    reviewCount: 77,
    isSuperhost: true,
    proximityAirportMin: 20,
    hasGenerator: false,
    hasWaterReserve: true,
    amenities: ["Historic Architecture", "High Ceilings", "Artisan Ethiopian Decor", "Walking Distance to Cafes & Museums", "High-speed Wi-Fi"],
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    ],
    host: {
      name: "Hanna Mengistu",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      superhost: true,
      responseRate: "100% within 20 min",
    },
  },
];

export const RECENT_BOOKINGS: BookingRecord[] = [
  {
    id: 101,
    propertyTitle: "Bole Medhanialem Skyline Penthouse",
    neighborhood: "Bole",
    guestName: "Marcus Vance",
    checkIn: "2026-09-16",
    checkOut: "2026-09-22",
    nights: 6,
    payoutUSD: 810,
    channel: "Airbnb",
    status: "Confirmed",
  },
  {
    id: 102,
    propertyTitle: "Kazanchis Diplomatic Luxury Suite",
    neighborhood: "Kazanchis",
    guestName: "Dr. Alistair Finch (WHO delegate)",
    checkIn: "2026-09-14",
    checkOut: "2026-09-20",
    nights: 6,
    payoutUSD: 570,
    channel: "Direct",
    status: "Checked-in",
  },
  {
    id: 103,
    propertyTitle: "Old Airport Ambassadorial Private Villa",
    neighborhood: "Old Airport",
    guestName: "Amb. Sophia Lindqvist",
    checkIn: "2026-09-25",
    checkOut: "2026-10-05",
    nights: 10,
    payoutUSD: 2400,
    channel: "Airbnb",
    status: "Confirmed",
  },
  {
    id: 104,
    propertyTitle: "Sarbet African Union Modern Loft",
    neighborhood: "Sarbet",
    guestName: "Jean-Pierre Nkomo",
    checkIn: "2026-09-10",
    checkOut: "2026-09-14",
    nights: 4,
    payoutUSD: 312,
    channel: "Booking.com",
    status: "Completed",
  },
];
