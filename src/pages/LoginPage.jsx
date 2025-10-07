import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import feather from 'feather-icons';
import '../styles/loginpage.css'
import axios from 'axios';

function LoginPage() {

    useEffect(()=>{
        document.title = "Login - LogiTrack"
    },[])

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/user/login", {
                email: email,
                password: password,
                remember: remember
            }, { withCredentials: true });


            if (res.data.success) {
                console.log(res.data);
                setEmail("");
                setPassword("");
                navigate("/");
            }
            else {
                setEmail("");
                setPassword("");
                console.log(res.data.message);
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        feather.replace();
    });

    return (
        <div className="auth-page">
            {/* Left Column - large screens only */}
            <aside className="auth-left" aria-hidden="true">
                <div className="auth-overlay">
                    <div className="auth-left-content">
                        <h1 className="auth-left-title">Welcome Back!</h1>
                        <p className="auth-left-sub">
                            Log in to access your transport and logistics management dashboard.
                        </p>

                        <div className="auth-feature">
                            <i data-feather="truck" className="icon-lg" aria-hidden="true"></i>
                            <div>
                                <h3 className="auth-feature-title">Efficient Logistics</h3>
                                <p className="auth-feature-sub">Manage your transportation needs seamlessly</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Right Column - form */}
            <main className="auth-right">
                <div className="auth-form-wrap">
                    <div className="auth-header">
                        <i data-feather="truck" className="icon-lg brand-icon" aria-hidden="true"></i>
                        <h2 className="auth-heading">Log in to your account</h2>
                        <p className="auth-sub">
                            Or{" "}
                            <Link to="/auth/signup" className="link-primary">
                                create a new account
                            </Link>
                        </p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <fieldset className="login-form-group">
                            <div className="input-wrapper">
                                <span className="input-icon" aria-hidden="true">
                                    <i data-feather="mail"></i>
                                </span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Email address"
                                    className="input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-wrapper">
                                <span className="input-icon" aria-hidden="true">
                                    <i data-feather="lock"></i>
                                </span>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </fieldset>

                        <div className="form-row">
                            <label className="checkbox-wrapper">
                                <input
                                    id="remember-me"
                                    name="remember"
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <span>Remember me</span>
                            </label>

                            <div>
                                <a href="#" className="link-primary">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="btn-primary">
                                <span className="btn-icon">
                                    <i data-feather="log-in"></i>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-grid">
                        <Link to="#" className="social-btn" >
                            <i data-feather="facebook" style={{ stroke: '#2563eb' }} ></i>
                        </Link>
                        <Link to="#" className="social-btn" >
                            <i data-feather="twitter" style={{ stroke: '#60a5fa' }}></i>
                        </Link>
                        <Link to="#" className="social-btn" >
                            <i data-feather="github" style={{ stroke: 'black' }} ></i>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginPage
