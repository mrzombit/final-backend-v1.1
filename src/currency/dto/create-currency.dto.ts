export class CreateCurrencyDTO {
    readonly name: {
      local: string,
      en: string,
    };
    readonly abbreviation: string;
    readonly weight: Number;
    readonly created_date: Date;
  }