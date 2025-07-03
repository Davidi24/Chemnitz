'use client';
import Header from '@/components/Header/Header';
import FavouritesList from '@/components/profile/FavouritesList';
import ProfileTabs from '@/components/profile/Tabs';
import UserInfo from '@/components/profile/UserInfo';
import UserInfoEdit from '@/components/profile/UserInfoEdit';
import { useState } from 'react';
import { useUser } from '@/components/Auth';

export default function UserProfile() {
  const { user: contextUser, setUser } = useUser();

  // If user is not loaded, show loading or handle unauthorized
  if (!contextUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading profile...</div>
      </div>
    );
  }

  const [editing, setEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('userinfo');
  const [form, setForm] = useState({
    name: contextUser.name || '',
    email: contextUser.email || '',
    location: contextUser.location || '',
    bio: contextUser.bio || '',
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = () => setEditing(true);

 const handleSave = async () => {
  setSaving(true);
  await new Promise((r) => setTimeout(r, 900));
  setUser({
    ...contextUser,
    ...form,
  });
  setEditing(false);
  setSaving(false);
};


  // Use contextUser instead of user (which is not defined)
  return (
    <div className="relative min-h-screen bg-white ">
      <div className="relative -600 h-[5rem]">
        <div
          className="pointer-events-none absolute top-0 left-0 w-full h-full"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.60) 0%,
                rgba(0,0,0,0.40) 25%,
                rgba(0,0,0,0.22) 55%,
                rgba(0,0,0,0.12) 75%,
                rgba(0,0,0,0.00) 100%
              )
            `,
            zIndex: 5,
          }}
        />
        <Header />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-x-8 min-h-[85vh]">
        <UserInfo user={contextUser} />
        <div className="w-full lg:w-2/3 max-w-2xl bg-white rounded-2xl shadow-2xl my-4 p-8 flex flex-col justify-start min-h-full">
          <ProfileTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            setEditing={setEditing}
          />
            <UserInfoEdit
              user={contextUser}
              form={form}
              editing={editing}
              saving={saving}
              handleEdit={handleEdit}
          
              handleChange={handleChange}
            />
        </div>
      </div>
    </div>
  );
}
