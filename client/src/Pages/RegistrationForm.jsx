import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Mail, Phone, MapPin, Building, User, FileText, Key } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { registerServices } from '../zServices/authServices.js';

const RegistrationForm = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const navigate = useNavigate();

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);  // Generates a 6-digit OTP
  };

  const sendOtpToEmail = async (email, otp) => {
    try {
      localStorage.setItem("otp", otp);
      setShowOtpInput(true);
      console.log(email, otp);
      
      const response = await axios.post('http://localhost:8001/api/v1/otp/send-otp', { email, otp });
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error("Error:", error.message || error); // Log the actual error message
      setError("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async (otp) => {
    const enteredOtp = otp;
    const storedOtp = localStorage.getItem("otp");

    if (enteredOtp === storedOtp) {
      console.log("OTP verified successfully!");
      setIsEmailVerified(true);
      localStorage.removeItem("otp");
      setError(""); // Clear any previous errors
    } else {
      setError("Incorrect OTP. Please try again.");
      setIsEmailVerified(false);
    }
  };

  const [formData, setFormData] = useState({
    collegeName: '',
    email: '',
    username: '',
    telephone: '',
    address: '',
  });

  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      setError("Please verify your email first");
      return;
    }
    
    if (!csvFile) {
      setError("Please upload a CSV file");
      return;
    }
    
    try {
      // Create FormData object for file uploads
      const formDataObj = new FormData();
      formDataObj.append('collegeName', formData.collegeName);
      formDataObj.append('email', formData.email);
      formDataObj.append('username', formData.username);
      formDataObj.append('telephone', formData.telephone);
      formDataObj.append('address', formData.address);
      formDataObj.append('is_email_verified', isEmailVerified);
      formDataObj.append('csv_file', csvFile);
      
      // Call the register service
      const response = await registerServices(formDataObj);
      console.log('Registration successful:', response.data);
      navigate("/login"); // Redirect to login page on success
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const isEmailValid = formData.email.includes('@') && formData.email.includes('.');

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-[var(--primary-color)]">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          {isEmailVerified && (
            <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
              Email verified successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="text"
                  name="collegeName"
                  placeholder="College Name"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>
            </div>

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
                  onClick={() => sendOtpToEmail(formData.email, generateOTP())}
                  disabled={!isEmailValid}
                  className="bg-gray-800 hover:bg-gray-900 text-white"
                >
                  Send OTP
                </Button>
              </div>
            </div>
            
            {showOtpInput && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Key className="w-5 h-5 text-[var(--primary-color)]" />
                  <Input
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                    required
                  />
                  <Button
                    type="button"
                    onClick={() => verifyOtp(otp)}
                    className="bg-gray-800 hover:bg-gray-900 text-white"
                  >
                    Verify OTP
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="tel"
                  name="telephone"
                  placeholder="Telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[var(--primary-color)]" />
                <Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="flex-1 border-gray-300 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[var(--primary-color)]" />
                <label className="block text-sm font-medium">CSV File</label>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvFile(e.target.files[0])}
                className="w-full py-2"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white mt-6"
              disabled={!isEmailVerified}
            >
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;