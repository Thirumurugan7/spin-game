//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SpinContract.sol";

contract GameContract is SpinContract {
    /* Trustless Application Settlement Template */
    constructor(address verifier_address) SpinContract(verifier_address) {}

    /* Application On-chain Business Logic */

   

    uint64 public x_position;
    uint64 public y_position;
    uint64 public highscore;
    mapping (address => uint) public playerHighScore;


    // Get the current state of the game contract
    function getStates() external view returns (uint64, uint64,uint64, uint) {
                uint playerScore = playerHighScore[msg.sender];

        return (x_position, y_position,highscore,playerScore);
    }

    struct ZKInput {
        uint64 start_x_position;
        uint64 start_y_position;
        uint64 start_highscore;
        uint start_playerHighScore;
    }

    struct ZKOutput {
        uint64 end_x_position;
        uint64 end_y_position;
        uint64 end_highscore;
        uint end_playerHighScore;
    }

    // Settle a verified proof
    function settle(uint256[][] calldata instances) internal override  {
        // [[]]
        ZKInput memory zk_input = ZKInput(uint64(instances[0][0]), uint64(instances[0][1]),uint64(instances[0][2]), uint(instances[0][3]));

        ZKOutput memory zk_output = ZKOutput(uint64(instances[0][4]), uint64(instances[0][5]),uint64(instances[0][6]), uint(instances[0][7]));

        require(
            zk_input.start_x_position == x_position && zk_input.start_y_position == y_position && zk_input.start_highscore == highscore && zk_input.start_playerHighScore == playerHighScore[msg.sender] ,
            "Invalid start state"
        );

        x_position = zk_output.end_x_position;
        y_position = zk_output.end_y_position;
        highscore = zk_output.end_highscore;
        playerHighScore[msg.sender] = zk_output.end_playerHighScore;

    }

    function DEV_ONLY_setStates(uint64 _x_position, uint64 _y_position, uint64 _highscore, uint _playerHighscore ) external onlyOwner {
        x_position = _x_position;
        y_position = _y_position;
        highscore = _highscore;
        playerHighScore[msg.sender] = _playerHighscore;
    }
}