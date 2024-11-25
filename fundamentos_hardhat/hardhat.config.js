require("@nomiclabs/hardhat-ethers");

module.exports = {
    solidity: "0.8.26", //Depende de la versión de Solidity en la que escribes el contrato
    networks: {
        sepolia: {
            url: "https://sepolia.infura.io/v3/YOUR_PROJECT_URL",
            accounts: [ `0x...tullaveprivada` ]
        }
    }
};
