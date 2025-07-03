import React, { useState, useRef, useEffect } from 'react';
import Button from './buttons/Button';
import { getFuzzyNameSuggestions, PlaceSuggestion } from '@/api/places';

interface SearchProps {
  handleSetFeature: (featureId: string) => void;
  resetSignal?: number;
}

function Search({ handleSetFeature, resetSignal }: SearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const latestFetch = useRef<number>(0);

  useEffect(() => {
    // When resetSignal changes, clear input and suggestions
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  }, [resetSignal]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(!!value);

    if (!value) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const fetchId = Date.now();
    latestFetch.current = fetchId;

    try {
      const data = await getFuzzyNameSuggestions(value);
      if (fetchId === latestFetch.current) {
        setSuggestions(data);
      }
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: PlaceSuggestion) => {
    setQuery(suggestion.name);
    setShowSuggestions(false);
    handleSetFeature(suggestion.id);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className="min-w-[12rem] mx-auto w-full relative">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-500 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full px-4 py-3 ps-10 text-sm text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-500 focus:ring-0 focus:outline-none"
          placeholder="Search places"
          value={query}
          onChange={handleChange}
          autoComplete="off"
          onFocus={() => setShowSuggestions(!!query)}
          onBlur={handleBlur}
        />
        <div className='absolute end-[-5px] bottom-1.5 px-3 overflow-hidden'>
          <Button
            label="Search"
            bgColor="#df6c36"
            hoverColor="#aa4e23"
            textColor="#ffffff"
            onClick={() => {}}
          />
        </div>
        {showSuggestions && (
          <div className="absolute left-0 z-[100000] mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-60 overflow-y-auto">
            {loading ? (
              <div className="p-3 text-gray-400 text-center">Loading...</div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, i) => (
                <div
                  key={suggestion.id || i}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-gray-900"
                  onMouseDown={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-400 text-center">No results</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
