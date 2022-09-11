import React, { useState } from "react";
import { gql, GraphQLClient } from "graphql-request";
import { API, Token } from "../../Constant";

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;
  const qraphQLClient = new GraphQLClient(API, {
    headers: {
      Authorization: Token,
    },
  });
  const query = gql`
    query ($pageSlug: String!) {
      video(where: { slug: $pageSlug }) {
        id
        title
        description
        seen
        thumbnail {
          url
        }
        mp4 {
          url
        }
        tags
        slug
      }
    }
  `;
  const variables = {
    pageSlug,
  };
  const data = await qraphQLClient.request(query, variables);
  const video = data.video;
  return {
    props: {
      video,
    },
  };
};



function Video({ video }) {
  const [watching, setWatching] = useState(false);
  console.log(video);
  const handleSeen = async (slug) => {
    console.log({ slug });
    const data = await fetch("/api/ChangeToSeen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    console.log(data);
  };
  return (
    <>
      {!watching && (
        <>
          <img
            className="video_image"
            src={video.thumbnail.url}
            alt={video.title}
          />
          <div className="info">
            <p>{video.tags.join(", ")}</p>
            <p>{video.description}</p>
            <a href="/">
              <p>go back</p>
            </a>
            <button
              className="Play_btn"
              onClick={() => {
                handleSeen(video.slug);
                setWatching(!watching);
              }}
            >
              PLAY
            </button>
          </div>
        </>
      )}
      {watching && (
        <video width="100%" controls autoPlay>
          <source src={video.mp4.url} type="video/mp4" />
        </video>
      )}
      <div className="footer" onClick={() => setWatching(false)}></div>
    </>
  );
}

export default Video;
