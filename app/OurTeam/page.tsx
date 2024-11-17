'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import MetamaskConnector from '@/components/MetamaskConnector/MetamaskConnector'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Money Tracker', href: '/MoneyTracker' },
  { name: 'Our Team', href: '/OurTeam' },
]

export default function OurTeam() {
  const [currentPath, setCurrentPath] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const teamMembers = [
    { name: 'Zonghao', position: 'Frontend/Backend Developer', imgSrc: '/APUBCC_Duckie.avif' },
    { name: 'Wenfei', position: 'Smart Contract Developer', imgSrc: '/wenfei.png' },
    { name: 'Meera', position: 'UIUX Desinger', imgSrc: '/meera.png' },
    { name: 'Zaid', position: 'UIUX Designer', imgSrc: '/zaid.png' },
  ]

  useEffect(() => {
    // Ensure the path is set on the client side
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname.split('?')[0])
    }
  }, [])

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #200D42 36.21%, #4F21A1 68.68%, #A46EDB 86.54%)',
      }}
      className="min-h-screen"
    >
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 text-slate-200">
          <div className="flex lg:flex-1">
            <a className="-m-1.5 p-1.5">
              {/* Add your logo here if needed */}
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold px-2 py-1 transition-colors ${
                  currentPath === item.href
                    ? 'text-indigo-500 border-b-2 border-indigo-500'
                    : 'text-slate-200 hover:text-indigo-400 hover:border-b-2 hover:border-indigo-400'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <MetamaskConnector />
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="pt-40 pb-32 px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-white">Meet Our Team</h2>
          <p className="mt-4 text-lg text-gray-200">A group of passionate professionals working together to build something great.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center bg-white p-6 rounded-lg shadow-lg">
              <img
                src={member.imgSrc}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-indigo-500">{member.name}</h3>
              <p className="text-md text-indigo-400">{member.position}</p>
            </div>
          ))}
        </div>
    </div>
    </div>
  )
}