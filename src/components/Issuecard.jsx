import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function IssueCard({
  priority,
  category,
  title,
  description,
  location,
  status,
  image,
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSupportInfo, setShowSupportInfo] = useState(false);

  const priorityColors = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-blue-100 text-blue-700",
  };

  const getShortDescription = (text) => {
    const words = text.split(" ");
    return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
  };

  return (
    <div className="bg-[#0E0C15] text-white p-4 rounded-xl shadow-[16px_0_40px_12px_rgba(139,92,246,0.6)] w-80 flex-shrink-0 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[priority]}`}
          >
            {priority} Priority
          </span>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
            {category}
          </span>
        </div>
        {status && (
          <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs">
            ✓ Resolved
          </span>
        )}
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-300">
        {showFullDescription ? description : getShortDescription(description)}
      </p>
      {image && (
        <img
          src={image}
          alt="Issue"
          className="rounded-lg w-full h-48 object-cover"
        />
      )}
      <div className="flex items-center text-sm text-gray-400 gap-1">
        📍 {location}
      </div>
      {showSupportInfo && (
        <div className="text-sm text-gray-300 mt-2">
          <p>📞 Contact: 123-456-7890</p>
          <p>✉️ Email: support@example.com</p>
        </div>
      )}
      <div className="flex justify-between mt-3">
        <button
          className="border border-gray-500 px-3 py-1 rounded-md text-sm hover:bg-gray-800"
          onClick={() => setShowSupportInfo(!showSupportInfo)}
        >
          Support
        </button>
        <button
          className="bg-violet-600 text-white px-3 py-1 rounded-md text-sm hover:bg-violet-700"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? "Less Details" : "More Details"}
        </button>
      </div>
    </div>
  );
}

const locationData = {
  Maharashtra: {
    Pune: ["Shivajinagar", "Kothrud", "Baner"],
    Mumbai: ["Andheri", "Borivali", "Dadar"],
  },
  Karnataka: {
    Bangalore: ["MG Road", "Indiranagar", "Whitefield"],
    Mysore: ["VV Mohalla", "Nazarbad", "Kuvempunagar"],
  },
};

function ReportIssuePage({ onAddIssue }) {
  let [donemsg, setDoneMsg] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    priority: "Medium",
    state: "",
    district: "",
    area: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    let data = await axios.post(
      "http://localhost:3000/app/v1/userProblems/problems",
      {
        pName: formData.title,
        pType: formData.category,
        pDescrition: formData.description,
        pPriority: formData.priority,
        PAddress: formData.state,
        pImage: formData.image,
      }
    );
    setDoneMsg("problem registered");

    // console.log(data);

    const fullLocation = `${formData.area}, ${formData.district}, ${formData.state}`;
    onAddIssue({
      ...formData,
      location: fullLocation,
      status: false,
    });
    setFormData({
      title: "",
      category: "",
      description: "",
      priority: "Medium",
      state: "",
      district: "",
      area: "",
      image: "",
    });
  };

  const states = Object.keys(locationData);
  const districts = formData.state
    ? Object.keys(locationData[formData.state])
    : [];
  const areas =
    formData.state && formData.district
      ? locationData[formData.state][formData.district]
      : [];

  return (
    <section className="bg-[#0E0C15] text-white p-6 flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold">📮 Report an Issue</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-[#1A1724] p-6 rounded-xl shadow-[16px_0_40px_12px_rgba(139,92,246,0.6)] w-full max-w-xl flex flex-col gap-4"
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
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-600 bg-transparent text-black p-2 rounded-md font-semibold"
          required
        >
          <option value="">Select Problem Type</option>
          <option value="Road Condition">Road Condition</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Electricity">Electricity</option>
          <option value="Water Logging">Water Logging</option>
        </select>
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

        <div className="flex flex-col gap-4">
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-600 bg-transparent text-white p-2 rounded-md"
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          {districts.length > 0 && (
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="border border-gray-600 bg-transparent text-white p-2 rounded-md"
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          )}

          {areas.length > 0 && (
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="border border-gray-600 bg-transparent text-white p-2 rounded-md"
              required
            >
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          )}
        </div>

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
      {donemsg ? `${donemsg}` : ""}
    </section>
  );
}

// function IssueListPage({ issues }) {   waste
//   return (
//     <section className="bg-[#0E0C15] text-white px-6 pt-2 pb-10 flex flex-col items-center gap-8 border-t border-violet-900">
//       <h2 className="text-2xl font-bold mt-10">🗂️ Issue List</h2>
//       <div className="flex overflow-x-auto space-x-6 w-full max-w-7xl pb-4">
//         {issues.map((issue, index) => (
//           <IssueCard key={index} {...issue} />
//         ))}
//       </div>
//     </section>
//   );
// }

function App() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    async function verify() {
      let data = await axios.post(
        "http://localhost:3000/app/v1/users/authorization",
        {},
        {
          headers: {
            authorization: `bearer ${state}`,
          },
        }
      );
      if (data.data.status == false) {
        navigate("/login");
      }
    }
    verify();
  });
  const [issues, setIssues] = useState([]);

  const handleAddIssue = (newIssue) => {
    setIssues((prev) => [newIssue, ...prev]);
  };

  return (
    <div>
      <ReportIssuePage onAddIssue={handleAddIssue} />
      {/* <IssueListPage issues={issues} /> */}
    </div>
  );
}

export default App;
