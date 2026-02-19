import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit3, Trash2, Shield, Activity, Clock, ShieldCheck, Globe, Fingerprint, User } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import StatusBadge from '../components/ui/StatusBadge';
import { getUser, deleteUser } from '../services/api';
import toast from 'react-hot-toast';
import DeleteModal from '../components/ui/DeleteModal';

const ViewUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Modal State
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getUser(id);
                setUser(data);
            } catch (error) {
                toast.error('User profile not found');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id, navigate]);

    const handleDeleteClick = () => {
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteUser(id);
            toast.success('User deleted successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to delete user');
            setIsDeleting(false);
            setIsDeleteOpen(false);
        }
    };

    if (loading) {
        return (
            <PageWrapper>
                <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
                    <div className="w-16 h-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
                    <div className="text-center">
                        <p className="text-slate-900 font-black uppercase tracking-[0.2em] text-[11px]">Loading Profile</p>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    const infoItems = [
        { label: 'Email Address', value: user.email, icon: Mail, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        { label: 'Mobile Number', value: user.mobile, icon: Phone, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Gender', value: user.gender, icon: User, color: 'text-slate-900', bg: 'bg-slate-100' },
        { label: 'Location', value: user.location, icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Account Created', value: new Date(user.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }), icon: Calendar, color: 'text-violet-500', bg: 'bg-violet-50' },
    ];

    return (
        <PageWrapper>
            <div className="max-w-6xl mx-auto px-4 pb-20">
                {/* Top Navigation Bar */}
                <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 fade-in">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-4 text-slate-400 hover:text-indigo-600 transition-all font-black uppercase tracking-widest text-[10px] group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:border-indigo-200 transition-all">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        </div>
                        Back to Directory
                    </button>

                    <div className="flex gap-4 w-full sm:w-auto">
                        <Link to={`/edit/${id}`} className="h-[52px] px-8 bg-white text-slate-700 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-slate-50 transition-all shadow-sm">
                            <Edit3 size={18} />
                            <span>Edit Profile</span>
                        </Link>
                        <button
                            onClick={handleDeleteClick}
                            className="w-[52px] h-[52px] bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90 border border-red-100"
                            title="Delete User"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    {/* Hero Profile Column */}
                    <div className="xl:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-indigo-100 border border-slate-50 fade-in"
                        >
                            <div className="h-32 bg-gradient-to-br from-indigo-500 to-indigo-700 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#fff,transparent)]" />
                            </div>

                            <div className="px-10 pb-12 text-center relative mt-[-80px]">
                                <div className="relative inline-block mb-8">
                                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-50 relative z-10">
                                        <img
                                            src={user.profileImage?.startsWith('http') ? user.profileImage : `http://localhost:5000/uploads/${user.profileImage}`}
                                            alt={user.firstName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=' + user.firstName + '+' + user.lastName + '&background=f3f4f6&color=4f46e5&bold=true&size=300'}
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 z-20">
                                        <StatusBadge status={user.status} />
                                    </div>
                                </div>

                                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                                    {user.firstName} {user.lastName}
                                </h1>
                                <p className="text-indigo-600 font-bold uppercase tracking-widest text-[11px] mb-10">{user.email}</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-1 hover:bg-white hover:border-indigo-100 transition-all duration-300">
                                        <Shield size={20} className="text-indigo-500" />
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Status</p>
                                        <p className="text-slate-900 font-bold text-sm">Verified</p>
                                    </div>
                                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-1 hover:bg-white hover:border-emerald-100 transition-all duration-300">
                                        <Activity size={20} className="text-emerald-500" />
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Activity</p>
                                        <p className="text-slate-900 font-bold text-sm">Active</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Information Grid Column */}
                    <div className="xl:col-span-7 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {infoItems.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-6 rounded-3xl flex items-start gap-4 border border-slate-100 hover:shadow-xl hover:shadow-indigo-50/50 transition-all"
                                >
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-slate-50 shadow-sm ${item.bg} ${item.color}`}>
                                        <item.icon size={22} />
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                        <span className="text-sm font-bold text-slate-900 truncate">{item.value}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-slate-900 p-8 rounded-[32px] text-white relative overflow-hidden group shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                            <div className="flex items-center gap-5 relative z-10">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                                    <Clock size={28} className="text-indigo-400" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-black tracking-tight">Recent Activity</h2>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Event Log</span>
                                </div>
                            </div>
                            <div className="mt-8 space-y-4 relative z-10">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                            <span className="text-xs font-bold text-slate-300">Profile viewed by Administrator</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Just now</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteOpen && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    title="Delete User Account"
                    message="Are you sure you want to permanently delete this user account? This action cannot be undone."
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={confirmDelete}
                    isDeleting={isDeleting}
                />
            )}
        </PageWrapper>
    );
};

export default ViewUser;
