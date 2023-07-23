import prisma from '@/app/libs/prisma'

interface IParams {
    listingId?:string;
    userId?:string;
    authorId?:string;
}

export default async function getReservations (params:IParams) {
    try {
            
        const { listingId, userId, authorId } = params;

        const query:any = {};

        // find all reservations for single listing that we're looking at.
        if(listingId) query.listingId = listingId

        // find all of the trips a user have
        if(userId) query.userId = userId

        // find all of the reservations that other users made for our listings
        if(authorId) query.linging = { userId: authorId};

        const reservations = await prisma.reservation.findMany({
            where : query,
            include : { listing : true },
            orderBy : { createdAt : 'desc' }
        })

        return reservations;
        
    } catch (error:any) {
        return [];
    }

}