import React, { useState } from "react";
import { Button } from "./Button";

import { AiOutlineHeart, AiFillHeart, AiFillCloseSquare } from "react-icons/ai";

const MemeCard = ({
  data,
  like,
  index,
  setForsale,
  address,
  dislike,
  buyMeme,
  updatePrice,
}) => {
  const [update, setUpdate] = useState(false);
  const {
    name,
    image,
    description,
    price,
    likes,
    dislikes,
    memesAvailable,
    card,
    owner,
    isForsale,
  } = data;
  const [InputPrice, setUpdateInput] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePrice(index, InputPrice);
    setUpdate(false);
  };

  return (
    <div
      className="card"
      style={{ width: "28rem", margin: "10px 10px", minHeight: "600px" }}
    >
      <img
        src={image}
        className="card-img-top "
        style={{
          height: "300px",
          objectFit: "cover",
          objectPosition: "center",
        }}
        alt="..."
      />
      <div className="card-body bg-white text-dark">
        <div className="d-flex w-100 justify-content-between my-4  bg-white text-dark">
          <h5 className="card-title  bg-white text-dark">{name}</h5>
          <h5 className="card-title  bg-white text-dark">
            {price / 1000000000000000000}
          </h5>
        </div>
        <div className="d-flex w-100 justify-content-between align-center my-4  bg-white text-dark">
          <p className=" bg-white text-dark my-auto">
            Available Meme: {memesAvailable}
          </p>
          {owner === address && (
            <div
              onClick={() => setForsale(index)}
              className="bg-white btn btn-secondary text-black"
            >
              Set For Sale
            </div>
          )}
        </div>
        {isForsale ? (
          <p style={{ fontSize: "30px" }} className=" bg-white text-black">
            Forsale
          </p>
        ) : (
          <p style={{ fontSize: "30px" }} className=" bg-white text-black">
            Not ForSale
          </p>
        )}
        <p className="card-text  bg-white text-dark">{description}</p>
        <div className="d-flex w-100 justify-content-between my-4  bg-white text-dark">
          <button
            className="btn-primary btn  text-dark"
            onClick={() => like(index)}
          >
            <AiFillHeart className=" bg-danger text-black" /> {likes}
          </button>
          <button
            className="btn-danger btn text-dark  bg-danger text-dark"
            onClick={() => dislike(index)}
          >
            <AiFillCloseSquare className=" bg-danger text-black" /> {dislikes}
          </button>
        </div>
        <button
          className="btn w-100 btn-primary"
          onClick={() => buyMeme(index)}
        >
          Buy {name}
        </button>
        {owner === address && (
          <div className="w-100 bg-white mt-3 ">
            {!update ? (
              <div
                type="button"
                onClick={() => setUpdate(true)}
                className="bg-white text-black btn btn-secondary"
              >
                Update Price
              </div>
            ) : (
              <form className="bg-white" onSubmit={(e) => handleSubmit(e)}>
                <button type="submit" className="btn  btn-primary">
                  Submit
                </button>
                <input
                  className="bg-white text-black ms-4"
                  value={InputPrice}
                  name="price"
                  onChange={(e) => setUpdateInput(e.target.value)}
                  type="number"
                />
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemeCard;
