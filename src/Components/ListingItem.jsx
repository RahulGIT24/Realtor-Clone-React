import React from "react";

function ListingItem(props) {
  let { listing, id } = props;
  return <div>{listing.name}</div>;
}

export default ListingItem;
