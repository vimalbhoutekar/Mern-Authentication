
export const getWelcomeEmailTemplate = (name, email) => {
    const currentYear = new Date().getFullYear();
    
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MERN Auth</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 20px 15px;">
                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden; max-width: 100%;">
                    
                    <!-- Header Section with Gradient -->
                    <tr>
                        <td align="center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; color: #ffffff;">
                            <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; text-align: center; line-height: 1.2;">Welcome to MERN Auth!</h1>
                            <p style="margin: 0; font-size: 18px; opacity: 0.9; text-align: center; line-height: 1.4;">Your amazing journey starts here</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #1a202c; font-size: 28px; font-weight: 600; text-align: center;">Hello ${name}!</h2>
                            <p style="margin: 0 0 25px 0; color: #4a5568; font-size: 16px; line-height: 1.6; text-align: center;">Thank you for joining our MERN Authentication System. Your account has been successfully created and is now active! We're thrilled to have you on board.</p>
                            
                            <!-- Account Details Section -->
                            <div style="background-color: #f7fafc; border-radius: 8px; padding: 25px; margin: 30px 0; border-left: 4px solid #667eea;">
                                <h3 style="margin: 0 0 20px 0; color: #2d3748; font-size: 20px; font-weight: 600;">Account Details</h3>
                                
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                                            <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.5;">
                                                <strong style="color: #2d3748; display: inline-block; width: 80px;">Name:</strong> 
                                                <span style="color: #667eea; font-weight: 500;">${name}</span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                                            <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.5;">
                                                <strong style="color: #2d3748; display: inline-block; width: 80px;">Email:</strong> 
                                                <span style="color: #667eea; font-weight: 500;">${email}</span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0;">
                                            <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.5;">
                                                <strong style="color: #2d3748; display: inline-block; width: 80px;">Status:</strong> 
                                                <span style="background-color: #48bb78; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 14px; font-weight: 600;">ACTIVE</span>
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Welcome Message -->
                            <div style="text-align: center; margin: 30px 0;">
                                <p style="margin: 0 0 20px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">Get ready to explore all the features we have prepared for you!</p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #2d3748; padding: 30px 20px; color: #a0aec0;">
                            <p style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.4;">
                                Crafted with ❤️ by <strong style="color: #667eea;">Vimal Bhoutekar</strong>
                            </p>
                            <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.4;">
                                © ${currentYear} MERN Authentication System. All rights reserved.
                            </p>
                            <p style="margin: 0; font-size: 12px; opacity: 0.8; line-height: 1.4;">
                                This email was sent because you created an account with us.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
};

export const getVerificationEmailTemplate = (otp) => {
    const currentYear = new Date().getFullYear();
    
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 20px 15px;">
                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden; max-width: 100%;">
                    
                    <!-- Header Section with Gradient -->
                    <tr>
                        <td align="center" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 20px; color: #ffffff;">
                            <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; text-align: center; line-height: 1.2;">Account Verification</h1>
                            <p style="margin: 0; font-size: 18px; opacity: 0.9; text-align: center; line-height: 1.4;">Secure your account with OTP verification</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td align="center" style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #1a202c; font-size: 28px; font-weight: 600; text-align: center;">Verify Your Email Address</h2>
                            <p style="margin: 0 0 35px 0; color: #4a5568; font-size: 16px; line-height: 1.6; text-align: center;">Please use the verification code below to complete your account setup and unlock all features.</p>
                            
                            <!-- OTP Container with Enhanced Design -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);">
                                <tr>
                                    <td align="center" style="padding: 30px 40px; color: #ffffff;">
                                        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
                                        <h1 style="margin: 10px 0; font-size: 42px; font-weight: 700; letter-spacing: 8px; text-align: center; font-family: 'Courier New', monospace; background-color: rgba(255, 255, 255, 0.1); padding: 15px 25px; border-radius: 8px; border: 2px dashed rgba(255, 255, 255, 0.3);">${otp}</h1>
                                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8; font-weight: 500;">⏰ Valid for 10 minutes only</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Security Notice -->
                            <div style="background-color: #fef5e7; border: 1px solid #f6d55c; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: left;">
                                <h4 style="margin: 0 0 10px 0; color: #b45309; font-size: 16px; font-weight: 600;">🔒 Security Notice</h4>
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                    Never share this code with anyone. Our team will never ask for your verification code via phone, email, or any other method.
                                </p>
                            </div>
                            
                            <!-- Additional Instructions -->
                            <div style="text-align: center; margin: 25px 0;">
                                <p style="margin: 0; color: #4a5568; font-size: 15px; line-height: 1.5;">
                                    If you didn't request this verification, please ignore this email or contact our support team.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #2d3748; padding: 30px 20px; color: #a0aec0;">
                            <p style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.4;">
                                Built with ❤️ by <strong style="color: #f093fb;">Vimal Bhoutekar</strong>
                            </p>
                            <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.4;">
                                © ${currentYear} MERN Authentication System. All rights reserved.
                            </p>
                            <p style="margin: 0; font-size: 12px; opacity: 0.8; line-height: 1.4;">
                                This is an automated security email. Please do not reply.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}; 

export const getPasswordResetEmailTemplate = (otp) => {
    const currentYear = new Date().getFullYear();
    
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 20px 15px;">
                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden; max-width: 100%;">
                    
                    <!-- Header Section with Gradient -->
                    <tr>
                        <td align="center" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 40px 20px; color: #ffffff;">
                            <h1 style="margin: 0 0 10px 0; font-size: 32px; font-weight: 700; text-align: center; line-height: 1.2;">🔒 Password Reset</h1>
                            <p style="margin: 0; font-size: 18px; opacity: 0.9; text-align: center; line-height: 1.4;">Secure your account with a new password</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td align="center" style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #1a202c; font-size: 28px; font-weight: 600; text-align: center;">Reset Your Password</h2>
                            <p style="margin: 0 0 35px 0; color: #4a5568; font-size: 16px; line-height: 1.6; text-align: center;">We received a request to reset your password. Please use the verification code below to create a new password.</p>
                            
                            <!-- OTP Container with Enhanced Design -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 30px auto; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); border-radius: 12px; box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);">
                                <tr>
                                    <td align="center" style="padding: 30px 40px; color: #ffffff;">
                                        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 500; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;">Password Reset Code</p>
                                        <h1 style="margin: 10px 0; font-size: 42px; font-weight: 700; letter-spacing: 8px; text-align: center; font-family: 'Courier New', monospace; background-color: rgba(255, 255, 255, 0.1); padding: 15px 25px; border-radius: 8px; border: 2px dashed rgba(255, 255, 255, 0.3);">${otp}</h1>
                                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8; font-weight: 500;">⏰ Expires in 10 minutes</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Security Notice -->
                            <div style="background-color: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: left;">
                                <h4 style="margin: 0 0 10px 0; color: #dc2626; font-size: 16px; font-weight: 600;">🚨 Security Alert</h4>
                                <p style="margin: 0 0 10px 0; color: #7f1d1d; font-size: 14px; line-height: 1.5;">
                                    If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
                                </p>
                                <p style="margin: 0; color: #7f1d1d; font-size: 14px; line-height: 1.5;">
                                    <strong>Never share this code with anyone!</strong> Our team will never ask for this code.
                                </p>
                            </div>
                            
                            <!-- Additional Instructions -->
                            <div style="text-align: center; margin: 25px 0;">
                                <p style="margin: 0; color: #4a5568; font-size: 15px; line-height: 1.5;">
                                    After entering the code, you'll be able to create a new secure password for your account.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="background-color: #2d3748; padding: 30px 20px; color: #a0aec0;">
                            <p style="margin: 0 0 10px 0; font-size: 16px; line-height: 1.4;">
                                Built with ❤️ by <strong style="color: #ff6b6b;">Vimal Bhoutekar</strong>
                            </p>
                            <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.4;">
                                © ${currentYear} MERN Authentication System. All rights reserved.
                            </p>
                            <p style="margin: 0; font-size: 12px; opacity: 0.8; line-height: 1.4;">
                                This is an automated security email. Please do not reply.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
};