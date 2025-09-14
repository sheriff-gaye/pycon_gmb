
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const listContacts = () => {

    const list = resend.contacts.list({
        audienceId: '5e0c0ed0-e80b-4aed-b929-7cf5f0b9e20b',
    });

    return list

}


export const countContacts = async () => {
    const contacts = await resend.contacts.list({
        audienceId: '5e0c0ed0-e80b-4aed-b929-7cf5f0b9e20b',
    });
    
    return contacts.data?.data.length || 0;
}


