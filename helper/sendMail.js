const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (email, verificationToken) => {
  const msg = {
    to: email,
    from: "grynbest@gmail.com", // Use the email address or domain you verified above
    subject: "Thank you for the registration",
    text: `Please, confirm your email address http://localhost:3000/users/verify/${verificationToken}`,
    html: `Please, <a href="http://localhost:3000/users/verify/${verificationToken}">confirm</a> your email address`,
  };
  (async () => {
    try {
      await sgMail.send(msg);
      console.log("email has been sent");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
};

module.exports = { sendMail };
