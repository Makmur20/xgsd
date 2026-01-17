import { object, string, coerce, array } from "zod";

export const ProductSchema = object({
    name: string().min(1, "String must contain at least 1 character(s)"),
    description: string().min(50, "String must contain at least 50 character(s)"),
    link: string().min(1, "String must contain at least 1 character(s)"),
    price: coerce.number().gt(0, "Number must be greater than 0"),
    categories: array(string()).nonempty("Array must contain at least 1 element(s)"),
});

export const ReserveSchema = object({
    name: string().min(1, "String must contain at least 1 character(s)"),
    phone: string().min(12, "String must contain at least 12 character(s)"),
});

export const DonationSchema = object({
    price: coerce.number().gt(0, "Number must be greater than 0"),
    name: string().min(1, "String must contain at least 1 character(s)"),
    phone: string().min(12, "String must contain at least 12 character(s)"),
});

export const DonationUpdateSchema = object({
  price: coerce.number().gt(0, "Harga harus lebih dari 0"),
  status: string().min(1, "Status wajib diisi"),
});

export const ContactSchema = object({
    name: string().min(6, "Name at least 6 characters"),
    email: string().min(6, "Email at least 6 characters").email("Pelase enter a valid email"),
    subject: string().min(6, "Subject at least 6 characters"),
    message: string().min(10, "Message at least 50 characters").max(1000, "Message maximum 200 characters"),
});

