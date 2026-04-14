import { Link } from "react-router-dom";
import { Button, Heading, Input, Label, Text } from "../ui";

function ForgotPasswordPage() {
  return (
    <section className="mx-auto max-w-md rounded-(--radius-ui-card) border border-ui-border bg-white p-6 shadow-sm">
      <Heading>Forgot Password</Heading>
      <Text variant="muted" className="mt-2">
        Enter your email and we will send password reset instructions.
      </Text>

      <form className="mt-6 space-y-4">
        <div>
          <Label htmlFor="reset-email">Email</Label>
          <Input id="reset-email" type="email" placeholder="you@example.com" />
        </div>
        <Button type="button" className="w-full">
          Send Reset Link
        </Button>
      </form>

      <Text variant="muted" className="mt-4">
        Remembered your password?{" "}
        <Link to="/login" className="text-ui-fg hover:underline">
          Back to login
        </Link>
      </Text>
    </section>
  );
}

export default ForgotPasswordPage;
