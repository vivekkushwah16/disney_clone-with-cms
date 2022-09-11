import { GraphQLClient } from "graphql-request";
import { API, Token } from "../../Constant";

export default async ({ body }, res) => {
    console.log(body)
  const graphCMS = new GraphQLClient(API, {
    headers: Token,
  });
  const SeenVideo = await graphCMS.request(
    `mutation changeToSeen($slug:String!){
  updateVideo(where:{slug:$slug},data:{seen:true}){
    id,
    title,
    seen
  }
}`,
    { slug: body.slug }
  );
  const publishedVideo = await graphCMS.request(
    `mutation publishedVideo($slug:String!){
  publishedVideo(where:{slug:$slug},to:PUBLISHED){
    id,
    title,
    seen
  }
}`,
    { slug: body.slug }
  );
  res.status(201).json(body.slug);
};
