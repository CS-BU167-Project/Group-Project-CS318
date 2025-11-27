import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WavyBackground } from "@/components/ui/shadcn-io/wavy-background";
import { authAPI } from './api';
import { X, Lock } from 'lucide-react';

const WAVY_COLORS = ["#22d3ee", "#4ade80", "#2563eb"];

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Password Change State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Password Visibility State
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const userData = await authAPI.getProfile();
        setUser(userData);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      await authAPI.changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setShowPasswordModal(false), 2000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    }
  };

  if (loading) {
    return (
      <WavyBackground 
        className="w-full h-full flex flex-col items-center justify-center"
        containerClassName="h-screen"
        backgroundFill="black"
        colors={WAVY_COLORS}
        waveOpacity={0.5}
        blur={10}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
        <p className="text-white font-medium">Loading profile...</p>
      </WavyBackground>
    );
  }

  if (error) {
    return (
      <WavyBackground 
        className="w-full h-full flex flex-col items-center justify-center"
        containerClassName="h-screen"
        backgroundFill="black"
        colors={WAVY_COLORS}
        waveOpacity={0.5}
        blur={10}
      >
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-lg mb-6 text-center max-w-md">
          <p className="font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
        <button 
          onClick={handleBack} 
          className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
        >
          Back to Dashboard
        </button>
      </WavyBackground>
    );
  }

  return (
    <WavyBackground 
      className="w-full h-full flex flex-col items-center justify-center"
      containerClassName="h-screen"
      backgroundFill="black"
      colors={WAVY_COLORS}
      waveOpacity={0.5}
      blur={10}
    >
      <div className="w-full max-w-2xl p-8 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-800/50 shadow-2xl mx-4">
        <header className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-6 shadow-xl shadow-emerald-500/20">
            {user.firstname.charAt(0)}{user.lastname.charAt(0)}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{user.firstname} {user.lastname}</h2>
          <p className="text-slate-400">{user.email}</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/60 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">👤</span>
              Profile Information
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-white font-medium text-lg">{user.firstname} {user.lastname}</p>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email Address</p>
                <p className="text-white font-medium text-lg">{user.email}</p>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Member Since</p>
                <p className="text-white font-medium text-lg">
                  {new Date(user.id ? Date.now() - user.id * 1000 : Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/60 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">⚙️</span>
              Account Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
                <span className="text-slate-300 font-medium">Email Notifications</span>
                <div className="w-12 h-7 bg-emerald-600 rounded-full relative cursor-pointer transition-colors hover:bg-emerald-500">
                  <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl border border-slate-700/30">
                <span className="text-slate-300 font-medium">Dark Mode</span>
                <div className="w-12 h-7 bg-emerald-600 rounded-full relative cursor-pointer transition-colors hover:bg-emerald-500">
                  <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="w-full py-4 mt-4 text-emerald-400 hover:text-emerald-300 text-sm font-bold border border-emerald-500/30 rounded-xl hover:bg-emerald-500/10 transition-all uppercase tracking-wide"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleBack} 
            className="w-full py-4 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white font-bold rounded-xl transition-all duration-300 border border-slate-800 hover:border-slate-700 flex items-center justify-center gap-2"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 w-full max-w-md shadow-2xl transform transition-all scale-100">
            <div className="flex justify-center items-center mb-8">
              <h3 className="text-2xl font-bold text-white">Change Password</h3>
            </div>
            <form className="space-y-6" onSubmit={handleChangePassword}>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Current Password</label>
                <div className="relative group/input">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required 
                    className="w-full pl-10 pr-16 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-white placeholder-slate-600 transition-all"
                  />
                  <span 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-medium cursor-pointer select-none transition-colors uppercase tracking-wider"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showCurrentPassword ? 'hide' : 'show'}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">New Password</label>
                <div className="relative group/input">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                    className="w-full pl-10 pr-16 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-white placeholder-slate-600 transition-all"
                  />
                  <span 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-medium cursor-pointer select-none transition-colors uppercase tracking-wider"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showNewPassword ? 'hide' : 'show'}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Confirm New Password</label>
                <div className="relative group/input">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                    className="w-full pl-10 pr-16 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-white placeholder-slate-600 transition-all"
                  />
                  <span 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs font-medium cursor-pointer select-none transition-colors uppercase tracking-wider"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showConfirmPassword ? 'hide' : 'show'}
                  </span>
                </div>
              </div>
              
              {passwordError && (
                <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  {passwordError}
                </p>
              )}
              
              {passwordSuccess && (
                <p className="text-emerald-400 text-sm bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                  {passwordSuccess}
                </p>
              )}

              <div className="flex gap-3 mt-8">
                <button 
                  type="button" 
                  className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors" 
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-emerald-500/20"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </WavyBackground>
  );
}

export default Profile;