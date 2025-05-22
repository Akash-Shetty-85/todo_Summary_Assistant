import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export function RegisterForm({ className, handleState, onSubmit, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const data = {
            userName: formData.get("userName"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        onSubmit(data);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>Enter your info to register</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="userName">Username</Label>
                                <Input id="userName" name="userName" type="text" placeholder="John Doe" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <Button type="submit" className="w-full">Register</Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Have an account?{" "}
                            <button type="button" onClick={() => handleState("login")} className="underline underline-offset-4">
                                Sign in
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
