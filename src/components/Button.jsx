import { Link } from "react-router-dom";

export const Button = ({ className, children, href }) => {
  return (
    <Link to={href}>
      <button
        // onClick={() => router.push("/product")}
        className={`dark:bg-slate-800 dark:text-gray-300 bg-slate-300 text-black ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};
