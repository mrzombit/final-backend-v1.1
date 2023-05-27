import { Document } from 'mongoose';

export interface Currency extends Document {
    readonly name: {
        local: string,
        en: string,
    };
    readonly abbreviation: string;
    readonly weight: Number;
    readonly created_date: Date;
}