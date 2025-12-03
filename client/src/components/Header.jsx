import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen px-4 text-center relative z-10 overflow-hidden'>
      {/* Animated gradient background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-700'></div>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <div className='max-w-3xl mx-auto'>
        {/* Avatar Section */}
        <div className='mb-12 flex justify-center animate-fade-in'>
          <div className='relative group'>
            {/* Animated outer ring */}
            <div className='absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-500 animate-spin-slow'></div>
            
            {/* Inner glow */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition duration-500'></div>
            
            {/* Avatar Image */}
            <img 
              src={assets.header_img} 
              alt="Profile" 
              className='relative w-40 h-40 sm:w-52 sm:h-52 rounded-full border-4 border-white/30 backdrop-blur-xl object-cover shadow-2xl group-hover:border-white/50 transition duration-500' 
            />
            
            {/* Verification Badge */}
            {userData?.isAccountVerified ? (
              <div className='absolute -bottom-2 right-0 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full p-3 border-4 border-slate-900 shadow-lg animate-bounce-slow'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
              </div>
            ) : (
              <div className='absolute -bottom-2 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full p-3 border-4 border-slate-900 shadow-lg animate-pulse'>
                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M13.816 4.417a2 2 0 00-3.632 0l-2.906 6.83a2 2 0 001.857 2.753H9.19a1 1 0 000 2h-.003a4 4 0 003.716-2.226l2.906-6.83z' clipRule='evenodd' />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Welcome Greeting */}
        <div className='mb-4 space-y-3'>
          <h1 className='flex flex-col sm:flex-row items-center justify-center gap-3 text-3xl sm:text-5xl font-bold'>
            <span className='bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent'>
              Hey {userData ? userData.name.split(' ')[0] : "there"}!
            </span>
            <img className='w-10 h-10 sm:w-12 sm:h-12 animate-wave' src={assets.hand_wave} alt="wave" />
          </h1>
          
          <h2 className='text-4xl sm:text-6xl font-black bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent leading-tight'>
            Welcome Back
          </h2>
        </div>

        {/* Subtitle */}
        <p className='text-gray-300/90 mb-10 text-lg sm:text-xl max-w-lg mx-auto leading-relaxed font-light'>
          {userData?.isAccountVerified 
            ? '🔐 Your account is fully verified and secure. You\'re all set to go!'
            : '🔔 Complete your email verification to unlock all features and stay secure.'}
        </p>

        {/* Stats Cards */}
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12 max-w-lg mx-auto'>
          <div className='bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/10 hover:border-white/40 transition duration-300 group/card'>
            <div className='text-3xl mb-2'>
              {userData?.isAccountVerified ? '✅' : '⏳'}
            </div>
            <p className='text-xs sm:text-sm text-gray-300 font-medium'>
              {userData?.isAccountVerified ? 'Verified' : 'Pending'}
            </p>
          </div>
          
          <div className='bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/10 hover:border-white/40 transition duration-300 group/card'>
            <div className='text-3xl mb-2'>🔒</div>
            <p className='text-xs sm:text-sm text-gray-300 font-medium'>Encrypted</p>
          </div>

          <div className='bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 hover:bg-white/10 hover:border-white/40 transition duration-300 group/card'>
            <div className='text-3xl mb-2'>⚡</div>
            <p className='text-xs sm:text-sm text-gray-300 font-medium'>Active</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
          <button 
            onClick={() => navigate('/login')}
            className='px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-xl transition duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105 transform active:scale-95'
          >
            {userData ? 'Go to Dashboard' : 'Sign In Now'}
          </button>
          
          {!userData && (
            <button 
              onClick={() => navigate('/login')}
              className='px-8 py-4 border-2 border-white/40 hover:border-white/80 text-white font-bold rounded-xl transition duration-300 backdrop-blur-sm hover:bg-white/10'
            >
              Create Account
            </button>
          )}
        </div>

        {/* Account Info */}
        {userData && (
          <div className='bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md mx-auto'>
            <p className='text-gray-400 text-sm mb-2'>📧 Logged in as</p>
            <p className='text-white font-bold text-lg break-all'>{userData.email}</p>
            {userData.isAccountVerified && (
              <p className='text-green-400 text-xs mt-3 flex items-center gap-2'>
                <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                Email Verified
              </p>
            )}
          </div>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
          transform-origin: 70% 70%;
          display: inline-block;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
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

export default Header;