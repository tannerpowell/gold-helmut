import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { AWARD_INFO } from "@/lib/constants";

export async function POST(req: Request) {
  let body: { amount?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { amount } = body;

  if (!amount || typeof amount !== "number" || !Number.isFinite(amount) || amount < 1 || amount > 10000) {
    return NextResponse.json(
      { error: "Invalid donation amount" },
      { status: 400 }
    );
  }

  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

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
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
