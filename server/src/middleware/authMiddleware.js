import supabase from '../services/supabase.Service.js'; // your initialized client

const verifyAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) return res.status(401).json({ error: "Missing token" });

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(403).json({ error: error?.message || "Unauthorized" });
    }

    req.user = user;
    next();
};

export default verifyAuth;
