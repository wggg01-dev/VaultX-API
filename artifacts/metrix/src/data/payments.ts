export interface PendingPayment {
  id: string;
  senderName: string;
  senderPhone: string;
  senderBank: string;
  senderBankColor: string;
  amount: number;
  narration: string;
  timeAgo: string;
}

export const PENDING_PAYMENTS: PendingPayment[] = [
  {
    id: "pay_001",
    senderName: "Aisha Bello",
    senderPhone: "0803****19",
    senderBank: "GTBank",
    senderBankColor: "#F26522",
    amount: 15000,
    narration: "Payment for groceries",
    timeAgo: "2 mins ago",
  },
  {
    id: "pay_002",
    senderName: "Emeka Okonkwo",
    senderPhone: "0812****07",
    senderBank: "Access Bank",
    senderBankColor: "#F05022",
    amount: 8500,
    narration: "Service charge",
    timeAgo: "5 mins ago",
  },
  {
    id: "pay_003",
    senderName: "Fatima Hassan",
    senderPhone: "0701****33",
    senderBank: "First Bank",
    senderBankColor: "#00529B",
    amount: 25000,
    narration: "Debt repayment",
    timeAgo: "12 mins ago",
  },
  {
    id: "pay_004",
    senderName: "Tunde Adeleke",
    senderPhone: "0905****88",
    senderBank: "Zenith Bank",
    senderBankColor: "#005B8E",
    amount: 5000,
    narration: "Purchase of goods",
    timeAgo: "1 hour ago",
  },
];
