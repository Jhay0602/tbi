import React, { useState } from 'react';

const PendingPostSummary = () => {
  const [activeTab, setActiveTab] = useState('event');
  const [showSummary, setShowSummary] = useState(false);
  const [eventData, setEventData] = useState([
    { title: 'Tech Conference 2024', description: 'A tech event about AI and ML', date: '2024-11-10T10:00', status: 'pending', postedAt: new Date('2024-11-05T09:00') },
    { title: 'React Meetup', description: 'Meetup for ReactJS developers', date: '2024-12-01T12:00', status: 'accepted', postedAt: new Date('2024-10-30T14:30') },
  ]);
  const [startupData, setStartupData] = useState([
    { name: 'AI Startup', founder: 'Jane Doe', description: 'A startup focused on AI development.', status: 'rejected', postedAt: new Date('2024-11-01T11:15') },
    { name: 'HealthTech Inc.', founder: 'John Smith', description: 'Healthcare technology solutions.', status: 'pending', postedAt: new Date('2024-11-03T16:00') },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (index) => {
    if (activeTab === 'event') {
      setEventData(eventData.filter((_, i) => i !== index));
    } else {
      setStartupData(startupData.filter((_, i) => i !== index));
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsEditing(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (activeTab === 'event') {
      setEventData((prev) =>
        prev.map((event) => (event.title === selectedItem.title ? selectedItem : event))
      );
    } else {
      setStartupData((prev) =>
        prev.map((startup) => (startup.name === selectedItem.name ? selectedItem : startup))
      );
    }
    setIsEditing(false);
  };

  const renderDetailsOrEdit = () => {
    if (!selectedItem) return null;

    if (isEditing) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Edit {activeTab === 'event' ? 'Event' : 'Startup'}</h2>
          <input
            type="text"
            name={activeTab === 'event' ? 'title' : 'name'}
            value={selectedItem.title || selectedItem.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            value={selectedItem.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          ></textarea>
          {activeTab === 'event' && (
            <input
              type="datetime-local"
              name="date"
              value={selectedItem.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          )}
          <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{activeTab === 'event' ? selectedItem.title : selectedItem.name}</h2>
        <p>{selectedItem.description}</p>
        {activeTab === 'event' && <p>Date: {new Date(selectedItem.date).toLocaleString()}</p>}
      </div>
    );
  };

  const renderSummary = (data) => {
    const accepted = data.filter((item) => item.status === 'accepted');
    const rejected = data.filter((item) => item.status === 'rejected');
    const pending = data.filter((item) => item.status === 'pending');

    return (
      <div className="w-1/3 p-4 border-l border-gray-300">
        <h2 className="text-xl font-semibold">Summary</h2>

        <div className="my-4">
          <h3 className="text-lg font-semibold">Accepted ({accepted.length})</h3>
          <ul>
            {accepted.map((item, index) => (
              <li key={index} className="text-gray-600">
                {activeTab === 'event' ? item.title : item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="my-4">
          <h3 className="text-lg font-semibold">Rejected ({rejected.length})</h3>
          <ul>
            {rejected.map((item, index) => (
              <li key={index} className="text-gray-600">
                {activeTab === 'event' ? item.title : item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="my-4">
          <h3 className="text-lg font-semibold">Pending ({pending.length})</h3>
          <ul>
            {pending.map((item, index) => (
              <li key={index} className="text-gray-600">
                {activeTab === 'event' ? item.title : item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const displayedData = activeTab === 'event' ? eventData : startupData;

  return (
    <div className="p-6 flex space-x-6">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold">Summary of My Posts</h1>
        <p className="text-gray-600">Click on a post to view its details, or use the edit/delete options.</p>

        {/* Tabs for switching between events and startups */}
        <div className="flex space-x-4 border-b border-gray-300">
          <button
            className={`py-2 px-4 ${activeTab === 'event' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('event')}
          >
            My Events
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'startup' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('startup')}
          >
            My Startups
          </button>
        </div>

        {/* Summary Button */}
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowSummary(!showSummary)}
        >
          {showSummary ? 'Hide Summary' : 'Show Summary'}
        </button>

        {/* Conditionally render the summary or the post list */}
        {showSummary ? renderSummary(displayedData) : (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">My {activeTab === 'event' ? 'Events' : 'Startups'}</h2>
            <ul className="space-y-4">
              {displayedData.length > 0 ? (
                displayedData.map((item, index) => (
                  <li key={index} className="border-b border-gray-200 py-4 flex justify-between">
                    <div onClick={() => handleItemClick(item)} className="cursor-pointer flex items-center space-x-2">
                      <div className="text-lg font-medium">
                        {activeTab === 'event' ? item.title : item.name}
                      </div>
                      <div
                        className={`px-2 py-1 text-sm font-semibold rounded-full ${
                          item.status === 'pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : item.status === 'accepted'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-500" onClick={() => handleEdit(item)}>✏️</button>
                      <button className="text-red-500" onClick={() => handleDelete(index)}>🗑️</button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No posts available.</p>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Render summary on the right side */}
      {showSummary && renderSummary(displayedData)}
    </div>
  );
};

export default PendingPostSummary;
