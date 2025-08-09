import connectDB from "@/lib/mongodb";
import Transaction from "@/models/τransaction";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), { status: 400 });
  }

  await connectDB();
  const transactions = await Transaction.find({ userId }).sort({ date: -1 });

  return new Response(JSON.stringify({ transactions }), { status: 200 });
}

export async function POST(req) {
  const { userId, title, amount, date } = await req.json();

  if (!userId || !title || amount == null) {
    return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
  }

  await connectDB();
  const transaction = new Transaction({ userId, title, amount, date: date ? new Date(date) : new Date() });
  await transaction.save();

  return new Response(JSON.stringify({ transaction }), { status: 201 });
}
