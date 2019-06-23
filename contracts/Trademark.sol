pragma solidity >=0.4.24;

//Importing openzeppelin-solidity ERC-721 implemented Standard
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

// MarkNotary Contract declaration inheritance the ERC721 openzeppelin implementation
contract Trademark is ERC721 {

    // Mark data
    struct Mark {
        string name;
    }

    // Implement Task 1 Add a name and symbol properties
    // name: Is a short name to your token
    // symbol: Is a short string like 'USD' -> 'American Dollar'
    string public constant name = "Trademark Token Registry";
    string public constant symbol = "TMT";
    // mapping the Mark with the Owner Address
    mapping(uint256 => Mark) public tokenIdToMarkInfo;
    // mapping the TokenId and price
    mapping(uint256 => uint256) public marksForSale;
    // Create Mark using the Struct
    function createMark(string memory _name, uint256 _tokenId) public { // Passing the name and tokenId as a parameters
        Mark memory newMark = Mark(_name); // Mark is an struct so we are creating a new Mark
        tokenIdToMarkInfo[_tokenId] = newMark; // Creating in memory the Mark -> tokenId mapping
        _mint(msg.sender, _tokenId); // _mint assign the the Mark with _tokenId to the sender address (ownership)
    }

    // Putting an Mark for sale (Adding the Mark tokenid into the mapping MarksForSale, first verify that the sender is the owner)
    function putMarkUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You can't sale the Mark you don't owned");
        marksForSale[_tokenId] = _price;
    }

   // Function that allows you to convert an address into a payable address
    function _make_payable(address x) internal pure returns (address payable) {
        return address(uint160(x));
    }

    function buyMark(uint256 _tokenId) public  payable {
        require(marksForSale[_tokenId] > 0, "The Mark should be up for sale");
        uint256 markCost = marksForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value > markCost, "You need to have enough Ether");
        // We can't use _addTokenTo or_removeTokenFrom functions, now we have to use _transferFrom
        _transferFrom(ownerAddress, msg.sender, _tokenId);
        // We need to make this conversion to be able to use transfer() function to transfer ethers
        address payable ownerAddressPayable = _make_payable(ownerAddress);
        ownerAddressPayable.transfer(markCost);
        if(msg.value > markCost) {
            msg.sender.transfer(msg.value - markCost);
        }
    }
    // Implement Task 1 lookUptokenIdToMarkInfo
    function lookUptokenIdToMarkInfo (uint _tokenId) public view returns (string memory) {
        //1. You should return the Mark saved in tokenIdToMarkInfo mapping
        return tokenIdToMarkInfo[_tokenId].name;
    } 
    //function getAllTradeMarks() public view returns (mapping) {
        //return tokenIdToMarkInfo;
    //}
    // Implement Task 1 Exchange Marks function
    function exchangeMarks(uint256 _fromTokenId, uint256 _toTokenId) public {
        //1. Passing to Mark tokenId you will need to check if the owner of _tokenId1 or _tokenId2 is the sender
        address _from = ownerOf(_fromTokenId);
        address _to = ownerOf(_toTokenId);
        require(msg.sender == _from || msg.sender == _to, "");
        //2. You don't have to check for the price of the token (Mark)
        //3. Get the owner of the two tokens (ownerOf(_tokenId1), ownerOf(_tokenId1)
        require(_isApprovedOrOwner(_from, _toTokenId) || _isApprovedOrOwner(_to, _fromTokenId), "");
        //4. Use _transferFrom function to exchange the tokens.
        transferFrom(_from, _to, _fromTokenId);
        transferFrom(_to, _from, _toTokenId);
    }

    // Implement Task 1 Transfer Marks
    function transferAMark(address _to1, uint256 _tokenId) public {
        //1. Check if the sender is the ownerOf(_tokenId)
        require(ownerOf(_tokenId) == msg.sender, "");
        //2. Use the transferFrom(from, to, tokenId); function to transfer the Mark
        transferFrom(msg.sender, _to1, _tokenId);
    }

}