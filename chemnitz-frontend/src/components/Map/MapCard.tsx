"use client"
import { Card, CardContent, CardMedia, Button, Box } from '@mui/material'
import React, { useState } from 'react'
import { FeatureItem } from '@/types/FeatueType';

const cardScrollClass = "card-scrollbar";

type Props = {
  img: string,
  title: string,
  subTitle: string,
  desc: string,
  rating: number,
  feature: FeatureItem
}

export const MapCard = (props: Props) => {
  const { feature } = props;
  const [showReviews, setShowReviews] = useState(true);


  const excludeProps = ['name', 'description', 'image', 'rating', '@id'];
  const details = Object.entries(feature.properties || {})
    .filter(([key, value]) => !excludeProps.includes(key) && value !== undefined && value !== '');

  const name = feature.properties?.name || props.title || '';
  const city = ''; 
  const query = encodeURIComponent([name, city].filter(Boolean).join(' '));
  const googleUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  const CARD_HEIGHT = 350;
  const FOOTER_HEIGHT = 80;

  return (
    <>
      <style>
        {`
          .${cardScrollClass} {
            scrollbar-width: thin;
            scrollbar-color: #e5e7eb #fff;
          }
          .${cardScrollClass}::-webkit-scrollbar {
            width: 6px;
            background: transparent;
          }
          .${cardScrollClass}::-webkit-scrollbar-thumb {
            background: #e5e7eb;
            border-radius: 4px;
          }
        `}
      </style>
      <Card
        sx={{
          maxWidth: 320,
          width: 400,
          boxShadow: 'none',
          position: 'relative',
          height: `${CARD_HEIGHT}px`
        }}
      >
        <div
          className={cardScrollClass}
          style={{
            overflowY: 'auto',
            maxHeight: CARD_HEIGHT - FOOTER_HEIGHT,
            minHeight: 100,
            paddingBottom: 8,
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <h2 className='text-3xl lg:text-4xl font-extrabold text-primary mt-4'>
              {props.title}
            </h2>
            <h3 className='text-xs mt-1 font-heading tracking-[5px] text-stone-400 font-bold uppercase '>
              {props.subTitle}
            </h3>
            <p className='tracking-wide text-[12px] lg:text-[15px] mb-3'>
              {props.desc}
            </p>

            {showReviews ? (
              <Box mt={2}>
                <div className="mb-2 font-bold text-base text-gray-700">Latest Reviews</div>
                <div className="space-y-3">
                  {feature.reviews && feature.reviews.length > 0 ? (
                    feature.reviews.map((review, i) => (
                      <div key={i} className="bg-gray-100 rounded-lg p-3 shadow-sm">
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-sm mr-2">{review.userEmail}</span>
                          <span className="text-yellow-500 text-xs">
                            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                          </span>
                          <span className="text-xs text-gray-400 ml-auto">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-gray-700 text-xs">{review.comment}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm italic">No reviews yet.</div>
                  )}
                </div>
              </Box>
            ) : (
              details.length > 0 && (
                <Box mt={2}>
                  <div className="mb-2 font-bold text-base text-gray-700">Properties</div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
                    {details.map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="font-semibold text-stone-600">{key}</span>
                        <span className="text-gray-600 truncate">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </Box>
              )
            )}
          </CardContent>
        </div>

        {/* Footer toggle button */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            background: "rgba(255,255,255,0.97)",
            padding: "12px 18px 16px 18px",
            display: "flex",
            flexDirection: "column",
            zIndex: 20,
            boxShadow: "0 -3px 14px 0 rgba(0,0,0,0.05)",
            height: FOOTER_HEIGHT,
            boxSizing: 'border-box'
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 15,
              px: 2,
              py: 1.5,
              width: "100%"
            }}
            onClick={() => setShowReviews(v => !v)}
          >
            {showReviews ? "See full data" : "See reviews"}
          </Button>
        </div>
      </Card>
    </>
  )
}
