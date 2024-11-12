import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Event = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [host, setHost] = useState("");
  const [time, setTime] = useState("");
  const [audience, setAudience] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [events, setEvents] = useState([]); // State to store all events
  const [selectedEvents, setSelectedEvents] = useState([]); // Events for the selected date

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowForm(false); // Hide form when viewing events
    const dayEvents = events.filter((event) => event.date.toDateString() === date.toDateString());
    setSelectedEvents(dayEvents); // Show events for selected date
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      eventName,
      category,
      location,
      host,
      time,
      date: selectedDate,
      audience,
      instructions,
      priority,
    };
    setEvents([...events, newEvent]); // Save event
    setShowForm(false); // Close form
    resetForm(); // Reset form
  };

  const resetForm = () => {
    setEventName("");
    setCategory("");
    setLocation("");
    setHost("");
    setTime("");
    setAudience([]);
    setInstructions("");
    setPriority("Normal");
  };

  const handleAudienceChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setAudience(selected);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dayEvents = events.filter((event) => event.date.toDateString() === date.toDateString());
      if (dayEvents.length) {
        return (
          <div className="text-xs mt-1 text-blue-600">
            {dayEvents.map((event, index) => (
              <div key={index}>• {event.eventName}</div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Event Calendar</h2>

      <div className="flex justify-between gap-6">
        {/* Calendar */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-6 flex-1 max-w-full sm:max-w-2xl">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            className="w-full"
          />
        </div>

        {/* Display Events on Selected Date */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-6 flex-1 max-w-full sm:max-w-xs h-auto max-h-96 overflow-y-auto">
          <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">
            Events on {selectedDate.toLocaleDateString()}
          </h3>
          {selectedEvents.length > 0 ? (
            <ul>
              {selectedEvents.map((event, index) => (
                <li key={index} className="mb-4 border-b pb-4">
                  <h4 className="text-lg font-semibold">{event.eventName}</h4>
                  <p className="text-sm">Category: {event.category}</p>
                  <p className="text-sm">Location: {event.location}</p>
                  <p className="text-sm">Host: {event.host}</p>
                  <p className="text-sm">Time: {event.time}</p>
                  <p className="text-sm">Audience: {event.audience.join(", ")}</p>
                  <p className="text-sm">Priority: {event.priority}</p>
                  {event.instructions && (
                    <p className="text-sm">Instructions: {event.instructions}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No events for this date.</p>
          )}
        </div>
      </div>

      {/* Add Event Button */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Add Event
        </button>
      </div>

      {/* Add Event Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-100 p-6 border border-gray-300 rounded-lg shadow-lg w-full max-w-lg mx-auto overflow-y-auto" style={{ maxHeight: "80vh" }}>
            <h3 className="text-2xl font-bold mb-6 text-blue-600 text-center">
              Add Event - {selectedDate.toLocaleDateString()}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {/* Event Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter event name"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter category"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter location"
                    required
                  />
                </div>

                {/* Host */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Host</label>
                  <input
                    type="text"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter host"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                {/* Audience Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign Event To</label>
                  <select
                    multiple
                    value={audience}
                    onChange={handleAudienceChange}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="Incubatees">Incubatees</option>
                    <option value="Investors">Investors</option>
                    <option value="Guests">Guests</option>
                  </select>
                  <small className="text-gray-500">Hold Ctrl (Cmd on Mac) to select multiple groups.</small>
                </div>

                {/* Event Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Instructions</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter any additional details or instructions"
                    rows="4"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
