import { Link, useNavigate } from 'react-router-dom'
import '../styles/signuppage.css'
import feather from 'feather-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SignupPage() {

    useEffect(()=>{
        document.title = "Sign Up - LogiTrack"
    },[])

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState()
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setrePassword] = useState("")

    const RegisterUser = async (e) => {
        e.preventDefault();

        if (password != rePassword) {
            console.log("Password Doesn't Match!!");
            setPassword("");
            setrePassword("");
            return;
        }

        try {
            const res = await axios.post("http://localhost:3000/user/register", {
                name: name,
                email: email,
                phone: number,
                password: password,
                role: role
            }, { withCredentials: true });

            if (res.data.success) {
                console.log(res.data);
                navigate("/auth/login");
            }
            else {
                console.log(res.data.message)
            }
        } catch (error) {
            console.log(error.message);
        }

    }

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

                        <form onSubmit={RegisterUser} className="signup-form">
                            <div className="input-group">
                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='user' className="icon" ></i>
                                        <input
                                            id="full-name"
                                            name="full-name"
                                            type="text"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='mail' className="icon" ></i>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='lock' className="icon" ></i>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='lock' className="icon" ></i>
                                        <input
                                            id="confirm-password"
                                            name="confirm-password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={rePassword}
                                            onChange={(e) => setrePassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather='phone' className="icon" ></i>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-field">
                                    <div className="input-wrapper">
                                        <i data-feather="users" className='icon'></i>
                                        <select
                                            name="role"
                                            id="role"
                                            className='role-select'
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled hidden>Select Role</option>
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="terms">
                                <input id="terms" name="terms" type="checkbox" required />
                                <label htmlFor="terms">
                                    I agree to the <Link to="#">Terms of Service</Link> and <Link to="#">Privacy Policy</Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                            >
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
