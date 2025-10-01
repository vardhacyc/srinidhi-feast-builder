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
    <div className="p-4 md:p-6 w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg p-2 border-2 border-amber-400">
          <img 
            src="/cateringLogo.png" 
            alt="Srinidhi Catering" 
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">
          OTP Verification
        </h2>
        <p className="text-gray-700 text-xs">
          Code sent to <span className="font-bold">{maskedEmail}</span>
        </p>
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-xs text-amber-700 hover:text-amber-900 mt-1 font-medium hover:bg-amber-100 h-7"
        >
          ← Change Email
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" style={{ pointerEvents: 'auto' }}>
        <div>
          <label htmlFor="otp-input" className="block text-gray-900 font-bold text-sm mb-1">
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
            className="otp-input-field w-full px-4 py-2 text-center text-xl font-mono bg-white border-2 border-amber-400 rounded-xl focus:border-amber-600 focus:outline-none text-gray-900"
            maxLength={6}
            autoComplete="off"
            autoFocus
            style={{
              pointerEvents: 'auto',
              userSelect: 'text',
              WebkitUserSelect: 'text',
              touchAction: 'manipulation'
            }}
          />
          {error && (
            <p className="text-red-500 text-xs mt-1 font-semibold">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={otp.length !== 6 || isVerifying}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 text-base rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          style={{ pointerEvents: 'auto' }}
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin inline" />
              Verifying...
            </>
          ) : (
            'Verify & Place Order'
          )}
        </button>

        <div className="text-center pt-2">
          {!canResend ? (
            <p className="text-xs text-gray-700 font-medium">
              Resend OTP in {formatTime(timeLeft)}
            </p>
          ) : (
            <Button
              type="button"
              variant="ghost"
              onClick={handleResend}
              disabled={isResending}
              className="text-amber-700 hover:text-amber-900 hover:bg-amber-100 font-medium text-sm h-8"
            >
              {isResending ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Resend OTP
                </>
              )}
            </Button>
          )}
        </div>
      </form>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-900 leading-relaxed">
          🔒 Valid for 5 minutes. Never share your OTP.
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;