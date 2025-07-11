"use client";
import React, { useEffect, useState } from "react";
import Map from "../Map/Map";
import MapHeader from "../MapHeader";
import CustomInfiniteScroll from "../InfiniteScroll";
import { getFeaturesByCategory, getFeatureById, getFavourites } from "@/api/places";
import { FeatureItem } from "@/types/FeatueType";
import Alert from "../Common/Alerts/Alert";

function PlacesContainer() {
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);

  // State for logic
  const [category, setCategory] = useState<string>("museum");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showFavourites, setShowFavourites] = useState<boolean>(false);
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState<boolean>(false); // tracks if a search result is selected
  const [searchResetSignal, setSearchResetSignal] = useState<number>(0); // just to trigger clearing search

  const [showAlert, setShowAlert] = useState(false);

  // --- Handlers ---

  // Called when user picks a feature from search
  const handleSetFeature = async (featureId: string) => {
    setSearchActive(true);
    setShowFavourites(false);
    setCategory('');
    setSelectedIndex(-1);
    setActiveFeatureId(featureId);
    setLoading(true);
    try {
      const feature = await getFeatureById(featureId);
      setFeatures(feature ? [feature] : []);
    } finally {
      setLoading(false);
    }
  };

  // Called when user clicks a category tab
  const fetchCategory = async (category: string, idx: number = -1) => {
    setShowFavourites(false);
    setSearchActive(false);
    setSearchResetSignal(prev => prev + 1);
    setSelectedIndex(idx);
    setCategory(category);
    setActiveFeatureId(null);
    setLoading(true);
    try {
      if (category) {
        const data = await getFeaturesByCategory(category.toLowerCase());
        setFeatures(data);
      } else {
        setFeatures([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Called when user clicks favourites button
  const handleShowFavourites = async () => {
    setLoading(true);
    setShowFavourites(true);
    setSearchActive(false);
    setSearchResetSignal(prev => prev + 1); // clear search
    setSelectedIndex(-1);
    setCategory('');
    setActiveFeatureId(null);
    try {
      const data = await getFavourites();
      setFeatures(data || []);
    } catch (err: any) {
      if (err.message === "unauthorized") {
        setShowAlert(false);
        setShowFavourites(false);
        setTimeout(() => setShowAlert(true), 20);
      }
    } finally {
      setLoading(false);
    }
  };

  // On first mount, load default category
  useEffect(() => {
    fetchCategory("museum", 0);
  }, []);

  return (
    <div>
      <div className="text-center text-[16px] font-semibold px-4">
        <h4 className="text-[#df6c36] text-[20px] font-medium mb-2 tracking-wide">Top Destination —</h4>
        <h1 className="text-3xl md:text-[40px] font-semibold leading-tight text-gray-700">
          <span className="text-[#152727]">Let&apos;s Explore</span> Your Dream <br />
          <p className="mt-1">Destination Here!</p>
        </h1>
        <p className="mt-4 text-gray-400 text-[12px] font-normal max-w-xl mx-auto">
          We have recommended popular destinations every week so you don&apos;t have to worry about your dream destination with travel.
        </p>
      </div>
      <br /><br /><br />

      {showAlert && (
        <Alert
          title="Unauthorized"
          text="Please Login to add to favourite"
          color="#df6c36"
          onClose={() => setShowAlert(false)}
        />
      )}

      <MapHeader
        onCategoryChange={fetchCategory}
        handleSetFeature={handleSetFeature}
        selectedIndex={selectedIndex}
        showFavourites={showFavourites}
        onShowFavourites={handleShowFavourites}
        searchResetSignal={searchResetSignal}
        showAlert={showAlert}
      />

      <div className="flex flex-col w-full justify-between mt-8 xl:flex-row">
        <div className="w-full flex justify-center xl:w-[55%]">
          <CustomInfiniteScroll
            features={features}
            loading={loading}
            category={category}
            activeFeatureId={activeFeatureId}
            setActiveFeatureId={setActiveFeatureId}
          />
        </div>
        <div className="w-full xl:w-[44%] xl:px-4 xl:pl-8 mt-6 xl:mt-0">
          <Map
            features={features}
            loading={loading}
            activeFeatureId={activeFeatureId}
            setActiveFeatureId={setActiveFeatureId}
            category={category}
          />
        </div>
      </div>
    </div>
  );
}

export default PlacesContainer;
