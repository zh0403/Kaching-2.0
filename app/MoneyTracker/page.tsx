'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Dialog, DialogPanel } from '@headlessui/react'
import MetamaskConnector from '@/components/MetamaskConnector/MetamaskConnector'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Money Tracker', href: '/MoneyTracker' },
  { name: 'Our Team', href: '/OurTeam' },
]

export default function MoneyTracker() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const [transactions, setTransactions] = useState([])  // Store transactions
  const [remark, setRemark] = useState('')
  const [selectedTransaction, setSelectedTransaction] = useState(null)  // For remarking
  const [isLoading, setIsLoading] = useState(true)  // Loading state for transactions

  useEffect(() => {
    fetchTransactionData()
  }, [])

  useEffect(() => {
    // Ensure the path is set on the client side
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname.split('?')[0])
    }
  }, [])
  
  const fetchTransactionData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('your-api-endpoint');
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      // Parse the response to JSON
      const data = await response.json();
      
      // Make sure the data is what you expect
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
  
      // Set the fetched data into the state
      setTransactions(data);
    } catch (error) {
      console.error('Error in fetchTransactionData:', error);
    }
  };

  const fetchTransactionsFromAPI = async (address) => {
    const apiKey = 'UUPB7T5Y4RQGPPNNFW4PSZP7DN9D17MG8P'
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`
  
    const response = await fetch(url)
    const data = await response.json()
  
    if (data.status === '1') {
      return data.result.map(tx => ({
        hash: tx.hash,
        date: new Date(tx.timeStamp * 1000).toLocaleDateString(),
        amount: ethers.utils.formatEther(tx.value),
        remark: ''  // Default empty remark
      }))
    } else {
      return []
    }
  }
  
  const handleRemarkSubmit = () => {
    if (selectedTransaction) {
      // Save the remark for the selected transaction
      const updatedTransactions = transactions.map((tx) =>
        tx.hash === selectedTransaction.hash ? { ...tx, remark: remark } : tx
      )
      setTransactions(updatedTransactions)
      setRemark('')  // Clear the remark input
      setSelectedTransaction(null)  // Deselect the transaction
    }
  }

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
        {/* Transaction History */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-white">Transaction History</h3>
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-white">Loading transactions...</p>
            ) : (
              transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white"
                >
                  <p><strong>Transaction Hash:</strong> {transaction.hash}</p>
                  <p><strong>Date:</strong> {transaction.date}</p>
                  <p><strong>Amount Transferred:</strong> {transaction.amount} ETH</p>
                  <button
                    onClick={() => setSelectedTransaction(transaction)}
                    className="mt-2 p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Add Remark
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Remark Section */}
        {selectedTransaction && (
          <div className="mt-8 p-4 bg-gray-800 text-white rounded-lg">
            <h4 className="text-lg font-semibold">Add a Remark</h4>
            <textarea
              className="w-full p-2 mt-2 rounded-md"
              rows={4}
              placeholder="Add your remark here..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
            <button
              onClick={handleRemarkSubmit}
              className="mt-2 p-2 bg-green-500 text-white rounded-md"
            >
              Submit Remark
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
