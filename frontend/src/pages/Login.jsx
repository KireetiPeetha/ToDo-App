import React, { useState } from "react";
import { loginUser } from "../api.js";

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = await loginUser(email, password);
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                onLoginSuccess();
            } else {
                setError(data.detail || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome back</h1>
                <p style={styles.subtitle}>Sign in to your account</p>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        style={styles.button}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
                <p style={styles.switchText}>
                    Don't have an account?{" "}
                    <span style={styles.link} onClick={() => onLoginSuccess("register")}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
    },
    card: {
        backgroundColor: "#1e293b",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        width: "100%",
        maxWidth: "400px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#f1f5f9",
        marginBottom: "8px",
    },
    subtitle: {
        color: "#94a3b8",
        marginBottom: "24px",
    },
    error: {
        color: "#f87171",
        backgroundColor: "#450a0a",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "16px",
        fontSize: "14px",
    },
    field: {
        marginBottom: "16px",
    },
    label: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "#cbd5e1",
        marginBottom: "6px",
    },
    input: {
        width: "100%",
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1px solid #334155",
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
        backgroundColor: "#0f172a",
        color: "#f1f5f9",
    },
    button: {
        width: "100%",
        padding: "12px",
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "8px",
    },
    switchText: {
        textAlign: "center",
        marginTop: "20px",
        fontSize: "14px",
        color: "#64748b",
    },
    link: {
        color: "#818cf8",
        cursor: "pointer",
        fontWeight: "500",
    },
};

export default Login;