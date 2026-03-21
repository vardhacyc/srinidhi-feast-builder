export interface LunchMenuItem {
  name: string;
}

export interface LunchPackage {
  id: string;
  name: string;
  price: number;
  items: LunchMenuItem[];
  highlight?: string;
}

export interface AddOn {
  name: string;
  price: number;
  unit: string;
}

export interface ServiceCharge {
  name: string;
  price: number | string;
}

export const LUNCH_PACKAGES: LunchPackage[] = [
  {
    id: 'lunch-1',
    name: 'Lunch Menu 1',
    price: 170,
    items: [
      { name: 'Salt' }, { name: 'Rice' }, { name: 'Kadhamba Sambar' },
      { name: 'Puliy Kuzhambu / Kara Kuzhambu' }, { name: 'Rasam' },
      { name: 'Kootu' }, { name: 'Poriyal' }, { name: 'Appalam' },
      { name: 'Vadai' }, { name: 'Payasam' }, { name: 'Curd' }, { name: 'Pickles' },
    ],
  },
  {
    id: 'lunch-2',
    name: 'Lunch Menu 2',
    price: 200,
    items: [
      { name: 'Sweet' }, { name: 'Salt' }, { name: 'Rice' }, { name: 'Kadhamba Sambar' },
      { name: 'Puliy Kuzhambu / Kara Kuzhambu' }, { name: 'Rasam' },
      { name: 'Kootu' }, { name: 'Poriyal' }, { name: 'Appalam' },
      { name: 'Vadai' }, { name: 'Payasam' }, { name: 'Curd' }, { name: 'Pickles' },
    ],
  },
  {
    id: 'lunch-3',
    name: 'Lunch Menu 3',
    price: 220,
    items: [
      { name: 'Sweet' }, { name: 'Salt' }, { name: 'Rice' }, { name: 'Paruppu - Ghee' },
      { name: 'Kadhamba Sambar' }, { name: 'Puliy Kuzhambu / Kara Kuzhambu' },
      { name: 'Rasam' }, { name: 'Kootu' }, { name: 'Poriyal' }, { name: 'Appalam' },
      { name: 'Vadai' }, { name: 'Payasam' }, { name: 'Curd' }, { name: 'Pickles' },
    ],
  },
  {
    id: 'lunch-4',
    name: 'Lunch Menu 4',
    price: 270,
    highlight: 'Popular',
    items: [
      { name: 'Sweet' }, { name: 'Salt' }, { name: 'Roti / Veg Biryani' },
      { name: 'Veg Gravy / Raitha' }, { name: 'Rice' }, { name: 'Kadhamba Sambar' },
      { name: 'Puliy Kuzhambu / Kara Kuzhambu' }, { name: 'Rasam' },
      { name: 'Kootu' }, { name: 'Poriyal' }, { name: 'Appalam' },
      { name: 'Vadai' }, { name: 'Payasam' }, { name: 'Curd' }, { name: 'Pickles' },
    ],
  },
  {
    id: 'lunch-5',
    name: 'Lunch Menu 5',
    price: 320,
    highlight: 'Premium',
    items: [
      { name: 'Sweet' }, { name: 'Salt' }, { name: 'Chappathi (1)' },
      { name: 'Veg Gravy' }, { name: 'Veg Biryani / Mushroom Biryani / Ghee Rice' },
      { name: 'Raitha / Kuruma' }, { name: 'Rice' }, { name: 'Kadhamba Sambar' },
      { name: 'Puliy Kuzhambu / Kara Kuzhambu' }, { name: 'Rasam' },
      { name: 'Kootu' }, { name: 'Poriyal' }, { name: 'Appalam' },
      { name: 'Vadai' }, { name: 'Payasam' }, { name: 'Curd' }, { name: 'Pickles' },
    ],
  },
  {
    id: 'lunch-6',
    name: 'Lunch Menu 6',
    price: 340,
    items: [
      { name: 'Sweet' }, { name: 'Salt' }, { name: 'Chappathi (1)' },
      { name: 'Veg Gravy' }, { name: 'Veg Biryani / Mushroom Biryani / Ghee Rice' },
      { name: 'Raitha / Kuruma' }, { name: 'Rice' }, { name: 'Kadhamba Sambar' },
      { name: 'Puliy Kuzhambu / Kara Kuzhambu' }, { name: 'Rasam' },
      { name: 'Kootu' }, { name: 'Poriyal' }, { name: 'Appalam' },
      { name: 'Vadai' }, { name: 'Payasam' }, { name: 'Curd' }, { name: 'Pickles' },
      { name: 'Ice Cream' }, { name: 'Beeda' },
    ],
  },
  {
    id: 'lunch-7',
    name: 'Lunch Menu 7',
    price: 370,
    highlight: 'Grand Feast',
    items: [
      { name: 'Sweet' }, { name: 'Chilli Gobi / Chilli Babycorn / Veg Cutlet / Porial' },
      { name: 'Salt' }, { name: 'Chappathi (1)' }, { name: 'Veg Gravy' },
      { name: 'Veg Biryani / Mushroom Biryani / Ghee Rice' }, { name: 'Raitha / Kuruma' },
      { name: 'Rice' }, { name: 'Kadhamba Sambar' },
      { name: 'Puliy Kuzhambu / Kara Kuzhambu' }, { name: 'Rasam' },
      { name: 'Kootu' }, { name: 'Poriyal' }, { name: 'Appalam' },
      { name: 'Vadai' }, { name: 'Payasam' }, { name: 'Curd' }, { name: 'Pickles' },
      { name: 'Ice Cream' }, { name: 'Beeda' },
    ],
  },
];

export const ADD_ONS: AddOn[] = [
  { name: 'Water 300ml', price: 6, unit: 'bottle' },
  { name: 'Water 500ml', price: 10, unit: 'bottle' },
];

export const SERVICE_CHARGES: ServiceCharge[] = [
  { name: 'Service per person (Muhurtham – 3 times)', price: 1800 },
  { name: 'Service per person (1 time)', price: 600 },
  { name: 'Live Charges per item', price: 2000 },
  { name: 'Transport', price: 'Extra' },
  { name: 'GST', price: '5% Extra' },
];
