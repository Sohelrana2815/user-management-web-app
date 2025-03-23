import { useRef, useState, useEffect } from "react";
// Day.js + relativeTime plugin
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [serverLoading, setServerLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const headerCheckboxRef = useRef(null);

  // Fetch users data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setServerLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Update the header checkbox's indeterminate state
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate =
        selectedIds.length > 0 && selectedIds.length < users.length;
    }
  }, [selectedIds, users]);

  // Toggle select/deselect all users
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      // Select all users
      setSelectedIds(users.map((user) => user._id));
    } else {
      // Deselect all
      setSelectedIds([]);
    }
  };

  // Toggle selection for an individual user
  const handleRowCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  if (serverLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Check if all users are selected
  const isAllSelected = users.length > 0 && selectedIds.length === users.length;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  ref={headerCheckboxRef}
                  checked={isAllSelected}
                  onChange={handleSelectAllChange}
                />
              </label>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Last seen</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            // Create a Day.js object from user.lastLogin
            const lastLoginDayjs = dayjs(user.lastLogin);

            // Relative time format, e.g. "5 minutes ago"
            const relative = lastLoginDayjs.fromNow();

            // Full date/time format for tooltip, e.g. "October 12, 2024 15:45:30"
            const fullDate = lastLoginDayjs.format("MMMM DD, YYYY HH:mm:ss");

            return (
              <tr key={user._id}>
                {/* Individual row checkbox */}
                <td>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selectedIds.includes(user._id)}
                      onChange={() => handleRowCheckboxChange(user._id)}
                    />
                  </label>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td title={fullDate} className="cursor-pointer">
                  {relative}
                </td>
                {/* Use the title attribute for a native tooltip */}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Display the selected IDs for debugging or informational purposes */}
      <h2>Result: {selectedIds.join(", ")}</h2>
    </div>
  );
};

export default AdminPanel;
