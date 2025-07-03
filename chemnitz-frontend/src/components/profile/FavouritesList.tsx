// components/profile/FavouritesList.tsx

import React from 'react';

interface Favourite {
    id: number;
    name: string;
    desc: string;
}

interface FavouritesListProps {
    favorites: Favourite[];
}

const FavouritesList: React.FC<FavouritesListProps> = ({ favorites }) => (
    <div>
        <h4 className="text-xl font-bold text-[#df6c36] mb-3">Favourites</h4>
        <div className="grid sm:grid-cols-2 gap-4">
            {favorites.map((fav) => (
                <div
                    key={fav.id}
                    className="bg-gradient-to-r from-[#fff6f1] to-[#ffe2cf] rounded-xl p-4 flex items-center shadow hover:scale-[1.02] transition"
                >
                    <span className="w-10 h-10 rounded-full flex items-center justify-center bg-[#df6c36] text-white font-bold mr-4 text-xl">
                        {fav.name[0]}
                    </span>
                    <div>
                        <div className="font-semibold text-[#df6c36]">{fav.name}</div>
                        <div className="text-gray-600 text-sm">{fav.desc}</div>
                    </div>
                </div>
            ))}
            {favorites.length === 0 && (
                <div className="text-gray-400 text-center py-6 col-span-2">
                    No favourites added yet.
                </div>
            )}
        </div>
    </div>
);

export default FavouritesList;
