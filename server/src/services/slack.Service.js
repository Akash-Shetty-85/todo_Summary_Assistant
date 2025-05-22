// src/services/slackService.js
import axios from 'axios';

const sendToSlack = async (message) => {
    try {
        const response = await axios.post(process.env.SLACK_WEBHOOK_URL, {
            text: `📋 Todo Summary:\n\n${message}`,
        });
        return response.data;
    } catch (error) {
        throw new Error('Slack message failed: ' + error.message);
    }
};

export default { sendToSlack };
