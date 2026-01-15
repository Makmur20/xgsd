import { NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { donationProps } from "@/types/donation";

const snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export const POST = async(request: Request) => {
    const donation: donationProps = await request.json();

    const parameter = {
        transaction_details: {
            order_id: donation.id,
            gross_amount: donation.Payment?.amount || 0,
        },
        credit_card:{
            secure: true,
        },
        customer_details:{
            first_name: donation.User.name,
            email: donation.User.email,
        }
    }

    const token = await snap.createTransactionToken(parameter);
    return NextResponse.json({token});
}
