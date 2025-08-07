export const getWelcomeEmailTemplate = (name, email) => {
    const currentYear = new Date().getFullYear();
    const joinDate = new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to MERN Authentication System</title>
    <style>
        /* Reset and base styles for email compatibility */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
        }
        
        /* Main container with gradient background */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        /* Header section with logo and title */
        .header {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        
        .header h1 {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .shield-icon {
            font-size: 48px;
            margin-bottom: 15px;
            display: block;
        }
        
        /* Main content area */
        .content {
            background: white;
            padding: 40px 30px;
        }
        
        .welcome-message {
            text-align: center;
            margin-bottom: 35px;
        }
        
        .welcome-message h2 {
            color: #2d3748;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .welcome-message p {
            color: #4a5568;
            font-size: 16px;
        }
        
        /* Account details card */
        .account-details {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            border-left: 4px solid #667eea;
        }
        
        .account-details h3 {
            color: #2d3748;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 600;
            color: #4a5568;
        }
        
        .detail-value {
            color: #2d3748;
            font-weight: 500;
        }
        
        .status-active {
            color: #38a169;
            font-weight: 600;
        }
        
        .security-badge {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        

        

        
        /* Footer */
        .footer {
            background: #2d3748;
            color: #a0aec0;
            padding: 30px;
            text-align: center;
        }
        
        .footer p {
            margin-bottom: 10px;
        }
        
        .footer .brand {
            color: #667eea;
            font-weight: 600;
        }
        
        /* Mobile responsiveness */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header, .content, .footer {
                padding: 25px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .welcome-message h2 {
                font-size: 20px;
            }
            
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Section -->
        <div class="header">
            <span class="shield-icon">🛡️</span>
            <h1>MERN AUTHENTICATION SYSTEM</h1>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <!-- Welcome Message -->
            <div class="welcome-message">
                <h2>Welcome ${name}! 🎉</h2>
                <p>Your account has been successfully created and is now active. Get ready to experience secure, modern authentication!</p>
            </div>
            
            <!-- Account Details Card -->
            <div class="account-details">
                <h3>📋 Account Details</h3>
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Join Date:</span>
                    <span class="detail-value">${joinDate}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value status-active">Active ✅</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Security:</span>
                    <span class="security-badge">🔒 JWT Protected</span>
                </div>
            </div>
            

            

        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>Built with ❤️ by <span class="brand">Vimal Bhoutekar</span></p>
            <p>© ${currentYear} MERN Authentication System. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `.trim();
};

export const getVerificationEmailTemplate = (otp) => {
    const currentYear = new Date().getFullYear();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Account - MERN Authentication</title>
    <style>
        /* Reset and base styles for email compatibility */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
        }
        
        /* Main container with gradient background */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        /* Header section with logo and title */
        .header {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 40px 30px;
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        
        .header h1 {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .shield-icon {
            font-size: 48px;
            margin-bottom: 15px;
            display: block;
        }
        
        /* Main content area */
        .content {
            background: white;
            padding: 40px 30px;
        }
        
        .verification-message {
            text-align: center;
            margin-bottom: 35px;
        }
        
        .verification-message h2 {
            color: #2d3748;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        
        .verification-message p {
            color: #4a5568;
            font-size: 16px;
        }
        
        /* OTP Display Card */
        .otp-container {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            text-align: center;
            border: 2px solid #e2e8f0;
        }
        
        .otp-label {
            color: #4a5568;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
        }
        
        .otp-code {
            font-size: 36px;
            font-weight: 700;
            color: #2d3748;
            font-family: 'Courier New', monospace;
            letter-spacing: 8px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            border: 2px dashed #667eea;
            margin-bottom: 15px;
            display: inline-block;
            min-width: 200px;
        }
        
        .otp-validity {
            color: #e53e3e;
            font-size: 14px;
            font-weight: 600;
        }
        
        /* Security notice */
        .security-notice {
            background: #fff5f5;
            border: 1px solid #fed7d7;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 25px;
        }
        
        .security-notice h3 {
            color: #c53030;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        
        .security-notice p {
            color: #742a2a;
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* Footer */
        .footer {
            background: #2d3748;
            color: #a0aec0;
            padding: 30px;
            text-align: center;
        }
        
        .footer p {
            margin-bottom: 10px;
        }
        
        .footer .brand {
            color: #667eea;
            font-weight: 600;
        }
        
        /* Mobile responsiveness */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 15px;
            }
            
            .header, .content, .footer {
                padding: 25px 20px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .verification-message h2 {
                font-size: 20px;
            }
            
            .otp-code {
                font-size: 28px;
                letter-spacing: 4px;
                min-width: auto;
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Section -->
        <div class="header">
            <span class="shield-icon">🔐</span>
            <h1>ACCOUNT VERIFICATION</h1>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <!-- Verification Message -->
            <div class="verification-message">
                <h2>Verify Your Account 🔑</h2>
                <p>Please use the verification code below to complete your account setup. This code is required to activate your account securely.</p>
            </div>
            
            <!-- OTP Display -->
            <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
                <div class="otp-validity">⏰ Valid for 10 minutes only</div>
            </div>
            
            <!-- Security Notice -->
            <div class="security-notice">
                <h3>🛡️ Security Notice</h3>
                <p>This verification code is confidential and should never be shared with anyone. Our team will never ask you for this code via phone, email, or any other communication method.</p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p>Built with ❤️ by <span class="brand">Vimal Bhoutekar</span></p>
            <p>© ${currentYear} MERN Authentication System. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `.trim();
};

