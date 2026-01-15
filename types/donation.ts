import { Prisma } from "@prisma/client";

export type donationProps = Prisma.DonationGetPayload<{
    include:{
        Product:{
            select:{
                name:true,
                image:true,
                link:true,
                price:true
            }
        },
        User:{
            select:{
                name:true,
                email:true,
                phone:true,
            }
        },
        Payment: true;
    }
}>