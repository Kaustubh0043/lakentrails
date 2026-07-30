import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Review from "@/models/Review";

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch only reviews that have been approved by the admin, newest first
    const reviews = await Review.find({ isApproved: true })
      .sort({ createdAt: -1 })
      .limit(50);
    return NextResponse.json(reviews, { status: 200 });
  } catch (error: any) {
    console.error("GET Reviews Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, role, text, rating } = body;

    if (!name || !text || typeof rating !== "number") {
      return NextResponse.json(
        { error: "Name, text, and rating are required fields." },
        { status: 400 }
      );
    }

    // Creates the review with isApproved defaulting to false for admin moderation
    const newReview = await Review.create({
      name,
      role: role || "Resort Guest",
      text,
      rating,
    });

    return NextResponse.json(
      { message: "Review submitted for approval", data: newReview },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Review Error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
