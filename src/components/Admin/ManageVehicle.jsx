import '../../styles/admin_dashboard.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from 'react'
import axios from 'axios'
import feather from "feather-icons";
import { useNavigate } from 'react-router-dom';

function ManageVehicle({ userData, ActiveTab }) {

    const [ManageVehicleData, setManageVehicleData] = useState([]);

    const fetchvehicle = async () => {
        try {
            const res = await axios.post("http://localhost:3000/admin/ManageVehicle", {
                uid: userData.id
            }, { withCredentials: true });

            if (res.data.success) {
                console.log(res.data);
                setManageVehicleData(res.data.services);
            }
            else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchvehicle();
    }, [])


    useEffect(() => {
        AOS.init({ duration: 500, once: false });
        feather.replace();
    }, [ActiveTab]);

    useEffect(() => {
        AOS.refresh();
    }, [ActiveTab]);


    const EditVehicle = async () => {
        navigare
    }

    return (
        <>
            <div className="lt-card" data-aos="fade-up">
                <div className="lt-card-header lt-veh-header">
                    <h2>Vehicle Management</h2>
                    <button
                        onClick={fetchvehicle}
                        className="lt-refresh-btn"
                    >
                        <i data-feather="refresh-cw" ></i> Refresh
                    </button>
                </div>
                {
                    ManageVehicleData.map((vehicle) => {
                        return (
                            <div className="lt-table-wrap">
                                <div className="lt-vehicles-left-table">
                                    <div className='car-div'>
                                        <img src="../../public/images/car.png" alt="car" />
                                    </div>
                                    <div className='car-detail-box'>
                                        <div className='reg-no-box'><b>{vehicle.vehicle_type}</b>•<p>{vehicle.registration_no}</p></div>
                                        <p>{vehicle.description}</p>
                                        <div className='car-other-detail'>
                                            <div>
                                                <p>Capacity</p>
                                                <b>{vehicle.capacity} kg</b>
                                            </div>
                                            <div>
                                                <p>Route</p>
                                                <b>{vehicle.src} → {vehicle.dest}</b>
                                            </div>
                                            <div>
                                                <p>Departure</p>
                                                <b>{new Date(vehicle.departure_time).toLocaleString()}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lt-vehicles-right-table">
                                    <div className='avilbe-box'>
                                        <div className={`right-status ${vehicle.availability ? "available" : "onroute"}`}>{vehicle.availability ? "available" : "on route"}</div>
                                        <div className='price-box'> ₹{vehicle.price}</div>
                                    </div>
                                    <div className='right-buttons'>
                                        <button
                                            onClick={EditVehicle}
                                            className="lt-edit-btn"
                                        >Edit</button>
                                        <button className="lt-delete-btn">Delete</button>
                                    </div>
                                    <div className='id-date-box'>
                                        <p id='uid'><b>ID : </b>{vehicle.id}</p>
                                        <p><b>Added : </b>{new Date(vehicle.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ManageVehicle
