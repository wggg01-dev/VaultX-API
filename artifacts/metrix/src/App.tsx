import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { AuthorizeScreen } from "./pages/AuthorizeScreen";
import { PhoneScreen } from "./pages/PhoneScreen";
import { AuthenticatingScreen } from "./pages/AuthenticatingScreen";
import { PaymentModeScreen } from "./pages/PaymentModeScreen";
import { UserDetailsScreen } from "./pages/UserDetailsScreen";
import { SelectBankScreen } from "./pages/SelectBankScreen";
import { AmountScreen } from "./pages/AmountScreen";
import { BiometricConfirmScreen } from "./pages/BiometricConfirmScreen";
import { ProcessingScreen } from "./pages/ProcessingScreen";
import { ApprovedScreen } from "./pages/ApprovedScreen";
import { ReceiptScreen } from "./pages/ReceiptScreen";
import { ReceivePaymentsScreen } from "./pages/ReceivePaymentsScreen";
import type { Bank } from "./data/banks";

const queryClient = new QueryClient();

type Step =
  | "authorize"
  | "phone"
  | "authenticating"
  | "payment-mode"
  | "user-details"
  | "select-bank"
  | "amount"
  | "biometric"
  | "processing"
  | "approved"
  | "receipt"
  | "receive-payments";

function App() {
  const [step, setStep] = useState<Step>("authorize");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");

  const goTo = (s: Step) => setStep(s);

  const resetAll = () => {
    setStep("authorize");
    setSelectedBank(null);
    setAmount("");
    setNarration("");
  };

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeToggle />
        <div className="min-h-screen">
          {step === "authorize" && (
            <AuthorizeScreen onNext={() => goTo("phone")} />
          )}
          {step === "phone" && (
            <PhoneScreen
              onNext={() => goTo("authenticating")}
              onBack={() => goTo("authorize")}
            />
          )}
          {step === "authenticating" && (
            <AuthenticatingScreen onNext={() => goTo("payment-mode")} />
          )}
          {step === "payment-mode" && (
            <PaymentModeScreen
              onSend={() => goTo("user-details")}
              onReceive={() => goTo("receive-payments")}
            />
          )}
          {step === "user-details" && (
            <UserDetailsScreen
              onNext={() => goTo("select-bank")}
              onBack={() => goTo("payment-mode")}
            />
          )}
          {step === "select-bank" && (
            <SelectBankScreen
              onNext={(bank) => { setSelectedBank(bank); goTo("amount"); }}
              onBack={() => goTo("user-details")}
            />
          )}
          {step === "amount" && selectedBank && (
            <AmountScreen
              bank={selectedBank}
              onNext={(amt, nar) => { setAmount(amt); setNarration(nar); goTo("biometric"); }}
              onBack={() => goTo("select-bank")}
            />
          )}
          {step === "biometric" && selectedBank && (
            <BiometricConfirmScreen
              bank={selectedBank}
              amount={amount}
              narration={narration}
              onNext={() => goTo("processing")}
              onBack={() => goTo("amount")}
            />
          )}
          {step === "processing" && (
            <ProcessingScreen
              amount={amount}
              onNext={() => goTo("approved")}
            />
          )}
          {step === "approved" && selectedBank && (
            <ApprovedScreen
              bank={selectedBank}
              amount={amount}
              onNext={() => goTo("receipt")}
            />
          )}
          {step === "receipt" && selectedBank && (
            <ReceiptScreen
              bank={selectedBank}
              amount={amount}
              narration={narration}
              onDone={resetAll}
            />
          )}
          {step === "receive-payments" && (
            <ReceivePaymentsScreen
              onBack={() => goTo("payment-mode")}
              onDone={resetAll}
            />
          )}
        </div>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
