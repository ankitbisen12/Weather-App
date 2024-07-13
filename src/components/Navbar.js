import React from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "./../assests/mausamlogo.png";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const navigation = [
  { name: "Source Code", href: "#" },
  { name: "Portfolio", href: "https://ankit-ankitbisen12.vercel.app/" },
];

export default function Navbar({city,setCity}) {
  const cityName = useRef(null);

  const cityHandler = () => {
    // console.log("Clicked");
    if (cityName.current.value) {
      setCity(cityName.current.value);
      cityName.current.value="";
    } else {
      toast.error('Please Enter location', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };

  return (
    <React.Fragment>
      <ToastContainer
        theme="dark"
      />
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-transparent">
          <div className="mx-auto px-2 sm:px-6 lg:px-14 py-2 md:py-4">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <img
                  alt="logo"
                  src={logo}
                  className="h-10 w-20 md:h-20 md:w-40"
                />
              </div>

              {/* Input field in the middle */}
              <div className="flex-grow flex justify-center">
                <div className="flex flex-row items-center px-2 md:px-4 py-1 rounded-full shadow-custom-shadow">
                  <input
                    type="text"
                    className="border-none outline-none bg-transparent text-white placeholder:text-gray-300 px-2 py-2 md:px-4 md:py-4 w-[140px] lg:w-[560px]"
                    placeholder="Find your location"
                    ref={cityName}
                  />
                  <button
                    className="px-4 py-1 md:px-6 md:py-2 rounded-3xl text-white text-md md:text-lg font-semibold bg-nav-100"
                    onClick={cityHandler}
                  >
                    Find
                  </button>
                </div>
              </div>

              {/* Navigation links */}
              <div className="hidden md:flex items-center space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white
                      rounded-md px-3 py-2 text-xl font-extrabold font-title"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md text-white font-bold">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-10 w-10 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-10 w-10 group-data-[open]:block"
                  />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="text-white 
                    block px-3 py-2 text-xl font-extrabold font-title"
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </Disclosure>
      </div>
    </React.Fragment>
  );
}
