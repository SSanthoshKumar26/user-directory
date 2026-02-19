import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';
import UserForm from '../components/forms/UserForm';
import { createUser } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const AddUser = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddUser = async (userData) => {
        try {
            setLoading(true);
            await createUser(userData);
            toast.success('User created successfully!');
            navigate('/');
        } catch (error) {
            let errorMsg = error.response?.data?.message || 'Failed to create user';
            if (errorMsg.includes('duplicate key')) {
                errorMsg = 'This email address is already registered. Please use a different one.';
            }
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper>
            <div className="max-w-4xl mx-auto mb-10">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all font-black uppercase tracking-tighter text-xs group mb-6"
                >
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:shadow-md transition-shadow">
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    Back to directory
                </button>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-indigo-600 text-white rounded-xl">
                            <UserPlus size={20} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-md border border-slate-200">New Profile</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Add New User</h1>
                    <p className="text-slate-500 mt-2 text-lg">Enter the personal and contact information to create a new user account.</p>
                </motion.div>
            </div>

            <UserForm onSubmit={handleAddUser} isLoading={loading} />
        </PageWrapper>
    );
};

export default AddUser;
