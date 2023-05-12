/**
 * React
 */
import { useEffect, useState, useRef } from "react";

/**
 * Library
 */
import YouTube from "react-youtube";

/**
 * useRef
 */

const Youtube = ({ width = 640, height = 360, movable = false }) => {
  const youtubeRef = useRef(null);

  const opts = {
    height,
    width,
    playerVars: {
      autoplay: 0,
      fs: 0,
      controls: 0,
      modestbranding: 0,
      rel: 0,
    },
  };

  return (
    <>
      <div className="flex justify-center w-full bg-black">
        <YouTube
          videoId="2g811Eo7K8U"
          youtubeRef={youtubeRef}
          opts={opts}
          className=""
        />
      </div>
    </>
  );
};

export default Youtube;
