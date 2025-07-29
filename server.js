const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dikshyakhadka524@gmail.com',
        pass: 'veosinqishbbhgbc' // Use App Password, NOT your Gmail password
    }
});

// Route to handle POST requests
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'dikshyakhadka524@gmail.com',
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: 'Failed to send email',
            });
        }
        res.json({
            success: true,
            message: 'Email sent successfully!',
        });
    });
});

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
