import { Link, useLocation } from 'react-router-dom';
import { Users, PlusCircle, LayoutDashboard, Search, Bell, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Directory', icon: LayoutDashboard },
        { path: '/add', label: 'Add User', icon: PlusCircle },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3.5 group">
                        <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300 transform group-hover:-rotate-3">
                            <User size={24} fill="white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-slate-900 tracking-tight leading-none">Edu<span className="text-indigo-600">Face</span></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">User Management</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl transition-all duration-300 relative group overflow-hidden ${location.pathname === item.path
                                    ? 'text-indigo-600 font-bold'
                                    : 'text-slate-400 hover:text-slate-600 font-medium'
                                    }`}
                            >
                                <item.icon size={18} strokeWidth={location.pathname === item.path ? 2.5 : 2} />
                                <span className="text-xs uppercase tracking-wide">{item.label}</span>
                                {location.pathname === item.path && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white shadow-sm border border-slate-200/50 rounded-xl -z-10"
                                        transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Tools */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center">
                            <button className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100 hover:shadow-sm">
                                <Bell size={18} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                            <div className="hidden lg:flex flex-col items-end">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Administrator</span>
                                <span className="text-xs font-black text-slate-900 leading-tight mt-1.5">Santhosh S.</span>
                            </div>
                            <div className="w-11 h-11 rounded-2xl bg-slate-900 p-[2px] shadow-lg cursor-pointer hover:scale-105 transition-all overflow-hidden flex items-center justify-center">
                                <span className="font-bold text-white text-[10px]">AD</span>
                            </div>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden w-11 h-11 flex items-center justify-center text-slate-600 bg-slate-50 rounded-xl active:scale-95 transition-all"
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="md:hidden absolute top-full inset-x-0 mx-4 mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-[24px] shadow-2xl p-4 flex flex-col gap-2 z-50 overflow-hidden"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${location.pathname === item.path
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span className="font-bold uppercase tracking-wider text-xs">{item.label}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
