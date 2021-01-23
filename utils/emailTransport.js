const sendGrid = require('@sendgrid/mail');
const emailTemplate = require('./emailTemplate');
sendGrid.setApiKey(process.env.SEND_GRID_API_KEY);

const sendEmail = async (recipient, projectName, role, userEmail) => {
  try {
    let messageObject = {
      to: recipient, // Change to your recipient
      from: process.env.SEND_GRID_VERIFIED_EMAIL, // Change to your verified sender
      subject: 'Invite to BugTrackr',
      text: `Invited to join ${projectName}`,
      html: emailTemplate(role, projectName, userEmail),
    };
    await sendGrid.send(messageObject);
    console.log('email sent');
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
