import AOS from "aos";
import "aos/dist/aos.css";
import '../styles/admin_dashboard.css';
import { useContext, useEffect, useState } from "react";
import feather from "feather-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";
import ManageVehicle from "../components/Admin/ManageVehicle";
import UserManagement from "../components/Admin/UserManagement";

function AdminDashboard() {

  const { userData, dashboardData, refreshUser } = useContext(userContext)
  const navigate = useNavigate();
  const [ActiveTab, setActiveTab] = useState("Dashboard");
  const location = useLocation();
  const { gotoSetting } = location.state || {};
  const [WhichText, setWhichText] = useState("");
  const [ButtonWhichText, setButtonWhichText] = useState("Login");
  const isLoggedIn = Boolean(userData && userData.role);
  const isAdmin = userData?.role === 'admin';
  const isUserRole = userData?.role === 'user';


  // Adding Vehicle
  const [regnumber, setRegNumber] = useState("");
  const [vehicletype, setVehicletype] = useState("");
  const [srcpoint, setSrcPoint] = useState("");
  const [destpoint, setDestPoint] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [depTime, setDeptTime] = useState("");
  const [vehiclestatus, setVehicleStatus] = useState("");
  const [desc, setDesc] = useState("");



  // setting values
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [role, setrole] = useState("");


  useEffect(() => {
    if (gotoSetting) {
      changeDash("Settings");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [gotoSetting])

  useEffect(() => {
    if (!isLoggedIn) {
      setWhichText("You need to login for accessing transportation facilities.");
      setButtonWhichText("Login");
      return;
    }

    if (isUserRole) {
      setWhichText("This is not accessible for user role.");
      setButtonWhichText("Change User");
      return;
    }

    setWhichText("");
    setButtonWhichText("Login");
  }, [isLoggedIn, isUserRole]);


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
    document.querySelector(".lt-sidebar").classList.toggle("lt-collapsed");
  };

  const changeDash = (tab) => {
    setActiveTab(tab);
    document.querySelectorAll('.lt-nav-item').forEach(item => item.classList.remove('lt-active'));
    const el = document.querySelector(`.lt-nav-item.lt-${tab}`);
    if (el) el.classList.add('lt-active');
  }



  const UpdateAdminDetial = async () => {
    try {

      const data = {
        id: userData.id,
        name: name,
        email: email,
        role: role,
        password: password,
        number: phone
      }

      const update = await axios.post("http://localhost:3000/admin/Admin_Setting", data, { withCredentials: true });

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


  const AddVehicle = async (e) => {
    e.preventDefault();

    const data = {
      uid: userData.id,
      vehicle_type: vehicletype,
      registration_no: regnumber,
      capacity: capacity,
      src: srcpoint,
      dest: destpoint,
      departure_time: new Date(depTime).toISOString(),
      availability: vehiclestatus === "available" ? true : false,
      price: price,
      description: desc
    }

    try {

      const res = await axios.post("http://localhost:3000/admin/addservice", data, { withCredentials: true });

      if (res.data.success) {
        console.log(res.data.message);
        await refreshUser();
        changeDash("ManageVehicles");
      }
      else {
        console.log(res.data.message);
      }

      setRegNumber("");
      setPrice("");
      setCapacity("");
      setDeptTime("");
      setSrcPoint("");
      setDestPoint("");
      setVehicleStatus("");
      setDesc("");
      setVehicletype("");

    } catch (error) {
      console.log(error.message)
    }
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
            <h1>Admin Dashboard</h1>
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

          {

            (isLoggedIn && isAdmin) ?
              <>
                {/* Main Content */}
                < main className="lt-content">
                  <div className="lt-stats">
                    <div className="lt-stat" data-aos="fade-up">
                      <div className="lt-stat-icon lt-blue-bg">
                        <i data-feather="truck"></i>
                      </div>
                      <div>
                        <p>Total Vehicles</p>
                        <h2>{dashboardData.admin.totalVehicles}</h2>
                      </div>
                    </div>

                    <div className="lt-stat" data-aos="fade-up" data-aos-delay="100">
                      <div className="lt-stat-icon lt-green-bg">
                        <i data-feather="check-circle"></i>
                      </div>
                      <div>
                        <p>Active Bookings</p>
                        <h2>{dashboardData.admin.activeUsers}</h2>
                      </div>
                    </div>

                    <div className="lt-stat" data-aos="fade-up" data-aos-delay="200">
                      <div className="lt-stat-icon lt-yellow-bg">
                        <i data-feather="users"></i>
                      </div>
                      <div>
                        <p>Registered User</p>
                        <h2>{dashboardData.admin.registeredUsers}</h2>
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
                    <UserManagement
                      userData={userData}
                      refreshUser={refreshUser}
                    />
                  }


                  {
                    ActiveTab === "Dashboard" &&
                    <div className="add-vehicle-form vehicle-card" data-aos="fade-up">
                      <div className="add-vehicle-header">
                        <h2>Add New Vehicle</h2>
                      </div>
                      <form onSubmit={(e) => AddVehicle(e)}>
                        <div className="add-vehicle-grid">
                          <div>
                            <label>Registration Number</label>
                            <input
                              placeholder="Registration Number"
                              type="text"
                              value={regnumber}
                              onChange={(e) => setRegNumber(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label>Vehicle Type</label>
                            <select
                              defaultValue={"Truck"}
                              value={vehicletype}
                              onChange={(e) => setVehicletype(e.target.value)}
                              required
                            >
                              <option>Truck</option>
                              <option>Car</option>
                              <option>Van</option>
                              <option>Trailer</option>
                              <option>Container</option>
                            </select>
                          </div>
                          <div>
                            <label>From</label>
                            <input
                              placeholder="Enter Source Point"
                              type="text"
                              value={srcpoint}
                              onChange={(e) => setSrcPoint(e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label>To</label>
                            <input
                              placeholder="Enter Destination Point"
                              type="text"
                              value={destpoint}
                              onChange={(e) => setDestPoint(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label>Capacity (kg)</label>
                          <input
                            placeholder="Enter Capacity"
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(Number(e.target.value))}
                            required
                          />
                        </div>
                        <div>
                          <label>Price</label>
                          <input
                            placeholder="Enter Price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                          />
                        </div>
                        <div>
                          <label>Departure Time</label>
                          <input
                            type="datetime-local"
                            value={depTime}
                            onChange={(e) => setDeptTime(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label>Status</label>
                          <select
                            value={vehiclestatus}
                            onChange={(e) => setVehicleStatus(e.target.value)}
                            required
                          >
                            <option defaultValue={"available"} value="available">Available</option>
                            <option value={"On Route"}>On Route</option>
                          </select>
                        </div>
                        <div>
                          <label>Description</label>
                          <textarea
                            placeholder="Enter Detailed Description of Journey"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required
                          ></textarea>
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
                    ActiveTab === "ManageVehicles" &&
                    <ManageVehicle
                      userData={userData}
                      ActiveTab={ActiveTab}
                    />
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
                            <input
                              name="username"
                              id="username"
                              type="text"
                              value={name}
                              onChange={(e) => setname(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="lt-form-group">
                          <label>Email</label>
                          <div className="lt-input-wrapper">
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
                        <div className="lt-form-group">
                          <label>Phone</label>
                          <div className="lt-input-wrapper">
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
                        <div className="lt-form-group">
                          <label>Password</label>
                          <div className="lt-input-wrapper">
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
                        <div className="lt-form-group">
                          <label>Role</label>
                          <div className="lt-input-wrapper">
                            <i data-feather="user" />
                            <select
                              name="role"
                              id="role"
                              value={role}
                              onChange={(e) => setrole(e.target.value)}
                            >
                              <option value="admin">Admin</option>
                              <option value="user">User</option>
                            </select>

                          </div>
                        </div>
                        <button onClick={UpdateAdminDetial} className="lt-setting-save-btn">Save Changes</button>
                      </div>
                    </div>
                  }
                </main>
              </>
              :
              (
                <div className="ad-sign_login_box">
                  <h2>Notice : Login Required</h2>
                  <p>{WhichText}</p>
                  <button onClick={() => {
                    if (isUserRole) {
                      navigate("/user/dashboard", { state: { gotoSetting: true } });
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

export default AdminDashboard;
