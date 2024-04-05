export function generateOTP() {
  const otp = Math.floor(Math.random() * 90000000) + 10000000;
  return otp.toString();
}
