import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Customer() {
    // eslint-disable-next-line no-unused-vars
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleButtonClick = () => {
        navigate('/order'); // Use navigate function
    };

    // Fetch customers from the API on component mount
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Customer`)
            .then((response) => response.json())
            .then((data) => setCustomers(data));
    }, []);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
    }

    function handleAddNewCustomer(event) {
        event.preventDefault();
        const { name, email, phone, address } = newCustomer;

        if (!name || !email || !phone || !address) {
            alert("Semua field harus diisi");
            return;
        }

        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/customer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCustomer),
        })
            .then((response) => response.json())
            .then(() => {
                // Fetch updated customers list
                fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Customer`)
                    .then((response) => response.json())
                    .then((data) => {
                        setCustomers(data);
                        handleButtonClick(); // Navigate to /order after successful submission
                    });
            });
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Customer Form</h1>
            <form onSubmit={handleAddNewCustomer} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={newCustomer.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={newCustomer.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={newCustomer.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-medium mb-2">Address:</label>
                    <textarea
                        name="address"
                        value={newCustomer.address}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows="4"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                >
                   <a href="/order">Add Customer</a> 
                </button>
            </form>
        </div>
    );
}
