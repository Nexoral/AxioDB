import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DBInfoStore, ExchangeKeyStore } from '../store/store'
import axios from 'axios'
import { BASE_API_URL } from '../config/key'

const Header = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const { Rootname } = DBInfoStore((state) => state)
  const { setRootname } = DBInfoStore((state) => state)
  const { TransactionKey } = ExchangeKeyStore((state) => state)

  useEffect(() => {
    axios
      .get(
        `${BASE_API_URL}/api/db/databases?transactiontoken=${TransactionKey}`
      )
      .then((response) => {
        if (response.status === 200) {
          setRootname(response.data.data.RootName ?? 'AxioDB')
        }
      })
  }, [])

  // eslint-disable-next-line
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen)
  }

  return (
    <header className='bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <Link to='/' className='flex items-center'>
                <img src='/AXioDB.png' alt='AxioDB Logo' className='h-9 w-9' />
                <span className='ml-2 text-white font-bold text-xl tracking-tight'>
                  {Rootname} Admin Hub
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:block ml-10'>
              <div className='flex space-x-4'>
                <Link
                  to='/'
                  className='text-blue-100 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  Dashboard
                </Link>
                <Link
                  to='/operations'
                  className='text-blue-100 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  Operations
                </Link>
                <Link
                  to='/import'
                  className='text-blue-100 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  Import DB
                </Link>
                <Link
                  to='/support'
                  className='text-blue-100 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  Support
                </Link>
                <Link
                  to='/status'
                  className='text-blue-100 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
