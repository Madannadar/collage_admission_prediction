import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import axios from "axios";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "../components/ui/card";
import {
    Mail,
    Phone,
    MapPin,
    Building,
    User,
    Fingerprint,
    Check,
    Loader2,
    AlertCircle,
    ShieldCheck,
    FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../components/ui/alert";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerServices } from "../zServices/authServices"; // Adjust the import path as necessary

const RegistrationForm = () => {
    const navigate = useNavigate();

    const [is_email_verified, set_is_email_verified] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        collegeName: "",
        email: "",
        username: "",
        telephone: "",
        address: "",
        is_email_verified: is_email_verified, // Include is_email_verified in formData
    });

    // OTP related states
    const [otp, setOtp] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [csv_file, setCsvFile] = useState(null);

    // Feedback states
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when email is changed
        if (name === "email") {
            setError("");
            setOtpSent(false);
            setOtpVerified(false);
        }
    };

    const isEmailValid =
        formData.email.includes("@") && formData.email.includes(".");

    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
    };

    const sendOtpToEmail = async () => {
        setError("");
        setSuccessMessage("");
        setOtpSending(true);

        try {
            const generatedOtp = generateOTP();
            localStorage.setItem("otp", generatedOtp);

            const response = await axios.post(
                "http://localhost:8001/api/v1/otp/send-otp",
                {
                    email: formData.email,
                    otp: generatedOtp,
                }
            );

            if (response.data) {
                setShowOtpInput(true);
                setOtpSent(true);
                setSuccessMessage(
                    "OTP sent successfully! Please check your email."
                );
            }
        } catch (error) {
            console.error("Error:", error.message || error);
            setError("Failed to send OTP. Please try again.");
        } finally {
            setOtpSending(false);
        }
    };

    const verifyOtp = () => {
        setError("");
        setSuccessMessage("");

        const storedOtp = localStorage.getItem("otp");

        if (otp === storedOtp) {
            setOtpVerified(true);
            setSuccessMessage("OTP verified successfully!");
            localStorage.removeItem("otp");
            set_is_email_verified(true); // Update is_email_verified state
            setFormData((prev) => ({
                ...prev,
                is_email_verified: true, // Update is_email_verified in formData
            }));
        } else {
            setError("Incorrect OTP. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otpVerified) {
            setError("Please verify your email with OTP before registering.");
            return;
        }

        if (!csv_file) {
            setError("Please upload a CSV file.");
            return;
        }

        try {
            // Create FormData object
            const formDataToSend = new FormData();
            formDataToSend.append("collegeName", formData.collegeName);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("username", formData.username);
            formDataToSend.append("telephone", formData.telephone);
            formDataToSend.append("address", formData.address);
            formDataToSend.append("is_email_verified", is_email_verified);
            formDataToSend.append("csv_file", csv_file);  // Append the CSV file

            const response = await registerServices(formDataToSend);

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                toast.success("Registration successful!");
                navigate("/DepartmentForm");
            }
        } catch (error) {
            toast.error("Registration failed. Please try again.");
            setError("Registration failed. Please try again.");
        }
    };

    const downloadSampleCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,Year,Total Applications,Average CGPA,Marketing Spend,Placement Rate,Program,Total Intake,Total Admissions\n";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "sample.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4 z-50">
            <ToastContainer />
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-[var(--primary-color)]">
                        Register
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
                        <Alert
                            variant="success"
                            className="mb-4 bg-green-50 text-green-800 border-green-200"
                        >
                            <Check className="h-4 w-4" />
                            <AlertDescription>
                                {successMessage}
                            </AlertDescription>
                        </Alert>
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
                                    onClick={sendOtpToEmail}
                                    disabled={
                                        !isEmailValid ||
                                        otpSending ||
                                        otpVerified
                                    }
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
                                        disabled={
                                            otp.length !== 6 || otpVerified
                                        }
                                        className={`
                      ${
                          otpVerified
                              ? "bg-green-700 hover:bg-green-800"
                              : "bg-gray-800 hover:bg-gray-900"
                      }
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
                                <label className="block text-sm font-medium">
                                    CSV File
                                </label>
                            </div>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => setCsvFile(e.target.files[0])}
                                className="w-full py-2"
                                required
                            />
                            <Button
                                type="button"
                                onClick={downloadSampleCSV}
                                className="w-full bg-[#253985] hover:bg-[hsl(228,56%,40%)] text-white mt-2"
                            >
                                Download Sample CSV
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            disabled={!otpVerified}
                            className={`w-full ${
                                otpVerified
                                    ? "bg-[#253985] hover:bg-[hsl(228,56%,40%)]"
                                    : "bg-[#33458b] cursor-not-allowed"
                            } text-white mt-6`}
                        >
                            Register
                        </Button>
                    </form>
                    <div className="text-center mt-4">
                        <p
                            onClick={() => navigate("/login")}
                            className="text-sm text-gray-600"
                        >
                            Already registered?{" "}
                            <a
                                href="/login"
                                className="text-[var(--primary-color)] hover:underline"
                            >
                                Login
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegistrationForm;