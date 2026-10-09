
import { registerUser } from "../services/auth.service.js";

export async function register(req, res) {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
        message: "Registration successful.",
        user,
        });
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                message: error.message,
            });
        }

        console.error("Registration failed:", error.message);

        return res.status(500).json({
            message: "An internal server error occurred.",
        });
    }
}