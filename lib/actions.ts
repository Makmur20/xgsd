"use server";
import { prisma } from "@/lib/prisma";
import { ContactSchema, ProductSchema, DonationSchema, DonationUpdateSchema } from "@/lib/zod";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export const saveProduct = async (image: string, prevState: unknown, formData: FormData) => {
    if(!image) return {message: "Image is Required"}

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        link: formData.get("link"),
        price: Number(String(formData.get("price")).replace(/\./g, "")),
        categories: formData.getAll("categories")
    }

    const validatedFields = ProductSchema.safeParse(rawData);
    if(!validatedFields.success) {
        return {error: validatedFields.error.flatten().fieldErrors}
    }

    const {name, description, link, price, categories} = validatedFields.data;

    try {
        await prisma.product.create({
            data:{
                name,
                description,
                image,
                link,
                price,
                ProductCategories:{
                    createMany:{
                        data: categories.map((item) => ({
                           categoriesId: item
                        }))
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
    return { success: true };
    // redirect("/admin/product")
}

//Delete Product
export const deleteProduct = async (id: string, image:string) => {
    try {
        await del(image);
        await prisma.product.delete({
            where:{id}
        })
    } catch (error) {
        console.log.apply(error);
    }
    revalidatePath("/admin/product");
}

//Update Product
export const updateProduct = async (image: string, productId: string, prevState: unknown, formData: FormData) => {
    if(!image) return {message: "Image is Required"}

    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        capacity: formData.get("capacity"),
        link: formData.get("link"),
        price: Number(String(formData.get("price")).replace(/\./g, "")),
        categories: formData.getAll("categories")
    }

    const validatedFields = ProductSchema.safeParse(rawData);
    if(!validatedFields.success) {
        return {error: validatedFields.error.flatten().fieldErrors}
    }

    const {name, description, link, price, categories} = validatedFields.data;

    try {
        await prisma.$transaction([
            prisma.product.update({
                where: {id: productId},
                data:{
                    name,
                    description,
                    image,
                    link,
                    price,
                    ProductCategories:{
                        deleteMany: {}
                    }
                }
            }),
            prisma.productCategories.createMany({
                data: categories.map((item) => ({
                    productId,
                    categoriesId: item
                }))
            })
            
        ])
    } catch (error) {
        console.log(error)
    }
    return { success: true };
    // revalidatePath("/admin/product");
    // redirect("/admin/product")
}

export const ContactMessage = async (prevState:unknown, formData: FormData) => {
    const validatedFields = ContactSchema.safeParse(Object.fromEntries(formData.entries()))

    if(!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors};
    }

    const { name, email, subject, message } = validatedFields.data;
    try{
        await prisma.contact.create({
            data:{
            name,
            email,
            subject,
            message
            }
        });
        return {message: "Thanks for cotact us"}
    } catch (error){
        console.log(error)
    }
}

//createDonation
export const createDonation = async (
    productId: string,
    prevState: unknown,
    formData: FormData
) => {
    const session = await auth();
    if(!session || !session.user || !session.user.id) redirect(`/signin?redirect_url=product/${productId}`);

    const rawData ={
        price: Number(String(formData.get("price")).replace(/\./g, "")),
        name: formData.get("name"),
        phone: formData.get("phone"),
    }

    const validatedFields = DonationSchema.safeParse(rawData);

    if(!validatedFields.success){
        return {
            error: validatedFields.error.flatten().fieldErrors
        }
    }
    const {price, name, phone} = validatedFields.data;
    // const night = differenceInCalendarDays(endDate, startDate);
    // if(night <= 0 ) return {messageDate: "Date must be least 1 night"}
    const total = price;

    let donationId;
    try {
        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                data:{
                    name,
                    phone
                },
                where: {id: session.user.id}
            });
            const donation = await tx.donation.create({
                data:{
                    price,
                    productId: productId,
                    userId: session.user.id as string,
                    Payment:{
                        create:{
                            amount: total
                        }
                    }
                }
            });
            donationId = donation.id;
        })
    } catch (error) {
        console.log(error);
    }
    redirect(`/checkout/${donationId}`);
}

//Update Traktir
export const updateDonation = async (
  traktirId: string,
  prevState: unknown,
  formData: FormData
) => {
  const rawData = {
    price: Number(String(formData.get("price")).replace(/\./g, "")),
    status: formData.get("status"),
  };

  const validated = DonationUpdateSchema.safeParse(rawData);
  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  await prisma.donation.update({
    where: { id: traktirId },
    data: {
      price: validated.data.price,
      Payment: {
        upsert: {
          update: {
            status: validated.data.status,
            amount: validated.data.price,
          },
          create: {
            status: validated.data.status,
            amount: validated.data.price,
          },
        },
      },
    },
  });

  return { success: true };
};
