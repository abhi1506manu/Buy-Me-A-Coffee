// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract BuyMeACoffee {
    //event to emit a memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message

    );

    //Memo Struct
    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //List of all memo received from friends
    Memo[] memos;

    //Address of contract deployer
    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }
    
    /*
    @dev buy a coffee from contract owner
    @param _name name of all coffee buyer
    @param _message a nice message from the coffee buyer

    */
    function buyCoffee(string memory _name, string memory _message)public payable{
        require(msg.value >0, "Cant buy coffee with 0 eth");

        //add memo to storage
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
            ));
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name, 
            _message
        );

    }

     /*
    @dev send the entire balance stored in this contract to the owner
    */

    function withdrawTips()public{
        require(owner.send(address(this).balance));

    }

     /*
    @dev memo received and stored on blockchain
    */
    function getMemos()public view returns(Memo[] memory){
        return memos;
    }

  

}