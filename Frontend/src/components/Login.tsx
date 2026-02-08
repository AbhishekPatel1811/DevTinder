"use client";

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
import { addUser } from "@/utils/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { CodeXml, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isEyeOpen, setIsEyeOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        trigger,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await axiosInstance.post("/login", {
                emailId: data.email,
                password: data.password
            });

            // Add the user to the store
            dispatch(addUser(res.data))

            if (res.status === 200) {
                toast.success("Login successful!!");
                navigate("/")
            }
        }
        catch (error: any) {
            console.error("Login error", error)
            toast.error(error.response.data || "Login failed!!");
        }

    };

    return (
        <section className="bg-muted flex flex-col justify-center items-center h-screen space-y-8">
            <div className="flex flex-col items-center gap-2 justify-center">
                <span className="flex items-center gap-2 font-semibold text-3xl">
                    <CodeXml className="size-7 shrink-0" />
                    DevTinder
                </span>
                <p className="text-sm font-medium tracking-wide text-center">Platform for developers to connect with each other.</p>
            </div>
            <Card className="w-full md:w-[400px]">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-2xl">Login</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {
                                    required: "Email is required",
                                    onBlur: () => trigger("email")
                                })}
                                aria-invalid={!!errors.email}
                                className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                            />
                            {/* Show error message in red below the input */}
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2 relative">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={isEyeOpen ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password", {
                                        required: "Password is required",
                                        onBlur: () => trigger("password")
                                    })}
                                    aria-invalid={!!errors.password}
                                    className={`${errors.password ? "border-red-500 focus:border-red-500" : ""} pr-10`}
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    className="absolute inset-y-0 right-3 flex items-center justify-center cursor-pointer"
                                    aria-label={isEyeOpen ? "Hide password" : "Show password"}
                                    onClick={() => setIsEyeOpen(!isEyeOpen)}
                                >
                                    {isEyeOpen ? (
                                        <EyeIcon className="size-4" />
                                    ) : (
                                        <EyeOffIcon className="size-4" />
                                    )}
                                </button>
                            </div>

                            {/* Show error message in red below the input */}
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <p className="text-muted-foreground text-sm">Don't have an account?
                <Link to="/signup" className="text-primary hover:underline ml-1">Signup</Link>
            </p>
        </section>
    );
}
