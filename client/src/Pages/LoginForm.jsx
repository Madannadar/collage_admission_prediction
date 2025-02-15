import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
}from '../components/ui/input-otp';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Mail, Phone, MapPin, Building, Key, User } from 'lucide-react';

const RegistrationForm = () => {
 
  const [otp, setOtp] = useState('');

  const [formData, setFormData] = useState({
    
    email: '',
    password: '',
   
  });

     const [error, setError] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);  // Generates a 6-digit OTP
};

  const sendOtpToEmail = async (email, otp) => {
    setShowOtpInput(true);
    try {
      localStorage.setItem("otp", otp);
      setShowOtpInput(true);
      console.log(email,otp);
      
        const response = await axios.post('http://localhost:8001/api/v1/otp/send-otp', { email, otp });
        console.log(response.data); // Handle success response
    } catch (error) {
        console.error("Error:", error.message || error); // Log the actual error message
    }
  };

  const verifyOtp = async (otp) => {
    const enteredOtp = otp;
    const storedOtp = localStorage.getItem("otp");

    if (enteredOtp === storedOtp) {
      console.log("OTP verified successfully!");
      
      localStorage.removeItem("otp");
      // navigate("/dashboard"); 
    } else {
      setError("Incorrect OTP. Please try again.");
    }
   };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const isEmailValid = formData.email.includes('@') && formData.email.includes('.');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[var(--primary-color)]">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                                  onClick={()=> sendOtpToEmail(formData.email, generateOTP())}
                                  className="bg-gray-800 hover:bg-gray-900 text-white"
                                >
                                  send otp
                                </Button>
                </div>
                
                <div className="flex items-center space-x-2">
     <Input
                       type="otp"
                       name="otp"
                       placeholder="otp"
                       value={otp}
                       onChange={(e) => setOtp(e.target.value)}
                       className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                       required
                       
                     /> 

                  <Button
                                  type="button"
                                  onClick={()=> verifyOtp(otp)}
                                  className="bg-gray-800 hover:bg-gray-900 text-white"
                                >
                                  Verify
                                </Button>
              </div>
            </div>

            

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="tel"
                  name="password"
                  placeholder="Password"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-6"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;