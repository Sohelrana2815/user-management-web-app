import { FaLock, FaUnlock, FaTrash } from "react-icons/fa";

const UserManagementToolbar = ({
  onBlock,
  onUnblock,
  onDelete,
  selectedIds,
}) => {
  return (
    <div className="bg-gray-100 p-4 flex items-center gap-2">
      {/* Block button (text + icon) */}
      <button
        className="btn btn-sm btn-outline text-red-700 flex items-center gap-2"
        onClick={onBlock}
        disabled={selectedIds.length === 0}
      >
        <FaLock className="text-red-700" />
        <span>Block</span>
      </button>

      {/* Unlock button (icon only) */}
      <button
        title="Unblock"
        className="btn btn-sm btn-outline text-green-600"
        onClick={onUnblock}
        disabled={selectedIds.length === 0}
      >
        <FaUnlock />
      </button>

      {/* Delete button (icon only) */}
      <button
        title="Delete"
        className="btn btn-sm btn-outline text-red-700"
        onClick={onDelete}
        disabled={selectedIds.length === 0}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default UserManagementToolbar;
