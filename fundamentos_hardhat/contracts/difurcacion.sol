// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.26;

contract difurcacion {
    address payable [] public recibidores; //Especificar que las direcciones de los recibidores apareceran en un array ["","",...,""]
    event TransferReceived(address desde, uint cantidad); // evento para dejar registrado la cantidad de ether recibido por el contrato y de quien
    constructor(address payable [] memory _direcciones ) { //Sirve para dejar fijo a los recibidores y que deban ser declarados antes de subir el contrato a la red, solo puede ser ejecutada una vez en la creacion del contrato
        //memory sirve para decirle que me guarde en la "ram" del evm las variables hasta que se finalice la ejecucion, de ahi se eliminan una vez que el contrato finaliza, esto permite que sean accesibles de forma mas directa y barata
        for(uint i = 0; i<_direcciones.length; i++){ //for para revisar la cantidad de recibidores declarados
            recibidores.push(_direcciones[i]);
        }
    }
    receive() payable external{ //Esta funcion se ejecuta cuando el contrato recibe ether, es como decir: si recibes ether, ejecuta esto. Se utiliza external ya que es una funcion no perteneciente a este contrato
        uint256 division = msg.value / recibidores.length; //msg.value indica la cantidad de ether recibido por el contrato, esta variable sirve para dividir equitativamente el ether recibido
        for(uint i = 0; i<recibidores.length; i++){ //for para transferir a cada una de las direcciones su cantidad de ether que le corresponde
            recibidores[i].transfer(division); //funcion para transferir
        }
         emit TransferReceived(msg.sender, msg.value); // Esto sirve para avisar como evento cada transferencia que se realiza por iteracion
    }
       
}
    