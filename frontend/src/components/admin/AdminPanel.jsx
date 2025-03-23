import { useRef, useState, useEffect } from "react";

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

  return <div></div>;
};

export default AdminPanel;
