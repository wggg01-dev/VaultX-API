import { CheckCircle, ArrowUpRight, ArrowDownLeft, ChevronRight } from "lucide-react";
import { USER_BVN_DATA } from "../data/banks";

interface PaymentModeScreenProps {
  onSend: () => void;
  onReceive: () => void;
}

export function PaymentModeScreen({ onSend, onReceive }: PaymentModeScreenProps) {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">Smartmonie</h1>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            </div>
            <span className="text-white/90 text-sm font-medium">{USER_BVN_DATA.firstName} {USER_BVN_DATA.lastName}</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">What would you like to do?</h2>
          <p className="text-blue-200/70 text-sm">Select a payment action to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={onSend}
            className="w-full glass-card rounded-3xl p-6 shadow-2xl text-left group hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-white/10 hover:border-primary/40"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 flex-shrink-0 group-hover:scale-110 transition-transform">
                <ArrowUpRight className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground mb-0.5">Send Payment</h3>
                <p className="text-sm text-muted-foreground leading-snug">
                  Transfer money to any bank account instantly
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </button>

          <button
            onClick={onReceive}
            className="w-full glass-card rounded-3xl p-6 shadow-2xl text-left group hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-white/10 hover:border-green-500/40"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-500/20 border-2 border-green-500/40 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-green-500/30 transition-all">
                <ArrowDownLeft className="w-7 h-7 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-foreground mb-0.5">Receive Payments</h3>
                <p className="text-sm text-muted-foreground leading-snug">
                  View and confirm pending payments sent to you
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-green-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </button>
        </div>

        <p className="text-center text-white/30 text-xs mt-8">
          Powered by Smartmonie · Secured with biometrics
        </p>
      </div>
    </div>
  );
}
