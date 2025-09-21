import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, UserPlus, QrCode } from 'lucide-react';

const DoctorDashboard = () => {
    const [workerId, setWorkerId] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const navigate = useNavigate();

    // Fetch the logged-in doctor's name from localStorage when the component mounts
    useEffect(() => {
        const name = localStorage.getItem('doctorName');
        if (name) {
            setDoctorName(name);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (workerId.trim()) {
            navigate(`/access/${workerId.trim()}`);
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Welcome Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {doctorName || 'Doctor'}!</h1>
                <p className="mt-2 text-lg text-gray-600">What would you like to do today?</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Action Card: Find Patient */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 h-full">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-indigo-100 p-3 rounded-full">
                                <Search className="h-6 w-6 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Find a Patient Record</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            Enter the worker's unique ID to request access to their health records via OTP verification.
                        </p>
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={workerId}
                                onChange={(e) => setWorkerId(e.target.value)}
                                placeholder="Enter Worker ID (e.g., MHW-KL-000001)"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>

                {/* Side Action Cards */}
                <div className="space-y-8">
                    {/* Register New Worker */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <UserPlus className="h-6 w-6 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">New Patient</h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Onboard a new migrant worker onto the Saarthi platform.
                        </p>
                        <Link
                            to="/register-worker"
                            className="w-full inline-block text-center px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
                        >
                            Register Worker
                        </Link>
                    </div>

                    {/* Scan QR (Coming Soon) */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 opacity-60">
                         <div className="flex items-center gap-4 mb-4">
                            <div className="bg-gray-200 p-3 rounded-full">
                                <QrCode className="h-6 w-6 text-gray-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">Scan QR Code</h2>
                        </div>
                        <p className="text-gray-600">
                            This feature for in-app QR code scanning is coming soon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
