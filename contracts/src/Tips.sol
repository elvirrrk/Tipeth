// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract Tips {
	address[] private creators;
	mapping(address => bool) private isCreator;
	mapping(address => uint256) public totalReceived;

	event TipSent(address indexed from, address indexed to, uint256 amount, string message);
	event Tipped(address indexed from, address indexed to, uint256 amount);

    function tip(address creator) external payable {
        require(msg.value > 0, "Tip should be bigger than 0");
        require(creator != address(0), "Invalid address");
        if (!isCreator[creator]) {
            isCreator[creator] = true;
            creators.push(creator);
        }
        totalReceived[creator] += msg.value;
        (bool success, ) = payable(creator).call{value: msg.value}("");
        require(success, "The transaction is failed");

        emit Tipped(msg.sender, creator, msg.value);
    }

    function topTipped(uint8 n) external view returns (address[] memory) {
        uint256 len = creators.length;
        address[] memory sorted = new address[](len);
        for (uint256 i = 0; i < len; i++) {
            sorted[i] = creators[i];
        }
		for (uint256 i = 0; i < len; i++) {
            for (uint256 j = 0; j < len - i - 1; j++) {
                if (totalReceived[sorted[j]] < totalReceived[sorted[j + 1]]) {
                    address temp = sorted[j];
                    sorted[j] = sorted[j + 1];
                    sorted[j + 1] = temp;
                }
            }
        }
        uint256 resultLen = n < len ? n : len;
        address[] memory result = new address[](resultLen);
        for (uint256 i = 0; i < resultLen; i++) {
            result[i] = sorted[i];
        }

        return result;
    }
}