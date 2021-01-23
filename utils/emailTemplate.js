const emailTemplate = (role, projectName, userEmail) => {
  return `
    <html>
      <head>
    <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto%26display=swap" rel="stylesheet">
        <title></title>
      </head>
      <body>
      <style>
    body {
        padding:0;
        margin:0;
        box-sizing:border-box;
      font-family: 'Roboto', sans-serif;
    }
  </style>
          <div class="logo" style="text-align:center;padding:1rem">
          <img
          style="width:100;"
          src="http://cdn.mcauto-images-production.sendgrid.net/9d8dd301142050ce/9036d68f-7524-4a4f-ab43-cf56e4d05846/806x177.png"/>
          </div>
          <div style="display:flex;justify-content:center;padding:2rem;align-items:center;text-alignLcenter;" class="message-content" >
              <div>
              <img style="width:80px;border-radius:50%;" src="http://cdn.mcauto-images-production.sendgrid.net/9d8dd301142050ce/e11c7458-1b1e-41d1-bf92-f6cf8b47066c/579x579.png"/>
              </div>
              <div style=" display:flex;flex-direction:column;justify-content:center;padding-left:0.7rem" >
              <h3 style="margin-top: 0;
      margin-bottom: 0.2rem;font-weight:bold;" >${userEmail} has invited you to ${projectName} as a(an) ${role}</h3>
              <p style="margin-top: 0;
      margin-bottom: 0;" >BugTrackr is a issue and bug tracker tool that allows developer and tester collaboration</p>
              </div>
          </div>
        <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
          <div class="Unsubscribe--addressLine">
            <p class="Unsubscribe--senderName"
              style="font-size:12px;line-height:20px"
            >
              {{Sender_Name}}
            </p>
            <p style="font-size:12px;line-height:20px">
              <span class="Unsubscribe--senderAddress">{{Sender_Address}}</span>, <span class="Unsubscribe--senderCity">{{Sender_City}}</span>, <span class="Unsubscribe--senderState">{{Sender_State}}</span> <span class="Unsubscribe--senderZip">{{Sender_Zip}}</span>
            </p>
          </div>
          <p style="font-size:12px; line-height:20px;">
            <a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="font-family:sans-serif;text-decoration:none;">
              Unsubscribe
            </a>
            -
            <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:sans-serif;text-decoration:none;">
              Unsubscribe Preferences
            </a>
          </p>
        </div>
      </body>
    </html>
  `;
};

module.exports = emailTemplate;
