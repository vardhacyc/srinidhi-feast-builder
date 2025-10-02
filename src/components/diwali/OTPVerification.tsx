import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
  isVerifying: boolean;
  onBack: () => void;
  error?: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerify,
  onResend,
  isVerifying,
  onBack,
  error
}) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6 && !isVerifying) {
      await onVerify(otp);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await onResend();
      setTimeLeft(300);
      setCanResend(false);
      setOtp('');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1****$3');

  return (
    <div className="p-6 md:p-8 w-full">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg p-3 border-3 border-amber-400">
          <img 
            src="/cateringLogo.png" 
            alt="Srinidhi Catering" 
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-700 text-sm mb-2">
          Code sent to <span className="font-bold">{maskedEmail}</span>
        </p>
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-sm text-amber-700 hover:text-amber-900 font-medium hover:bg-amber-50 h-8 px-3"
        >
          ← Change Email
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" style={{ pointerEvents: 'auto' }}>
        <div>
          <label htmlFor="otp-input" className="block text-gray-900 font-bold text-base mb-2">
            Enter OTP *
          </label>
          <input
            id="otp-input"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '').substring(0, 6);
              setOtp(value);
            }}
            placeholder="000000"
            className="otp-input-field w-full px-5 py-4 text-center text-2xl font-mono bg-white border-3 border-amber-400 rounded-2xl focus:border-amber-600 focus:ring-4 focus:ring-amber-200 focus:outline-none text-gray-900 shadow-sm"
            maxLength={6}
            autoComplete="off"
            autoFocus
            style={{
              pointerEvents: 'auto',
              userSelect: 'text',
              WebkitUserSelect: 'text',
              touchAction: 'manipulation',
              letterSpacing: '0.5em'
            }}
          />
          {error && (
            <p className="text-red-600 text-sm mt-2 font-semibold">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={otp.length !== 6 || isVerifying}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white font-bold py-4 text-lg rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          style={{ pointerEvents: 'auto' }}
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin inline" />
              Verifying...
            </>
          ) : (
            'Verify & Place Order'
          )}
        </button>

        <div className="text-center pt-3">
          {!canResend ? (
            <p className="text-sm text-gray-700 font-medium">
              Resend OTP in {formatTime(timeLeft)}
            </p>
          ) : (
            <Button
              type="button"
              variant="ghost"
              onClick={handleResend}
              disabled={isResending}
              className="text-amber-700 hover:text-amber-900 hover:bg-amber-50 font-medium text-sm h-10 px-4"
            >
              {isResending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend OTP
                </>
              )}
            </Button>
          )}
        </div>
      </form>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
        <p className="text-sm text-blue-900 leading-relaxed font-medium text-center">
          🔒 Valid for 5 minutes. Never share your OTP.
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;