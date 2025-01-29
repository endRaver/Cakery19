import { cakery_logo_dark, items_square, plus_square } from "@/assets/icons";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  return (
    <div className="border-r border-primary-75 bg-white py-10">
      <div className="flex justify-center">
        <Link to="/">
          <img src={cakery_logo_dark} alt="logo" />
        </Link>
      </div>

      <ul className="mt-10 flex flex-col">
        <Link to="/admin">
          <li className="flex items-center gap-2 px-5 py-3 tracking-wider text-primary-500 duration-300 hover:bg-primary-50">
            <img src={items_square} alt="icon" /> Products
          </li>
        </Link>
        <a href="/admin/create">
          <li className="flex items-center gap-2 px-5 py-3 tracking-wider text-primary-500 duration-300 hover:bg-primary-50">
            <img src={plus_square} alt="icon" /> Create
          </li>
        </a>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
