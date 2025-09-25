import AOS from "aos";
import "aos/dist/aos.css";
import '../styles/admin_dashboard.css';
import { useEffect, useState } from "react";
import feather from "feather-icons";
import { Link } from "react-router-dom";

function AdminDashboard() {

  const [ActiveTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    AOS.init({ duration: 500, once: false });
    feather.replace();
  }, [ActiveTab]);

  useEffect(() => {
    AOS.refresh();
  }, [ActiveTab]);

  const toggleSidebar = () => {
    document.querySelector(".lt-sidebar").classList.toggle("lt-collapsed");
  };

  const changeDash = (tab) => {
    setActiveTab(tab);
    document.querySelectorAll('.lt-nav-item').forEach(item => item.classList.remove('lt-active'));
    const el = document.querySelector(`.lt-nav-item.lt-${tab}`);
    if (el) el.classList.add('lt-active');
  }

  return (
    <div className="lt-body">
      <div className="lt-container">
        {/* Sidebar */}
        <div className="lt-sidebar">
          <div className="lt-sidebar-header">
            <div className="lt-logo">
              <i data-feather="truck" className="lt-icon-lg lt-blue"></i>
              <span className="lt-brand">LogiTrack</span>
            </div>
            <button onClick={toggleSidebar} className="lt-sidebar-toggle">
              <i data-feather="chevron-left"></i>
            </button>
          </div>

          <nav className="lt-nav">
            <div onClick={() => { changeDash("Dashboard") }} className="lt-nav-item lt-Dashboard lt-active">
              <i data-feather="home" className="lt-nav-icon"></i>
              <span>Dashboard</span>
            </div>
            <div onClick={() => { changeDash("ManageVehicles") }} className="lt-nav-item lt-ManageVehicles">
              <i data-feather="truck" className="lt-nav-icon"></i>
              <span>Manage Vehicles</span>
            </div>
            <div onClick={() => { changeDash("UserManagement") }} className="lt-nav-item lt-UserManagement">
              <i data-feather="map" className="lt-nav-icon"></i>
              <span>User Management</span>
            </div>
            <div onClick={() => { changeDash("Settings") }} className="lt-nav-item lt-Settings">
              <i data-feather="settings" className="lt-nav-icon"></i>
              <span>Settings</span>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="lt-main">
          <header className="lt-navbar">
            <h1>User Dashboard</h1>
            <div className="lt-navbar-actions">
              <button className="lt-notif-btn">
                <i data-feather="bell"></i>
                <span className="lt-notif-dot"></span>
              </button>
              <button className="lt-profile-btn">
                <img src="http://static.photos/people/200x200/1" alt="User" />
                <span>John Doe</span>
                <i data-feather="chevron-down"></i>
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="lt-content">
            <div className="lt-stats">
              <div className="lt-stat" data-aos="fade-up">
                <div className="lt-stat-icon lt-blue-bg">
                  <i data-feather="truck"></i>
                </div>
                <div>
                  <p>Total Vehicles</p>
                  <h2>24</h2>
                </div>
              </div>

              <div className="lt-stat" data-aos="fade-up" data-aos-delay="100">
                <div className="lt-stat-icon lt-green-bg">
                  <i data-feather="check-circle"></i>
                </div>
                <div>
                  <p>Active Bookings</p>
                  <h2>12</h2>
                </div>
              </div>

              <div className="lt-stat" data-aos="fade-up" data-aos-delay="200">
                <div className="lt-stat-icon lt-yellow-bg">
                  <i data-feather="users"></i>
                </div>
                <div>
                  <p>Registered User</p>
                  <h2>3</h2>
                </div>
              </div>

              <div className="lt-stat" data-aos="fade-up" data-aos-delay="300">
                <div className="lt-stat-icon lt-purple-bg">
                  <i data-feather="dollar-sign"></i>
                </div>
                <div>
                  <p>Total Revenue</p>
                  <h2>$2,450</h2>
                </div>
              </div>
            </div>


            {/* Intial Dashboard */}
            {
              ActiveTab === "UserManagement" &&
              <div data-aos="fade-up">
                {/* User Management code yaha Likhna hai */}
              </div>
            }


            {
              ActiveTab === "Dashboard" &&
              <div className="add-vehicle-form vehicle-card" data-aos="fade-up">
                <div className="add-vehicle-header">
                  <h2>Add New Vehicle</h2>
                </div>
                <form>
                  <div className="add-vehicle-grid">
                    <div>
                      <label>Vehicle ID</label>
                      <input type="text" />
                    </div>
                    <div>
                      <label>Vehicle Type</label>
                      <select>
                        <option>Truck</option>
                        <option>Van</option>
                        <option>Trailer</option>
                        <option>Container</option>
                      </select>
                    </div>
                    <div>
                      <label>From</label>
                      <input type="text" />
                    </div>
                    <div>
                      <label>To</label>
                      <input type="text" />
                    </div>
                  </div>
                  <div>
                    <label>Capacity</label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Status</label>
                    <select>
                      <option>Available</option>
                      <option>On Route</option>
                      <option>Maintenance</option>
                    </select>
                  </div>
                  <div className="add-vehicle-actions">
                    <button type="submit">
                      <i data-feather="plus-circle"></i>
                      Add Vehicle
                    </button>
                  </div>
                </form>
              </div>

            }


            {/* Available Vehicles Table */}
            {
              ActiveTab === "ManageVehicles" && <div className="lt-card" data-aos="fade-up">
                <div className="lt-card-header lt-veh-header">
                  <h2>Vehicle Management</h2>
                  <div className="lt-search-box">
                    <input type="text" name="placeSearch" placeholder="Search vehicle" />
                    <button className="lt-search-btn">
                      <i data-feather="search" ></i> Search
                    </button>
                    <button className="lt-refresh-btn">
                      <i data-feather="refresh-cw" ></i> Refresh
                    </button>
                  </div>
                </div>
                <div className="lt-table-wrap">
                  <table className="lt-vehicles-table">
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
                        <td><span className="lt-status lt-available">Available</span></td>
                        <td className="lt-vehicle-actions">
                          <Link className="lt-edit-btn">Edit</Link>
                          <Link className="lt-delete-btn">Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>LGT-1892</td>
                        <td>Van</td>
                        <td>1 Ton</td>
                        <td>Chicago</td>
                        <td>new Chicago</td>
                        <td><span className="lt-status lt-available">Available</span></td>
                        <td className="lt-vehicle-actions">
                          <Link className="lt-edit-btn">Edit</Link>
                          <Link className="lt-delete-btn">Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>LGT-3421</td>
                        <td>Trailer</td>
                        <td>10 Tons</td>
                        <td>Los Angeles</td>
                        <td>Lost Angeles</td>
                        <td><span className="lt-status lt-onroute">On Route</span></td>
                        <td className="lt-vehicle-actions">
                          <Link className="lt-edit-btn">Edit</Link>
                          <Link className="lt-delete-btn">Delete</Link>
                        </td>
                      </tr>
                      <tr>
                        <td>LGT-8765</td>
                        <td>Truck</td>
                        <td>7 Tons</td>
                        <td>Houston</td>
                        <td>new Houston</td>
                        <td><span className="lt-status lt-available">Available</span></td>
                        <td className="lt-vehicle-actions">
                          <Link className="lt-edit-btn">Edit</Link>
                          <Link className="lt-delete-btn">Delete</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            }


            {
              ActiveTab === "Settings" &&
              <div className="lt-setting-card" data-aos="fade-up">
                <div className="lt-card-header lt-veh-header">
                  <h2>Settings</h2>
                </div>
                <div className="lt-settings-form">
                  <div className="lt-form-group">
                    <label>Full Name</label>
                    <div className="lt-input-wrapper">
                      <i data-feather="user" />
                      <input name="username" id="username" type="text" defaultValue="John Doe" />
                    </div>
                  </div>
                  <div className="lt-form-group">
                    <label>Email</label>
                    <div className="lt-input-wrapper">
                      <i data-feather="mail" />
                      <input name="email" id="email" type="email" defaultValue="Test123@gmil.com" />
                    </div>
                  </div>
                  <div className="lt-form-group">
                    <label>Phone</label>
                    <div className="lt-input-wrapper">
                      <i data-feather="phone" />
                      <input name="phone" id="phone" type="text" defaultValue="+91 234567890" />
                    </div>
                  </div>
                  <div className="lt-form-group">
                    <label>Password</label>
                    <div className="lt-input-wrapper">
                      <i data-feather="lock" />
                      <input name="password" id="password" type="password" defaultValue="********" />
                    </div>
                  </div>
                  <button className="lt-setting-save-btn">Save Changes</button>
                </div>
              </div>
            }
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
