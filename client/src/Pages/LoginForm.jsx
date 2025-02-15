import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '../components/ui/input-otp';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Mail, Phone, MapPin, Building, Key, User, Fingerprint, Check, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription } from "../components/ui/alert";
import { loginService } from '../zServices/authServices';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster

const LoginForm = () => {
  const [otp, setOtp] = useState('');
  const [is_email_verified, set_is_email_verified] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    is_email_verified: is_email_verified,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();  // Generates a 6-digit OTP
  };

  const sendOtpToEmail = async () => {
    setError('');
    setSuccessMessage('');
    setOtpSending(true);

    try {
      const generatedOtp = generateOTP();
      localStorage.setItem("otp", generatedOtp);

      const response = await axios.post('http://localhost:8001/api/v1/otp/send-otp', {
        email: formData.email,
        otp: generatedOtp
      });

      if (response.data) {
        setShowOtpInput(true);
        setOtpSent(true);
        toast.success("OTP sent successfully! Please check your email.");
      }
    } catch (error) {
      console.error("Error:", error.message || error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setOtpSending(false);
    }
  };

  const verifyOtp = () => {
    setError('');
    setSuccessMessage('');

    const storedOtp = localStorage.getItem("otp");

    if (otp === storedOtp) {
      setOtpVerified(true);
      set_is_email_verified(true);
      toast.success("OTP verified successfully!");
      localStorage.removeItem("otp");
    } else {
      toast.error("Incorrect OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify your email with OTP before logging in.");
      return;
    }

    setIsLoggingIn(true);
    setError('');
    setSuccessMessage('');

    try {
      const payload = {
        email: formData.email,
        is_email_verified: is_email_verified,
      };
      console.log('yy',payload)
      const response = await loginService(payload);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data)); // Store user data in localStorage
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate('/'); // Navigate to the home route
        }, 2000); // Delay navigation to show success message
      }
    } catch (error) {
      console.error("Login error:", error.message || error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const isEmailValid = formData.email.includes('@') && formData.email.includes('.');

  // Check if user is already logged in (user data exists in localStorage)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate('/'); // Redirect to home if user is already logged in
    }
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 p-4">
      <Toaster /> {/* Add Toaster component to render toasts */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[var(--primary-color)]">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert variant="success" className="mb-4 bg-green-50 text-green-800 border-green-200">
              <Check className="h-4 w-4" />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
                <Button
                  type="button"
                  onClick={sendOtpToEmail}
                  disabled={!isEmailValid || otpSending || otpVerified}
                  className={`${
                    otpSent && !otpVerified
                      ? "bg-green-600 hover:bg-green-700"
                      : otpVerified
                      ? "bg-green-700 hover:bg-green-800"
                      : "bg-[#253985] hover:bg-[hsl(228,56%,40%)]"
                  } text-white`}
                >
                  {otpSending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : otpSent ? (
                    "Resend OTP"
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </div>
            </div>

            {showOtpInput && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-[var(--primary-color)]" />
                  <Input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  />
                  <Button
                    type="button"
                    onClick={verifyOtp}
                    disabled={otp.length !== 6 || otpVerified}
                    className={`
                      ${otpVerified ? "bg-green-700 hover:bg-green-800" : "bg-[#253985] hover:bg-[hsl(228,56%,40%)]"}
                      text-white
                    `}
                  >
                    {otpVerified ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Verified
                      </>
                    ) : (
                      "Verify"
                    )}
                  </Button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={!otpVerified || isLoggingIn}
              className={`w-full ${
                otpVerified
                  ? "bg-[#253985] hover:bg-[hsl(228,56%,40%)]"
                  : "bg-[#33458b] cursor-not-allowed"
              } text-white mt-6`}
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <div className="text-center mt-4">
            <p
              onClick={() => navigate('/register')}
              className="text-sm text-gray-600 cursor-pointer"
            >
              Don't have an account?{' '}
              <a href="/register" className="text-[var(--primary-color)] hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;