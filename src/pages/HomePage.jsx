import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import feather from 'feather-icons';
import "../styles/homepage.css";
import { Link } from 'react-router-dom';

function HomePage() {

    useEffect(() => {
        AOS.init({ duration: 500, once: false });
        feather.replace();
    }, []);

    return (
        <>
            <nav className="nav">
                <div className="container">
                    <div className="brand">
                        <i style={{
                            width: "35px",
                            height: "35px",
                            stroke: "#2563eb"

                        }} data-feather="truck"></i>
                        <span>LogiTrack</span>
                    </div>

                    <div className="menu">
                        <Link to="/" className="active">Home</Link>
                        <Link to="/user/dashboard">User Dashboard</Link>
                        <Link to="/admin/dashboard">Admin Dashboard</Link>
                    </div>

                    <div className="auth">
                        <Link to="/auth/login">Login</Link>
                        <Link to="/auth/signup" className="signup">Sign Up</Link>
                    </div>
                </div>
            </nav>

            <section className="hero-gradient">
                <div className="container">
                    <div className="text-center">
                        <h1>Smart Transport &amp; Logistics Management</h1>
                        <p>Efficiently manage your transportation needs with our comprehensive logistics solution.</p>

                        <div className="actions">
                            <Link to="/auth/signup" className="start">Get Started</Link>
                            <Link to="/auth/login" className="login">Login</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <div>
                        <h2>Features</h2>
                        <p className="title">A better way to manage logistics</p>
                    </div>

                    <div className="grid">
                        <div className="item" data-aos="fade-up">
                            <div className="item-icon"><i data-feather="users"></i></div>
                            <div>
                                <h3>User Portal</h3>
                                <p>View available vehicles, track routes, and book transportation for your goods with ease.</p>
                            </div>
                        </div>

                        <div className="item" data-aos="fade-up" data-aos-delay="100">
                            <div className="item-icon"><i data-feather="shield"></i></div>
                            <div>
                                <h3>Admin Dashboard</h3>
                                <p>Add and manage vehicles, set routes, and monitor all transportation activities.</p>
                            </div>
                        </div>

                        <div className="item" data-aos="fade-up" data-aos-delay="200">
                            <div className="item-icon"><i data-feather="map"></i></div>
                            <div>
                                <h3>Route Tracking</h3>
                                <p>Real-time tracking of all vehicles with detailed route information and ETAs.</p>
                            </div>
                        </div>

                        <div className="item" data-aos="fade-up" data-aos-delay="300">
                            <div className="item-icon"><i data-feather="bar-chart-2"></i></div>
                            <div>
                                <h3>Analytics</h3>
                                <p>Comprehensive reports and analytics to optimize your logistics operations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="container">
                    <h2>
                        <span>Ready to streamline your logistics?</span>
                        <span>Start your free trial today.</span>
                    </h2>
                    <div>
                        <div className="inline">
                            <Link to="/auth/signup" className="start">Get started</Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div className="container">
                    <div className="grid">
                        <div>
                            <h3>Solutions</h3>
                            <ul>
                                <li><Link to="#">Transportation</Link></li>
                                <li><Link to="#">Logistics</Link></li>
                                <li><Link to="#">Fleet Management</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>Support</h3>
                            <ul>
                                <li><Link to="#">Help Center</Link></li>
                                <li><Link to="#">Documentation</Link></li>
                                <li><Link to="#">Guides</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>Company</h3>
                            <ul>
                                <li><Link to="#">About</Link></li>
                                <li><Link to="#">Blog</Link></li>
                                <li><Link to="#">Careers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3>Legal</h3>
                            <ul>
                                <li><Link to="#">Privacy</Link></li>
                                <li><Link to="#">Terms</Link></li>
                                <li><Link to="#">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="bottom">
                        <div className="social">
                            <Link to="#"><i data-feather="facebook"></i></Link>
                            <Link to="#"><i data-feather="twitter"></i></Link>
                            <Link to="#"><i data-feather="instagram"></i></Link>
                            <Link to="#"><i data-feather="linkedin"></i></Link>
                        </div>
                        <p>&copy; 2023 LogiTrack. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default HomePage
