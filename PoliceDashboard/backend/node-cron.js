import cron from "node-cron";
import Face from './models/faceModel.js';
import { SendmailTransport } from './sendMail.js';

const startCron = () => {
    cron.schedule('0 3 * * *', async () => {
        try {
            const allPrisoners = await Face.find();
            const now = new Date();
            const deadline = `${now.getHours()}:${now.getMinutes()}`;
            
            allPrisoners.forEach(async (prisoner) => {
                await SendmailTransport(
                    prisoner.email,
                    'Face Recognition Reminder',
                    'Please perform face recognition today.',
                    deadline
                );
            });
            
            console.log('Reminder emails sent for 9 AM');
        } catch (error) {
            console.error('Error in 9 AM cron job:', error);
        }
    });

    cron.schedule('0 18 * * *', async () => {
        try {
            const allPrisoners = await Face.find();
            const now = new Date();
            const deadline = `${now.getHours()}:${now.getMinutes()}`;
            
            allPrisoners.forEach(async (prisoner) => {
                await SendmailTransport(
                    prisoner.email,
                    'Face Recognition Reminder',
                    'Please perform face recognition today.',
                    deadline
                );
            });
            
            console.log('Reminder emails sent for 6 PM');
        } catch (error) {
            console.error('Error in 6 PM cron job:', error);
        }
    });


cron.schedule('0 4 * * *', async () => {
    try {
        const allPrisoners = await Face.find();
        const now = new Date();
        const today = now.toDateString();

        const nonRegisteredPrisoners = allPrisoners.filter(prisoner => {
            const lastRegistered = new Date(prisoner.lastRegistered).toDateString();
            return lastRegistered !== today;
        });

        nonRegisteredPrisoners.forEach(async (prisoner) => {
            await SendmailTransport(
                prisoner.email,
                'Face Recognition Reminder',
                'Please perform face recognition today.',
                `${now.getHours()}:${now.getMinutes()}`
            );
        });

        console.log('Reminder emails sent for non-registered prisoners.');
    } catch (error) {
        console.error('Error in 3 AM cron job:', error);
    }
});
};

export default startCron;
