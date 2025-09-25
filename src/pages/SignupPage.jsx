import { Link } from 'react-router-dom'
import '../styles/signuppage.css'
import feather from 'feather-icons';
import { useEffect } from 'react';

export default function SignupPage() {

    useEffect(() => {
        feather.replace();
    }, []);

    return (
        <>
            <div className="signup-container">
                {/* Left Column */}
                <div className="left-column">
                    <div className="overlay">
                        <div className="overlay-content">
                            <h1>Join LogiTrack</h1>
                            <p>Create an account to start managing your transport and logistics needs.</p>
                            <div className="feature">
                                <i data-feather='map' className="feature-icon" ></i>
                                <div>
                                    <h3>Route Optimization</h3>
                                    <p>Find the best routes for your transportation needs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="right-column">
                    <div className="form-container">
                        <div className="form-header">
                            <i data-feather='truck' className="truck-icon"></i>
                            <h2>Create your account</h2>
                            <p>
                                Or{" "}
                                <Link to="/auth/login" className="login-link">
                                    login to existing account
                                </Link>
                            </p>
                        </div>

                        <form className="signup-form">
                            <div className="input-group">
                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='user' className="icon" ></i>
                                        <input id="full-name" name="full-name" type="text" placeholder="Full Name" required />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='mail' className="icon" ></i>
                                        <input id="email" name="email" type="email" placeholder="Email address" required />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='lock' className="icon" ></i>
                                        <input id="password" name="password" type="password" placeholder="Password" required />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='lock' className="icon" ></i>
                                        <input id="confirm-password" name="confirm-password" type="password" placeholder="Confirm Password" required />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='phone' className="icon" ></i>
                                        <input id="phone" name="phone" type="tel" placeholder="Phone Number" required />
                                    </div>
                                </div>
                            </div>

                            <div className="terms">
                                <input id="terms" name="terms" type="checkbox" required />
                                <label htmlFor="terms">
                                    I agree to the <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>
                                </label>
                            </div>

                            <button type="submit" className="submit-btn">
                                <i data-feather='user-plus' className="btn-icon" ></i>
                                Create Account
                            </button>
                        </form>

                        <div className="social-signup">
                            <div className="partition-line">
                                <span className='line'></span>
                                <span className="other-way-text">
                                    Or sign up with
                                </span>
                                <span className='line'></span>
                            </div>

                            <div className="social-icons">
                                <Link to="#"><i data-feather='facebook' style={{ stroke: '#2563eb' }} ></i></Link>
                                <Link to="#"><i data-feather='twitter' style={{ stroke: '#60a5fa' }}  ></i></Link>
                                <Link to="#"><i data-feather='github' style={{ stroke: 'black' }} ></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
