'use client';

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Common/buttons/Button";
import { addReviewToFeature } from "@/api/userApi";

interface MakeReviewProps {
  onClose: () => void;
  featureId: string;
}

function MakeReview({ onClose, featureId }: MakeReviewProps) {
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        onClose(); // We now indicate a review was submitted
      }, 1200); // Shorter delay
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      if (rating === 0 || text.trim() === "") {
        setError("Please provide a rating and a comment.");
        setSubmitting(false);
        return;
      }
      await addReviewToFeature(featureId, rating, text);
      setSubmitted(true);
    } catch (err: any) {
      setError("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed z-[50000] inset-0 flex justify-center items-center bg-blur bg-opacity-50 backdrop-blur-sm px-6 sm:px-0">
      <div className="w-full max-w-md p-6 bg-white text-gray-900 rounded-lg shadow relative flex flex-col gap-4">
        <button
          type="button"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 rounded-lg p-2"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>

        </button>
        <div className="flex flex-col gap-y-3">
          {!submitted ? (
            <>
              <div className="text-lg font-semibold mb-1">Write a Review</div>
              <div className="flex mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  >
                    <svg
                      className={`w-7 h-7 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.784.57-1.838-.196-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.179a1 1 0 00.949-.69l1.286-3.967z" />
                    </svg>
                  </button>
                ))}
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[80px] border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                placeholder="Write your review here..."
              />
              {error && (
                <span className="text-red-500 text-sm">{error}</span>
              )}

              <Button
                label={submitting ? "Submitting..." : "Submit"}
                bgColor="#df6c36"
                hoverColor="#aa4e23"
                textColor="#ffffff"
                onClick={handleSubmit}
                disabled={submitting}
              />
            </>
          ) : (
            <div className="flex flex-col items-center py-8 animate-fade-in">
              <span className="text-5xl mb-2">✅</span>
              <span className="text-xl font-medium">Thank you for your review!</span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MakeReview;
