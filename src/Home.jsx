import Header from "./components/Header";
import PNGEGG from "./assets/pngegg.png";
import "./Header.css";

const Home = ({ setTab }) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <main role="main" className="container">
        <div className="jumbotron">
          <h1 className="">Welcome to the best meme shop in the planet</h1>
          <h2 className="text-4xl ">It's time to Laugh Out Loud</h2>
          <p className="lead">
            <img alt="hero" src={PNGEGG} className="my-4 w-100" />
          </p>{" "}
          <button onClick={() => setTab("2")} className="btn btn-primary ">
            Click here to continue
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
