import { useState, useEffect } from 'react';
import { Search, Download, Plus, Users as UsersIcon, ChevronLeft, ChevronRight, LayoutGrid, ShieldCheck } from 'lucide-react';
import PageWrapper from '../components/ui/PageWrapper';
import { getUsers, deleteUser, exportUsers } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DataTable from '../components/table/DataTable';
import DeleteModal from '../components/ui/DeleteModal'; // New Modal

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    // Modal State
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, [page, search]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await getUsers(page, 10, search);
            setUsers(data.users);
            setTotalPages(data.pages);
        } catch (error) {
            toast.error('Failed to fetch user directory');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedUserId) return;

        try {
            setIsDeleting(true);
            await deleteUser(selectedUserId);
            toast.success('User deleted successfully');
            fetchUsers();
            setIsDeleteOpen(false);
        } catch (error) {
            toast.error('Failed to delete user');
        } finally {
            setIsDeleting(false);
            setSelectedUserId(null);
        }
    };

    return (
        <PageWrapper>
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 fade-in px-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse ring-4 ring-indigo-500/10" />
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">User Management System</span>
                    </div>
                    <h1 className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight leading-[0.9]">
                        User <span className="text-indigo-600">Directory</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium max-w-xl leading-relaxed">
                        Manage your application users, export records, and configure profile settings with a unified administrative dashboard.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                >
                    <button
                        onClick={exportUsers}
                        className="h-[52px] min-w-[170px] bg-white text-slate-700 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Download size={18} />
                        <span>Export Users</span>
                    </button>
                    <button
                        onClick={() => navigate('/add')}
                        className="h-[52px] min-w-[210px] bg-indigo-600 text-white rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        <Plus size={20} />
                        <span>Create New User</span>
                    </button>
                </motion.div>
            </div>

            {/* Centered Search Card Area */}
            <div className="mb-20 px-4">
                <motion.div
                    className="max-w-3xl mx-auto bg-white p-3 rounded-[24px] shadow-2xl shadow-indigo-100/50 border border-indigo-50"
                    layout
                >
                    <div className="relative flex items-center w-full group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300">
                            <Search size={22} strokeWidth={2.5} />
                        </div>
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Search by name, email or location..."
                            className="w-full h-[56px] pl-14 pr-12 bg-slate-50 border border-slate-100 rounded-[18px] text-slate-900 font-semibold transition-all duration-300 outline-none focus:bg-white focus:border-indigo-500/30"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {search && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                className="absolute right-5 flex items-center gap-3"
                            >
                                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Searching</span>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Control Bar */}
            <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-8 px-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <UsersIcon size={22} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Database</p>
                        <p className="text-base font-black text-slate-900 tracking-tight">Active Profiles List</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 bg-white p-2.5 rounded-[22px] shadow-sm border border-slate-100">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-all border border-slate-100 active:scale-95"
                    >
                        <ChevronLeft size={20} strokeWidth={3} />
                    </button>
                    <div className="px-5 text-sm font-black text-slate-900 min-w-[100px] text-center">
                        <span className="text-indigo-600">{page}</span>
                        <span className="text-slate-300 mx-2">/</span>
                        <span>{totalPages}</span>
                    </div>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-all border border-slate-100 active:scale-95"
                    >
                        <ChevronRight size={20} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* Main Data View */}
            <div className="relative fade-in">
                <DataTable users={users} onDelete={handleDeleteClick} isLoading={loading} />
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

export default UsersList;
