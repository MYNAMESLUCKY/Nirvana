import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import API from '../api'
// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const IncidentReportForm = () => {
  const [formData, setFormData] = useState({
    reportType: '',
    location: '',
    description: '',
    date: '',
    time: '',
    media: '',
    contact: '',
  });
  

  const [position, setPosition] = useState(null);

  // Auto-update date and time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setFormData((prev) => ({
        ...prev,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0].slice(0, 5),
        
      }));

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setPosition(coords);
        fetchAddress(coords);
      },
      (err) => console.log('Location Error:', err)
    );
  }, []);

  const fetchAddress = async ({ lat, lng }) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await res.json();
    setFormData((prev) => ({ ...prev, location: data.display_name }));
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        fetchAddress(e.latlng);
      },
    });

    return position === null ? null : <Marker position={position} />;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, media: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('reportType', formData.reportType);
    formPayload.append('location', formData.location);
    formPayload.append('description', formData.description);
    formPayload.append('date', formData.date);
    formPayload.append('time', formData.time);
    formPayload.append('media', formData.media);
    formPayload.append('contact', formData.contact);
    
    try {
      // Send POST request to backend
      const response = await API.post('/incidents', formPayload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Success message
      alert('Report submitted successfully!');
      console.log('Response from server:', response.data);

      // Reset form
      setFormData({
        reportType: '',
        location: '',
        description: '',
        date: '',
        time: '',
        media: null,
        contact: '',
      });
    } catch (error) {
      console.error('Error submitting the report:', error);
      alert('There was an error submitting the report.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-md mt-5">
      <h2 className="text-xl font-semibold mb-4">Incident Report Form</h2>

      {/* Map */}
      {position && (
        <div className="h-60 w-full mb-4 rounded-md overflow-hidden">
          <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
          </MapContainer>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Report Type */}
        <div className="mb-4">
          <label className="block text-gray-700">* Report Type</label>
          <select name="reportType" value={formData.reportType} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Report Type</option>
            <option value="crime">Crime</option>
            <option value="accident">Accident</option>
            <option value="theft">Theft</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        {/* Location (Auto-filled) */}
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" rows="3" required />
        </div>

        {/* Date and Time (Live) */}
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">Time</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        {/* Media Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Upload Media</label>
          <input type="file" name="media" onChange={handleFileChange} accept="image/*,video/*" className="w-full p-2 border rounded" />
        </div>

        {/* Contact Info */}
        <div className="mb-4">
          <label className="block text-gray-700">Contact (Optional)</label>
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        {/* Submit */}
        <div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentReportForm;