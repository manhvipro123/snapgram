import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { INavLink } from "@/types";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useEffect } from "react";

const LeftSizebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px]">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="">{user.name}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-5">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = location.pathname === link.route;

            return (
              <li
                key={link.label}
                className={`group rounded-lg base-medium transition  ${
                  isActive && "bg-primary-500"
                } hover:bg-primary-500`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        onClick={() => signOut()}
        className="h-14 flex gap-4 items-center justify-start cursor-pointer"
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="text-sm lg:text-md">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSizebar;
