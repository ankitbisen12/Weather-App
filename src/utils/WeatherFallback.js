import React from 'react';

const WeatherFallback = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-red-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-2xl shadow-lg ">
        {/* Header Section */}
        <div className="p-6 bg-cover rounded-tl-2xl rounded-tr-2xl" style={{ backgroundImage: "url('images/overcast.jpg')" }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-12 h-14 bg-gray-600 animate-pulse rounded-2xl"></div>
              <div className="ml-2">
                <div className="w-24 h-6 bg-gray-600 animate-pulse rounded-full"></div>
              </div>
            </div>
            <div className="flex gap-[1px]">
              <div className="px-1 text-2xl rounded-bl-lg rounded-tl-lg bg-gray-600 animate-pulse w-8 h-8"></div>
              <div className="px-1 text-2xl rounded-br-lg rounded-tr-lg bg-gray-600 animate-pulse w-8 h-8"></div>
            </div>
          </div>
          {/* Current Weather Section */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-2xl bg-gray-600 animate-pulse w-40 h-8 mb-2 rounded-2xl"></div>
              <div className="w-32 h-32 bg-gray-600 animate-pulse rounded-2xl"></div>
              <div className="text-xl bg-gray-600 animate-pulse w-32 h-6 mt-2 rounded-2xl"></div>
            </div>
            <div className="flex flex-col items-center justify-center w-64 h-64 rounded-full bg-gray-600 animate-pulse shadow-custom mt-4 md:mt-0"></div>
          </div>
        </div>

        <div className="bg-custom-input py-1">
          <div className="w-[240px] px-6">
            <div className="relative mt-2">
              <div className="relative w-full h-8 cursor-default rounded-md bg-gray-500 animate-pulse py-1.5 pl-3 pr-10 text-left text-white font-semibold shadow-sm outline-none sm:text-sm sm:leading-6"></div>
            </div>
          </div>
        </div>

        {/* Weather Details Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-6 py-4 text-lg font-semibold font-title bg-custom-input rounded-br-2xl rounded-bl-2xl">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-nav-300 rounded-xl p-2 flex flex-col items-center shadow-lg">
              <div className="text-white mt-2 bg-gray-500 animate-pulse w-20 h-6 rounded-2xl"></div>
              <div className="bg-gray-500 animate-pulse w-10 h-10 my-2 rounded-2xl"></div>
              <div className="text-white mt-2 bg-gray-500 animate-pulse w-16 h-6 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WeatherFallback