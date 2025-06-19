"use client"

import K6Plot from "../components/K6Plot"

export default function K6Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white-100">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <K6Plot />
      </div>
    </div> 
  )
}