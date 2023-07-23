import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import PropertyClient from "./PropertyClient";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState title="No authroized." subtitle="Please login"/>
            </ClientOnly>
        )
    }

    const listings = await getListings({userId:currentUser.id});
    if(listings.length === 0) {
        return(
            <ClientOnly>
                <EmptyState title="No found properties." subtitle="Looks like you have no properties."/>
            </ClientOnly>
        )   
    }

    return (
       <PropertyClient listings={listings} currentUser={currentUser}/>
    )
}

export default PropertiesPage