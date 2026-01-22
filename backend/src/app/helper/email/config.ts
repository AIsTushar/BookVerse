import nodemailer from "nodemailer";

const adminEmail = process.env.SMTP_USER;
const adminPass = process.env.SMTP_PASS;
const companyName = process.env.COMPANY_NAME || "";

if (!adminEmail || !adminPass) {
  throw new Error("Missing mail user or mail pass in environment variables.");
}

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const COMPANY_NAME = companyName;
export const ADMIN_EMAIL = adminEmail;
