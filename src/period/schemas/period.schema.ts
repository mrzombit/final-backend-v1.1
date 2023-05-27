import * as mongoose from 'mongoose';

export const PeriodSchema = new mongoose.Schema({
    name: {
        th: String,
        en: String,
    },
    days: Number,
    months: Number,
    created_date: Date,
});