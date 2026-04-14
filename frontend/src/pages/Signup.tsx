import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Button, Heading, Input, Label, Text } from "../ui";

function SignupPage() {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup(email, password);
      navigate("/home");
    } catch {
      setError("Signup failed. Try another email or try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-(--radius-ui-card) border border-ui-border bg-white p-6 shadow-sm">
      <Heading>Signup</Heading>
      <Text variant="muted" className="mt-2">
        Create an account with your email and password.
      </Text>

      <form className="mt-6 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
        <div>
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
          />
        </div>
        <div>
          <Label htmlFor="signup-confirm-password">Confirm Password</Label>
          <Input
            id="signup-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your password"
          />
        </div>

        {error && (
          <Text variant="danger" role="alert">
            {error}
          </Text>
        )}

        <Button type="submit" disabled={isSubmitting || isLoading} className="w-full">
          {isLoading ? "Loading..." : isSubmitting ? "Creating account..." : "Create Account"}
        </Button>
      </form>

      <Text variant="muted" className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-ui-fg hover:underline">
          Login
        </Link>
      </Text>
    </section>
  );
}

export default SignupPage;
