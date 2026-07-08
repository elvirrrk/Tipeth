// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Script.sol";
import "../src/Tips.sol";

contract DeployTips is Script {
    function run() external {
        vm.startBroadcast();
        Tips tips = new Tips();
        vm.stopBroadcast();

        console.log("Tips deployed at:", address(tips));
    }
}
