import Link from "next/link";
import React from "react";
import Card from "../Card";

function Section({ genre, videos }) {
  console.log(videos, "filtered");
  return (
    <div className="section">
      <h3>{genre}</h3>
      <div className="video_feed">
        {videos.map((video) => (
          <a key={video.id} href={`/video/${video.slug}`}>
            <Card thumbnail={video.thumbnail} />
          </a>
        ))}
      </div>
    </div>
  );
}

export default Section;
