import { Document } from 'mongoose';
    
export interface Big extends Document {
    readonly name: {
        th: string,
        en: string,
    };
    readonly is_fixed_asset: boolean;
    readonly is_tangible_asset: boolean;
    readonly date_created: string;
}