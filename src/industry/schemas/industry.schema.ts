import * as mongoose from 'mongoose';

export const IndustrySchema = new mongoose.Schema({
    name: {
        th: String,
        en: String,
    },
    is_b2b: Boolean,
    is_b2c: Boolean,
    category: {
        th: String,
        en: String,
    },
    created_date: Date,
});