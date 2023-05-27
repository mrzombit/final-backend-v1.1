import * as mongoose from 'mongoose'

export const SubscriptionPlanSchema = new mongoose.Schema({
    name: {
        th: String,
        en: String,
    },
    price: Number,
    properties: {
        is_ffc: Boolean,
        is_sensitivity: Boolean,
        is_export: Boolean,
        is_compared: Boolean,
    },
    created_date: Date,
    is_actived: Boolean,
})