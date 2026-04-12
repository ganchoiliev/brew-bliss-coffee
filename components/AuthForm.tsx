import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Globe, ArrowRight, Coffee, Lock } from 'lucide-react';
import { auth } from '../lib/supabase';

interface AuthFormProps {
    onAuthSuccess: (userId: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onAuthSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [favoriteCoffee, setFavoriteCoffee] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (isLoginMode) {
                // Supabase Auth — secure password-based login (hashed, JWT session)
                const data = await auth.signIn(email, password);
                if (data.user) {
                    onAuthSuccess(data.user.id);
                }
            } else {
                // Supabase Auth — secure signup with hashed password
                if (password.length < 6) {
                    throw new Error('Password must be at least 6 characters');
                }

                const data = await auth.signUp(email, password, {
                    name,
                    favorite_coffee: favoriteCoffee || undefined,
                });

                if (data.user) {
                    onAuthSuccess(data.user.id);
                }
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section id="auth" className="relative bg-[#1a0a10] px-6 py-32">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#F472B6] rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{ opacity: [0.05, 0.08, 0.05], scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-[#FB7185] rounded-full blur-[150px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[#F472B6] to-[#FB7185] shadow-[0_0_60px_rgba(244,114,182,0.4)]"
                    >
                        <Coffee className="w-10 h-10 text-[#1a0a10]" />
                    </motion.div>

                    <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                        {isLoginMode ? 'Welcome Back' : 'Join the Club'}
                    </h2>
                    <p className="text-xl text-[#C9A0A0]">
                        {isLoginMode ? 'Sign in to manage your coffee subscriptions' : 'Create your account and start your coffee journey'}
                    </p>
                </div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onSubmit={handleSubmit}
                    className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
                >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#F472B6]/10 to-[#FB7185]/10 blur-xl -z-10" />

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#F472B6] transition-colors" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F472B6] focus:ring-2 focus:ring-[#F472B6]/20 focus-visible:ring-2 focus-visible:ring-[#F472B6] transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                            Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#F472B6] transition-colors" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F472B6] focus:ring-2 focus:ring-[#F472B6]/20 focus-visible:ring-2 focus-visible:ring-[#F472B6] transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        {!isLoginMode && (
                            <p className="mt-1 text-xs text-[#6b4f4f]">Minimum 6 characters</p>
                        )}
                    </div>

                    {/* Name Input - Only show in signup mode */}
                    {!isLoginMode && (
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                                Full Name
                            </label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#F472B6] transition-colors" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F472B6] focus:ring-2 focus:ring-[#F472B6]/20 focus-visible:ring-2 focus-visible:ring-[#F472B6] transition-all"
                                    placeholder="Coffee Lover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Favorite Coffee Input - Only show in signup mode */}
                    {!isLoginMode && (
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                                Favorite Coffee <span className="text-gray-500 font-normal">(Optional)</span>
                            </label>
                            <div className="relative group">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#F472B6] transition-colors" />
                                <input
                                    type="text"
                                    value={favoriteCoffee}
                                    onChange={(e) => setFavoriteCoffee(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F472B6] focus:ring-2 focus:ring-[#F472B6]/20 focus-visible:ring-2 focus-visible:ring-[#F472B6] transition-all"
                                    placeholder="Ethiopian Yirgacheffe"
                                />
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full py-5 bg-gradient-to-r from-[#F472B6] to-[#FB7185] text-[#1a0a10] font-black text-lg rounded-xl overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(244,114,182,0.5)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0a10]"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isLoading ? 'Brewing...' : (isLoginMode ? 'Sign In' : 'Start My Journey')}
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FBCFE8] to-[#F472B6] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    {/* Login/Signup Toggle */}
                    <p className="mt-6 text-center text-sm text-[#C9A0A0]">
                        {isLoginMode ? (
                            <>
                                New here?{' '}
                                <button
                                    type="button"
                                    onClick={() => { setIsLoginMode(false); setError(''); }}
                                    className="text-[#F472B6] font-bold hover:underline focus-visible:ring-2 focus-visible:ring-[#F472B6] rounded"
                                >
                                    Create an account
                                </button>
                            </>
                        ) : (
                            <>
                                Already a member?{' '}
                                <button
                                    type="button"
                                    onClick={() => { setIsLoginMode(true); setError(''); }}
                                    className="text-[#F472B6] font-bold hover:underline focus-visible:ring-2 focus-visible:ring-[#F472B6] rounded"
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </p>
                </motion.form>
            </motion.div>
        </section>
    );
};

export default AuthForm;
