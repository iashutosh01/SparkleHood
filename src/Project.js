import React, { useState } from "react";
import "./Project.css";

const initialIncidents = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-02-10T08:45:00Z",
  },
];

function Project() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [severityFilter, setSeverityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "Low",
  });
  const [showForm, setShowForm] = useState(false);
  const [expandedIncident, setExpandedIncident] = useState(null);

  const filteredIncidents = incidents.filter(
    (incident) => severityFilter === "All" || incident.severity === severityFilter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at);
    const dateB = new Date(b.reported_at);
    return sortOrder === "Newest First" ? dateB - dateA : dateA - dateB;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncident({ ...newIncident, [name]: value });
  };

  const handleNewIncidentSubmit = (e) => {
    e.preventDefault();
    if (newIncident.title.trim() && newIncident.description.trim()) {
      const newId = incidents.length ? Math.max(...incidents.map(i => i.id)) + 1 : 1;
      const newIncidentWithId = {
        ...newIncident,
        id: newId,
        reported_at: new Date().toISOString(),
      };
      setIncidents([...incidents, newIncidentWithId]);
      setNewIncident({ title: "", description: "", severity: "Low" });
      setShowForm(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleToggleDescription = (id) => {
    setExpandedIncident((prevState) => (prevState === id ? null : id));
  };

  return (
    <div className="App">
      <h1>⚡ AI Safety Dashboard  ⚡ </h1>

      <div className="controls">
        <div className="filter-sort">
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
            <option value="All">All Severities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
        </div>

        <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : " Report Incident"}
        </button>
      </div>

      
      <ul className="incident-list">
        {sortedIncidents.map((incident) => (
          <li key={incident.id} className="incident-item">
            <div className="incident-header">
              <h3>
                {incident.title}
                <span className={`badge ${incident.severity.toLowerCase()}`}>
                  {incident.severity}
                </span>
              </h3>
              <span className="incident-date">
                {new Date(incident.reported_at).toLocaleString()}
              </span>
            </div>

            <button className="details-btn" onClick={() => handleToggleDescription(incident.id)}>
              {expandedIncident === incident.id ? "Hide Details" : "View Details"}
            </button>

            {expandedIncident === incident.id && (
              <p className="incident-description">{incident.description}</p>
            )}
          </li>
        ))}
      </ul>


      {showForm && (
        <form onSubmit={handleNewIncidentSubmit} className="incident-form">
          <h2>📋 Report New Incident</h2>
          <input
            type="text"
            name="title"
            value={newIncident.title}
            onChange={handleInputChange}
            placeholder="Incident Title"
            required
          />
          <textarea
            name="description"
            value={newIncident.description}
            onChange={handleInputChange}
            placeholder="Incident Description"
            required
          ></textarea>
          <select
            name="severity"
            value={newIncident.severity}
            onChange={handleInputChange}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Project;
