import React, { useState } from 'react';

const Startups = () => {
  const [category, setCategory] = useState('incubatees'); // Default: Incubatees
  const [cohort, setCohort] = useState('cohortI'); // Default: Cohort I
  const [industry, setIndustry] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [photo, setPhoto] = useState(null); // State for uploaded photo
  const [addedStartups, setAddedStartups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(null); // State to show clicked startup details
  const [editingStartup, setEditingStartup] = useState(null); // Startup being edited
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Show confirmation for deletion
  const [startupToDelete, setStartupToDelete] = useState(null); // Startup to delete
  const [searchQuery, setSearchQuery] = useState(''); // Search state
  const [showIndustryCheckboxes, setShowIndustryCheckboxes] = useState(false); // State to show industry checkboxes

  const availableIndustries = ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing'];

  // Handlers for form changes
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCohort('cohortI'); // Reset cohort to Cohort I when category changes
  };
  const handleCohortChange = (e) => setCohort(e.target.value);
  const handleSearchChange = (e) => setSearchQuery(e.target.value); // Handle search input
  const handleIndustryChange = (industryName) => {
    if (industry.includes(industryName)) {
      setIndustry(industry.filter((item) => item !== industryName));
    } else {
      setIndustry([...industry, industryName]);
    }
  };

  const handleIndustryClick = () => {
    setShowIndustryCheckboxes(!showIndustryCheckboxes);
  };

  const handleAddStartup = () => setShowForm(true);

  const handleSubmit = () => {
    if (!name || !address || !description || !userName || !userEmail || !photo) {
      alert('Please fill out all fields before submitting.');
      return;
    }
  
    const newStartup = {
      name,
      address,
      description,
      cohort,
      category,
      userName,
      userEmail,
      photo, // include photo in the startup object
      industry
    };
  
    if (editingStartup) {
      // Edit existing startup
      const updatedStartups = addedStartups.map((startup) =>
        startup === editingStartup ? newStartup : startup
      );
      setAddedStartups(updatedStartups);
    } else {
      // Add new startup
      setAddedStartups([...addedStartups, newStartup]);
    }
  
    // Clear the form after successful submission
    setName('');
    setAddress('');
    setDescription('');
    setUserName('');
    setUserEmail('');
    setPhoto(null);
    setCohort('cohortI'); // Reset to Cohort I
    setCategory('incubatees'); // Reset to Incubatees
    setIndustry([]);
    setEditingStartup(null); // Reset editing state
  
    alert('Startup added/updated successfully');
    setShowForm(false); // Close the form after submission
  };
  
  const handleBackButton = () => {
    setShowForm(false); // Hide the form when back button is clicked
    setEditingStartup(null); // Reset editing state
  };

  const handleShowDetails = (startup) => {
    setShowDetails(startup);
  };

  const handleCloseDetails = () => {
    setShowDetails(null); // Close details modal
  };

  const handleEditStartup = (startup) => {
    setEditingStartup(startup);
    setName(startup.name);
    setAddress(startup.address);
    setDescription(startup.description);
    setUserName(startup.userName);
    setUserEmail(startup.userEmail);
    setPhoto(startup.photo);
    setCohort(startup.cohort);
    setCategory(startup.category);
    setIndustry(startup.industry);
    setShowForm(true);
  };

  const handleDeleteStartup = (startup) => {
    setStartupToDelete(startup);
    setShowConfirmDelete(true); // Show the confirmation modal
  };

  const handleConfirmDelete = (confirm) => {
    if (confirm) {
      setAddedStartups(addedStartups.filter((startup) => startup !== startupToDelete));
    }
    setShowConfirmDelete(false); // Close the confirmation modal
    setStartupToDelete(null); // Clear the startup to delete
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <h1 className="text-3xl font-semibold mb-6">Startups</h1>

      {/* Horizontal Categories with Dropdown and Search Bar */}
      <div className="flex justify-between items-end mb-6 z-10 relative">
        <div className="flex gap-4">
          <div>
            <label className="block text-lg font-semibold mb-2">Category</label>
            <select
              className="w-32 p-3 border rounded-lg"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="incubatees">Incubatees</option>
              <option value="investors">Investors</option>
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">Cohort</label>
            <div className="flex gap-2">
              {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].map((item, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg ${cohort === `cohort${item}` ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setCohort(`cohort${item}`)}
                >
                  Cohort {item}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar with Industry Filters */}
          <div>
            <label className="block text-lg font-semibold mb-2">Search Startups</label>
            <input
              type="text"
              className="p-3 border rounded-lg w-48"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={handleIndustryClick} // Show industry checkboxes when clicked
            />

            {/* Industry Checkboxes Popup */}
            {showIndustryCheckboxes && (
              <div className="absolute bg-white border rounded-lg p-4 mt-2 shadow-lg w-56 z-20">
                <h3 className="font-semibold mb-2">Filter by Industry</h3>
                <div className="space-y-2">
                  {availableIndustries.map((industryName, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={industry.includes(industryName)}
                        onChange={() => handleIndustryChange(industryName)}
                        className="mr-2"
                      />
                      {industryName}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400"
            onClick={handleAddStartup}
          >
            Add Startup
          </button>
        </div>
      </div>

      {/* Form for Adding or Editing a Startup */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg z-20 absolute top-0 w-full max-w-md mx-auto mt-20" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2 className="text-2xl font-semibold mb-4 text-center">{editingStartup ? 'Edit Startup' : 'Add Startup'}</h2>

          {/* ...form inputs and submit button remain unchanged... */}
        </div>
      )}

      {/* Added Startups Display */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Added Startups</h2>

        {/* Display startups only for the selected category and cohort */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {addedStartups
            .filter((startup) => {
              return (
                startup.category === category &&
                startup.cohort === cohort &&
                (industry.length === 0 || industry.some((i) => startup.industry.includes(i))) && // Filter by industry
                (startup.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '')
              );
            })
            .map((startup, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg cursor-pointer relative"
                onClick={() => handleShowDetails(startup)}
              >
                <h3 className="text-xl font-semibold">{startup.name}</h3>
                <p className="text-sm text-gray-500">{startup.industry.join(', ')}</p>
                <p>Cohort: {startup.cohort}</p>
                <p>Category: {startup.category}</p>
                <button
                  className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteStartup(startup);
                  }}
                >
                  Delete
                </button>
                <button
                  className="absolute bottom-2 right-2 text-sm text-blue-500 hover:text-blue-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditStartup(startup);
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Startup Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg relative">
            <h2 className="text-2xl font-semibold mb-4">{showDetails.name}</h2>
            <p><strong>Industry:</strong> {showDetails.industry.join(', ')}</p>
            <p><strong>Description:</strong> {showDetails.description}</p>
            <p><strong>Address:</strong> {showDetails.address}</p>
            <p><strong>Contact Name:</strong> {showDetails.userName}</p>
            <p><strong>Contact Email:</strong> {showDetails.userEmail}</p>
            {showDetails.photo && (
              <img
                src={showDetails.photo}
                alt={showDetails.name}
                className="w-32 h-32 object-cover rounded-full mt-4 mx-auto"
              />
            )}
            <button
              className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
              onClick={handleCloseDetails}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-8 rounded-lg w-full max-w-sm relative">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this startup?</h2>
            <div className="flex justify-end gap-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
                onClick={() => handleConfirmDelete(true)}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={() => handleConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Startups;
