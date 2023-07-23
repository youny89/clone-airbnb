import { Listing, User } from "@prisma/client"
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
    listings: Listing[];
    currentUser: User | null
}

const FavoritesClient = ({listings, currentUser}: FavoritesClientProps) => {
    return (
        <Container>
            <Heading title="Favorites" subtitle="List of places you favorited!"/>

            <div className="
                mt-10 grid gap-8
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
            ">
                {listings.map(listing=>(
                    <ListingCard 
                        key={listing.id}
                        currentUser={currentUser}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    )
}

export default FavoritesClient