'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import MetamaskConnector from '@/components/MetamaskConnector/MetamaskConnector'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Money Tracker', href: '/MoneyTracker' },
  { name: 'Our Team', href: '/OurTeam' },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const router = useRouter()

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

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-20">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-slate-200 ring-1 ring-slate-500 hover:ring-white">
              Devcon 2024 LFGGGGG.{' '}
              <a href="https://devcon.org/en/" className="font-semibold text-indigo-300">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <img
                alt="Company Logo"
                src="/logo_white.png"
                className="mx-auto h-15 w-auto"
            />
            <h1 className="text-balance text-5xl font-bold tracking-tight text-slate-200 sm:text-7xl">
              Kaching 2.0
            </h1>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-200 sm:text-5xl">
              Web3 Money Tracker
            </h2>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
            A decentralized tool that helps you keep track of your crypto transactions. It’s built for privacy and transparency, giving you control over your financial data while making it easy to organize and review your activity in the Web3 world.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/MoneyTracker"
                className="text-sm/6 font-semibold text-slate-200 hover:underline">
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-slate-200">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}/>
        </div>
      </div>
    </div>
  )
}
