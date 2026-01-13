# AWS Backed SaaS Template

A production-ready Next.js SaaS starter template with AWS backend infrastructure, featuring Cognito authentication, API Gateway, DynamoDB, and opinionated UI components.

## 🚀 Features

- **Frontend:** Next.js 14+ with App Router, TypeScript, Tailwind CSS, shadcn/ui
- **Authentication:** AWS Cognito with MFA support
- **Backend:** API Gateway + Lambda + DynamoDB
- **Infrastructure:** AWS CDK (TypeScript) for IaC
- **Frontend Hosting:** AWS Amplify with CI/CD
- **UI Components:** Pre-built auth flows, user profiles, landing pages
- **Security:** IAM roles, no hardcoded credentials

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or later ([Download](https://nodejs.org/))
- **npm** or **pnpm** (comes with Node.js)
- **AWS CLI** configured with credentials ([Setup Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html))
- **AWS CDK** CLI: `npm install -g aws-cdk`
- **Git**

Verify installations:

```bash
node --version
npm --version
aws --version
cdk --version
```

## 🏗️ Project Structure

```
aws-backed-saas-template/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── layout/      # Layout components (Header, Footer, Nav)
│   │   │   └── profile/     # User profile components
│   │   ├── lib/             # Utilities and API clients
│   │   └── hooks/           # Custom React hooks
│   ├── public/              # Static assets
│   └── package.json
├── infrastructure/          # AWS CDK code
│   ├── bin/                 # CDK app entry point
│   ├── lib/                 # CDK stack definitions
│   │   ├── auth-stack.ts    # Cognito User Pool
│   │   ├── api-stack.ts     # API Gateway + Lambda
│   │   ├── storage-stack.ts # DynamoDB tables
│   │   └── hosting-stack.ts # Amplify hosting
│   ├── lambda/              # Lambda function code
│   └── package.json
├── docs/                    # Documentation
│   ├── SETUP.md            # Detailed setup guide
│   ├── DEPLOYMENT.md       # Deployment instructions
│   └── ARCHITECTURE.md     # Architecture overview
├── .gitignore
├── LICENSE
└── README.md
```

## 🎯 Quick Start

### 1. Clone or Use This Template

**Option A: Use as GitHub Template**

1. Click "Use this template" button on GitHub
2. Clone your new repository

**Option B: Clone directly**

```bash
git clone https://github.com/yourusername/aws-backed-saas-template.git
cd aws-backed-saas-template
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install
cd ..

# Install infrastructure dependencies
cd infrastructure
npm install
cd ..
```

### 3. Configure AWS Credentials

Ensure your AWS CLI is configured:

```bash
aws configure
```

You'll need:

- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `us-east-1`)
- Output format (e.g., `json`)

### 4. Bootstrap CDK (First Time Only)

If this is your first time using CDK in your AWS account/region:

```bash
cd infrastructure
cdk bootstrap
```

### 5. Deploy Infrastructure

```bash
cd infrastructure

# Review what will be created
cdk diff

# Deploy all stacks
cdk deploy --all

# Or deploy individually
cdk deploy AuthStack
cdk deploy StorageStack
cdk deploy ApiStack
```

**Note:** Save the outputs! You'll need values like:

- Cognito User Pool ID
- Cognito Client ID
- API Gateway URL

### 6. Configure Frontend Environment

Create `frontend/.env.local` with values from CDK outputs:

```bash
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
NEXT_PUBLIC_COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_API_URL=https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/prod
```

### 7. Run Locally

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Deploy to AWS Amplify

```bash
cd infrastructure
cdk deploy HostingStack
```

Follow the Amplify console link to connect your GitHub repository.

## 📖 Documentation

- **[Setup Guide](./docs/SETUP.md)** - Detailed setup instructions
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - How to deploy to production
- **[Architecture Overview](./docs/ARCHITECTURE.md)** - System architecture and design decisions

## 🛠️ Development

### Local Development

```bash
# Start frontend dev server
cd frontend
npm run dev

# Run tests
npm test

# Lint and format
npm run lint
npm run format
```

### Infrastructure Changes

```bash
cd infrastructure

# See what will change
cdk diff

# Deploy changes
cdk deploy

# Destroy all resources (careful!)
cdk destroy --all
```

## 🔐 Security Best Practices

This template follows AWS security best practices:

- ✅ No hardcoded credentials
- ✅ IAM roles for service-to-service communication
- ✅ Environment variables for configuration
- ✅ Secrets Manager for sensitive data
- ✅ HTTPS only via API Gateway
- ✅ Cognito JWT validation
- ✅ MFA support enabled
- ✅ CORS properly configured
- ✅ CloudWatch logging enabled

## 🧪 Included Features

### Authentication

- Sign up with email verification
- Sign in / Sign out
- Password reset flow
- MFA setup and enforcement
- Social login ready (Google, GitHub, etc.)

### User Profile

- Profile management page
- Avatar upload to S3
- Update email, username
- Change password
- Delete account

### UI Components

- Landing page template
- Responsive header with navigation
- Footer with links
- Protected route wrapper
- Loading states
- Error boundaries

### Backend APIs

- User CRUD operations
- Secure API endpoints
- DynamoDB queries with best practices
- Lambda error handling

## 🎨 Customization

### Styling

- Modify `frontend/tailwind.config.ts` for theme customization
- Update `frontend/src/app/globals.css` for global styles
- Customize shadcn/ui components in `frontend/src/components/ui/`

### Branding

- Replace logo in `frontend/public/`
- Update metadata in `frontend/src/app/layout.tsx`
- Customize color scheme in Tailwind config

### Infrastructure

- Modify stack configurations in `infrastructure/lib/`
- Add new resources following existing patterns
- Update environment variables in CDK stacks

## 💰 Cost Estimation

Estimated monthly costs for a hobby project with low traffic:

- **AWS Amplify:** $0-5 (free tier covers most hobby projects)
- **Cognito:** Free for first 50,000 MAUs
- **API Gateway:** ~$0.01 per 1000 requests (free tier: 1M requests/month for 12 months)
- **Lambda:** ~$0.20 per 1M requests (free tier: 1M requests/month)
- **DynamoDB:** $0-5 (on-demand pricing, free tier available)
- **S3:** $0-1 for storage
- **CloudWatch:** $0-2 for logs

**Total: ~$0-15/month** for typical hobby/side project traffic

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [AWS CDK](https://aws.amazon.com/cdk/) - Infrastructure as Code
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/aws-backed-saas-template/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/aws-backed-saas-template/discussions)

## 🗺️ Roadmap

- [ ] Email templates for Cognito
- [ ] Stripe integration for payments
- [ ] Admin dashboard
- [ ] Multi-tenancy support
- [ ] Internationalization (i18n)
- [ ] End-to-end tests
- [ ] Storybook for component documentation

---

**Happy Building! 🚀**

If you find this template helpful, please consider giving it a ⭐ on GitHub!
