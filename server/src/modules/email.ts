import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'amantiya.com',
    port: 465,
    secure: true,
    auth: {
        user: 'info@amantiya.com',
        pass: process.env.EMAILPASS
    }
})

export async function sendEmail(fromName: string, to: string, subject: string, html: string) {
    try {
    await transporter.sendMail({
        from: `"${fromName}" <info@amantiya.com>`,
        to: to,
        subject: subject,
        html: html
    }); 
} catch(e) {console.log(e)}
    console.log('Email sent to ' + to)
    return
}