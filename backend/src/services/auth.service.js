import bcrypt from "bcrypt";
import pool from "../config/database.js";

export async function registerUser({ username, email, password }) {
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedUsername || !normalizedEmail || !password) {
        const error = new Error("Username, email, and password are required");
        error.statusCode = 400;
        throw error;
    }

    if (normalizedUsername.length < 3 || normalizedUsername.length > 50) {
        const error = new Error ("Username must be 3-50 characters");
        error.statusCode = 400;
        throw error;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
        const error = new Error(
            "Username may contain only letters, numbers, and underscores"
        );
        error.statusCode = 400;
        throw error;
    }

    if (normalizedEmail.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        const error = new Error("Please provide a valid email address");
        error.statusCode = 400;
        throw error;
    }

    
    if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
        const error = new Error(
        "Password must be at least 8 characters and no more than 72 bytes."
        );
        error.statusCode = 400;
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        const result = await pool.query(
            `INSERT INTO users (username, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, display_name, role, created_at`,
            [normalizedUsername, normalizedEmail, passwordHash]
        );

        return result.rows[0];

    } catch (error) {
        if (error.code === "23505") {
            const duplicateError = new Error(
                "Username or email is already registered."
            );
            duplicateError.statusCode = 409;
            throw duplicateError;
        }

        throw error;
    }
}