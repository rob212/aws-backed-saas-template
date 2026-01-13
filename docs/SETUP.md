# Setup Guide

This guide provides detailed instructions for setting up the AWS Backed SaaS Template from scratch.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [AWS Account Setup](#aws-account-setup)
3. [Local Development Setup](#local-development-setup)
4. [Infrastructure Deployment](#infrastructure-deployment)
5. [Frontend Configuration](#frontend-configuration)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

Install the following tools before proceeding:

#### Node.js and npm

```bash
# Check if installed
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher

# Install from https://nodejs.org/ if needed
```

#### AWS CLI

```bash
# Check if installed
aws --version

# Install on macOS
brew install awscli

# Install on Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Install on Windows
# Download from https://aws.amazon.com/cli/
```

#### AWS CDK

```bash
# Install globally
npm install -g aws-cdk

# Verify installation
cdk --version  # Should be 2.x or higher
```

#### Git

```bash
# Check if installed
git --version

# Install from https://git-scm.com/ if needed
```

### AWS Account Requirements

- Active AWS account with administrative access
- Billing enabled (most services have free tiers)
- Programmatic access credentials (Access Key ID and Secret Access Key)

## AWS Account Setup

### 1. Create IAM User for Development

For security, don't use root credentials:

1. Log into AWS Console
2. Navigate to IAM > Users > Add User
3. Create user with:

   - Username: `cdk-developer` (or your preference)
   - Access type: Programmatic access
   - Permissions: `AdministratorAccess` (for development)

4. Save the Access Key ID and Secret Access Key

### 2. Configure AWS CLI

```bash
# Configure credentials
aws configure

# Enter your credentials when prompted:
AWS Access Key ID: YOUR_ACCESS_KEY
AWS Secret Access Key: YOUR_SECRET_KEY
Default region name: us-east-1  # or your preferred region
Default output format: json
```

Verify configuration:

```bash
# Check credentials
aws sts get-caller-identity

# Should return your account ID and user ARN
```

### 3. Set Up AWS Budgets (Recommended)

To avoid unexpected costs:

1. Go to AWS Billing Console > Budgets
2. Create a budget alert (e.g., $10/month)
3. Set email notifications

## Local Development Setup

### 1. Clone the Repository

```bash
# If using as template
git clone https://github.com/yourusername/your-project-name.git
cd your-project-name

# Or if you created from template on GitHub
# Just clone your new repository
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install

# This will install:
# - Next.js and React
# - AWS Amplify
# - shadcn/ui components
# - Tailwind CSS
# - TypeScript dependencies
```

Verify installation:

```bash
npm run dev
# Should start development server (may show errors about missing env vars - that's expected)
```

Press `Ctrl+C` to stop the server.

### 3. Install Infrastructure Dependencies

```bash
cd ../infrastructure
npm install

# This will install:
# - AWS CDK libraries
# - TypeScript
# - Required AWS service constructs
```

Verify installation:

```bash
npm run build
# Should compile TypeScript without errors
```

## Infrastructure Deployment

### 1. Bootstrap CDK (First Time Only)

This creates resources CDK needs in your AWS account:

```bash
cd infrastructure

# Bootstrap for your account/region
cdk bootstrap aws://ACCOUNT-NUMBER/REGION

# Example:
# cdk bootstrap aws://123456789012/us-east-1

# Or let CDK detect your account:
cdk bootstrap
```

You only need to do this once per AWS account/region combination.

### 2. Review Infrastructure

Before deploying, review what will be created:

```bash
# See all stacks
cdk list

# Review changes (should show everything as new)
cdk diff
```

### 3. Deploy Infrastructure Stacks

Deploy in order (some stacks depend on others):

```bash
# Deploy authentication stack (Cognito)
cdk deploy AuthStack

# Save the outputs! You'll need:
# - UserPoolId
# - UserPoolClientId
# - IdentityPoolId

# Deploy storage stack (DynamoDB)
cdk deploy StorageStack

# Deploy API stack (API Gateway + Lambda)
cdk deploy ApiStack

# Save the API Gateway URL from outputs
```

Or deploy all at once:

```bash
cdk deploy --all

# Confirm each stack when prompted
```

**Important:** Copy all the output values. They look like:

```
AuthStack.UserPoolId = us-east-1_AbCdEfGhI
AuthStack.UserPoolClientId = 1a2b3c4d5e6f7g8h9i0j
ApiStack.ApiUrl = https://abc123.execute-api.us-east-1.amazonaws.com/prod
```

### 4. Verify Stack Creation

```bash
# List all stacks
aws cloudformation list-stacks --query "StackSummaries[?StackStatus=='CREATE_COMPLETE'].StackName"

# Should show: AuthStack, StorageStack, ApiStack
```

## Frontend Configuration

### 1. Create Environment File

```bash
cd ../frontend

# Copy the example
cp .env.example .env.local

# Edit with your values
nano .env.local  # or use your preferred editor
```

Update with your CDK output values:

```env
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_YourPoolId
NEXT_PUBLIC_COGNITO_CLIENT_ID=YourClientId
NEXT_PUBLIC_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod
NEXT_PUBLIC_DEBUG=true
```

### 2. Test Local Development

```bash
npm run dev
```

Open http://localhost:3000

You should see:

- Landing page loads
- No environment variable errors
- Can navigate to signup/login pages

### 3. Test Authentication Flow

1. Click "Sign Up" and create an account
2. Check your email for verification code
3. Verify your email
4. Sign in with your credentials
5. You should be redirected to a protected page

## Verification

### Check AWS Resources

```bash
# Check Cognito User Pool
aws cognito-idp list-user-pools --max-results 10

# Check DynamoDB Tables
aws dynamodb list-tables

# Check API Gateway
aws apigateway get-rest-apis

# Check Lambda Functions
aws lambda list-functions
```

### Test API Endpoints

```bash
# This will fail without authentication (expected)
curl https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/profile

# Should return: {"message":"Unauthorized"}
```

### Check CloudWatch Logs

1. Go to CloudWatch Console
2. Navigate to Log Groups
3. You should see logs for your Lambda functions

## Troubleshooting

### CDK Bootstrap Errors

**Error:** "Unable to resolve AWS account to use"

```bash
# Solution: Ensure AWS CLI is configured
aws configure
aws sts get-caller-identity
```

**Error:** "Stack already exists"

```bash
# Solution: Bootstrap was already done
# Just proceed with deployment
```

### Deployment Errors

**Error:** "User: ... is not authorized to perform: ..."

```bash
# Solution: Your IAM user needs more permissions
# Attach AdministratorAccess policy (for development)
```

**Error:** "Resource ... already exists"

```bash
# Solution: Clean up and redeploy
cdk destroy --all
cdk deploy --all
```

### Frontend Errors

**Error:** "Cannot find module 'aws-amplify'"

```bash
# Solution: Install dependencies
cd frontend
npm install
```

**Error:** Environment variables are undefined

```bash
# Solution: Check .env.local file exists and has correct values
cat .env.local
```

**Error:** Cognito authentication fails

```bash
# Solution: Verify User Pool ID and Client ID are correct
# Check AWS Console > Cognito > User Pools
```

### Common Issues

**Issue:** API returns 403 Forbidden

- **Cause:** Cognito authorizer not properly configured
- **Solution:** Redeploy ApiStack

**Issue:** Can't sign up users

- **Cause:** Email not verified or MFA issues
- **Solution:** Check Cognito configuration in AWS Console

**Issue:** Lambda function times out

- **Cause:** Cold start or configuration issue
- **Solution:** Check CloudWatch Logs for errors

## Next Steps

Once setup is complete:

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system design
2. Read [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production
3. Customize the template for your specific use case
4. Start building your features!

## Getting Help

- Check [GitHub Issues](https://github.com/yourusername/aws-backed-saas-template/issues)
- Review AWS CDK documentation
- Check AWS service quotas and limits

## Cleanup

To remove all resources and avoid charges:

```bash
cd infrastructure
cdk destroy --all

# Confirm each stack deletion when prompted
```

**Warning:** This will delete all data including user accounts and database records!
