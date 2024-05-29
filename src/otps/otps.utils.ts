import OTP from './otps.credentials.js';

const SEND_URL = 'https://1vl651.api.infobip.com/2fa/2/pin';
const getVerifyUrl = (pinId) =>
  `https://1vl651.api.infobip.com/2fa/2/pin/${pinId}/verify`;

export const sendOtp = async ({ phone }) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `App ${OTP.API_KEY}`);
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  const raw = JSON.stringify({
    applicationId: OTP.APP_ID,
    messageId: OTP.MESSAGE_ID,
    from: 'ServiceSMS',
    to: phone,
  });

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(SEND_URL, options);

  return response;
};

export const verifyOtp = async ({ pin, pinId }) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `App ${OTP.API_KEY}`);
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');

  const raw = JSON.stringify({
    pin,
  });

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(getVerifyUrl(pinId), options);

  return response;
};
