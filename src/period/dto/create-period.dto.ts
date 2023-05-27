export class CreatePeriodDTO {
    readonly name: {
      th: string,
      en: string,
    };
    readonly days: number;
    readonly months: number;
    readonly created_date: Date;
  }