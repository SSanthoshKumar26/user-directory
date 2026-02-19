import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';
import UserForm from '../components/forms/UserForm';
import { getUser, updateUser } from '../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, UserCog } from 'lucide-react';
import { motion } from 'framer-motion';

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getUser(id);
                setUser(data);
            } catch (error) {
                toast.error('Failed to fetch user details');
                navigate('/');
            } finally {
                setFetching(false);
            }
        };
        fetchUser();
    }, [id, navigate]);

    const handleUpdateUser = async (userData) => {
        try {
            setLoading(true);
            await updateUser(id, userData);
            toast.success('User updated successfully!');
            navigate('/');
        } catch (error) {
            let errorMsg = error.response?.data?.message || 'Failed to update user';
            if (errorMsg.includes('duplicate key')) {
                errorMsg = 'This email address is already registered. Please use a different one.';
            }
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <PageWrapper>
                <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
                    <div className="w-16 h-16 border-4 border-slate-100 border-t-brand-500 rounded-full animate-spin shadow-inner" />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Fetching Record</p>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="max-w-4xl mx-auto mb-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-all font-black uppercase tracking-tighter text-xs group mb-6"
                >
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:shadow-md transition-shadow">
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    Discard and Return
                </button>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-indigo-600 text-white rounded-xl">
                            <UserCog size={20} />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-md border border-slate-200">Settings</span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Edit Profile</h1>
                    <p className="text-slate-500 mt-2 text-lg">Update the profile information for <span className="text-indigo-600 font-bold">{user?.firstName} {user?.lastName}</span>.</p>
                </motion.div>
            </div>

            <UserForm onSubmit={handleUpdateUser} initialData={user} isLoading={loading} />
        </PageWrapper>
    );
};

export default EditUser;
