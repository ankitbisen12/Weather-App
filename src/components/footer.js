import React from "react";

const footer = () => {
  return (
    <footer className="text-white font-title text-md md:text-xl font-semibold">
      <div className="bg-transparent">
        <div className="container mx-auto py-4 px-5">
          <p className=" text-center ">
              © Made with ❤️ by
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="ml-1"
              target="_blank"
            >
              Ankit Bisen
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default footer;
