import { Resend } from 'resend';
const resend = new Resend('re_UhFGgomM_4CorJBcFhxdgqaG5orJYmAyd');
export function sendEmail(data: {
  to: string;
  subject: string;
  text: string;
  strongText: string;
}) {
  const { to, subject, strongText, text } = data;
  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: to || 'balajiab09@gmail.com',
    subject: subject || 'Hello World',
    html: `<p>${text} <br/>
    <strong>${strongText}</strong>!</p>`,
  });
}
