import React, { useState } from "react";
import { registerUser } from "../api.js";

function Register({ onRegisterSuccess }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const data = await registerUser(name, email, password);
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                onRegisterSuccess();
            } else {
                setError(data.detail || "Registration failed");
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
                <h1 style={styles.title}>Create account</h1>
                <p style={styles.subtitle}>Start managing your tasks today</p>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            style={styles.input}
                            placeholder="Kireeti Peetha"
                            required
                        />
                    </div>
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
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>
                <p style={styles.switchText}>
                    Already have an account?{" "}
                    <span style={styles.link} onClick={() => onRegisterSuccess("login")}>
                        Sign in
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
        backgroundColor: "#f8fafc",
    },
    card: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        width: "100%",
        maxWidth: "400px",
    },
    title: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#1e293b",
        marginBottom: "8px",
    },
    subtitle: {
        color: "#64748b",
        marginBottom: "24px",
    },
    error: {
        color: "#ef4444",
        backgroundColor: "#fef2f2",
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
        color: "#374151",
        marginBottom: "6px",
    },
    input: {
        width: "100%",
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1px solid #e2e8f0",
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
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
        color: "#6366f1",
        cursor: "pointer",
        fontWeight: "500",
    },
};

export default Register;