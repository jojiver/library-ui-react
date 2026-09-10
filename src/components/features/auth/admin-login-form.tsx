import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type AdminLoginFormProps = {
  onSuccess?: () => void;
};

type FormErrors = {
  email?: string;
  password?: string;
};

const errorMessages: FormErrors = {
  email: "Email is required",
  password: "Password is required",
};

export function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loggingIn, setLoggingIn] = useState(false);

  // Error Required Validations
  const checkField = (field: keyof FormErrors, value: string) => {
    setErrors({
      ...errors,
      [field]: value.trim() === "" ? errorMessages[field] : undefined,
    });
  }

  // Handle Admin Login Submission
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const values = { email, password };
    const newErrors: FormErrors = {};
    let hasError = false;

    for (const field in values) {
      const key = field as keyof FormErrors;

      if (values[key].trim() === "") {
        newErrors[key] = errorMessages[key];
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError === true) {
      return;
    }

    setLoggingIn(true);

    try {
      // change to your backend's admin auth route
      const response = await api.post("/admin/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      onSuccess?.();
      navigate("/dashboard/admin");
    } catch (error) {
      console.error(error);
      setErrors({
        email: "Invalid admin credentials",
      });
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      {/* email / password — same field JSX as UserLoginForm */}
      <div>
        <Label error={errors.email}>Admin Email</Label>
        <Input type="email" value={email}
          onChange={(e) => { setEmail(e.target.value); checkField("email", e.target.value); }}
          onBlur={() => checkField("email", email)}
          error={errors.email}
        />
      </div>

      <div>
        <Label error={errors.password}>Password</Label>
        <Input type="password" value={password}
          onChange={(e) => { setPassword(e.target.value); checkField("password", e.target.value); }}
          onBlur={() => checkField("password", password)}
          error={errors.password}
        />
      </div>

      <Button type="submit" disabled={loggingIn}>
        {loggingIn ? "Logging in..." : "Admin Login"}
      </Button>
    </form>
  );
}