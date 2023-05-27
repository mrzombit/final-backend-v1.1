import * as mongoose from 'mongoose';

export const CurrencySchema = new mongoose.Schema({
    name: {
        local: String,
        en: String,
    },
    abbreviation: String,
    weight: Number,
    created_date: Date,
});