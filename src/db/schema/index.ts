import { pgTable, text, serial, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  neighborhood: text("neighborhood").notNull(), // Bole, Kazanchis, Old Airport, Sarbet, CMC, Piassa
  address: text("address").notNull(),
  propertyType: text("property_type").notNull(), // Apartment, Penthouse, Villa, Studio
  pricePerNightUSD: integer("price_per_night_usd").notNull(),
  pricePerNightETB: integer("price_per_night_etb").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  maxGuests: integer("max_guests").notNull(),
  rating: text("rating").notNull().default("4.9"),
  reviewCount: integer("review_count").notNull().default(0),
  isSuperhost: boolean("is_superhost").notNull().default(false),
  proximityAirportMin: integer("proximity_airport_min").notNull().default(10), // Minutes to Bole Airport
  amenities: jsonb("amenities").notNull().$type<string[]>(),
  images: jsonb("images").notNull().$type<string[]>(),
  status: text("status").notNull().default("available"), // available, booked, maintenance
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id")
    .references(() => properties.id)
    .notNull(),
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  guestPhone: text("guest_phone"),
  checkInDate: text("check_in_date").notNull(),
  checkOutDate: text("check_out_date").notNull(),
  totalGuests: integer("total_guests").notNull().default(1),
  totalPriceUSD: integer("total_price_usd").notNull(),
  status: text("status").notNull().default("confirmed"), // confirmed, pending, completed, cancelled
  channel: text("channel").notNull().default("Airbnb"), // Airbnb, Direct, Booking.com
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const maintenanceTickets = pgTable("maintenance_tickets", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id")
    .references(() => properties.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull().default("medium"), // low, medium, high, emergency
  status: text("status").notNull().default("open"), // open, in_progress, resolved
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type MaintenanceTicket = typeof maintenanceTickets.$inferSelect;
