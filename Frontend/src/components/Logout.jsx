import { MdLogout } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
// TODO Implement Logout functionality

const Logout = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const handleLogout = () => {
    try {
      fetch("/api/auth/logout", {
        credentials: "include",
      });
      setAuthUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };
  console.log("Auth User", authUser);

  return (
    <>
      <img
        src={authUser?.avatarUrl}
        className="w-10 h-10 rounded-full border border-gray-800"
      />

      <div
        onClick={handleLogout}
        className="cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800"
      >
        <MdLogout size={22} />
      </div>
    </>
  );
};

export default Logout;
