const { ethers } = require("ethers");

async function sendEtherTo() {
    // Paso 1:Conseguir un provider
    const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

    // Paso 2: Configurar wallet 
    const privateKey = "0xtullaveprivada"; // Reemplazar con la llave privada en ""
    const wallet = new ethers.Wallet(privateKey, provider);

    // Paso 3: Colocar direccion donde se quiere transferir
    const personaAddress = "0xAddress"; // Reemplazar con direccion en ""

    // Paso 4: Define los detalles de la transaccion
    const tx = {
        to: personaAddress, // La direccion
        value: ethers.parseEther("0.1"), // Cantidad de ether a enviar(0.1 en este caso)
        gasLimit: 21000, // Opcional, definir limite de gas
    };

    try {
        // Paso 5: Enviar la transaccion
        const transactionResponse = await wallet.sendTransaction(tx);
        console.log("Transaction sent:", transactionResponse);

        // Paso 6: Esperar confirmación de minado de transacción
        const receipt = await transactionResponse.wait();
        console.log("Transaction mined:", receipt);
    } catch (error) {
        console.error("Error sending Ether:", error);
    }
}

sendEtherTo();
