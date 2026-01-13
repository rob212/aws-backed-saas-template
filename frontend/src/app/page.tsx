import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Zap, Shield, Cloud, Code, Rocket } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-24 md:py-32 space-y-8">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
            🚀 Now available with AWS infrastructure
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Build Your SaaS Faster with AWS & Next.js
          </h1>
          <p className="text-xl text-muted-foreground">
            A production-ready template with authentication, API, database, and beautiful UI components. Deploy in minutes, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-24 bg-muted/50">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            All the essential features for building modern SaaS applications, configured and ready to use
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AWS Cognito Auth</CardTitle>
              <CardDescription>
                Complete authentication with email verification, password reset, and MFA support
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>API Gateway</CardTitle>
              <CardDescription>
                Secure REST API with Lambda functions, rate limiting, and automatic validation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Cloud className="h-10 w-10 text-primary mb-2" />
              <CardTitle>DynamoDB</CardTitle>
              <CardDescription>
                Scalable NoSQL database with single-table design and best practices
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Code className="h-10 w-10 text-primary mb-2" />
              <CardTitle>TypeScript CDK</CardTitle>
              <CardDescription>
                Infrastructure as code with AWS CDK for easy deployment and version control
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Rocket className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Amplify Hosting</CardTitle>
              <CardDescription>
                Automatic deployments from GitHub with preview environments and CI/CD
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle2 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Beautiful UI</CardTitle>
              <CardDescription>
                Pre-built components with shadcn/ui and Tailwind CSS for rapid development
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Modern Tech Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with the latest technologies and best practices
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Next.js 14", desc: "React Framework" },
            { name: "TypeScript", desc: "Type Safety" },
            { name: "Tailwind CSS", desc: "Styling" },
            { name: "shadcn/ui", desc: "Components" },
            { name: "AWS Cognito", desc: "Authentication" },
            { name: "API Gateway", desc: "REST API" },
            { name: "DynamoDB", desc: "Database" },
            { name: "AWS CDK", desc: "Infrastructure" },
          ].map((tech) => (
            <div key={tech.name} className="text-center space-y-2">
              <div className="h-16 w-16 mx-auto rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{tech.name[0]}</span>
              </div>
              <div>
                <p className="font-semibold">{tech.name}</p>
                <p className="text-sm text-muted-foreground">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Build Your SaaS?</h2>
          <p className="text-xl opacity-90">
            Clone the template and start building in minutes. No setup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Get Started Now
              </Button>
            </Link>
            <Link href="https://github.com">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}