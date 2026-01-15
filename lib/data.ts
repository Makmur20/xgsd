import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
    const session = await auth();
    if(!session || !session.user) {
        throw new Error("Unauthorized Access");
    }
    try {
        const result = await prisma.categories.findMany();
        return result;
    } catch (error) {
        console.log(error);
    }
    
}

export const getProducts = async () => {
    try {
        const result = await prisma.product.findMany({
            orderBy:{createdAt: "desc"}
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}


export const getProductById = async (productId: string) => {
    try {
        const result = await prisma.product.findUnique({
            where: {id: productId},
            include: { ProductCategories: { select: { categoriesId: true } } },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}


export const getProductDetailById = async (productId: string) => {
    try {
        const result = await prisma.product.findUnique({
            where: {id: productId},
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
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}
export const getProductDonationById = async (id: string) => {
    try {
        const result = await prisma.donation.findUnique({
            where: {id},
            include: {
                Product: {
                    select:{
                        name: true,
                        image: true,
                        price: true,
                        link: true,
                    }
                },
                User:{
                    select:{
                        name: true,
                        email: true,
                        phone: true
                    },
                },
                Payment: true,
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}
export const getSourceCodeByUserId = async () => {
    const session = await auth();
    if(!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized Access");
    }
    try {
        const result = await prisma.donation.findMany({
            where: {userId: session.user.id},
            include: {
                Product:{
                    select:{
                        name: true,
                        image: true,
                        price: true,
                        link: true,
                    }
                },
                User:{
                    select:{
                        name: true,
                        email: true,
                        phone: true,
                    }
                },
                Payment: true
            },
            orderBy: {createdAt:"desc"}
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getProductSourceCodeById = async (id: string) => {
    try {
        const result = await prisma.donation.findUnique({
            where: {id},
            include: {
                Product: {
                    select:{
                        name: true,
                        image: true,
                        price: true,
                        link: true,
                    }
                },
                User:{
                    select:{
                        name: true,
                        email: true,
                        phone: true
                    },
                },
                Payment: true,
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}



export const getRevenueAndReserve = async () => {
    try {
        const result = await prisma.donation.aggregate({
            _count: true,
            _sum: {price: true},
            where: {
                Payment: {status: { not: "failure" }},
            },
        });
        return {
            revenue: result._sum.price || 0,
            reserve: result._count,
        };
    } catch (error) {
        console.log(error);
    }
}

export const getTotalCustomers= async () => {
    try {
        const result = await prisma.donation.findMany({
            distinct: ["userId"],
            where: {
                Payment: {status: { not: "failure" }},
            },
            select: {userId: true}
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getDonations = async () => {
    try {
        const result = await prisma.donation.findMany({
            orderBy:{createdAt: "desc"},
            include: {
                Product: {
                    select:{
                        name: true,
                        link: true,
                        image: true,
                        price: true,
                    }
                },
                User:{
                    select:{
                        name: true,
                        email: true,
                        phone: true
                    },
                },
                Payment: true,
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export const getTraktirById = async (traktirId: string) => {
    try {
        const result = await prisma.donation.findUnique({
            where: {id: traktirId},
                        include: {
                Product: {
                    select:{
                        name: true,
                        link: true,
                        image: true,
                        price: true,
                    }
                },
                User:{
                    select:{
                        name: true,
                        email: true,
                        phone: true
                    },
                },
                Payment: true,
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}
