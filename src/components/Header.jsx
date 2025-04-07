import { useLocation, useNavigate } from "react-router-dom"; // ⬅️ Added useNavigate
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useEffect, useState } from "react";
import axios from "axios";
import GullyHeadLogo from "../assets/GullyHeadLogo.svg";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";

const Header = () => {
  // states
  const { hash, state } = useLocation();
  const navigate = useNavigate(); // ⬅️ Initialize navigate
  let [display, setDisplay] = useState("");
  const [openNavigation, setOpenNavigation] = useState(false);
  console.log(state);
  useEffect(() => {
    async function verify() {
      try {
        let data = await axios.post(
          "http://localhost:3000/app/v1/users/authorization",
          {},
          {
            headers: {
              Authorization: `bearer ${state}`,
            },
          }
        );
        if (data.data.status) {
          setDisplay("none");
        } else {
          setDisplay("");
        }
      } catch (e) {}
    }

    verify();
  }, []);

  // functions
  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  const handleLoginClick = () => {
    navigate("/login"); // ⬅️ Navigate to LoginCard route
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img
            src={GullyHeadLogo}
            width={190}
            height={40}
            alt="GullyHeadLogo"
          />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === hash ? "z-2 lg:text-n-1" : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        <a
          href="Newaccount"
          className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
        >
          New account
        </a>

        {/* ✅ Replaced href with onClick */}
        <div style={{ display: display }}>
          <Button
            display="none"
            className="hidden lg:flex"
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
        </div>

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
