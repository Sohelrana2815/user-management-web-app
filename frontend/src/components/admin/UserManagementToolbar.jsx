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
        className="btn btn-sm flex items-center gap-2"
        onClick={onBlock}
        disabled={selectedIds.length === 0}
      >
        <FaLock />
        <span>Block</span>
      </button>

      {/* Unlock button (icon only) */}
      <button
        className="btn btn-sm"
        onClick={onUnblock}
        disabled={selectedIds.length === 0}
      >
        <FaUnlock />
      </button>

      {/* Delete button (icon only) */}
      <button
        className="btn btn-sm"
        onClick={onDelete}
        disabled={selectedIds.length === 0}
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default UserManagementToolbar;
