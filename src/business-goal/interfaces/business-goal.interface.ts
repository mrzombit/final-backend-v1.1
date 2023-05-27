import { Document } from 'mongoose';
    
export interface BusinessGoal extends Document {
    readonly name: {
        th: string,
        en: string,
      };
      readonly full_name: string;
      readonly detail: {};
      readonly created_date: Date;
}