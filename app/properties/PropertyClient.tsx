'use client';

import { User,Listing } from "@prisma/client";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface PropertyClientProps {
    listings:Listing[];
    currentUser: User | null;
}

const PropertyClient = ({listings, currentUser}: PropertyClientProps) => {
    const [deletingId, setDeletingId] = useState('')
    const router = useRouter();

    const onDelete = useCallback((id: string)=>{
        setDeletingId(id);

        axios.delete(`/api/listing/${id}`)
            .then(()=>{
                toast.success('Listing deleted.')
                router.refresh();
            })
            .catch(()=>{
                toast.error('Something went wrong.')
            })
            .finally(()=>{
                setDeletingId('');
            })
    },[router])

    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties"
            />
            <div 
                className="
                    mt-10
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4
                    xl:grid-cols-5
                    2xl:grid-cols-6
                    gap-8
                    "
            >
                {listings.map(listing => (
                    <ListingCard 
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onDelete}
                        disabled={deletingId === listing.id}
                        actionLabel="Delete property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertyClient