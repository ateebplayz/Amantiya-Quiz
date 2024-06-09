import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    host: 'mail.amantiya.com',
    port: 465,
    secure: true,
    auth: {
        user: 'burnout@amantiya.com',
        pass: process.env.EMAILPASS
    }
})

export async function sendEmail(fromName: string, to: string, subject: string, html: string) {
    try {
    await transporter.sendMail({
        from: `"${fromName}" <burnout@amantiya.com>`,
        to: to,
        subject: subject,
        html: html
    }); 
} catch(e) {console.log(e)}
    console.log('Email sent to ' + to)
    return
}