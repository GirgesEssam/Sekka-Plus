import {Link} from "react-router";
interface NavLinkProps{
    text:string;
    href:string;
    className?:string;
}

const NavLink = ({text,href,className}:NavLinkProps) => {
  return (
   <li className="px-4 py-2 hover:text-red-700 transition duration-300 font-semibold text-white">
    <Link to={href} className={className}>{text} </Link>
   </li>
  );
}

export default NavLink