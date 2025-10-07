import "../../styles/user_dashboard.css"

function MyBookings() {
    return (
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
    )
}

export default MyBookings
