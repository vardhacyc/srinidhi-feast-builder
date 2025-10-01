import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2, Shield, RefreshCw } from 'lucide-react';

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
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
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

  const handleOTPChange = (value: string) => {
    // Only allow numbers and limit to 6 digits
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setOtp(numericValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
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
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Simplified auto-focus for better reliability
  React.useEffect(() => {
    const focusInput = () => {
      const input = inputRef.current;
      if (input && !isVerifying) {
        try {
          input.focus();
          // For Safari and mobile browsers
          if (navigator.userAgent.includes('Safari') || 'ontouchstart' in window) {
            input.click();
          }
        } catch (e) {
          console.log('Focus failed:', e);
        }
      }
    };

    // Try focusing with short delays
    const timer1 = setTimeout(focusInput, 100);
    const timer2 = setTimeout(focusInput, 300);
    const timer3 = setTimeout(focusInput, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isVerifying]);

  // Simple click handler to ensure focus
  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const input = inputRef.current;
    if (input && !isVerifying) {
      input.focus();
    }
  };

  return (
    <div className="p-6 md:p-8 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          OTP Verification
        </h2>
        <p className="text-gray-700 text-sm font-medium">
          We've sent a 6-digit code to
        </p>
        <p className="font-bold text-gray-900">
          {maskedEmail}
        </p>
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-sm text-amber-700 hover:text-amber-900 mt-2 font-medium hover:bg-amber-100"
        >
          ← Change Email
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="otp" className="text-gray-900 font-bold text-sm">
            Enter OTP *
          </Label>
          <input
            ref={inputRef}
            id="otp-input"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={otp}
            onChange={(e) => handleOTPChange(e.target.value)}
            onClick={handleInputClick}
            onFocus={(e) => {
              e.target.setSelectionRange(e.target.value.length, e.target.value.length);
            }}
            placeholder="Enter 6-digit OTP"
            className="mt-2 w-full px-4 py-3 text-center text-lg font-mono tracking-wider bg-white border-2 border-amber-400 rounded-xl focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-gray-900 placeholder:text-amber-600 font-semibold transition-all duration-200"
            maxLength={6}
            disabled={isVerifying}
            autoComplete="one-time-code"
            autoFocus
            tabIndex={0}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            style={{ fontSize: '16px' }}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={otp.length !== 6 || isVerifying}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 shadow-lg"
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify & Place Order'
          )}
        </Button>

        <div className="text-center">
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
              className="text-amber-700 hover:text-amber-900 hover:bg-amber-100 font-medium"
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

      <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
        <p className="text-xs text-blue-900 font-medium leading-relaxed">
          🔒 <strong>Security Note:</strong> This OTP is valid for 5 minutes. 
          Don't share it with anyone. Our team will never ask for your OTP.
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;