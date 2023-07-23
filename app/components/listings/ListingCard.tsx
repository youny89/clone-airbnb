'use client'

import useCountries from "@/app/hooks/useCountires";
import { Listing, Reservation, User } from "@prisma/client"
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns"
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
    data: Listing;
    reserversation?: Reservation;
    disabled?: boolean;
    onAction?:(id:string)=>void;
    actionLabel?:string;
    actionId?: string;
    currentUser?:User | null;
}

const ListingCard = ({
    data,
    reserversation,
    disabled,
    onAction,
    actionId="",
    actionLabel,
    currentUser
}: ListingCardProps) => {

    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback((
        e: React.MouseEvent<HTMLButtonElement>
    )=>{
        e.stopPropagation();

        if(disabled) return;

        onAction?.(actionId);

    },[actionId, onAction, disabled])

    const price = useMemo(()=>{
        if(reserversation) return reserversation.totalPrice;

        return data.price;
    },[reserversation, data.price])

    const reserversationDate = useMemo(()=>{
        if(!reserversation) return null;

        const start = new Date(reserversation.startDate);
        const end = new Date(reserversation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    },[reserversation]);

    return (
        <div
            onClick={()=>router.push(`/listings/${data?.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="
                            object-cover
                            h-full w-full
                            group-hover:scale-110
                            transition
                        "
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser}/>
                    </div>
                </div>
                <div className="font-semibold text-lg">{location?.region}, {location?.label}</div>
                <div className="font-ligth text-neutral-500">{reserversationDate || data.category}</div>
                <div className="flex flew-row items-center gap-1">
                    <div className="font-semibold">$ {price}</div>
                    {!reserversation && (
                        <div className="font-light">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

export default ListingCard