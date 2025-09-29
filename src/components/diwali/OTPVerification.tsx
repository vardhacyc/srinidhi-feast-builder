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

  return (
    <div className="diwali-glass-card rounded-3xl p-6 md:p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-diwali-gold to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold diwali-text-gradient mb-2">
          OTP Verification
        </h2>
        <p className="text-diwali-text text-sm">
          We've sent a 6-digit code to
        </p>
        <p className="font-semibold text-diwali-dark">
          {maskedEmail}
        </p>
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-sm text-diwali-gold hover:text-amber-600 mt-2"
        >
          ← Change Email
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="otp" className="text-diwali-dark font-medium">
            Enter OTP *
          </Label>
          <Input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => handleOTPChange(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="mt-2 text-center text-2xl font-mono tracking-widest diwali-glass border-diwali-gold/30 focus:border-diwali-gold"
            maxLength={6}
            disabled={isVerifying}
            autoComplete="one-time-code"
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={otp.length !== 6 || isVerifying}
          className="w-full bg-gradient-to-r from-diwali-gold to-amber-500 hover:from-amber-500 hover:to-diwali-gold text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
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
            <p className="text-sm text-diwali-subtle">
              Resend OTP in {formatTime(timeLeft)}
            </p>
          ) : (
            <Button
              type="button"
              variant="ghost"
              onClick={handleResend}
              disabled={isResending}
              className="text-diwali-gold hover:text-amber-600 hover:bg-diwali-gold/10"
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

      <div className="mt-6 p-4 diwali-glass-card rounded-xl border border-blue-400/30">
        <p className="text-xs text-diwali-dark leading-relaxed">
          🔒 <strong>Security Note:</strong> This OTP is valid for 5 minutes. 
          Don't share it with anyone. Our team will never ask for your OTP.
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;