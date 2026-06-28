import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { loginSchema, LoginFormData } from '../validation/authSchemas';
import { useAuthStore } from '../store/useAuthStore';
import AuthInput from '../components/AuthInput';

interface LoginScreenProps {
  onLogin: (data: LoginFormData) => void;
  onSignupClick: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'sms'>('login');
  
  // SMS OTP Flow States
  const [phone, setPhone] = useState('');
  const [otpStep, setOtpStep] = useState<'phone' | 'code'>('phone');
  const [otpInput, setOtpInput] = useState('');
  const [otpSentAlert, setOtpSentAlert] = useState<string | null>(null);
  
  // Custom auth states
  const { login, signup, sendSmsOtp, verifySmsOtp, error, isLoading } = useAuthStore();
  const [authError, setAuthError] = useState<string | null>(null);

  // Email form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Signup form inputs
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  const onEmailLogin = async (data: LoginFormData) => {
    setAuthError(null);
    const success = await login(data.email, data.password);
    if (!success) {
      setAuthError(useAuthStore.getState().error || 'Login failed.');
    } else {
      onLogin(data);
    }
  };

  const onEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!signupEmail || !signupPassword || !signupName) {
      setAuthError('Please fill in all the aesthetic details.');
      return;
    }
    const success = await signup(signupEmail, signupPassword, signupName);
    if (!success) {
      setAuthError(useAuthStore.getState().error || 'Registration failed.');
    } else {
      onLogin({ email: signupEmail, password: signupPassword });
    }
  };

  const triggerOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!phone || phone.length < 8) {
      setAuthError('Please enter a valid phone number including country code.');
      return;
    }
    try {
      // For global twilio compatibility, standardise inputs without symbols
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      const code = await sendSmsOtp(cleanPhone);
      setOtpSentAlert(`[SMS Security]: Your Slayr validation code is: ${code}`);
      setOtpStep('code');
    } catch {
      setAuthError('Failed to dispatch SMS text.');
    }
  };

  const triggerOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!otpInput || otpInput.length < 6) {
      setAuthError('Enter the complete 6-digit OTP code.');
      return;
    }
    const success = await verifySmsOtp(otpInput);
    if (success) {
      setOtpSentAlert(null);
      onLogin({ email: 'genz-investor@slayr.app', password: 'otp-validated-pass' });
    } else {
      setAuthError(useAuthStore.getState().error || 'Invalid OTP code.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex overflow-hidden font-light relative select-none">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

      {/* Left Column: Premium Editorial Board for Pitching */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 z-10 border-r border-neutral-900/60 bg-black/40 backdrop-blur-3xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-sm font-mono tracking-widest text-neutral-500 uppercase">Slayr Fashion Lab v2.0</span>
        </div>

        <div className="max-w-lg space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl text-white tracking-tight font-extralight leading-[1.1]"
          >
            Where AI meets
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent font-normal">
              Style DNA.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base text-neutral-400 leading-relaxed font-light"
          >
            Slayr is a premium, VC-backed fashion intelligence application matching coordinates across a 100,000+ fashion index. Analyze style structures in 12ms.
          </motion.p>
        </div>

        {/* Dynamic Aesthetic Carousel items preview */}
        <div className="grid grid-cols-3 gap-4 text-xs font-mono text-neutral-500">
          <div>
            <p className="text-white font-medium mb-1">100K+</p>
            <p className="text-[10px]">Indexed Fits</p>
          </div>
          <div>
            <p className="text-white font-medium mb-1">18+</p>
            <p className="text-[10px]">Aesthetics</p>
          </div>
          <div>
            <p className="text-white font-medium mb-1">&lt; 3.0s</p>
            <p className="text-[10px]">AI Dispatch</p>
          </div>
        </div>
      </div>

      {/* Right Column: Premium Auth Box */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-neutral-950/60 border border-neutral-900 rounded-3xl p-8 backdrop-blur-xl relative shadow-2xl shadow-purple-500/5 overflow-hidden"
        >
          {/* Neon line overlay */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

          {/* Slayr Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light text-white tracking-widest uppercase">slayr</h1>
            <p className="text-[10px] text-neutral-500 font-mono tracking-widest mt-1">THE GEN Z STYLE ENGINE</p>
          </div>

          {/* Form Tabs */}
          <div className="flex bg-neutral-900/60 border border-neutral-900 p-1.5 rounded-2xl mb-8 text-xs relative">
            <button
              onClick={() => { setActiveTab('login'); setAuthError(null); }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${activeTab === 'login' ? 'bg-white text-black font-normal' : 'text-neutral-400 hover:text-white'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setAuthError(null); }}
              className={`flex-1 py-2.5 rounded-xl transition-all ${activeTab === 'signup' ? 'bg-white text-black font-normal' : 'text-neutral-400 hover:text-white'}`}
            >
              Join Slayr
            </button>
            <button
              onClick={() => { setActiveTab('sms'); setAuthError(null); setOtpStep('phone'); }}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${activeTab === 'sms' ? 'bg-purple-500 text-white font-normal' : 'text-neutral-400 hover:text-white'}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              SMS Sign
            </button>
          </div>

          {/* Form container */}
          <AnimatePresence mode="wait">
            {activeTab === 'login' && (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleLoginSubmit(onEmailLogin)}
                className="space-y-5"
              >
                <AuthInput
                  label="Enter your main character email"
                  type="email"
                  placeholder="you.are.the.moment@gmail.com"
                  error={loginErrors.email?.message}
                  icon={
                    <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  }
                  {...registerLogin('email')}
                />

                <AuthInput
                  label="Input your hacker-proof password"
                  type="password"
                  placeholder="••••••••"
                  error={loginErrors.password?.message}
                  icon={
                    <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                  {...registerLogin('password')}
                />

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-4 rounded-2xl text-sm font-light mt-6 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Decrypting DNA...' : 'Verify Style Identity'}
                </motion.button>
              </motion.form>
            )}

            {activeTab === 'signup' && (
              <motion.form
                key="signup-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={onEmailSignup}
                className="space-y-5"
              >
                <div>
                  <label className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-2 font-mono">What should we call you?</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sophia Rose"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="w-full bg-neutral-900/50 border border-neutral-900 focus:border-neutral-700 px-4 py-3.5 rounded-2xl text-white outline-none placeholder-neutral-600 text-sm font-light transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-2 font-mono">Select your style email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. sophia.style@gmail.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full bg-neutral-900/50 border border-neutral-900 focus:border-neutral-700 px-4 py-3.5 rounded-2xl text-white outline-none placeholder-neutral-600 text-sm font-light transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-2 font-mono">Choose a secure password</label>
                  <input
                    type="password"
                    required
                    placeholder="e.g. min6characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full bg-neutral-900/50 border border-neutral-900 focus:border-neutral-700 px-4 py-3.5 rounded-2xl text-white outline-none placeholder-neutral-600 text-sm font-light transition-colors"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-4 rounded-2xl text-sm font-light mt-6"
                >
                  {isLoading ? 'Creating Vibe Account...' : 'Initialize Style DNA'}
                </motion.button>
              </motion.form>
            )}

            {activeTab === 'sms' && (
              <motion.div
                key="sms-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {otpStep === 'phone' ? (
                  <form onSubmit={triggerOtpRequest} className="space-y-5">
                    <div>
                      <label className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-2 font-mono">What's your mobile phone digits?</label>
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +919876543210 or +15550199"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex-1 bg-neutral-900/50 border border-neutral-900 focus:border-neutral-700 px-4 py-3.5 rounded-2xl text-white outline-none placeholder-neutral-600 text-sm font-light transition-colors font-mono"
                        />
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-neutral-600 leading-relaxed font-light">
                      Real-time SMS dispatch requires adding your Twilio credentials inside the `.env` file. If they are missing, a simulated on-screen alert will pop up below containing the validation code.
                    </p>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white transition-colors py-4 rounded-2xl text-sm font-light flex items-center justify-center gap-2"
                    >
                      {isLoading ? 'Sending SMS OTP...' : 'Send SMS Verification Code'}
                    </motion.button>
                  </form>
                ) : (
                  <form onSubmit={triggerOtpVerification} className="space-y-5">
                    <div>
                      <label className="block text-[10px] text-neutral-500 uppercase tracking-widest mb-2 font-mono">Verification code sent via Text Message</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="e.g. 302948"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-neutral-900/50 border border-neutral-900 focus:border-neutral-700 px-4 py-4 rounded-2xl text-white outline-none placeholder-neutral-600 text-center text-2xl tracking-[0.4em] font-light transition-colors font-mono"
                      />
                    </div>

                    <div className="flex justify-between text-[10px]">
                      <span className="text-neutral-500 font-mono">Sent to {phone}</span>
                      <button
                        type="button"
                        onClick={() => setOtpStep('phone')}
                        className="text-purple-400 hover:underline"
                      >
                        Change phone number
                      </button>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-4 rounded-2xl text-sm font-light mt-6"
                    >
                      {isLoading ? 'Verifying OTP code...' : 'Confirm SMS Verification'}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Verification Code Toast Display for VC Pitch */}
          {otpSentAlert && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400"
            >
              <div className="flex gap-2.5 items-start">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div className="text-xs">
                  <p className="font-medium">On-Screen SMS Notification Alert</p>
                  <p className="font-mono mt-1 text-[11px] select-all cursor-pointer">{otpSentAlert}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Universal Error Message display */}
          {(error || authError) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-rose-500 text-xs text-center font-light leading-relaxed bg-rose-500/5 border border-rose-500/10 p-3.5 rounded-2xl"
            >
              {authError || error}
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
