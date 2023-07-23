import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";


const FavoritePage = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="No authorized." subtitle="Please login"/>
            </ClientOnly>
        )
    }
    const listings = await getFavoriteListings();
    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No favorites found." subtitle="Looks like you have no favorite listings"/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default FavoritePage