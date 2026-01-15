import { PaymentProps } from "@/types/payment";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async(request: Request) => {
    const data: PaymentProps = await request.json();
    const donationId = data.order_id;

    let responseData = null;

    const transactionStatus = data.transaction_status;
    const paymentType = data.payment_type || null;
    const fraudStatus = data.fraud_status;
    const statusCode = data.status_code;
    const grossAmount = data.gross_amount;
    const signature_key = data.signature_key;

    const hash = crypto.createHash("sha512").update(`${donationId}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY}`).digest("hex");

    if(signature_key !== hash){
        return NextResponse.json({error: "Missing Signature key"}, {status: 400})
    }

    if(transactionStatus == "capture") {
        if(fraudStatus == "accept") {
            const transaction = await prisma.payment.update({
                data: {
                    methode: paymentType,
                    status: "paid",
                },
                where: {donationId}
            });
            responseData = transaction;
        }
    }else if (transactionStatus == "settlement"){
        const transaction = await prisma.payment.update({
            data:{
                methode: paymentType,
                status: "paid",
            },
            where: {donationId}
        });
        responseData = transaction;
    }else if(transactionStatus == "cancle" || transactionStatus == "dny" || transactionStatus == "expire"){
        const transaction = await prisma.payment.update({
                data:{
                methode: paymentType,
                status: "failure",
            },
            where: {donationId}
        });
        responseData = transaction;
    }else if(transactionStatus == "pending") {
            const transaction = await prisma.payment.update({
                data:{
                methode: paymentType,
                status: "pending",
            },
            where: {donationId}
        });
        responseData = transaction;
    }

    return NextResponse.json({responseData}, {status: 200})
}