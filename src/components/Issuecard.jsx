import React, { useState } from "react";

function IssueCard({ priority, category, title, description, location, status, image }) {
  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-[#0E0C15] text-white p-4 rounded-xl shadow-[0_0_15px_4px_rgba(139,92,246,0.5)] w-full max-w-md flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[priority]}`}>{priority} Priority</span>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">{category}</span>
        </div>
        {status && (
          <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
            ✓ Resolved
          </span>
        )}
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-300">{description}</p>
      {image && <img src={image} alt="Issue" className="rounded-lg w-full h-48 object-cover" />}
      <div className="flex items-center text-sm text-gray-400 gap-1">
        📍 {location}
      </div>
      <div className="flex justify-between mt-3">
        <button className="border border-gray-500 px-3 py-1 rounded-md text-sm hover:bg-gray-800">Support</button>
        <button className="bg-violet-600 text-white px-3 py-1 rounded-md text-sm hover:bg-violet-700">More Details</button>
      </div>
    </div>
  );
}

function ReportIssuePage({ onAddIssue }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    priority: "Medium",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const fileURL = URL.createObjectURL(files[0]);
      setFormData((prev) => ({ ...prev, image: fileURL }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIssue({ ...formData, status: false });
    setFormData({
      title: "",
      category: "",
      description: "",
      priority: "Medium",
      location: "",
      image: "",
    });
  };

  return (
    <section className="bg-[#0E0C15] text-white p-6 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">📮 Report an Issue</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1724] p-6 rounded-xl shadow-[0_0_15px_4px_rgba(139,92,246,0.5)] w-full max-w-xl flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Name of Problem"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-600 bg-transparent text-white p-2 rounded-md"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Type of Problem (e.g., Electricity, Water Logging)"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-600 bg-transparent text-white p-2 rounded-md"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-600 bg-transparent text-white p-2 rounded-md"
          rows={3}
          required
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border border-gray-600 bg-transparent text-white p-2 rounded-md"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
          type="text"
          name="location"
          placeholder="Address"
          value={formData.location}
          onChange={handleChange}
          className="border border-gray-600 bg-transparent text-white p-2 rounded-md"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border border-gray-600 bg-transparent text-white p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

function IssueListPage({ issues }) {
    return (
      <section className="bg-[#0E0C15] text-white px-6 pt-2 pb-10 flex flex-col items-start gap-6 border-t border-violet-900">
        <h2 className="text-2xl font-bold mt-10 ml-2">🗂️ Issue List</h2>
        <div className="flex overflow-x-auto space-x-6 w-full pb-4 px-2">
          {issues.map((issue, index) => (
            <div key={index} className="flex-shrink-0">
              <IssueCard {...issue} />
            </div>
          ))}
        </div>
      </section>
    );
  }

function App() {
  const [issues, setIssues] = useState([]);

  const handleAddIssue = (newIssue) => {
    setIssues((prev) => [newIssue, ...prev]);
  };

  return (
    <div>
      <ReportIssuePage onAddIssue={handleAddIssue} />
      <IssueListPage issues={issues} />
    </div>
  );
}

export default App;

