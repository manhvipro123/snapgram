import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const location = useLocation();
  return (
    <section className="z-50 flex justify-between items-center w-full sticky bottom-0 rounded-t-[20px] bg-background px-5 py-4 md:hidden">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = location.pathname === link.route;

        return (
          <Link
            to={link.route}
            key={link.label}
            className={` ${
              isActive && "bg-primary-500 rounded-[10px]"
            } hover:bg-primary-500 flex justify-center items-center flex-col gap-1 p-2 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && "invert-white"}`}
            />
            <p className="text-xs text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
