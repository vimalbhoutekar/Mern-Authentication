import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden'>
      {/* Animated gradient background */}
      <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
        {/* Floating orbs */}
        <div className='absolute -top-96 -right-96 w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-96 -left-96 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-3xl animate-pulse delay-700'></div>
        <div className='absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        
        {/* Grid pattern overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50'></div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      {!isLoggedin ? (
        <div className='min-h-screen flex items-center justify-center px-4 pt-20'>
          <div className='max-w-5xl mx-auto text-center'>
            {/* Main Headline */}
            <div className='mb-8 space-y-6 animate-fade-in'>
              <div className='inline-block px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full mb-8'>
                <span className='text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text font-semibold text-sm'>
                  🚀 Secure Authentication Platform
                </span>
              </div>

              <h1 className='text-5xl sm:text-7xl font-black leading-tight'>
                <span className='bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent'>
                  Your Security,
                </span>
                <br />
                <span className='bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200 bg-clip-text text-transparent'>
                  Our Priority
                </span>
              </h1>

              <p className='text-xl text-gray-300/80 max-w-2xl mx-auto leading-relaxed font-light'>
                Experience lightning-fast authentication with military-grade encryption. Sign up in seconds, stay secure forever.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up'>
              <button 
                onClick={() => isLoggedin ? navigate('/') : navigate('/login')}
                className='group relative px-8 sm:px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl transition duration-300 shadow-xl hover:shadow-purple-500/50 hover:scale-105 transform active:scale-95'
              >
                <span className='relative flex items-center justify-center gap-2'>
                  {isLoggedin ? 'Go to Dashboard' : 'Get Started Free'}
                  <svg className='w-5 h-5 group-hover:translate-x-1 transition' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </span>
              </button>
              {!isLoggedin && (
              <button 
                onClick={() => navigate('/login')}
                className='px-8 sm:px-12 py-4 border-2 border-white/40 hover:border-white/80 text-white font-bold text-lg rounded-xl transition duration-300 backdrop-blur-sm hover:bg-white/10 hover:scale-105 transform active:scale-95'
              >
                Sign In
              </button>
              )}
            </div>

            {/* Feature Highlights */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 animate-slide-up delay-200'>
              {[
                { icon: '⚡', title: 'Lightning Fast', desc: 'Register in under 1 second' },
                { icon: '🔐', title: 'Bank-Level Security', desc: 'End-to-end encryption' },
                { icon: '✅', title: 'Email Verification', desc: 'Protect your account' }
              ].map((feature, idx) => (
                <div key={idx} className='group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-2xl p-8 transition duration-300 hover:bg-white/10'>
                  <div className='text-4xl mb-4 group-hover:scale-110 transition duration-300'>{feature.icon}</div>
                  <h3 className='text-xl font-bold text-white mb-2'>{feature.title}</h3>
                  <p className='text-gray-300/70 text-sm'>{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className='mb-20 animate-fade-in delay-300'>
              <p className='text-gray-400 text-sm mb-6'>Trusted by developers worldwide</p>
              <div className='flex justify-center items-center gap-8 flex-wrap'>
                {['Node.js', 'React', 'MongoDB', 'Express'].map((tech, idx) => (
                  <div key={idx} className='px-4 py-2 bg-white/5 backdrop-blur border border-white/10 rounded-lg text-gray-300 text-sm font-medium hover:border-white/30 transition'>
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Dashboard View */
        <Header />
      )}

      {/* Footer */}
      <footer className='relative z-10 border-t border-white/10 bg-gradient-to-t from-slate-950 to-transparent'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
            <div>
              <h4 className='text-white font-bold mb-4'>Product</h4>
              <ul className='space-y-2 text-gray-400 text-sm'>
                <li><button className='hover:text-white transition'>Features</button></li>
                <li><button className='hover:text-white transition'>Security</button></li>
                <li><button className='hover:text-white transition'>Pricing</button></li>
              </ul>
            </div>
            <div>
              <h4 className='text-white font-bold mb-4'>Company</h4>
              <ul className='space-y-2 text-gray-400 text-sm'>
                <li><button className='hover:text-white transition'>About</button></li>
                <li><button className='hover:text-white transition'>Blog</button></li>
                <li><button className='hover:text-white transition'>Careers</button></li>
              </ul>
            </div>
            <div>
              <h4 className='text-white font-bold mb-4'>Resources</h4>
              <ul className='space-y-2 text-gray-400 text-sm'>
                <li><button className='hover:text-white transition'>Docs</button></li>
                <li><button className='hover:text-white transition'>API</button></li>
                <li><button className='hover:text-white transition'>Support</button></li>
              </ul>
            </div>
            <div>
              <h4 className='text-white font-bold mb-4'>Legal</h4>
              <ul className='space-y-2 text-gray-400 text-sm'>
                <li><button className='hover:text-white transition'>Privacy</button></li>
                <li><button className='hover:text-white transition'>Terms</button></li>
                <li><button className='hover:text-white transition'>Contact</button></li>
              </ul>
            </div>
          </div>
          <div className='border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
            <p className='text-gray-400 text-sm'>© 2025 SecureAuth. All rights reserved.</p>
            <p className='text-gray-400 text-sm'>🔐 Your connection is secure and encrypted</p>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  )
}

export default Home