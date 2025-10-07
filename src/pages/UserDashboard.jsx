import AOS from "aos";
import "aos/dist/aos.css";
import '../styles/user_dashboard.css';
import { useContext, useEffect, useState } from "react";
import feather from "feather-icons";
import { userContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import RouteTracking from "../components/User/RouteTracking";
import AvilableVehicles from "../components/User/AvilableVehicles";
import MyBookings from "../components/User/MyBookings";

function UserDashboard() {

    const location = useLocation();
    const { gotoSetting } = location.state || {};
    const { userData, dashboardData, refreshUser } = useContext(userContext);
    const [ActiveTab, setActiveTab] = useState("Dashboard");
    const navigate = useNavigate();
    const [WhichText, setWhichText] = useState("");
    const [ButtonWhichText, setButtonWhichText] = useState("Login");
    const isLoggedIn = Boolean(userData && userData.role);
    const isAdmin = userData?.role === 'admin';
    const isUserRole = userData?.role === 'user';

    // setting values
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setphone] = useState("");
    const [role, setrole] = useState("");


    useEffect(() => {
        if (gotoSetting) {
            changeDash("Settings")
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [gotoSetting])

    useEffect(() => {
        if (!isLoggedIn) {
            setWhichText("You need to login for accessing transportation facilities.");
            setButtonWhichText("Login");
            return;
        }
        if (isAdmin) {
            setWhichText("This is not accessable for admin user.");
            setButtonWhichText("Change User");
        }

    }, [userData, isAdmin])

    useEffect(() => {
        if (!userData) return;
        setname(userData.name ?? "");
        setemail(userData.email ?? "");
        setphone(userData.number ?? "");
        setpassword(userData.password ?? "");
        setrole(userData.role ?? "");
    }, [userData?.id]);


    useEffect(() => {
        AOS.init({ duration: 500, once: false });
        feather.replace();
    }, [ActiveTab]);

    useEffect(() => {
        AOS.refresh();
    }, [ActiveTab]);

    const toggleSidebar = () => {
        document.querySelector(".sidebar").classList.toggle("collapsed");
    };

    const changeDash = (tab) => {
        setActiveTab(tab);
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector(`.nav-item.${tab}`).classList.add('active');
    }


    const UpdateUserDetial = async () => {
        try {

            const data = {
                id: userData.id,
                name: name,
                email: email,
                role: role,
                password: password,
                number: phone
            }

            const update = await axios.post("http://localhost:3000/user/User_Setting", data, { withCredentials: true });

            if (update.data.success) {
                console.log(update.data.message);
                await refreshUser();
                console.log("Updated Successfully");
                navigate("/", { replace: true })
            }
            else {
                console.log(update.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="dashboard-body">
            <div className="dashboard-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <div className="sidebar-header">
                        <div className="logo">
                            <i data-feather="truck" className="icon-lg blue"></i>
                            <span className="brand">LogiTrack</span>
                        </div>
                        <button onClick={toggleSidebar} className="sidebar-toggle">
                            <i data-feather="chevron-left"></i>
                        </button>
                    </div>

                    <nav className="sidebar-nav">
                        <div onClick={() => { changeDash("Dashboard") }} className="nav-item Dashboard active">
                            <i data-feather="home" className="sidebar-icon"></i>
                            <span>Dashboard</span>
                        </div>
                        <div onClick={() => { changeDash("AvilableVehicles") }} className="nav-item AvilableVehicles">
                            <i data-feather="truck" className="sidebar-icon"></i>
                            <span>Available Vehicles</span>
                        </div>
                        <div onClick={() => { changeDash("RouteTracking") }} className="nav-item RouteTracking">
                            <i data-feather="map" className="sidebar-icon"></i>
                            <span>Route Tracking</span>
                        </div>
                        <div onClick={() => { changeDash("Bookings") }} className="nav-item Bookings">
                            <i data-feather="shopping-cart" className="sidebar-icon"></i>
                            <span>My Bookings</span>
                        </div>
                        <div onClick={() => { changeDash("Settings") }} className="nav-item Settings">
                            <i data-feather="settings" className="sidebar-icon"></i>
                            <span>Settings</span>
                        </div>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="main">
                    <header className="navbar">
                        <h1>User Dashboard</h1>
                        <div className="navbar-actions">
                            <button className="notification-btn">
                                <i data-feather="bell"></i>
                                <span className="notification-dot"></span>
                            </button>
                            <button className="profile-btn">
                                <img src="http://static.photos/people/200x200/1" alt="User" />
                                <span>John Doe</span>
                                <i data-feather="chevron-down"></i>
                            </button>
                        </div>
                    </header>

                    {
                        (isLoggedIn && isUserRole) ?
                            (
                                <>
                                    {/* Main Content */}
                                    < main className="content">
                                        <div className="stats-grid">
                                            <div className="stat-card" data-aos="fade-up">
                                                <div className="stat-icon blue-bg">
                                                    <i data-feather="truck"></i>
                                                </div>
                                                <div>
                                                    <p>Available Vehicles</p>
                                                    <h2>{dashboardData.user.activeVehicles}</h2>
                                                </div>
                                            </div>

                                            <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
                                                <div className="stat-icon green-bg">
                                                    <i data-feather="check-circle"></i>
                                                </div>
                                                <div>
                                                    <p>Completed Bookings</p>
                                                    <h2>{dashboardData.user.completedBookings}</h2>
                                                </div>
                                            </div>

                                            <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
                                                <div className="stat-icon yellow-bg">
                                                    <i data-feather="clock"></i>
                                                </div>
                                                <div>
                                                    <p>Pending Bookings</p>
                                                    <h2>{dashboardData.user.pendingBookings}</h2>
                                                </div>
                                            </div>

                                            <div className="stat-card" data-aos="fade-up" data-aos-delay="300">
                                                <div className="stat-icon purple-bg">
                                                    <i data-feather="dollar-sign"></i>
                                                </div>
                                                <div>
                                                    <p>Total Spent</p>
                                                    <h2>$2,450</h2>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            ActiveTab === "Dashboard" &&
                                            <>
                                                <div className="dashboard-welcome" data-aos="fade-up">
                                                    <h2>Hello, {name} 👋</h2>
                                                    <p>
                                                        Welcome to your dashboard! Here you can manage your bookings, track routes,
                                                        and view available vehicles quickly.
                                                    </p>

                                                    <div className="dashboard-buttons">
                                                        <button onClick={() => { changeDash("AvilableVehicles") }}>🚚 Available Vehicles</button>
                                                        <button onClick={() => { changeDash("Bookings") }}>📑 My Bookings</button>
                                                        <button onClick={() => { changeDash("RouteTracking") }}>🗺️ Route Tracking</button>
                                                    </div>
                                                </div>

                                                {/* Recent Bookings */}
                                                <div className="dashboard-recent" data-aos="fade-up">
                                                    <h3>📌 Recent Bookings</h3>
                                                    <ul>
                                                        <li>Truck A → Delhi (Completed ✅)</li>
                                                        <li>Bus B → Jaipur (Pending ⏳)</li>
                                                        <li>MiniVan C → Mumbai (Completed ✅)</li>
                                                        <li>MiniVan C → Mumbai (Completed ✅)</li>
                                                        <li>MiniVan C → Mumbai (Completed ✅)</li>
                                                    </ul>
                                                </div>

                                                {/* Tips Section */}
                                                <div className="dashboard-tips">
                                                    <h3>💡 Tips & Updates</h3>
                                                    <p>⚡ Book early to avoid last-minute charges.</p>
                                                    <p>🔥 Special discount on long-distance routes this week.</p>
                                                    <p>📢 New vehicles added in your area.</p>
                                                </div>
                                            </>
                                        }


                                        {/* Route Tracking Section */}
                                        {
                                            ActiveTab === "RouteTracking" &&
                                            <RouteTracking />
                                        }

                                        {/* Available Vehicles Table */}
                                        {
                                            ActiveTab === "AvilableVehicles" &&
                                            <AvilableVehicles />
                                        }


                                        {/* Bookings Section */}
                                        {
                                            ActiveTab === "Bookings" &&
                                            <MyBookings />
                                        }


                                        {
                                            ActiveTab === "Settings" &&
                                            <div className="setting-card" data-aos="fade-up">
                                                <div className="card-header available-vehicles-header">
                                                    <h2>Settings</h2>
                                                </div>
                                                <div className="settings-form">
                                                    <div className="form-group">
                                                        <label>Full Name</label>
                                                        <div className="setting-input-wrapper">
                                                            <i data-feather="user" />
                                                            <input
                                                                name="username"
                                                                id="username"
                                                                type="text"
                                                                value={name}
                                                                onChange={(e) => setname(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <div className="setting-input-wrapper">
                                                            <i data-feather="mail" />
                                                            <input
                                                                name="email"
                                                                id="email"
                                                                type="email"
                                                                value={email}
                                                                onChange={(e) => setemail(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <div className="setting-input-wrapper">
                                                            <i data-feather="phone" />
                                                            <input
                                                                name="phone"
                                                                id="phone"
                                                                type="text"
                                                                value={phone}
                                                                onChange={(e) => setphone(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Password</label>
                                                        <div className="setting-input-wrapper">
                                                            <i data-feather="lock" />
                                                            <input
                                                                name="password"
                                                                id="password"
                                                                type="password"
                                                                value={password}
                                                                onChange={(e) => setpassword(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Role</label>
                                                        <div className="setting-input-wrapper">
                                                            <i data-feather="user" />
                                                            <select
                                                                name="role"
                                                                id="role"
                                                                value={role}
                                                                onChange={(e) => setrole(e.target.value)}
                                                            >
                                                                <option value="user">User</option>
                                                                <option value="admin">Admin</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <button onClick={UpdateUserDetial} className="setting-btn-primary">Save Changes</button>
                                                </div>
                                            </div>
                                        }
                                    </main>
                                </>
                            )
                            :
                            (
                                <div className="sign_login_box">
                                    <h2>Notice : Login Required</h2>
                                    <p>{WhichText}</p>
                                    <button onClick={() => {
                                        if (isAdmin) {
                                            navigate("/admin/dashboard", { state: { gotoSetting: true } });
                                        } else {
                                            navigate("/auth/login");
                                        }
                                    }}>{ButtonWhichText}</button>
                                </div>
                            )
                    }
                </div>
            </div>
        </div >
    );
}

export default UserDashboard;
