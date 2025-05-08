import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  async function handleClick() {
    await logout();
  }

  return (
    <div className="mt-auto">
      {loading ? (
        <span class="loading loading-dots loading-sm"></span>
      ) : (
        <BiLogOut
          className="w-6 h-6 text-white cursor-pointer"
          onClick={handleClick}
        />
      )}
    </div>
  );
};
export default LogoutButton;
