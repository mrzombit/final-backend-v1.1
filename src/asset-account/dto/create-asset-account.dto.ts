export class CreateAssetAccountDTO {
    readonly name: {
      th: string,
      en: string,
    };
    readonly is_fixed_asset: boolean;
    readonly is_tangible_asset: boolean;
    readonly created_date: Date;
  }