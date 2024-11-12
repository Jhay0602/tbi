import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Startups from './startups'; 
import ApplicantStatus from './applicantstatus';
import PendingPost from './pendingpost';
import Event from './event';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Placeholder components for new features
const ManageIncubatees = () => <div>Manage Incubatees Page</div>;
const Reports = () => <div>Reports Page</div>;
const FundingRequests = () => <div>Funding Requests Page</div>;

const Dashboard = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col font-poppins">
        {/* AppBar */}
        <div className="bg-blue-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <i className="fas fa-chart-line mr-2"></i> TBI Admin Dashboard
          </h1>
          <div className="flex space-x-4">
            <button className="text-lg hover:text-blue-400 flex items-center">
              <i className="fas fa-bell mr-1"></i>
            </button>
            <button className="text-lg hover:text-blue-400 flex items-center">
              <i className="fas fa-envelope mr-1"></i>
            </button>
            <button className="text-lg hover:text-blue-400 flex items-center">
              <i className="fas fa-user mr-1"></i>
            </button>
          </div>
        </div>

        {/* Main Section */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-1/5 bg-white-900 text-black p-5 shadow-lg border border-gray-300">
            <h2 className="text-2xl font-bold mb-5 flex items-center">
              <i className="fas fa-home mr-2"></i> Dashboard
            </h2>
            <ul>
              <li className="mb-3 flex items-center">
                <i className="fas fa-tachometer-alt mr-2"></i>
                <Link to="/" className="text-lg hover:text-blue-400">Dashboard</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-rocket mr-2"></i>
                <Link to="/startups" className="text-lg hover:text-blue-400">Startups</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-user-check mr-2"></i>
                <Link to="/applicantstatus" className="text-lg hover:text-blue-400">Applicant Status</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-hourglass-start mr-2"></i>
                <Link to="/pendingpost" className="text-lg hover:text-blue-400">Pending Post</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i>
                <Link to="/event" className="text-lg hover:text-blue-400">Event</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-users-cog mr-2"></i>
                <Link to="/manage-incubatees" className="text-lg hover:text-blue-400">Manage Incubatees</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-file-chart-line mr-2"></i>
                <Link to="/reports" className="text-lg hover:text-blue-400">Reports</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-money-check-alt mr-2"></i>
                <Link to="/funding-requests" className="text-lg hover:text-blue-400">Funding Requests</Link>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-cog mr-2"></i>
                <a href="#" className="text-lg hover:text-blue-400">Settings</a>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-question-circle mr-2"></i>
                <a href="#" className="text-lg hover:text-blue-400">Help and Support</a>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                <a href="#" className="text-lg hover:text-blue-400">About</a>
              </li>
              <li className="mb-3 flex items-center">
                <i className="fas fa-sign-out-alt mr-2"></i>
                <a href="#" className="text-lg hover:text-blue-400">Log out</a>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <Routes>
              <Route path="/startups" element={<Startups />} />
              <Route path="/applicantstatus" element={<ApplicantStatus />} />
              <Route path="/pendingpost" element={<PendingPost />} />
              <Route path="/event" element={<Event />} />
              <Route path="/manage-incubatees" element={<ManageIncubatees />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/funding-requests" element={<FundingRequests />} />

              {/* Default Route for Dashboard */}
              <Route 
                path="/" 
                element={
                  <>
                    <h1 className="text-3xl font-semibold mb-6">Welcome to Your Dashboard</h1>
                    <div className="grid grid-cols-3 gap-6">
                      {/* Dashboard Cards with different colors */}
                      <div className="bg-blue-500 p-6 rounded-lg shadow-md text-white">
                        <h3 className="text-xl font-semibold flex items-center">
                          <i className="fas fa-users mr-2"></i> Total Incubatees
                        </h3>
                        <p className="text-2xl mt-2">42</p>
                      </div>
                      <div className="bg-green-500 p-6 rounded-lg shadow-md text-white">
                        <h3 className="text-xl font-semibold flex items-center">
                          <i className="fas fa-users mr-2"></i> Event Participants
                        </h3>
                        <p className="text-2xl mt-2">150</p>
                      </div>
                      <div className="bg-yellow-500 p-6 rounded-lg shadow-md text-white">
                        <h3 className="text-xl font-semibold flex items-center">
                          <i className="fas fa-chart-line mr-2"></i> Monthly Progress
                        </h3>
                        <div className="h-40">
                          {/* Placeholder for progress graph */}
                          <p>Graph goes here</p>
                        </div>
                      </div>
                      <div className="bg-red-500 p-6 rounded-lg shadow-md text-white">
                        <h3 className="text-xl font-semibold flex items-center">
                          <i className="fas fa-file-alt mr-2"></i> Pending Applications
                        </h3>
                        <p className="text-2xl mt-2">8</p>
                      </div>
                      <div className="bg-purple-500 p-6 rounded-lg shadow-md text-white">
                        <h3 className="text-xl font-semibold flex items-center">
                          <i className="fas fa-dollar-sign mr-2"></i> Incubatees' Revenue
                        </h3>
                        <div className="h-40">
                          {/* Placeholder for revenue graph */}
                          <p>Graph goes here</p>
                        </div>
                      </div>
                      <div className="bg-indigo-500 p-6 rounded-lg shadow-md text-white">
                        <h3 className="text-xl font-semibold flex items-center">
                          <i className="fas fa-handshake mr-2"></i> Active Investors
                        </h3>
                        <p className="text-2xl mt-2">15</p>
                      </div>
                      <div className="bg-teal-500 p-6 rounded-lg shadow-md text-white">
                        <h3 className="text-xl font-semibold flex items-center">
                          <i className="fas fa-calendar-alt mr-2"></i> Upcoming Events
                        </h3>
                        <p className="text-2xl mt-2">3</p>
                      </div>
                      <div className="bg-orange-500 p-6 rounded-lg shadow-md text-white">
                        <h3 className="text-xl font-semibold flex items-center">
                          <i className="fas fa-comments mr-2"></i> Incubatee Feedback
                        </h3>
                        <p className="text-lg mt-2">"Great support!"</p>
                      </div>
                    </div>
                  </>
                } 
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
