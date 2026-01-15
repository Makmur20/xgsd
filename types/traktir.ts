import { Prisma } from "@prisma/client";

export type TraktirProps =
  Prisma.DonationGetPayload<{}> & {
    Payment?: Prisma.PaymentGetPayload<{}> | null;
  };

export type TraktirDetailProps = Prisma.ProductGetPayload<{
    include: {
        ProductCategories: {
            include: {
                Categories: {
                    select: {
                    name: true,
                     }
                    }
                }
            }
        }
}>;

export type DisabledDateProps = Prisma.DonationGetPayload<{

}>;