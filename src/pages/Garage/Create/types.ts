// components/garage/create/types.ts
export interface Country {
  code: string;
  name: string;
}

export interface FormValues {
  garageName: string;
  email: string;
  phone: string;
  whatsapp: string;
  owner: string;
  description: string;
  address: {
    flatPlot: string;
    buildingName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
}
