import { useState } from "react";
export default function IssueCard({
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

// export default function IssueListPage({ issues }) {   -- extra
//     return (
//       <section className="bg-[#0E0C15] text-white px-6 pt-2 pb-10 flex flex-col items-center gap-8 border-t border-violet-900">
//         <h2 className="text-2xl font-bold mt-10">🗂️ Issue List</h2>
//         <div className="flex overflow-x-auto space-x-6 w-full max-w-7xl pb-4">
//           {issues.map((issue, index) => (
//             <IssueCard key={index} {...issue} />
//           ))}
//         </div>
//       </section>
//     );
//   }
