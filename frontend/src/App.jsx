import React, { useState } from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    const [page, setPage] = useState(() => {
        const token = localStorage.getItem("access_token");
        return token ? "dashboard" : "login";
    });

    function handleLoginSuccess(destination) {
        if (destination === "register") {
            setPage("register");
        } else {
            setPage("dashboard");
        }
    }

    function handleRegisterSuccess(destination) {
        if (destination === "login") {
            setPage("login");
        } else {
            setPage("dashboard");
        }
    }

    function handleLogout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setPage("login");
    }

    if (page === "login") {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    if (page === "register") {
        return <Register onRegisterSuccess={handleRegisterSuccess} />;
    }

    return <Dashboard onLogout={handleLogout} />;
}

export default App;