import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import AuthCard from "./AuthCard";

import { loginSchema,type LoginFormData } from "../auth.validation";
import { authApi } from "../auth.api";
import { loginSuccess } from "../auth.slice";

import { useAppDispatch } from "../../../store/hooks";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const response = await authApi.login(data);

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      toast.success(response.message);

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Login failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <AuthCard title="Login to SkillSwap">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Signing in..."
              : "Login"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
};

export default LoginForm;