import transporter from '../utils/transporter.js';
// Controller to send OTP email
const sendOtpEmail = (req, res) => {
    const { email, otp } = req.body;

    const mailOptions = {
        from: {
            name: "GAIL-INDIA-LIMITED",
            address: "knoxdsouza475@gmail.com",
        },
        to: email,
        subject: "OTP from GAIL-INDIA-LIMITED for verification",
        text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).send("Error sending email.");
        }
        console.log("Email sent successfully!");
        res.status(200).send("OTP sent successfully!");
    });
};

module.exports = { sendOtpEmail };
