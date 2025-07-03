// components/profile/ProfileTabs.tsx

import React from 'react';

interface ProfileTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: 'favourites' | 'userinfo') => void;
  setEditing?: (val: boolean) => void; // Optional, if you want to reset editing on tab switch
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  selectedTab,
  setSelectedTab,
  setEditing,
}) => (
  <div className="flex space-x-4 mb-6 border-b border-[#df6c36]/30">
 
    <button
      onClick={() => {
        setSelectedTab('userinfo');
        setEditing && setEditing(false);
      }}
      className={`px-4 py-2 font-semibold rounded-t-lg transition
        ${selectedTab === 'userinfo'
          ? 'text-[#df6c36] border-b-4 border-[#df6c36] bg-[#fff6f1]'
          : 'text-black/50 hover:text-[#df6c36]'
        }`}
    >
      User Info
    </button>
  </div>
);

export default ProfileTabs;
