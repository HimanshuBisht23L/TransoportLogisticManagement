import { useEffect, useState } from "react";
import "../../styles/admin_dashboard.css";
import axios from "axios";

function UserManagement({ userData, refreshUser }) {

    const [bookeduser, setBookedUser] = useState([]);

    const FetchBookedUsers = async () => {
        try {

            const res = await axios.post("http://localhost:3000/admin/ManageUsers", {
                uid: userData.id
            }, { withCredentials: true });

            if (res.data.success) {
                console.log(res.data);
                setBookedUser(res.data.users);
            }
            else {
                console.log(res.data.message);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        FetchBookedUsers();
    }, [userData?.id])



    const ChangeBookingStatus = async (id, action) => {
        try {
            const res = await axios.post("http://localhost:3000/admin/change_booking_status", { b_id: id, action: action }, { withCredentials: true });

            if (res.data.success) {
                console.log(res.data.message);
                await refreshUser();
                await FetchBookedUsers();
            }
            else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <div className="um-card" data-aos="fade-up">
            <div className="um-card-header">
                <h2>User Requests</h2>
                <div className="lt-search-box">
                    <input type="text" name="placeSearch" placeholder="Search vehicle" />
                    <button className="lt-search-btn">
                        <i data-feather="search" ></i> Search
                    </button>
                    <button
                        onClick={FetchBookedUsers}
                        className="um-refresh-btn"
                    >
                        <i data-feather="refresh-cw"></i> Refresh
                    </button>
                </div>
            </div>

            <div className="um-table-wrapper">

                {

                    bookeduser.length !== 0 ?

                        <table className="um-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Pickup</th>
                                    <th>Dropoff</th>
                                    <th>Weight (kg)</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Requested At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookeduser.map((u) => {

                                        if (u.status === "cancelled") return;
                                        if (u.status === "delivered") return;

                                        return (
                                            <tr key={u.id}>
                                                <td data-label="User ID">{u.username}</td>
                                                <td data-label="Pickup">{u.pickup_address}</td>
                                                <td data-label="Dropoff">{u.dropoff_address}</td>
                                                <td data-label="Weight">{u.weight}</td>
                                                <td data-label="Price">₹{u.price}</td>
                                                <td data-label="Status">
                                                    <span className={`um-status um-${u.status}`}>{u.status}</span>
                                                </td>
                                                <td data-label="Requested At">
                                                    {new Date(u.created_at).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </td>
                                                <td data-label="Actions" className="um-actions">
                                                    {
                                                        u.status === "pending" ? (
                                                            <>
                                                                <button onClick={(e) => {
                                                                    ChangeBookingStatus(u.id, "accept");
                                                                }}
                                                                    className="um-btn um-accept"> Accept </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        ChangeBookingStatus(u.id, "cancel");
                                                                    }}
                                                                    className="um-btn um-reject"> Reject </button>
                                                            </>
                                                        ) : u.status === "accepted" ? (
                                                            <button
                                                                onClick={(e) => ChangeBookingStatus(u.id, "start")}
                                                                className="um-btn um-start"
                                                            >Start Journey</button>
                                                        ) : (
                                                            <button
                                                                onClick={(e) =>
                                                                    ChangeBookingStatus(u.id, "completed")}
                                                                className="um-info"
                                                            > Delivered</button>
                                                        )
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </table>
                        :

                        <div className="no-user">
                            No Users Present.
                        </div>
                }
            </div>
        </div>
    );
}

export default UserManagement;
