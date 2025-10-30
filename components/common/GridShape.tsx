"use client";
import React from "react";

export default function GridShape() {
  return (
    <>
      {/* Top Right Grid */}
      <div className="absolute right-0 top-0 -z-10 w-full max-w-[250px] xl:max-w-[450px]">
        <svg
          viewBox="0 0 540 254"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-gray-200 dark:text-gray-800"
        >
          <defs>
            <pattern
              id="gridPattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="1"
                height="1"
                fill="currentColor"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="540" height="254" fill="url(#gridPattern)" />
        </svg>
      </div>

      {/* Bottom Left Grid (rotated) */}
      <div className="absolute bottom-0 left-0 -z-10 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
        <svg
          viewBox="0 0 540 254"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-gray-200 dark:text-gray-800"
        >
          <defs>
            <pattern
              id="gridPattern2"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="1"
                height="1"
                fill="currentColor"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="540" height="254" fill="url(#gridPattern2)" />
        </svg>
      </div>
    </>
  );
}
