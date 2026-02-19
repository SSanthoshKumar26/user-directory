import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit2, Trash2, MapPin, Mail, UserPlus, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';

const DataTable = ({ users, onDelete, isLoading }) => {
    const navigate = useNavigate();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
    };

    if (isLoading) {
        return (
            <div className="w-full space-y-4 px-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-[90px] bg-slate-50 border border-slate-100 animate-pulse rounded-2xl" />
                ))}
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mx-4 bg-white p-20 rounded-[40px] shadow-2xl shadow-indigo-100/50 flex flex-col items-center justify-center text-center gap-8 border-2 border-dashed border-indigo-100"
            >
                <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-500">
                    <UserPlus size={48} />
                </div>
                <div className="max-w-md">
                    <h3 className="text-3xl font-black text-slate-900 mb-3">No Users Found</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">
                        Your directory is currently empty. Start by adding a new user to your system.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/add')}
                    className="h-14 px-10 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                    Add Your First User
                </button>
            </motion.div>
        );
    }

    return (
        <div className="w-full px-4 pb-12">
            <div className="hidden lg:grid grid-cols-12 gap-4 px-10 mb-6">
                <div className="col-span-5 text-xs font-black text-slate-400 uppercase tracking-widest pl-2">User Profile</div>
                <div className="col-span-3 text-xs font-black text-slate-400 uppercase tracking-widest">Contact</div>
                <div className="col-span-2 text-xs font-black text-slate-400 uppercase tracking-widest">Status</div>
                <div className="col-span-2 text-xs font-black text-slate-400 uppercase tracking-widest text-right pr-4">Actions</div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
            >
                <AnimatePresence mode='popLayout'>
                    {users.map((user) => (
                        <motion.div
                            key={user._id}
                            variants={item}
                            layout
                            className={`group relative bg-white p-6 lg:p-4 rounded-[28px] border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-300 hover:scale-[1.01] hover:border-indigo-100 ${user.status === 'Active' ? 'shadow-lg shadow-indigo-50/50 border-indigo-50' : ''}`}
                        >
                            {/* Name/Profile Section */}
                            <div className="lg:col-span-5 lg:pl-6 flex items-center gap-4">
                                <div className="relative shrink-0">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-sm group-hover:border-indigo-200 transition-all">
                                        <img
                                            src={user.profileImage?.startsWith('http') ? user.profileImage : `http://localhost:5000/uploads/${user.profileImage}`}
                                            alt={user.firstName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=' + user.firstName + '+' + user.lastName + '&background=f3f4f6&color=4f46e5&bold=true'}
                                        />
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors">
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">
                                        ID: {user._id.substring(18)}
                                    </span>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="lg:col-span-3 flex flex-col gap-1 pr-4">
                                <div className="flex items-center gap-2 text-sm text-slate-600 font-bold truncate">
                                    <Mail size={14} className="text-slate-300" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold uppercase tracking-wide">
                                    <Phone size={12} className="text-slate-300" />
                                    {user.mobile}
                                </div>
                            </div>

                            {/* Account Status */}
                            <div className="lg:col-span-2">
                                <StatusBadge status={user.status} />
                            </div>

                            {/* Actions Section */}
                            <div className="lg:col-span-2 lg:pr-6 flex items-center lg:justify-end gap-3">
                                <button
                                    onClick={() => navigate(`/view/${user._id}`)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                    title="View Profile"
                                >
                                    <Eye size={18} />
                                </button>
                                <button
                                    onClick={() => navigate(`/edit/${user._id}`)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                    title="Edit Profile"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete(user._id)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                    title="Delete User"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default DataTable;
