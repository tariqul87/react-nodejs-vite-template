import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Button, Heading, Input, Label, Text } from "../ui";

function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/home");
    } catch {
      setError("Login failed. Please verify your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-(--radius-ui-card) border border-ui-border bg-white p-6 shadow-sm">
      <Heading>Login</Heading>
      <Text variant="muted" className="mt-2">
        Enter your credentials to continue.
      </Text>

      <form className="mt-6 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
        <div>
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
          />
        </div>

        {error && (
          <Text variant="danger" role="alert">
            {error}
          </Text>
        )}

        <Button type="submit" disabled={isSubmitting || isLoading} className="w-full">
          {isLoading ? "Loading..." : isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-4 flex items-center justify-between text-sm">
        <Link to="/forgot-password" className="text-ui-label hover:underline">
          Forgot password?
        </Link>
        <Link to="/signup" className="text-ui-label hover:underline">
          Create account
        </Link>
      </div>
    </section>
  );
}

export default LoginPage;
