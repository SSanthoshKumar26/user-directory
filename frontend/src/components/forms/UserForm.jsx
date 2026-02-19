import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, X, User, Mail, Phone, MapPin, Check,
    AlertCircle, ChevronDown, Camera, Hash, Globe,
    Fingerprint, Calendar, Loader2, ArrowLeft,
    Layers, Shield, Activity
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const UserForm = ({ onSubmit, initialData, isLoading }) => {
    const [preview, setPreview] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            gender: 'Male',
            status: 'Active',
            location: '',
            dateOfBirth: ''
        }
    });

    useEffect(() => {
        if (initialData?.profileImage) {
            setPreview(initialData.profileImage.startsWith('http')
                ? initialData.profileImage
                : `http://localhost:5000/uploads/${initialData.profileImage}`
            );
        }
    }, [initialData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key]) formData.append(key, data[key]);
        });

        if (profileImage) {
            formData.append('profileImage', profileImage);
        } else if (initialData?.profileImage && !preview) {
            formData.append('removeImage', 'true');
        }

        onSubmit(formData);
    };

    const removeImage = () => {
        setPreview(null);
        setProfileImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const inputClassName = (fieldName) => {
        const baseClasses = "w-full h-[52px] sm:h-[56px] px-5 bg-slate-50 border border-slate-200 rounded-[14px] text-slate-900 font-medium transition-all duration-300 outline-none placeholder:text-slate-400";
        const focusClasses = "focus:bg-white focus:border-indigo-500/50 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1),0_10px_30px_-10px_rgba(99,102,241,0.1)] focus:scale-[1.01]";
        const errorClasses = errors[fieldName] ? "border-red-500/30 bg-red-50/30 focus:border-red-500/50 focus:ring-red-500/10" : "";

        return `${baseClasses} ${focusClasses} ${errorClasses}`;
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="max-w-4xl mx-auto space-y-8 pb-20 px-4 sm:px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header / Profile Image Section */}
            <div className="premium-card p-0 overflow-hidden border-none shadow-2xl bg-white">
                <div className="bg-slate-900 p-10 sm:p-14 flex flex-col items-center gap-8 relative">
                    {/* Clean Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800" />
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_-20%,#ffffff,transparent)]" />

                    <motion.div
                        className="relative z-10"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl relative bg-white/10 backdrop-blur-md flex items-center justify-center group transition-all">
                            {preview ? (
                                <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-white/80 flex flex-col items-center gap-2">
                                    <Camera size={52} strokeWidth={1} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Add photo</span>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer backdrop-blur-sm">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    id="profile-image"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <Upload size={32} className="text-white mb-2" />
                                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Change Image</span>
                            </div>
                        </div>

                        {preview && (
                            <button
                                onClick={removeImage}
                                type="button"
                                className="absolute top-2 right-2 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 active:scale-95 transition-all z-20 border-2 border-white"
                                title="Remove Image"
                            >
                                <X size={20} strokeWidth={3} />
                            </button>
                        )}
                    </motion.div>

                    <div className="text-center z-10">
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
                            {initialData ? 'Edit User Profile' : 'New User Account'}
                        </h2>
                        <p className="text-indigo-100/60 text-sm font-medium max-w-sm mx-auto leading-relaxed">
                            Configure the user account details accurately to ensure seamless access to the platform.
                        </p>
                    </div>
                </div>

                <div className="p-8 sm:p-12 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Personal Info */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-100">
                                <User size={16} className="text-indigo-500" /> Personal Details
                            </h3>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 ml-1">First Name</label>
                                <input
                                    {...register('firstName', { required: 'First name is required' })}
                                    className={inputClassName('firstName')}
                                    placeholder="e.g. John"
                                />
                                {errors.firstName && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.firstName.message}</p>}
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 ml-1">Last Name</label>
                                <input
                                    {...register('lastName', { required: 'Last name is required' })}
                                    className={inputClassName('lastName')}
                                    placeholder="e.g. Doe"
                                />
                                {errors.lastName && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.lastName.message}</p>}
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 ml-1">Gender</label>
                                <div className="relative">
                                    <select {...register('gender')} className={`${inputClassName('gender')} appearance-none cursor-pointer pr-12`}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact & Status */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-100">
                                <Mail size={16} className="text-indigo-500" /> Contact & Account
                            </h3>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 ml-1">Email Address</label>
                                <input
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                                    })}
                                    className={inputClassName('email')}
                                    placeholder="john.doe@example.com"
                                />
                                {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.email.message}</p>}
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 ml-1">Mobile Number</label>
                                <input
                                    {...register('mobile', { required: 'Mobile number is required' })}
                                    className={inputClassName('mobile')}
                                    placeholder="+1 (555) 000-0000"
                                />
                                {errors.mobile && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.mobile.message}</p>}
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 ml-1">Account Status</label>
                                <div className="relative">
                                    <select {...register('status')} className={`${inputClassName('status')} appearance-none cursor-pointer pr-12`}>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 ml-1 flex items-center gap-2">
                                    <MapPin size={14} className="text-indigo-500" /> Location
                                </label>
                                <input
                                    {...register('location', { required: 'Location is required' })}
                                    className={inputClassName('location')}
                                    placeholder="City, Country"
                                />
                                {errors.location && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.location.message}</p>}
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-xs font-bold text-slate-600 ml-1 flex items-center gap-2">
                                    <Calendar size={14} className="text-indigo-500" /> Date of Birth
                                </label>
                                <input
                                    type="date"
                                    {...register('dateOfBirth', { required: 'Date of birth is required' })}
                                    className={inputClassName('dateOfBirth')}
                                />
                                {errors.dateOfBirth && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.dateOfBirth.message}</p>}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <motion.div
                className="flex items-center justify-end gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="h-14 px-8 rounded-2xl text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 px-10 rounded-2xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transition-all active:scale-[0.98]"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <Check size={20} strokeWidth={3} />
                            <span>{initialData ? 'Save Changes' : 'Create Account'}</span>
                        </>
                    )}
                </button>
            </motion.div>
        </motion.form>
    );
};

export default UserForm;