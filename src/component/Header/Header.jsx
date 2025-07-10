import React from "react";
import { Logo, Container, LogOutBtn } from "../index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const menuref = React.useRef(null);
  const handleClick = (e) => {
    if (
      open &&

      e.target.tagName === "BUTTON"
    ) {
      setOpen(false);
    }
    
  };
  document.addEventListener("click", handleClick);

  const navIteams = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-0 shadow bg-slate-800">
      <Container>
        <nav className="flex justify-between">
          <div className="mr-4 flex items-center">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="ml-auto hidden md:flex text-white text-lg">
            {navIteams.map((iteam) =>
              iteam.active ? (
                <li key={iteam.name}>
                  <button
                    onClick={() => {
                      navigate(iteam.slug);
                    }}
                    className="inline-block px-6 py-2 
                    duration-200 hover:text-blue-500 font-semibold rounded-full"
                  >
                    {iteam.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Nav */}
          <ul
            ref={menuref}
            className={`ml-auto flex-col block md:hidden w-[250px] fixed bg-[color:var(--card-color)] gap-3 pt-20 h-screen z-50 left-0 top-0 text-white 
          text-lg transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0 " : "-translate-x-full"
          }`}
          >
            {navIteams.map((iteam) =>
              iteam.active ? (
                <li key={iteam.name}>
                  <button
                    onClick={() => {
                      navigate(iteam.slug);
                    }}
                    className="inline-block px-6 py-2 
                    duration-200 hover:bg-blue-200 rounded-full"
                  >
                    {iteam.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>

          {!open ? (
            <MdOutlineMenu
              onClick={handleOpen}
              className="text-3xl md:hidden text-white"
            />
          ) : (
            <RxCross1
              onClick={handleOpen}
              className="text-3xl md:hidden text-white"
            />
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
