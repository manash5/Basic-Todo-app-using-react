import React from 'react'


const navbar = () => {
  return (
    <nav className="navbar bg-cyan-900 flex justify-between text-white py-2">
        <div className="logo">
            <span className = "font-bold text-xl mx-9">iTask</span>
        </div>
        <div className="navigations flex justify-between mx-9 gap-8">
            <div className="nav hover:font-bold">Home</div>
            <div className="nav hover:font-bold">YourTask</div>
        </div>
    </nav>
  )
}

export default navbar
