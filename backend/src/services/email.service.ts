import { Resend } from 'resend';
import logger from '../logger/logger';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = ({ from, to, subject, html }: { from: string, to: string, subject: string, html: string }) => {
    try {
        resend.emails.send({
            from,
            to,
            subject,
            html,
        });
    } catch (error) {
        logger.error(error);
    }
}
export default sendEmail;