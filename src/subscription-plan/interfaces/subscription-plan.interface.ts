import { Document } from "mongoose";

export interface SubscriptionPlan extends Document {
  readonly name: {
    th: string,
    en: string,
  };
  readonly price: Number;
  readonly properties: {
    is_ffc: Boolean,
    is_sensitivity: Boolean,
    is_export: Boolean,
    is_compared: Boolean,
  };
  readonly created_date: Date;
  readonly is_actived: boolean;
}