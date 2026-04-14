export interface Bank {
  id: string;
  name: string;
  code: string;
  logo: string;
  color: string;
}

export const NIGERIAN_BANKS: Bank[] = [
  { id: "gtb", name: "Guaranty Trust Bank", code: "058", logo: "GTB", color: "#F26522" },
  { id: "uba", name: "United Bank for Africa", code: "033", logo: "UBA", color: "#C8102E" },
  { id: "zenith", name: "Zenith Bank", code: "057", logo: "ZEN", color: "#005B8E" },
  { id: "firstbank", name: "First Bank of Nigeria", code: "011", logo: "FBN", color: "#00529B" },
  { id: "access", name: "Access Bank", code: "044", logo: "ACC", color: "#F05022" },
  { id: "sterling", name: "Sterling Bank", code: "232", logo: "STR", color: "#D42234" },
  { id: "fidelity", name: "Fidelity Bank", code: "070", logo: "FID", color: "#003366" },
  { id: "kuda", name: "Kuda Bank", code: "090267", logo: "KUD", color: "#5300B8" },
  { id: "opay", name: "OPay Digital Services", code: "100004", logo: "OPY", color: "#1DB954" },
  { id: "polaris", name: "Polaris Bank", code: "076", logo: "POL", color: "#7B2D8B" },
  { id: "wema", name: "Wema Bank", code: "035", logo: "WEM", color: "#E91E8C" },
  { id: "union", name: "Union Bank of Nigeria", code: "032", logo: "UBN", color: "#003A70" },
  { id: "stanbic", name: "Stanbic IBTC Bank", code: "221", logo: "STB", color: "#009BD2" },
  { id: "fcmb", name: "First City Monument Bank", code: "214", logo: "FCM", color: "#00AEEF" },
  { id: "heritage", name: "Heritage Bank", code: "030", logo: "HER", color: "#008753" },
  { id: "keystone", name: "Keystone Bank", code: "082", logo: "KEY", color: "#035AA6" },
  { id: "ecobank", name: "Ecobank Nigeria", code: "050", logo: "ECO", color: "#1F4B8E" },
  { id: "citibank", name: "Citibank Nigeria", code: "023", logo: "CTB", color: "#003087" },
  { id: "jaiz", name: "Jaiz Bank", code: "301", logo: "JAZ", color: "#006A40" },
  { id: "moniepoint", name: "Moniepoint MFB", code: "50515", logo: "MNP", color: "#00B4D8" },
];

export const USER_BVN_DATA = {
  bvn: "22345678901",
  fullName: "Adebayo Oluwaseun Victor",
  maskedName: "Adebayo O**** V*****",
  dob: "199X-XX-XX",
  maskedDob: "199X-XX-XX",
  phone: "0803XXXX45",
  gender: "Male",
  nin: "1234XXXX90",
  email: "a*****@gmail.com",
  registeredBanks: ["gtb", "zenith", "access", "kuda", "moniepoint"],
};

export const PURCHASE_ITEMS = [
  { name: "Premium Wireless Headphones", qty: 1, unitPrice: 85000, sku: "ELEC-HP-001" },
  { name: "Organic Green Tea (500g)", qty: 3, unitPrice: 4500, sku: "GRO-TEA-003" },
  { name: "USB-C Fast Charger 65W", qty: 2, unitPrice: 12000, sku: "ELEC-CHG-065" },
  { name: "Leather Notebook A5", qty: 1, unitPrice: 8500, sku: "STN-NB-A5" },
];
