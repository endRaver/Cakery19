import Product from "../../models/product.model.js";
import User from "../../models/user.model.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  ORDER_SUCCESS_TEMPLATE
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
      category: 'Email Verification',
    })

    console.log('Verification email sent successfully', response);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "b30b642e-44ee-4500-bfd5-7ca9f5ab9928",
      template_variables: {
        "company_info_name": "Auth Company",
        "name": name
      }
    })

    console.log('Welcome email sent successfully', response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
      category: 'Password Reset',
    })

    console.log('Reset password email sent successfully', response);
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw new Error(`Failed to send reset password email: ${error.message}`);
  }
}

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }]

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset',
    });

    console.log('Password reset success email sent successfully', response);
  } catch (error) {
    console.error('Error sending password reset success email:', error);
    throw new Error(`Failed to send password reset success email: ${error.message}`);
  }
}

export const sendOrderSuccessEmail = async (email, order) => {
  const recipient = [{ email }]

  const customer = await User.findById(order.user);
  const products = await Promise.all(order.products.map(async (item) => {
    const productData = await Product.findById(item.product);
    return {
      ...productData._doc,
      quantity: item.quantity,
      variant: item.variant
    };
  }));

  const orderItemsHtml = products.map((item) => `
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${item.imageUrl[0]}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; padding-right: 12px;">
          <div>
            <div style="font-weight: bold;">${item.name} 
            <p>${item.variant.size}</p>
            </div>
          </div>
        </div>
      </td>
      <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right; border: 1px solid #ddd;">${item.variant.price.toFixed(2)} CHF</td>
      <td style="padding: 12px; text-align: right; border: 1px solid #ddd;">${(item.variant.price * item.quantity).toFixed(2)} CHF</td>
    </tr>
  `).join('');

  const emailContent = ORDER_SUCCESS_TEMPLATE
    .replace('{customerName}', customer.name)
    .replace('{orderNumber}', order.orderNumber)
    .replace('{orderDate}', new Date(order.createdAt).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' }))
    .replace('{orderItems}', orderItemsHtml)
    .replace('{orderTotal}', order.totalAmount.toFixed(2))
    .replace('{totalAmount}', order.totalAmount.toFixed(2))
    .replace('{pickupDate}', new Date(order.pickupDate)
      .toLocaleDateString('de-CH', { day: 'numeric', month: 'numeric', year: 'numeric' }) + ' at ' +
      new Date(order.pickupDate).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toUpperCase() + ' - ' +
      new Date(new Date(order.pickupDate).getTime() + 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).toUpperCase())

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Order Confirmation",
      html: emailContent
    });

  console.log('Order success email sent successfully', response);
  } catch (error) {
    console.error('Error sending order success email:', error);
    throw new Error(`Failed to send order success email: ${error.message}`);
  }
}
