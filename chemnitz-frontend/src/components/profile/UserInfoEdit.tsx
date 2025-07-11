import React, { useState } from 'react';
import { updateUser } from '@/api/userApi';
import { User } from '@/types/User';

interface UserInfoEditProps {
    user: User;
    form: {
        name: string;
        email: string;
        location: string;
        bio: string;
    };
    editing: boolean;
    saving: boolean;
    handleEdit: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onUserUpdated?: (updated: User) => void;
    setSaving?: (saving: boolean) => void;
    setEditing?: (editing: boolean) => void;
    handleSaving?: (user: User) => void;
}

const UserInfoEdit: React.FC<UserInfoEditProps> = ({
    user,
    form,
    editing,
    saving,
    handleEdit,
    handleChange,
    onUserUpdated,
    setSaving,
    setEditing,
    handleSaving
}) => {
    const [localSaving, setLocalSaving] = useState(false);
    const isSaving = setSaving ? saving : localSaving;

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSave = async () => {
        if (setSaving) setSaving(true);
        else setLocalSaving(true);

        setSuccessMsg('');
        setErrorMsg('');

        const { name, location, bio } = form;

        try {
            const updatedUser = await updateUser({ name, location, bio });
            if (handleSaving && updatedUser) {
                handleSaving(updatedUser);
            }
            if (onUserUpdated && updatedUser) {
                onUserUpdated(updatedUser);
            }
            if (setEditing) setEditing(false);
            setSuccessMsg('Profile updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (e) {
            setErrorMsg('Failed to save changes. Please try again.');
            setTimeout(() => setErrorMsg(''), 4000);
        } finally {
            if (setSaving) setSaving(false);
            else setLocalSaving(false);
        }
    };

    // Clear status if editing again
    React.useEffect(() => {
        if (editing) {
            setSuccessMsg('');
            setErrorMsg('');
        }
    }, [editing]);

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#df6c36]">User Info</h3>
                {!editing && (
                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-[#df6c36] hover:bg-[#e28251] text-white rounded-xl font-semibold transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6.293-6.293a1 1 0 011.414 0l2.586 2.586a1 1 0 010 1.414L13 15H9v-4z" />
                        </svg>
                        Edit
                    </button>
                )}
            </div>
            {successMsg && (
                <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-800 font-semibold text-center text-sm">
                    {successMsg}
                </div>
            )}
            {errorMsg && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-800 font-semibold text-center text-sm">
                    {errorMsg}
                </div>
            )}
            <form
                className="space-y-5"
                onSubmit={e => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <div>
                    <label className="text-black font-medium">Full Name:</label>
                    {editing ? (
                        <input
                            className="block w-full mt-1 rounded-xl bg-[#fff6f1] border border-[#df6c36] shadow-inner p-3 text-base font-semibold text-[#df6c36] focus:outline-none focus:ring-2 focus:ring-[#df6c36] transition"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            disabled={isSaving}
                        />
                    ) : (
                        <div className="text-lg text-black font-semibold mt-1">{user.name}</div>
                    )}
                </div>
                <div>
                    <label className="text-black font-medium">Email:</label>
                    <input
                        className="block w-full mt-1 rounded-xl bg-[#f7f7f7] border border-[#df6c36] shadow-inner p-3 text-base font-semibold text-[#df6c36] opacity-75 cursor-not-allowed"
                        name="email"
                        value={form.email}
                        disabled
                        readOnly
                        tabIndex={-1}
                        aria-disabled="true"
                    />
                </div>
                <div>
                    <label className="text-black font-medium">Location:</label>
                    {editing ? (
                        <input
                            className="block w-full mt-1 rounded-xl bg-[#fff6f1] border border-[#df6c36] shadow-inner p-3 text-base font-semibold text-[#df6c36] focus:outline-none focus:ring-2 focus:ring-[#df6c36] transition"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            disabled={isSaving}
                        />
                    ) : (
                        <div className="text-lg text-black font-semibold mt-1">{user.location}</div>
                    )}
                </div>
                <div>
                    <label className="text-black font-medium">Bio:</label>
                    {editing ? (
                        <textarea
                            className="block w-full mt-1 rounded-xl bg-[#fff6f1] border border-[#df6c36] shadow-inner p-3 text-base font-semibold text-[#df6c36] focus:outline-none focus:ring-2 focus:ring-[#df6c36] transition"
                            name="bio"
                            rows={3}
                            value={form.bio}
                            onChange={handleChange}
                            disabled={isSaving}
                        />
                    ) : (
                        <div className="text-lg text-black font-semibold mt-1">{user.bio}</div>
                    )}
                </div>
                {editing && (
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="mt-4 w-full py-3 rounded-xl bg-[#df6c36] hover:bg-[#ce5a1c] text-white font-bold shadow-lg transition flex items-center justify-center gap-2"
                    >
                        {isSaving && (
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                        )}
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                )}
            </form>
        </>
    );
};

export default UserInfoEdit;
