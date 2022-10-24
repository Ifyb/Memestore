// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

// Interface of an ERC-20 token so this contract can interact with it
interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}



contract Memestore {
    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;


    uint internal memesLength = 0;

    struct Meme {
        address payable owner;
        string name;
        string image;
        string description;
        uint memesAvailable;
        uint price;
        bool isForsale;
        uint likes;
        uint dislikes;
    }
       


    mapping(uint256 => Meme) internal memes;
    
    
// Adding a new function which is a meme
 
 function addMeme(
        string memory _name,
        string memory _image,
        string memory _description,
        uint _memesAvailable,
        uint _price
    ) public {
        uint _likes = 0;
        uint _dislikes = 0;
        
        memes[memesLength] = Meme(
            payable(msg.sender),
            _name,
            _image,
            _description,
            _memesAvailable,
            _price,
            true,
            _likes,
            _dislikes
        );
       
        memesLength++;
    }




    // get memes
    function getMemes(uint _index) public view returns (
        address payable,
        string memory, 
        string memory,
        string memory,
        uint,
        uint,
        bool,
        uint,
        uint
    ) {
        Meme memory m = memes[_index];
        return (
            m.owner,
            m.name,
            m.image,
            m.description,
            m.memesAvailable,
            m.price,
            m.isForsale,
            m.likes,
            m.dislikes
        );
    }


// liking memes and the owner cannot like his/her own meme
    function likeMeme(uint _index) public {
        require(msg.sender != memes[_index].owner, "Owner of memes cannot like");
        memes[_index].likes++;
    }


// disliking memes and the owner cannot dislike his/her own meme
    function dislikeMeme(uint _index) public {
        require(msg.sender != memes[_index].owner, "Owner of memes cannot dislikelike");
        memes[_index].dislikes++;
    }
    
 

    //  memes for sale and adding a check to make sure only the owner can make a meme for sale
    function setForsale(uint _index) public{
        require(msg.sender == memes[_index].owner, "Only the owner of this memes can run this operation");
        memes[_index].isForsale = !memes[_index].isForsale;
    }
// changing the price of the memes
    function updatePrice(uint _index, uint _price) public {
        require(msg.sender == memes[_index].owner, "Only the owner of this memes can change");
        memes[_index].price = _price;
    }


    // buying a memes and transfering ownership
    function buyMeme(uint _index) public payable  {
        require(memes[_index].isForsale == true, "this property is not for sale");
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            memes[_index].owner,
            memes[_index].price
          ),
          "Transfer failed."
        );
        memes[_index].owner = payable(msg.sender);
    }



    function getMemesLength() public view returns (uint) {
        return (memesLength);
    }
  
}