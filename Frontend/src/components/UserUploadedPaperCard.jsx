import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const PaperCard = ({ paperId, paperFile, examName, numberofDownloads, paperName, subject, university, year, subjectCode, faculty, status, submittedAt, onDelete }) => {

  const deletePaper = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${paperName || "this"} paper? This action cannot be undone.`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/paper/delete-paper/${paperId}`, { withCredentials: true });
      alert("Paper deleted successfully");
      onDelete(paperId);
    } catch (error) {
      console.error(error);
      alert("Failed to delete paper. Please try again.");
    }
  }
  return (
    <div className="bg-white border rounded-lg shadow-sm p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800">
          {paperName || "Untitled Paper"}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${statusStyles[status]
            }`}
        >
          {status || "Pending"}
        </span>
      </div>

      {/* Paper Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Course:</span>{" "}
          {subject || "N/A"}
        </p>

        <p>
          <span className="font-medium text-gray-700">Exam Type:</span>{" "}
          {examName || "N/A"}
        </p>

        <p>
          <span className="font-medium text-gray-700">Exam Year:</span>{" "}
          {year || "N/A"}
        </p>

        <p>
          <span className="font-medium text-gray-700">Professor:</span>{" "}
          {faculty || "N/A"}
        </p>

        <p>
          <span className="font-medium text-gray-700">Submitted At:</span>{" "}
          {submittedAt ? new Date(submittedAt).toDateString() : "N/A"}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="font-medium text-gray-700">Downloads:</span>{" "}
          {numberofDownloads || 0}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={() => window.open(paperFile || "", "_blank")}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            View Paper
          </button>

          <button
            onClick={() => deletePaper()}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
};

export default PaperCard;
