import * as mongoose from 'mongoose';
    
export const BusinessGoalSchema = new mongoose.Schema({
    name: {
        th: String,
        en: String,
      },
      full_name: String,
      detail: {},
      created_date: Date,
});