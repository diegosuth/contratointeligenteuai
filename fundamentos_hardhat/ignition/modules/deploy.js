// ./ignition/modules/deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Define el array de direcciones que quieres pasar al constructor
    const direcciones = [
        "0x...", // remplaza por las direcciones válidas
        "0x...",
    ];

    // Obtén la instancia del contrato que vas a desplegar
    const Difurcacion = await ethers.getContractFactory("difurcacion");

    // Despliega el contrato pasando el array de direcciones al constructor
    const contrato = await Difurcacion.deploy(direcciones);

    // Espera a que el contrato sea minado
    await contrato.deployed();

    console.log("Contrato desplegado en:", contrato.address);
}

// Ejecuta la función principal y maneja errores
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
