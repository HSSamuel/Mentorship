import React, { useState, useEffect } from "react";
import apiClient from "../api/axios";

const StatusBadge = ({ status }: { status: string }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
  let specificClasses = "";

  switch (status) {
    case "PENDING":
      specificClasses = "bg-yellow-100 text-yellow-800";
      break;
    case "ACCEPTED":
      specificClasses = "bg-green-100 text-green-800";
      break;
    case "REJECTED":
      specificClasses = "bg-red-100 text-red-800";
      break;
    default:
      specificClasses = "bg-gray-100 text-gray-800";
  }

  return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};

const AdminMatchesPage = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get("/admin/matches");
        setMatches(response.data);
      } catch (err) {
        setError("Failed to fetch matches.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (isLoading)
    return <p className="text-center text-gray-500">Loading all matches...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        All Mentorship Matches
      </h1>
      {matches.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {matches.map((match) => (
              <li
                key={match.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">
                    <span className="font-bold">
                      {match.mentor.profile?.name || "N/A"}
                    </span>{" "}
                    (Mentor) &harr;{" "}
                    <span className="font-bold">
                      {match.mentee.profile?.name || "N/A"}
                    </span>{" "}
                    (Mentee)
                  </p>
                  <p className="text-sm text-gray-500">
                    Requested on:{" "}
                    {new Date(match.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-full sm:w-auto flex justify-end">
                  <StatusBadge status={match.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800">
            No Matches Found
          </h3>
          <p className="text-gray-500 mt-2">
            There are no mentorship requests or matches in the system yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminMatchesPage;
