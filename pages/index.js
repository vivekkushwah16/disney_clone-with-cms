import Head from "next/head";
import Image from "next/image";
import { gql, GraphQLClient } from "graphql-request";
import { API, Token } from "../Constant";
import Section from "../Component/Section";
import Navbar from "../Component/Navbar";

export const getStaticProps = async () => {
  const graphQLClient = new GraphQLClient(API, {
    headers: {
      Authorization: Token,
    },
  });
  const query = gql`
    query VideosQuery {
      videos {
        createdAt
        id
        title
        description
        slug
        tags
        seen
        thumbnail {
          url
          fileName
        }
        mp4 {
          url
        }
      }
    }
  `;
  const accountQuery = gql`
    query {
      account(where: { id: "cl5j2opt10y2n0cocwpqu5muz" }) {
        username
        avatar {
          url
        }
      }
    }
  `;
  const data = await graphQLClient.request(query);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;
  return {
    props: {
      videos,
      account,
    },
  };
};

export default function Home({ videos, account }) {
  console.log(videos);
  const randomVideo = () => {
    return videos[Math.floor(Math.random() * videos.length)];
  };
  const filteredVideo = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };
  const unSeenVideos = () => {
    return videos.filter((video) => !video.seen || video.seen == null);
  };
  
  return (
    <>
      <div className="app">
        <Navbar account={account} />
        <div className="main_video">
          <img src={randomVideo().thumbnail.url} alt={randomVideo().title} />
        </div>
        <div className="video_feed">
          <Section genre={"Recommended for you"} videos={unSeenVideos()} />

          <Section genre={"Action"} videos={filteredVideo(videos, "action")} />
          <Section genre={"Drama"} videos={filteredVideo(videos, "drama")} />
          <Section genre={"cary"} videos={filteredVideo(videos, "scary")} />
          <Section
            genre={"Thriller"}
            videos={filteredVideo(videos, "thriller")}
          />
          <Section genre={"War"} videos={filteredVideo(videos, "war")} />
        </div>
      </div>
    </>
  );
}
