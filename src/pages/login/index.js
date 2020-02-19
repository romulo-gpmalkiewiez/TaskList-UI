import React from "react";
import LoginForm from "../../components/login";
import "./index.less";

async function handleLogin(values) {
    const { username, password } = values;
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            if (username === "admin" && password === "admin") {
                return resolve();
            }
            return reject({ error: "Invalid username and/or password" });
        }, 2000);
    });
}

function LoginPage() {
    return (
        <div className="login-wrapper">
            <LoginForm
                title="Login"
                onLogin={handleLogin}
                redirectTo="/tasks"
            />
        </div>
    );
}

export default LoginPage;
