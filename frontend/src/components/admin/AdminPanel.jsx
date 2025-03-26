import { useRef, useState, useEffect } from "react";
// Day.js + relativeTime plugin
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import UserManagementToolbar from "./UserManagementToolbar";
import axiosSecure from "../../hooks/axiosSecure";
import Swal from "sweetalert2";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [serverLoading, setServerLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const headerCheckboxRef = useRef(null);

  // 1. Fetch users data on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // GET /users
        const response = await axiosSecure.get("/users");
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setServerLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 2. Indeterminate checkbox state
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate =
        selectedIds.length > 0 && selectedIds.length < users.length;
    }
  }, [selectedIds, users]);

  // 3. Select/deselect all
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      setSelectedIds(users.map((user) => user._id));
    } else {
      setSelectedIds([]);
    }
  };

  // 4. Toggle selection for single user
  const handleRowCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  // Helper to refetch user list
  const refetchUsers = async () => {
    try {
      const response = await axiosSecure.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error refetching users:", err.message);
    }
  };

  // ======================
  // Block / Unblock Handlers
  // ======================
  const handleBlock = async () => {
    if (!selectedIds.length) return;
    try {
      Swal.fire({
        title: "Block User",
        text: "Are you sure you want to block this user? blocked users don't be able to login",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, block!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axiosSecure.patch("/users/update-status", {
            ids: selectedIds,
            status: "blocked",
          });
          console.log(response.data.message); // e.g. "Updated 2 users"
          await refetchUsers();
          setSelectedIds([]);
          Swal.fire({
            title: "Blocked!",
            text: "User has been blocked!",
            icon: "success",
          });
        }
      });
    } catch (err) {
      console.error("Error blocking users:", err.message);
    }
  };

  const handleUnblock = async () => {
    if (!selectedIds.length) return;
    try {
      const response = await axiosSecure.patch("/users/update-status", {
        ids: selectedIds,
        status: "active",
      });
      if (response.status === 200) {
        await refetchUsers();
        setSelectedIds([]);
        Swal.fire({
          title: "User Unblocked",
          text: "The user has been successfully unblocked.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Error unblocking users:", err.message);
    }
  };

  // ======================
  // Delete Handler
  // ======================
  const handleDelete = async () => {
    if (!selectedIds.length) return;
    try {
      Swal.fire({
        title: "Delete User?",
        text: "This will permanently remove the user and all their data. But user can re-register as well.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // axios DELETE with a request body requires `data`
          const response = await axiosSecure.delete("/users/delete", {
            data: { ids: selectedIds },
          });
          console.log(response.data.message); // e.g. "Deleted 3 users"
          // Clear the selection
          setSelectedIds([]);
          // Refetch the updated user list
          await refetchUsers();
          Swal.fire({
            title: "User Deleted!",
            text: "The user has been removed successfully.",
            icon: "success",
          });
        }
      });
    } catch (err) {
      console.error("Error deleting users:", err.message);
    }
  };

  if (serverLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const isAllSelected = users.length > 0 && selectedIds.length === users.length;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Toolbar */}
      <UserManagementToolbar
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onDelete={handleDelete}
        selectedIds={selectedIds}
      />

      {/* Table */}
      <div className="overflow-x-auto mt-4">
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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const lastLoginDayjs = dayjs(user.lastLogin);
              const relative = lastLoginDayjs.fromNow();
              const fullDate = lastLoginDayjs.format("MMMM DD, YYYY HH:mm:ss");

              return (
                <tr key={user._id}>
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
                  <td title={fullDate}>{relative}</td>
                  <td>{user.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
