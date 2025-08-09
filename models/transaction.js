import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  date: Date,
  userId: { type: String, required: true },
});

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
