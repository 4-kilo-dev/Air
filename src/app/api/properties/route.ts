import { NextResponse, type NextRequest } from "next/server";
import { INITIAL_PROPERTIES, type PropertyItem } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const neighborhood = searchParams.get("neighborhood");
  const minGuests = searchParams.get("guests");
  const query = searchParams.get("q")?.toLowerCase();

  // If a live database exists, we could query it; otherwise serve our rich curated records
  let results: PropertyItem[] = INITIAL_PROPERTIES;

  if (neighborhood && neighborhood !== "All") {
    results = results.filter(
      (p) => p.neighborhood.toLowerCase() === neighborhood.toLowerCase()
    );
  }

  if (minGuests) {
    const guests = parseInt(minGuests, 10);
    if (!isNaN(guests)) {
      results = results.filter((p) => p.maxGuests >= guests);
    }
  }

  if (query) {
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query) ||
        p.amenities.some((a) => a.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    total: results.length,
    properties: results,
  });
}
