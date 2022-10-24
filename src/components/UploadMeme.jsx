import React, { useState } from "react";

const UploadMeme = ({ postMeme }) => {
  const [postM, setPostM] = useState({
    name: "",
    image: "",
    description: "",
    memesAvailable: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostM({ ...postM, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    postMeme(
      postM.name,
      postM.image,
      postM.description,
      postM.memesAvailable,
      postM.price
    );

    setPostM({ ...postM, [name]: "" });
  };

  return (
    <div className="w-75 mx-auto mt-5">
      <div
        className="text-primary"
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          margin: "50px auto",
          textAlign: "center",
        }}
      >
        Upload Meme
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label for="exampleInputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={postM.name}
            name="name"
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="exampleInputName"
            placeholder="name"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label for="exampleInputImage" className="form-label">
            Image
          </label>
          <input
            type="url"
            className="form-control"
            value={postM.image}
            name="image"
            onChange={(e) => handleChange(e)}
            placeholder="image link here"
            id="exampleInputImage"
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputDesciption" className="form-label">
            Desciption
          </label>
          <input
            type="text"
            value={postM.description}
            name="description"
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="description"
            id="exampleInputDesciption"
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputMeme" className="form-label">
            Meme Available
          </label>
          <input
            type="number"
            value={postM.memesAvailable}
            name="memesAvailable"
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="available meme"
            id="exampleInputMeme"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            value={postM.price}
            name="price"
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="price"
            id="exampleInputPrice"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadMeme;
