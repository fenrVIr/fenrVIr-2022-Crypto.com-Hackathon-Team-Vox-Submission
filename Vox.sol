// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

error IncorrectPasscodeOrIndex();

contract Vox {

    struct vox {
        address owner;
        string text;
        uint256 timestamp;
        uint256 passcode;
    }

    vox[] s_voxArray;

    function addVox(string memory text, uint256 passcode) public {
        s_voxArray.push(vox(msg.sender, text, block.timestamp, passcode));
    }

    function getLast() view public returns(uint256) {
        return s_voxArray.length;
    }

    function getVox(uint256 index, uint256 passcode) public view returns(vox memory) {
        if (s_voxArray[index].passcode == passcode) {
            return s_voxArray[index];
        } else {
            revert IncorrectPasscodeOrIndex();
        }
    }
}

