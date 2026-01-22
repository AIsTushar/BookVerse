export const otpEmailTemplate = (
  name: string,
  otp: number,
  companyName: string,
): string => {
  return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background-color: #ffffff; border: 1px solid #e0e0e0;">
    <div style="text-align: center; margin-bottom: 25px;"></div>
    <h2 style="color: #2c3e50; margin-bottom: 10px; text-align: center;">🔐 One-Time Password (OTP)</h2>
    <p style="font-size: 16px; color: #555;">Hello <strong>${name}</strong>,</p>
    <p style="font-size: 16px; color: #555;">Your one-time password (OTP) for verification is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #2c3e50; padding: 15px 30px; border: 2px dashed #3498db; border-radius: 10px; background-color: #ecf5fc; letter-spacing: 3px;">
        ${otp}
      </span>
    </div>
    <p style="font-size: 16px; color: #555;">Please enter this code within <strong>5 minutes</strong> to complete your verification.</p>
    <p style="font-size: 15px; color: #888; font-style: italic;">If you didn’t request this code, you can safely ignore this message.</p>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
    <p style="font-size: 16px; color: #555;">Best regards,</p>
    <p style="font-size: 16px; color: #3498db; font-weight: bold;">${companyName} Team</p>
    <p style="font-size: 13px; color: #999; margin-top: 40px; text-align: center; line-height: 1.5;">
      This is an automated message from <strong>${companyName}</strong>. Please do not reply to this email.
    </p>
  </div>
  `;
};
