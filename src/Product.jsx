import UploadMeme from "./components/UploadMeme";
import MemeCard from "./components/MemeCard";

const Product = ({
  memes,
  buyMeme,
  setForsale,
  postMeme,
  like,
  dislike,
  updatePrice,
  address,
}) => {
  return (
    <div className="mx-auto">
      <div className="container d-flex flex-wrap justify-content-around mt-5">
        {memes.map((data, index) => (
          <MemeCard
            dislike={dislike}
            like={like}
            setForsale={setForsale}
            index={index}
            key={index}
            data={data}
            buyMeme={buyMeme}
            updatePrice={updatePrice}
            address={address}
          />
        ))}
      </div>
      <UploadMeme postMeme={postMeme} />
    </div>
  );
};

export default Product;
