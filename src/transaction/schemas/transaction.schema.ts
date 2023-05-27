import * as mongoose from 'mongoose';
    
export const TransactionSchema = new mongoose.Schema({
    amount: Number,
    payment_method: String,
    created_date: Date,
    subscription_plan_id: String,
    user_id: String,
});