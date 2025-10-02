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
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(300);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value.slice(-1);
    setOtpDigits(newOtpDigits);
    
    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtpDigits = [...otpDigits];
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtpDigits[i] = pastedData[i];
    }
    setOtpDigits(newOtpDigits);
    
    if (pastedData.length > 0) {
      const lastIndex = Math.min(pastedData.length, 5);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = otpDigits.join('');
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
      setOtpDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
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
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-full flex items-center justify-center shadow-lg">
          <img 
            src="/cateringLogo.png" 
            alt="Sri Nidhi Catering" 
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
        OTP Verification
      </h2>

      {/* Email Info */}
      <p className="text-gray-600 text-center mb-2">
        Code sent to <span className="font-semibold text-gray-900">{maskedEmail}</span>
      </p>

      {/* Change Email Button */}
      <div className="text-center mb-8">
        <button
          type="button"
          onClick={onBack}
          className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
        >
          ← Change Email
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Input Label */}
        <div>
          <label className="block text-gray-900 font-bold text-base mb-4">
            Enter OTP *
          </label>

          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-2 mb-4">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-12 h-14 text-center text-2xl font-semibold border-3 border-orange-400 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none bg-white transition-all"
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-2 font-semibold text-center">{error}</p>
          )}
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={otpDigits.join('').length !== 6 || isVerifying}
          className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 hover:from-amber-500 hover:via-orange-500 hover:to-amber-500 text-white font-bold py-4 text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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

        {/* Resend Timer/Button */}
        <div className="text-center">
          {!canResend ? (
            <p className="text-gray-600 font-medium">
              Resend OTP in {formatTime(timeLeft)}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              {isResending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin inline" />
                  Resending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-1 inline" />
                  Resend OTP
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Security Message */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <p className="text-sm text-blue-900 font-medium text-center">
          🔒 Valid for 5 minutes. Never share your OTP. 🛡️
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;