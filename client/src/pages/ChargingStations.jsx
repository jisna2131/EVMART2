import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChargingStations = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">EV Charging Location Module</h1>

            {/* Module Description */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h2 className="card-title">Overview</h2>
                    <p className="card-text">
                        This module focuses on the efficient management, placement, and operation of EV charging stations.
                    </p>
                </div>
            </div>

            {/* Sub-modules Section */}
            <div className="accordion" id="evModulesAccordion">
                {/* Sub-module 1 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="heading1">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse1"
                            aria-expanded="true"
                            aria-controls="collapse1"
                        >
                            1. Charging Station Mapping & Location Optimization
                        </button>
                    </h2>
                    <div
                        id="collapse1"
                        className="accordion-collapse collapse show"
                        aria-labelledby="heading1"
                        data-bs-parent="#evModulesAccordion"
                    >
                        <div className="accordion-body">
                            <ul>
                                <li>
                                    Uses geographic data, traffic patterns, and energy grid capacity to determine optimal
                                    locations for new charging stations.
                                </li>
                                <li>
                                    Integrates with real-time traffic and user data to recommend optimal locations for
                                    installation.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sub-module 2 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="heading2">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse2"
                            aria-expanded="false"
                            aria-controls="collapse2"
                        >
                            2. Charging Station Availability & Scheduling
                        </button>
                    </h2>
                    <div
                        id="collapse2"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading2"
                        data-bs-parent="#evModulesAccordion"
                    >
                        <div className="accordion-body">
                            <ul>
                                <li>Tracks the status of each charging station (occupied, available, under maintenance).</li>
                                <li>Allows users to check availability and reserve slots in advance.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sub-module 3 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="heading3">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse3"
                            aria-expanded="false"
                            aria-controls="collapse3"
                        >
                            3. Route Planner & Navigation
                        </button>
                    </h2>
                    <div
                        id="collapse3"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading3"
                        data-bs-parent="#evModulesAccordion"
                    >
                        <div className="accordion-body">
                            <ul>
                                <li>
                                    Provides navigation features to guide users to the nearest available charging station
                                    based on their location.
                                </li>
                                <li>
                                    Integration with GPS to show real-time updates of traffic conditions and charging station
                                    status.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sub-module 4 */}
                <div className="accordion-item">
                    <h2 className="accordion-header" id="heading4">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse4"
                            aria-expanded="false"
                            aria-controls="collapse4"
                        >
                            4. Smart Grid Integration
                        </button>
                    </h2>
                    <div
                        id="collapse4"
                        className="accordion-collapse collapse"
                        aria-labelledby="heading4"
                        data-bs-parent="#evModulesAccordion"
                    >
                        <div className="accordion-body">
                            <ul>
                                <li>Manages the load distribution across stations to prevent grid overload.</li>
                                <li>
                                    Integrates with local energy grids to optimize charging times and reduce energy costs
                                    (e.g., offering cheaper rates during off-peak hours).
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChargingStation;
