import { prisma } from "../../../utils/prisma";
import { transporter, ADMIN_EMAIL, COMPANY_NAME } from "./config";
import { otpEmailTemplate } from "./emailTemplates";

const mailuser = process.env.MAIL_USER;

export const sendEmailFn = async (email: string, otp: number) => {
  const findUser = await prisma.user.findUnique({
    where: { email },
  });

  const userName = findUser?.name || "User";

  const htmlContent = otpEmailTemplate(userName, otp, COMPANY_NAME);

  const mailOptions = {
    from: `"no-reply" <${mailuser}>`,
    to: email,
    subject: "Your OTP Code",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
    console.log("info: ", info);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email.");
  }
};
