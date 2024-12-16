export enum AccountTypeEnum {
  COMPTE_200 = 'Compte 200',
  COMPTE_5000 = 'Compte 5000',
  COMPTE_20000 = 'Compte 20000'
}

export interface AccountTypeData {
  description: string;
  plafond: number;
}

export class AccountType {
  private static readonly accountTypeMap: Map<AccountTypeEnum, AccountTypeData> = new Map([
    [AccountTypeEnum.COMPTE_200, { description: 'Compte 200', plafond: 200 }],
    [AccountTypeEnum.COMPTE_5000, { description: 'Compte 5000', plafond: 5000 }],
    [AccountTypeEnum.COMPTE_20000, { description: 'Compte 20000', plafond: 20000 }]
  ]);

  static getDescription(type: AccountTypeEnum): string {
    const data = this.accountTypeMap.get(type);
    if (!data) {
      throw new Error(`Invalid account type: ${type}`);
    }
    return data.description;
  }

  static getPlafond(type: AccountTypeEnum): number {
    const data = this.accountTypeMap.get(type);
    if (!data) {
      throw new Error(`Invalid account type: ${type}`);
    }
    return data.plafond;
  }

  static fromDescription(description: string): AccountTypeEnum {
    for (const [type, data] of this.accountTypeMap.entries()) {
      if (data.description.toLowerCase() === description.trim().toLowerCase()) {
        return type;
      }
    }
    throw new Error(`No such value for AccountType description: ${description}`);
  }

  static fromPlafond(plafond: number): AccountTypeEnum {
    for (const [type, data] of this.accountTypeMap.entries()) {
      if (data.plafond === plafond) {
        return type;
      }
    }
    throw new Error(`No such value for AccountType plafond: ${plafond}`);
  }
  static getAllTypes(): Array<{type: AccountTypeEnum, data: AccountTypeData}> {
    return Array.from(this.accountTypeMap.entries()).map(([type, data]) => ({
      type,
      data
    }));
  }
}
