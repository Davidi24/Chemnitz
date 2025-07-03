import React, { useRef, useState } from 'react';
import { User } from '@/types/User';

interface UserInfoProps {
  user: User;
  onImageChange?: (file: File) => void;
}

const randomAvatars = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/5.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
];

const getRandomAvatar = () =>
  randomAvatars[Math.floor(Math.random() * randomAvatars.length)];

const UserInfo: React.FC<UserInfoProps> = ({ user, onImageChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Pick a random avatar if no image exists (only once per mount)
  const [defaultAvatar] = useState(getRandomAvatar());

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      onImageChange && onImageChange(file);
    }
  };

  return (
    <div
      className="w-full md:w-1/3 max-w-sm flex flex-col items-center justify-center rounded-2xl shadow-2xl p-8 my-4 mx-auto relative"
      style={{
        background: 'linear-gradient(135deg, #ffb86c 0%, #f17e7e 100%)',
      }}
    >
      <div className="relative">
        <img
          src={
            preview ||
            user.image ||
            defaultAvatar // fallback if user.image is missing
          }
          alt="Profile"
          className="rounded-full border-4 border-white shadow-lg w-28 h-28 object-cover mb-6"
        />
        <button
          type="button"
          className="absolute bottom-4 right-3 bg-black/70 text-white rounded-full p-2 hover:bg-black transition"
          onClick={() => fileInputRef.current?.click()}
          title="Change profile image"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M12 16v-4m0 0v-4m0 4h4m-4 0H8m8.485-5.485A9 9 0 1 1 3.515 19.485 9 9 0 0 1 19.485 3.515ZM21 21l-3.5-3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col items-center mt-2">
        <h2 className="text-white font-bold text-2xl mb-1">{user.name}</h2>
        <p className="text-white text-lg">{user.bio}</p>
        <p className="text-white mt-2">{user.location}</p>
        <p className="text-white text-sm mt-2 bg-white/30 px-4 py-1 rounded-full">
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
