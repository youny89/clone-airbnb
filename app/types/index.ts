import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

export type ReservationWithListing = Omit<
    Reservation,
    "listing"
> & {
    listing: Listing
}