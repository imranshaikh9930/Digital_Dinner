import React from 'react'

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="relative w-24 h-24 animate-spin-slow">
        {/* Plate */}
        <div className="w-full h-full rounded-full border-4 border-yellow-400 border-t-transparent"></div>

        {/* Food Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          🍕
        </div>
      </div>
      <p className="mt-6 text-lg text-gray-700 font-semibold animate-pulse">
        Preparing your delicious meal...
      </p>
    </div>
  )
}

export default Loader