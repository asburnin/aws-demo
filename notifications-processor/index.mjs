import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({ region: process.env.AWS_REGION });
//TODO: replace with env variables or aws secrets manager
const SNS_TOPIC_ARN =
  'arn:aws:sns:us-east-1:767397853732:alexProject-UploadsNotificationTopic';

export const handler = async (event) => {
  try {
    for (const record of event.Records) {
      const data = JSON.parse(record.body);

      if (data.type === 'IMAGE_UPLOADED') {
        const notificationText = createNotificationText(data.metadata);

        await snsClient.send(
          new PublishCommand({
            TopicArn: SNS_TOPIC_ARN,
            Message: notificationText,
            Subject: 'New Image Upload Notification',
          }),
        );
      }
    }
  } catch (error) {
    console.error('Error processing notifications:', error);
    throw error;
  }
};

function createNotificationText(metadata) {
  return `
    A new image has been uploaded!
    
    Details:
    - Name: ${metadata.originalName}
    - Size: ${metadata.sizeBytes} bytes
    - Extension: ${metadata.extension}
    
    You can download the image at: http://alexpproject-loadbalancer-1466592726.us-east-1.elb.amazonaws.com:3000/v1/aws/images/${metadata.originalName}
  `.trim();
}
