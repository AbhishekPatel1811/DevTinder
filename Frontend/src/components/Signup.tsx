import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const signupSchema = z.object({
  firstName: z.string().min(3, "First Name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last Name must be at least 3 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type signupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate()
  const [isEyeOpen, setIsEyeOpen] = useState(false)
  const [isEyeOpenConfirm, setIsEyeOpenConfirm] = useState(false)

  const { register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<signupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data: signupFormData) => {
    try {

      console.log("data ----", data)

      const res = await axiosInstance.post("/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.email,
        password: data.password
      })

      const user = res.data;
      console.log("user ----", user)
      if (res.status === 200) {
        toast.success("Signup successful!!");
        navigate("/login")
      }
    }
    catch (error: any) {
      console.error("Signup error", error)
      toast.error(error.response.data || "Signup failed!!");
    }
  };

  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <Card className="w-full md:w-[400px]">
            <CardHeader>
              <CardTitle className="font-semibold tracking-tight text-2xl">Signup</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Enter your details to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" type="text" placeholder="Enter your firstName" {...register("firstName")} aria-invalid={errors.firstName ? "true" : "false"} />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" type="text" placeholder="Enter your lastName" {...register("lastName")} aria-invalid={errors.lastName ? "true" : "false"} />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                  <div className="grid gap-2 relative">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" type={isEyeOpen ? "text" : "password"} required {...register("password")} aria-invalid={errors.password ? "true" : "false"} value={password}
                      placeholder="Enter your password"
                    />
                    <button type="button"
                      className="absolute right-4 top-2/3 -translate-y-1/3 cursor-pointer"
                      aria-label={isEyeOpen ? "Hide password" : "Show password"}
                      onClick={() => setIsEyeOpen(!isEyeOpen)}
                    >
                      {isEyeOpen ? <EyeIcon className={`size-4`} /> : <EyeOffIcon className={`size-4`} />}
                    </button>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                  </div>
                  <div className="grid gap-2 relative">
                    <div className="flex items-center">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                    </div>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={isEyeOpenConfirm ? "text" : "password"}
                        required
                        {...register("confirmPassword")}
                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                        value={confirmPassword}
                        placeholder="Confirm your password"
                        className={`
                          pr-10
                          ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}
                        `}
                        style={{ paddingRight: "2.5rem" }}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        aria-label={isEyeOpenConfirm ? "Hide password" : "Show password"}
                        onClick={() => setIsEyeOpenConfirm(!isEyeOpenConfirm)}
                        tabIndex={-1}
                      >
                        {isEyeOpenConfirm ? (
                          <EyeIcon className="size-4" />
                        ) : (
                          <EyeOffIcon className="size-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Signing up..." : "Signup"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>Already a user?</p>
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Signup;
