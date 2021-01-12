import React from "react";
import { Link } from "react-router-dom";

function CardItem({item}) {
  return (
    <div>
      <div className="round-image">
        <img
          src={item.image}
          alt={item.name}
        />
      </div>
      <h2>{item.name}</h2>
      <h4>Quantity: {item.quantity} </h4>
      <p>{item.description}</p>
      <div className="buttons">
        <Link to={`/items/${item._id}`}>
          <button className="btn-primary">Edit</button>
        </Link>
      </div>
    </div>
  );
}

export default CardItem;