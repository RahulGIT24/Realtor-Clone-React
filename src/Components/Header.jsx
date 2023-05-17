import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


function Header() {
    const location = useLocation();
    const navigate = useNavigate()

    const pathRoute = (route) => {
        if (route === location.pathname) {
            return true;
        }
    }

    return (
        <div className='bg-white border-b shadow-sm sticky top-0'>
            <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div>
                    <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="realtor-logo" className='h-5 cursor-pointer' onClick={() => { navigate('/') }} />
                </div>
                <div >
                    <ul className='flex space-x-10'>
                        <li className={`py-3 text-sm font-semibold cursor-pointer text-gray-600 border-b-4 border-b-transparent ${pathRoute('/') && "text-black border-b-red-700"}`} onClick={()=>{navigate('/')}}>Home</li>
                        <li className={`py-3 text-sm font-semibold cursor-pointer text-gray-600 border-b-4 border-b-transparent ${pathRoute('/offers') && "text-black border-b-red-700"}`} onClick={()=>{navigate('/offers')}}>Offers</li>
                        <li className={`py-3 text-sm font-semibold cursor-pointer text-gray-600 border-b-4 border-b-transparent ${pathRoute('/sign-in') && "text-black border-b-red-700"}`} onClick={()=>{navigate('/sign-in')}}> Sign In</li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Header
