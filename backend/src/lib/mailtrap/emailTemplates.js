export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #87876F, #525244); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #87876F;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>cakery19.ch</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
  <div style="background: linear-gradient(to right, #87876F, #525244); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 24px; font-weight: bold; color: #87876F;">✅ You're all set!</p>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For your security, we recommend the following:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication (2FA)</li>
      <li>Avoid reusing passwords across sites</li>
    </ul>
    <p>If you need help, contact us at <a href="mailto:Cakery19.ch@gmail.com">support@cakery19.ch</a>.</p>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br><strong>Cakery19.ch</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from <strong>no-reply@cakery19.ch</strong>, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Recovery - Cakery19.ch</title>
  <!--[if mso]>
  <style type="text/css">
    table, td {border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic; border: 0;}
    p, a, li, td, blockquote {mso-line-height-rule: exactly;}
  </style>
  <![endif]-->
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
  <!-- Preheader text (not visible but helps with preview) -->
  <div style="display: none; max-height: 0px; overflow: hidden;">
    Secure link to set a new password for your Cakery19 account - valid for 1 hour
  </div>
  
  <!-- Header with logo -->
  <div style="background: linear-gradient(to right, #87876F, #525244); padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
    <img src="https://res.cloudinary.com/dmhyq5ub5/image/upload/v1746209642/Cakery19/images/n4adspkwmqy6hpmdtkc4.png" alt="Cakery19 Logo" width="80" style="display: block; margin: 0 auto 10px;">
    <h1 style="color: white; margin: 0;">Account Recovery</h1>
  </div>
  
  <div style="background-color: #ffffff; padding: 25px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {userName},</p>
    <p>We received a request to help you regain access to your Cakery19.ch account. This request was made on {requestDate}.</p>
   
    <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p style="margin: 0;"><strong>Security Notice:</strong> If you did not request this account recovery, please ignore this email and ensure your account is secure.</p>
    </div>
    
    <p>To set a new password, click the button below:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #87876F; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Set New Password</a>
    </div>
    
    <p><strong>Important Security Information:</strong></p>
    <ul>
      <li>This link will expire in <strong>1 hour</strong></li>
      <li>Never share your password with anyone</li>
      <li>Our team will never ask for your password</li>
      <li>If you need help, contact us at <a href="mailto:Cakery19.ch@gmail.com" style="color: #87876F;">support@cakery19.ch</a></li>
    </ul>
    
    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
    
    <p>Best regards,<br><strong>The Cakery19 Team</strong></p>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from Cakery19.ch. Please do not reply.</p>
    <p>© 2024 Cakery19.ch. All rights reserved.</p>
    <p>
      <a href="https://cakery19.ch/contact" style="color: #87876F; text-decoration: none; margin: 0 10px;">Contact Us</a>
    </p>
  </div>
</body>
</html>
`;

export const ORDER_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #87876F, #525244); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Order Confirmation</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello {customerName},</p>
    <p>Thank you for your order! We're excited to prepare your delicious treats.</p>
    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 24px; font-weight: bold; color: #87876F;">Order #{orderNumber}</p>
    </div>
    <p><strong>Order Details:</strong></p>
    <ul>
      <li>Order Date: {orderDate}</li>
      <li>Total Amount: {totalAmount} CHF</li>
    </ul>
    
    <p><strong>Your Order Items:</strong></p>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #87876F; color: white;">
          <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Product</th>
          <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Quantity</th>
          <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Price</th>
          <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">Total</th>
        </tr>
      </thead>
      <tbody>
        {orderItems}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding: 12px; text-align: right; border: 1px solid #ddd; font-weight: bold;">Total:</td>
          <td style="padding: 12px; text-align: right; border: 1px solid #ddd; font-weight: bold;">{orderTotal} CHF</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 12px; text-align: right; border: 1px solid #ddd; font-weight: bold;">Pickup Date:</td>
          <td style="padding: 12px; text-align: right; border: 1px solid #ddd;">{pickupDate}</td>
        </tr>
      </tfoot>
    </table>

    <p>If you have any questions about your order, please contact us at <a href="mailto:Cakery19.ch@gmail.com">support@cakery19.ch</a>.</p>
    <p>Thank you for choosing Cakery19!</p>
    <p>Best regards,<br><strong>Cakery19.ch</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message from <strong>no-reply@cakery19.ch</strong>, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
