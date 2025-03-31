# Notifications Processor Lambda

Lambda function that processes image upload notifications and sends them to SNS subscribers.

## Prerequisites

- AWS SAM CLI installed
- AWS credentials configured
- Node.js ver 18.x

## Useful Commands

### Local Development

```bash
# Install dependencies
npm install

# Test the function locally with sample event
sam local invoke NotificationsProcessorFunction -e events/sqs-event.json

# Start local API for testing
sam local start-api
```

### Deployment

```bash
# Validate SAM template
sam validate

# Deploy with guided setup (first time)
sam deploy --guided

# Deploy with existing configuration
sam deploy

# Deploy to specific environment
sam deploy --parameter-overrides Environment=prod
```

### Monitoring and Logs

```bash
# View Lambda logs
sam logs -n NotificationsProcessorFunction --tail

# View stack events
aws cloudformation describe-stack-events --stack-name notifications-processor
```

### Testing

```bash
# Send test message to SQS
aws sqs send-message \
  --queue-url YOUR_QUEUE_URL \
  --message-body '{"type":"IMAGE_UPLOADED","metadata":{"originalName":"test.jpg","sizeBytes":1024,"extension":"jpg"}}'

# List SNS subscriptions
aws sns list-subscriptions-by-topic --topic-arn YOUR_TOPIC_ARN
```

## Tips

1. **Local Testing**:
   - Use `events/` directory for sample events
   - Set environment variables in `env.json`
   - Use `sam local generate-event sqs` to generate test events

2. **Debugging**:
   - Set `DEBUG=1` for verbose SAM CLI output
   - Check CloudWatch Logs for Lambda execution logs
   - Monitor SQS dead-letter queue for failed messages

3. **Production Deployment**:
   - Update memory/timeout in template.yaml as needed
   - Consider adjusting SQS batch size for performance
   - Set appropriate retention periods for queues

4. **Security**:
   - Review IAM permissions regularly
   - Rotate access keys if used
   - Monitor CloudTrail for API activity

## Resources

- [AWS SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [AWS SNS Documentation](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)