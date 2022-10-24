import "./App.css";
import { useState, useEffect, useCallback } from "react";

// web3 imports

import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

import MEMESTORE from "./contracts/Memestore.abi.json";
import IERC from "./contracts/IERC.abi.json";
import Header from "./components/Header";
import { Route, Router, Routes } from "react-router-dom";
import Product from "./Product";
import Home from "./Home";

const ERC20_DECIMALS = 18;

const contractAddress = "0x4c1db32f0dd4eb747217bde90443aa0db683e808";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [Loading, setLoading] = useState(false);
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [memeStore, setMemeStore] = useState([]);
  const [storeLoading, setStoresLoading] = useState(true);
  const [tab, setTab] = useState("1");

  const connectToWallet = async () => {
    setLoading(true);
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        setAddress(user_address);
        setKit(kit);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      setLoading(false);
      alert("Error Occurred");
    }
  };

  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(MEMESTORE, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    }
  }, [kit, address, getBalance]);

  const getMemes = useCallback(async () => {
    const memeLength = await contract.methods.getMemesLength().call();
    const memes = [];
    for (let index = 0; index < memeLength; index++) {
      let _memes = new Promise(async (resolve, reject) => {
        let meme = await contract.methods.getMemes(index).call();

        resolve({
          index: index,
          owner: meme[0],
          name: meme[1],
          image: meme[2],
          description: meme[3],
          memesAvailable: meme[4],
          price: meme[5],
          isForsale: meme[6],
          likes: meme[7],
          dislikes: meme[8],
        });
      });
      memes.push(_memes);
    }

    const _memes = await Promise.all(memes);
    setMemeStore(_memes);
    setStoresLoading(false);
  }, [contract]);

  useEffect(() => {
    if (contract) {
      getMemes();
    }
  }, [contract, getMemes]);

  const buyMeme = async (_index) => {
    const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    try {
      await cUSDContract.methods
        .approve(contractAddress, memeStore[_index].price)
        .send({ from: address });
      await contract.methods.buyMeme(_index).send({ from: address });
      getMemes();
      getBalance();
      alert("you have successfully rented a shortlet");
    } catch (error) {
      alert(error);
    }
  };

  const postMeme = async (
    _name,
    _image,
    _description,
    _memesAvailable,
    _price
  ) => {
    try {
      // return;
      let price = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();
      await contract.methods
        .addMeme(_name, _image, _description, _memesAvailable, price)
        .send({ from: address });
      getMemes();
    } catch (error) {
      alert(error);
    }
  };

  const likeMeme = async (index) => {
    try {
      await contract.methods.likeMeme(index).send({ from: address });
    } catch (error) {
      console.log(error);
    } finally {
      getMemes();
    }
  };
  const dislikeMeme = async (index) => {
    try {
      await contract.methods.dislikeMeme(index).send({ from: address });
    } catch (error) {
      console.log(error);
    } finally {
      getMemes();
    }
  };

  const updatePrice = async (index, _price) => {
    try {
      let price = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();
      await contract.methods.updatePrice(index, price).send({ from: address });
      getMemes();
    } catch (error) {
      alert(error);
    }
  };

  const setForsale = async (index) => {
    try {
      await contract.methods.setForsale(index).send({ from: address });
      getMemes();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="">
      <Header cUSDBalance={cUSDBalance} setTab={setTab} />

      {tab === "1" ? (
        <Home setTab={setTab} />
      ) : (
        <Product
          updatePrice={updatePrice}
          like={likeMeme}
          dislike={dislikeMeme}
          memes={memeStore}
          postMeme={postMeme}
          setTab={setTab}
          setForsale={setForsale}
          buyMeme={buyMeme}
          address={address}
        />
      )}
      <footer className="mt-5 mb-5 w-full text-center">
        copyrights by MemeStore
      </footer>
    </div>
  );
}

export default App;
