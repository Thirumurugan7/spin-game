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


    // Get the current state of the game contract
    function getStates() external view returns (uint64, uint64,uint64) {
        return (x_position, y_position,highscore);
    }

    struct ZKInput {
        uint64 start_x_position;
        uint64 start_y_position;
        uint64 start_highscore;
    }

    struct ZKOutput {
        uint64 end_x_position;
        uint64 end_y_position;
        uint64 end_highscore;
    }

    // Settle a verified proof
    function settle(uint256[][] calldata instances) internal  {
        // [[]]
        ZKInput memory zk_input = ZKInput(uint64(instances[0][0]), uint64(instances[0][1]),uint64(instances[0][2]));

        ZKOutput memory zk_output = ZKOutput(uint64(instances[0][3]), uint64(instances[0][4]),uint64(instances[0][5]));

        require(
            zk_input.start_x_position == x_position && zk_input.start_y_position == y_position && zk_input.start_highscore == highscore ,
            "Invalid start state"
        );

        x_position = zk_output.end_x_position;
        y_position = zk_output.end_y_position;
        highscore = zk_output.end_highscore;

    }

    function DEV_ONLY_setStates(uint64 _x_position, uint64 _y_position, uint64 _highscore ) external onlyOwner {
        x_position = _x_position;
        y_position = _y_position;
        highscore = _highscore;
    }
}