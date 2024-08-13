/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import type { FC, FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext"; 

const SignInPage: FC = function () {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: setAuthLogin } = useAuth(); // Use a função login do contexto

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const data = await login(name, password);
      console.log(data)

      if (data.token) {
        // Set authentication state in the context
        setAuthLogin();

        // Optionally save the token in localStorage
        localStorage.setItem("authToken", data.token);

        // Redirect to a protected route
        navigate("/machines/list");
      } else {
        setError("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <a href="/" className="my-6 flex items-center gap-x-1 lg:my-0">
        Dennis Work
      </a>
      <Card
        horizontal
        imgAlt=""
        className="w-full md:max-w-[500px] md:[&>*]:w-full md:[&>*]:p-16 [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to platform
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-y-3">
          <Label htmlFor="name">Your name</Label>
            <TextInput
              id="name"
              name="name"
              placeholder="Enter your username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
          <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <a
              href="#"
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              Lost Password?
            </a>
          </div> */}
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto">
              Login to your account
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <a
              href="/authentication/sign-up"
              className="text-primary-600 dark:text-primary-300"
            >
              Create account
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
