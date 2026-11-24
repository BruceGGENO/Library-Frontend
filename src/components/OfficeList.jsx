import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OfficeList() {
    const [offices, setOffices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchAllOffices();
    }, []);

    const fetchAllOffices = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/offices/all");
            setOffices(response.data);
        } catch (error) {
            console.error("Error fetching offices:", error);
        }
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query.trim() === "") {
            fetchAllOffices();
        } else {
            try {
                const response = await axios.get(`http://localhost:8080/api/offices/search?query=${query}`);
                setOffices(response.data);
            } catch (error) {
                console.error("Error searching offices:", error);
            }
        }
    };

    const handleDelete = async (id) => {

        try {
            const response = await axios.delete(`http://localhost:8080/api/offices/${id}`);
            if (response.status >= 200 && response.status <= 203) {
                alert("Office deleted successfully!");

                if (searchTerm.trim() === "") {
                    fetchAllOffices();
                } else {
                    const searchRes = await axios.get(`http://localhost:8080/api/offices/search?query=${searchTerm}`);
                    setOffices(searchRes.data);
                }
            }
        } catch (error) {
            console.error("Error deleting office:", error);
            alert("Failed to delete office.");
        }

    };

    return (
        <div className="min-h-screen  py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Available Offices</h1>

                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search by name or number..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />

                    </div>
                </div>

                <div className=" shadow-md rounded-lg overflow-hidden border border-gray-200">
                    <table className="min-w-full ">
                        <thead className="text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold ">
                                    Office Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold ">
                                    Office Number
                                </th>
                                <th className="px-6 py-3 text-center  text-xs font-semibold ">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {offices.length > 0 ? (
                                offices.map((office) => (
                                    <tr key={office.id} className="">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                            {office.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm ">
                                            {office.officeNumber}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => alert("Update is not working yettt.")}
                                                className="text-white hover:text-green-900 bg-green-600 hover:bg-blue-100 px-3 py-1.5 rounded-md mr-3"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDelete(office.id)}
                                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                                        No office found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default OfficeList;