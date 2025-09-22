import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import feather from 'feather-icons';
import '../styles/loginpage.css'

function LoginPage() {

    useEffect(() => {
        feather.replace();
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
    };


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
                        <fieldset className="form-group">
                            <div className="input-wrapper">
                                <span className="input-icon" aria-hidden="true">
                                    <i data-feather="mail"></i>
                                </span>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Email address"
                                    className="input"
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
                                    required
                                    placeholder="Password"
                                    className="input"
                                />
                            </div>
                        </fieldset>

                        <div className="form-row">
                            <label className="checkbox-wrapper">
                                <input
                                    id="remember-me"
                                    name="remember"
                                    type="checkbox"
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
