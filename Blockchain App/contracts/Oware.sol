pragma solidity ^0.8.0;

contract Oware{
    uint256 private _tokenIds;
    string _appname;
    string _symbol;

    constructor(string memory name_, string memory symbol_) {
        _appname = name_;
        _symbol = symbol_;
    }
    
    mapping (uint256 => address) private _owners;
    mapping (uint256 => string) private _tokenURIs;
    
    function addTransaction(address owner, string memory tokenURI) public returns (uint256)
    {
        _tokenIds+=1;
        uint256 newTransactionId = _tokenIds;
        _mint(owner, newTransactionId);
        _setTokenURI(newTransactionId, tokenURI);
        return newTransactionId;
    }
    function totalTransactions() public view returns(uint256)
    {
        return _tokenIds;
    }
    function getTokenURIs() public view returns (string[] memory) {
        string[] memory ret = new string[](totalTransactions());
        for (uint i = 0; i < totalTransactions(); i++) {
            ret[i] = _tokenURIs[i+1];
        }
        return ret;
    }
    function confrimToken(string memory Productcode) public view returns (bool) {
        require(compareStrings(Productcode,""), "Empty Product Code");
        for (uint i = 0; i < totalTransactions(); i++) { 
            if(!compareStrings(Productcode,_tokenURIs[i+1]))
            {
                return true;
            }
        }
        return false;
    }
    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) != keccak256(abi.encodePacked((b))));
    }
    function _setTokenURI(uint256 tokenid,string memory tokenURI) internal
    {
        require(_exists(tokenid), "ERC721URIStorage: URI set of nonexistent token");
        _tokenURIs[tokenid] = tokenURI;
    }
    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");
        _owners[tokenId] = to;
        emit ResultEvent("New Transaction Minted");
    }
    event ResultEvent(
        string 
    );
    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }
}
