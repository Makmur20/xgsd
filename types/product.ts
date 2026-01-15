import { Prisma } from "@prisma/client";

export type ProductProps = Prisma.ProductGetPayload<{
include: { ProductCategories: { select: { categoriesId: true } } };
}>;

export type ProductDetailProps = Prisma.ProductGetPayload<{
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