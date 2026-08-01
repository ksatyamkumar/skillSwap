import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import AuthCard from "./AuthCard";

import {
  registerSchema,
  type RegisterFormData,
} from "../auth.validation";

import { authApi } from "../auth.api";
import { loginSuccess } from "../auth.slice";

import { useAppDispatch } from "../../../store/hooks";
import axios from "axios";
import { ROUTES } from "@/routes/routePaths";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      const response =
        await authApi.register(data);

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );

      toast.success(response.message);

      reset();

      navigate(ROUTES.DASHBOARD);
    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    toast.error(
      error.response?.data?.message ??
      "Something went wrong"
    );
  } else {
    toast.error("Something went wrong");
  }
}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <AuthCard title="Create your SkillSwap account">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Name */}

          <div className="space-y-2">
            <Input
              placeholder="Full Name"
              {...register("fullName")}
            />

            {errors.fullName && (
              <p className="text-sm text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email Address"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
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
              ? "Creating account..."
              : "Register"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
};

export default RegisterForm;