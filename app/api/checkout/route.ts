import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { AWARD_INFO } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || typeof amount !== "number" || !Number.isFinite(amount) || amount < 1 || amount > 10000) {
      return NextResponse.json(
        { error: "Invalid donation amount" },
        { status: 400 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await getStripe().checkout.sessions.create({
      submit_type: "donate",
      mode: "payment",
      customer_creation: "if_required",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(amount * 100), // cents
            product_data: {
              name: `${AWARD_INFO.name} Donation`,
              description: `Tax-deductible donation to ${AWARD_INFO.charity}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
