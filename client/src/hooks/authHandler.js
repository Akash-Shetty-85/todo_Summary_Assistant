import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export const useAuthHandler = () => {
    const navigate = useNavigate();

    const authHandler = async ({ type, email, password }) => {
        let result;

        if (type === "login") {
            result = await supabase.auth.signInWithPassword({ email, password });
        } else if (type === "register") {
            result = await supabase.auth.signUp({ email, password });
        }

        if (result.error) {
            console.error(result.error.message);
            alert(result.error.message); // or return the error to the form
            return;
        }

        // Success
        navigate("/");
    };

    return { authHandler };
};
