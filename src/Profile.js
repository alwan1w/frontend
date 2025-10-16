import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaUser, FaMapMarkerAlt, FaPhone, FaLock, FaCalendar } from 'react-icons/fa';

function Profile() {
  const location = useLocation();
  const userData = location.state.userData;

  const coords = {
    lat: parseFloat(userData.location.coordinates.latitude),
    lng: parseFloat(userData.location.coordinates.longitude),
  };

  const [activeTab, setActiveTab] = React.useState('about');

  const tabs = [
    { id: 'about', icon: <FaUser />, label: 'About', content: (
      <div className="space-y-4">
        <p>Live in {userData.location.city}, {userData.location.state}. Love {userData.location.country}.</p>
        <div className="flex space-x-2">
          <span className="px-2 py-1 text-green-800 bg-green-100 rounded">Plant Parent</span>
          <span className="px-2 py-1 text-red-800 bg-red-100 rounded">Interior Designer</span>
        </div>
      </div>
    ) },
    { id: 'location', icon: <FaMapMarkerAlt />, label: 'Location', content: (
      <div className="space-y-4">
        <p>{userData.location.street.number} {userData.location.street.name}, {userData.location.city}, {userData.location.state}, {userData.location.country} {userData.location.postcode}</p>
        <p>Timezone: {userData.location.timezone.description} ({userData.location.timezone.offset})</p>
        <p>Coordinates: Lat {userData.location.coordinates.latitude}, Lng {userData.location.coordinates.longitude}</p>
        <MapContainer center={coords} zoom={5} style={{ height: '200px', width: '100%', marginTop: '10px' }} className="rounded-lg shadow-md">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coords}>
            <Popup>{userData.location.city}</Popup>
          </Marker>
        </MapContainer>
      </div>
    ) },
    { id: 'contact', icon: <FaPhone />, label: 'Contact', content: (
      <div className="space-y-2">
        <p>Email: {userData.email}</p>
        <p>Phone: {userData.phone}</p>
        <p>Cell: {userData.cell}</p>
      </div>
    ) },
    { id: 'personal', icon: <FaUser />, label: 'Personal', content: (
      <div className="space-y-2">
        <p>Gender: {userData.gender}</p>
        <p>Nationality: {userData.nat}</p>
        <p>DOB: {new Date(userData.dob.date).toLocaleDateString()} (Age: {userData.dob.age})</p>
      </div>
    ) },
    
    { id: 'registration', icon: <FaCalendar />, label: 'Registration', content: (
      <div className="space-y-2">
        <p>Date: {new Date(userData.registered.date).toLocaleDateString()}</p>
        <p>Age: {userData.registered.age}</p>
      </div>
    ) },
  ];

  return (
    <div className="min-h-screen text-gray-100 bg-gradient-to-br from-gray-900 to-black">
      {/* Hero Section */}
      <div className="max-w-4xl p-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2"
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={userData.picture.large}
              alt={userData.name.first}
              className="rounded-lg shadow-[0_0_15px_cyan] w-full h-auto"
            />
          </motion.div>
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold text-cyan-400 neon-text">
              {userData.name.first} {userData.name.last}
            </h1>
            <p className="mb-2 text-gray-300">⭐ Founding Member</p>
            <p className="mb-2 text-gray-300">10+ nights booked</p>
            <p className="text-gray-300">❤️ Popular host</p>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <div className="space-y-4">
          <div className="flex pb-2 space-x-4 overflow-x-auto border-b border-gray-700">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-t-lg ${activeTab === tab.id ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700 text-white'} hover:bg-cyan-500 transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </motion.button>
            ))}
          </div>
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-[0_0_10px_cyan]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {tabs.find((tab) => tab.id === activeTab).content}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Profile;