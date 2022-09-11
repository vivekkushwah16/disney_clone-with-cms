import React from "react";

function Card({ thumbnail }) {
  return <img className="Card" src={thumbnail.url} alt={thumbnail.fileName} />;
}

export default Card;
