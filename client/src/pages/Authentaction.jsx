import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { useAuth } from "@/context/AuthContex.jsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, AlertCircle } from "lucide-react";

export const Authentication = () => {
    const [formState, setFormState] = React.useState("login");
    const [alert, setAlert] = React.useState({ type: null, message: "" });
    const navigate = useNavigate();
    const { signIn, signUp } = useAuth();

    const handleState = (state) => {
        setFormState(state);
        setAlert({ type: null, message: "" }); // clear alert
    };

    const handleSubmit = async (data) => {
        try {
            let response;

            if (formState === "login") {
                response = await signIn({ email: data.email, password: data.password });
            } else {
                response = await signUp({
                    email: data.email,
                    password: data.password,
                    display_name: data.userName || "",
                });
            }

            console.log("Response:", response);

            if (response.error) {
                setAlert({ type: "error", message: response.error.message });
                return;
            }

            setAlert({
                type: "success",
                message: formState === "login" ? "Login successful!" : "Registration successful!",
            });

            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            console.error("Unexpected Error:", err);
            setAlert({ type: "error", message: "Something went wrong. Please try again." });
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm space-y-4">
                {alert.type && (
                    <Alert variant={alert.type === "error" ? "destructive" : "default"}>
                        {alert.type === "error" ? (
                            <AlertCircle className="h-4 w-4" />
                        ) : (
                            <Terminal className="h-4 w-4" />
                        )}
                        <AlertTitle>{alert.type === "error" ? "Error" : "Success"}</AlertTitle>
                        <AlertDescription>{alert.message}</AlertDescription>
                    </Alert>
                )}

                {formState === "login" ? (
                    <LoginForm handleState={handleState} onSubmit={handleSubmit} />
                ) : (
                    <RegisterForm handleState={handleState} onSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
};
