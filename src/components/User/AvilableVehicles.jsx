import "../../styles/user_dashboard.css"

function AvilableVehicles() {
    return (
        <div className="card" data-aos="fade-up">
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
    )
}

export default AvilableVehicles
