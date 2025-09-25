import AOS from "aos";
import "aos/dist/aos.css";
import '../styles/user_dashboard.css';
import { useEffect, useState } from "react";
import feather from "feather-icons";

function UserDashboard() {

    const [ActiveTab, setActiveTab] = useState("Dashboard");

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

                    {/* Main Content */}
                    <main className="content">
                        <div className="stats-grid">
                            <div className="stat-card" data-aos="fade-up">
                                <div className="stat-icon blue-bg">
                                    <i data-feather="truck"></i>
                                </div>
                                <div>
                                    <p>Available Vehicles</p>
                                    <h2>24</h2>
                                </div>
                            </div>

                            <div className="stat-card" data-aos="fade-up" data-aos-delay="100">
                                <div className="stat-icon green-bg">
                                    <i data-feather="check-circle"></i>
                                </div>
                                <div>
                                    <p>Completed Bookings</p>
                                    <h2>12</h2>
                                </div>
                            </div>

                            <div className="stat-card" data-aos="fade-up" data-aos-delay="200">
                                <div className="stat-icon yellow-bg">
                                    <i data-feather="clock"></i>
                                </div>
                                <div>
                                    <p>Pending Bookings</p>
                                    <h2>3</h2>
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
                                    <h2>Hello, John 👋</h2>
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
                            (
                                <>
                                    <div className="card" data-aos="fade-up">
                                        <div className="sub-card">
                                            <div className="card-header">
                                                <h2>Route Tracking</h2>
                                            </div>
                                            <div className="map-container"></div>
                                            <div className="card-footer">
                                                <div>
                                                    <p>Current Vehicle: <b>Truck #LGT-2456</b></p>
                                                    <p>ETA: <b>2 hours 15 minutes</b></p>
                                                </div>
                                                <button className="user-btn-primary">Track Live</button>
                                            </div>
                                        </div>
                                        <div className="sub-card">
                                            <div className="card-header">
                                                <h2>Route Tracking</h2>
                                            </div>
                                            <div className="map-container"></div>
                                            <div className="card-footer">
                                                <div>
                                                    <p>Current Vehicle: <b>Truck #LGT-2456</b></p>
                                                    <p>ETA: <b>2 hours 15 minutes</b></p>
                                                </div>
                                                <button className="user-btn-primary">Track Live</button>
                                            </div>
                                        </div>
                                        <div className="sub-card">
                                            <div className="card-header">
                                                <h2>Route Tracking</h2>
                                            </div>
                                            <div className="map-container"></div>
                                            <div className="card-footer">
                                                <div>
                                                    <p>Current Vehicle: <b>Truck #LGT-2456</b></p>
                                                    <p>ETA: <b>2 hours 15 minutes</b></p>
                                                </div>
                                                <button className="user-btn-primary">Track Live</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        {/* Available Vehicles Table */}
                        {
                            ActiveTab === "AvilableVehicles" && <div className="card" data-aos="fade-up">
                                <div className="card-header available-vehicles-header">
                                    <h2>Available Vehicles</h2>
                                    <div className="search-btn-box">
                                        <input type="text" name="placeSearch" placeholder="Search Pick Up Location" />
                                        <button className="search-btn">
                                            <i data-feather="search" ></i> Search
                                        </button>
                                    </div>
                                </div>
                                <div className="table-wrapper">
                                    <table className="vehicles-table">
                                        <thead>
                                            <tr>
                                                <th>Vehicle ID</th>
                                                <th>Type</th>
                                                <th>Capacity</th>
                                                <th>From</th>
                                                <th>To</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>LGT-2456</td>
                                                <td>Truck</td>
                                                <td>5 Tons</td>
                                                <td>New York</td>
                                                <td>York</td>
                                                <td><span className="status available">Available</span></td>
                                                <td><button className="link-btn">Book</button></td>
                                            </tr>
                                            <tr>
                                                <td>LGT-1892</td>
                                                <td>Van</td>
                                                <td>1 Ton</td>
                                                <td>Chicago</td>
                                                <td>new Chicago</td>
                                                <td><span className="status available">Available</span></td>
                                                <td><button className="link-btn">Book</button></td>
                                            </tr>
                                            <tr>
                                                <td>LGT-3421</td>
                                                <td>Trailer</td>
                                                <td>10 Tons</td>
                                                <td>Los Angeles</td>
                                                <td>Lost Angeles</td>
                                                <td><span className="status onroute">On Route</span></td>
                                                <td><button className="link-btn disabled">Book</button></td>
                                            </tr>
                                            <tr>
                                                <td>LGT-8765</td>
                                                <td>Truck</td>
                                                <td>7 Tons</td>
                                                <td>Houston</td>
                                                <td>new Houston</td>
                                                <td><span className="status available">Available</span></td>
                                                <td><button className="link-btn">Book</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }


                        {/* Bookings Section */}
                        {
                            ActiveTab === "Bookings" &&
                            <>
                                <div className="card" data-aos="fade-up">
                                    <div className="card-header available-vehicles-header">
                                        <h2>My Bookings</h2>
                                    </div>
                                    <div className="table-wrapper">
                                        <table className="vehicles-table">
                                            <thead>
                                                <tr>
                                                    <th>Booking ID</th>
                                                    <th>Vehicle</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>#LGT-2456</td>
                                                    <td>Truck</td>
                                                    <td>New York</td>
                                                    <td>York</td>
                                                    <td>23 Sep 2025</td>
                                                    <td><span className="status available">Completed</span></td>
                                                    <td>
                                                        <button className="link-btn">Download Invoice</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>#LGT-1892</td>
                                                    <td>Van</td>
                                                    <td>Chicago</td>
                                                    <td>new Chicago</td>
                                                    <td>23 Sep 2025</td>
                                                    <td><span className="status available">Completed</span></td>
                                                    <td>
                                                        <button className="link-btn">Download Invoice</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>#LGT-3421</td>
                                                    <td>Trailer</td>
                                                    <td>Los Angeles</td>
                                                    <td>Lost Angeles</td>
                                                    <td>23 Sep 2025</td>
                                                    <td><span className="status onroute">Pending</span></td>
                                                    <td>
                                                        <button className="link-btn">Cancel</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>#LGT-8765</td>
                                                    <td>Truck</td>
                                                    <td>Houston</td>
                                                    <td>new Houston</td>
                                                    <td>23 Sep 2025</td>
                                                    <td><span className="status onroute">Pending</span></td>
                                                    <td>
                                                        <button className="link-btn">Cancel</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
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
                                            <input name="username" id="username" type="text" defaultValue="John Doe" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <div className="setting-input-wrapper">
                                            <i data-feather="mail" />
                                            <input name="email" id="email" type="email" defaultValue="Test123@gmil.com" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <div className="setting-input-wrapper">
                                            <i data-feather="phone" />
                                            <input name="phone" id="phone" type="text" defaultValue="+91 234567890" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <div className="setting-input-wrapper">
                                            <i data-feather="lock" />
                                            <input name="password" id="password" type="password" defaultValue="********" />
                                        </div>
                                    </div>
                                    <button className="setting-btn-primary">Save Changes</button>
                                </div>
                            </div>
                        }
                    </main>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
