const sgMail = require('@sendgrid/mail');

// Ganti dengan API key Anda
sgMail.setApiKey('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');

const sendEmail = async () => {
  const msg = {
    to: 'nabilpasha230606@gmail.com', // Ganti dengan alamat email tujuan
    from: 'no-reply@sendgrid.net', // Alamat email pengirim SendGrid
    subject: 'Test Email from SendGrid',
    text: 'This is a test email sent from SendGrid without email verification.',
    html: '<strong>This is a test email sent from SendGrid without email verification.</strong>',
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

sendEmail();
