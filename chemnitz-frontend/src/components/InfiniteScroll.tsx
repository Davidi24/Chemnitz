'use client';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardContainer from './gridcards/CardContainer';
import CustomPagination from './Common/Pagination';
import { FeatureItem } from '@/types/FeatueType';
import { useUser } from './Auth';
import { getFeatureById } from '@/api/places';

interface CustomInfiniteScrollProps {
  features: FeatureItem[];
  loading: boolean;
  category: string;
  activeFeatureId: string | null;
  setActiveFeatureId: (id: string) => void;
}

const ITEMS_PER_PAGE = 6;
const ITEMS_PER_SCROLL = 4;

function CustomInfiniteScroll({ features, loading, category, activeFeatureId, setActiveFeatureId }: CustomInfiniteScrollProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState<FeatureItem[]>([]);
  const [pageData, setPageData] = useState<FeatureItem[]>([]);
  const [allFeatures, setAllFeatures] = useState<FeatureItem[]>(features);

  useEffect(() => {
    setAllFeatures(features);
  }, [features]);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const newPageItems = allFeatures.slice(start, end);
    setPageData(newPageItems);
    setVisibleItems(newPageItems.slice(0, ITEMS_PER_SCROLL));
  }, [currentPage, allFeatures]);

  const fetchMoreCards = () => {
    setTimeout(() => {
      const nextItems = pageData.slice(
        visibleItems.length,
        visibleItems.length + ITEMS_PER_SCROLL
      );
      setVisibleItems((prev) => [...prev, ...nextItems]);
    }, 100);
  };

  const hasMore = visibleItems.length < pageData.length;
  const totalPages = Math.ceil(allFeatures.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on features/category change
  }, [features, category]);

  const { user: contextUser, setUser } = useUser();

  // Handler to refresh a single feature (e.g. after review)
  const handleReviewAdded = async (featureId: string) => {
    try {
      const updatedFeature = await getFeatureById(featureId);
      if (!updatedFeature) return;
      setAllFeatures((prevFeatures) =>
        prevFeatures.map((f) => (f.id === featureId ? updatedFeature : f))
      );
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="relative h-[35rem] w-full xl:h-[50rem]  flex flex-col">
      <div
        id="scrollableDiv"
        className="h-[95%] w-full overflow-auto border p-1 px-2"
      >
        <InfiniteScroll
          dataLength={visibleItems.length}
          next={fetchMoreCards}
          hasMore={hasMore}
          loader={
            <p className="text-center text-sm text-gray-500 mt-4 border">
              Loading more destinations...
            </p>
          }
          scrollableTarget="scrollableDiv"
          style={{ overflow: 'visible' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-x-12 gap-y-5 pb-2">
            {visibleItems.map((feature) => (
              <CardContainer
                key={feature.id}
                feature={feature}
                category={category}
                activeFeatureId={activeFeatureId}
                setActiveFeatureId={setActiveFeatureId}
                user={contextUser}
                setUser={setUser}
                onReviewAdded={handleReviewAdded} 
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <div className="w-full h-[6rem] z-20 flex justify-end items-center bg-white px-4">
        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default CustomInfiniteScroll;
