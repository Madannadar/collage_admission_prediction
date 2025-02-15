import nodemailer from "nodemailer";
// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "knoxdsouza475@gmail.com",  // replace with your email
        pass: "vqbhhuicahlxpccs", // replace with your password
    },
    tls: {
        rejectUnauthorized: false,  // Allow self-signed certificates
    },
});

export default transporter;
