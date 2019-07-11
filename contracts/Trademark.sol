pragma solidity >=0.4.24;

//Importing openzeppelin-solidity ERC-721 implemented Standard
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

// MarkNotary Contract declaration inheritance the ERC721 openzeppelin implementation
contract Trademark is ERC721 {

    // Mark data
    struct Mark {
        string name;
        string desc;
        string markType;
        string ipfsHash;
    }

    Mark[] marks;
    uint256[] public allTokens;
    mapping (address => uint256[]) internal ownedTokens;
    //mapping (address => uint256) internal ownedTokensCount;


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
    mapping(bytes32 => bool) public markHashMap;

    function createMark(string memory _name, string memory _desc, string memory _markType, string memory _ipfsHash) public {
        // Mark is an struct so we are creating a new Mark
        Mark memory newMark = Mark(_name, _desc, _markType, _ipfsHash);
        // Adding the Mark to marks and generating an ID
        uint _tokenId = marks.push(newMark) - 1;
        // _mint the token
        _mint(msg.sender, _tokenId);
        // Adding the mark to ownedTokens to track the list of tokens owned by an address
        ownedTokens[msg.sender].push(_tokenId);
        // Mapping to track each token associated to each Mark
        tokenIdToMarkInfo[_tokenId] = newMark;
        // Emit event
        //TODO
    }

    // Implement Task 1 lookUptokenIdToMarkInfo
    function getMarkFromId (uint _tokenId) public view returns (string memory, string memory, string memory, string memory) {
        //1. You should return the Mark saved in tokenIdToMarkInfo mapping
        return (tokenIdToMarkInfo[_tokenId].name,
        tokenIdToMarkInfo[_tokenId].desc,
        tokenIdToMarkInfo[_tokenId].markType,
        tokenIdToMarkInfo[_tokenId].ipfsHash);
    }

    function getOwnedMarks() public view returns(uint256[] memory) {
        uint256[] memory tokenList = ownedTokens[msg.sender];
        return tokenList;
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

    function transferAMark(address _to1, uint256 _tokenId) public {
        //1. Check if the sender is the ownerOf(_tokenId)
        require(ownerOf(_tokenId) == msg.sender, "");
        //2. Use the transferFrom(from, to, tokenId); function to transfer the Mark
        transferFrom(msg.sender, _to1, _tokenId);
    }

}