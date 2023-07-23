'use client';

import { Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { ReservationWithListing } from "../types";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface ReservationClientProps {
  reservations: ReservationWithListing[]
  currentUser : User | null
}

const ReservationClient = ({reservations, currentUser}: ReservationClientProps) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = (id:string) => {
      setDeletingId(id);
      axios.delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancel.')
          router.refresh();
        })
        .catch(()=>{
          toast.error('Something went wrong.')
        })
        .finally(()=>{
          setDeletingId('');
        })
    }

    return (
      <Container>
        <Heading title="Reservations" subtitle="Booking on your property"/>
        <div
          className="
            mt-10 gap-8
            grid grid-cols-1 
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
        >
          {reservations.map(reservation => (
            <ListingCard 
              key={reservation.id}
              data={reservation.listing}
              reserversation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    )
}

export default ReservationClient