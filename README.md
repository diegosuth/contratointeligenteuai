# Bitacora Diego
## Contratos inteligentes
Primero, ¿Qué es un contrato inteligente?

  Es una forma de llamar a las transacciones en la blockchain de Ethereum, donde pueden ir desde lo más basico de x le paga a y, hasta cosas mas complejas, como por ejemplo, que al depositar ether al contrato este pueda redistribuirlo hacia múltiples cuentas, sin necesidad de tener que depositar a las cuentas una por una. 

Pero antes de poder empezar a redactar e implementar contratos inteligentes en la blockchain de Ethereum, debemos conseguir un par de cosas previas:

## Paso 1: Aprender a programar en Solidity, entendiendo las herramientas que lo convierten en un lenguaje Turing completo
  El lenguaje de Solidity es un lenguaje de programación moderno, que a pesar de ser similar en lógica a c++, se tiene siempre que tener en cuenta que todas las funciones y variables tienen la opción de "tallarse" en la blockchain o simplemente usarse como lógica para el resto del código. Esto es importante ya que cada línea de código que se escriba tiene un costo de gas, que a pesar de que parezca poco gas por línea de código, a medida que se va complejizando el contrato este va aumentando en coste rápidamente, por lo que es importante conocer la mayor cantidad de léxico de Solidity para saber qué funciones y características usar en el mejor momento para así no desperdiciar ether a la hora de subir, y posteriormente ejecutar el contrato inteligente en la blockchain. 

  Un buen recurso para practicar y compilar código de Solidity es https://remix.ethereum.org/ , el cual nos permite calcular el coste aproximado de gas de cada función y del contrato completo, a la vez que nos permite desplegar el codigo en una testnet de Ethereum(es una red de Ethereum que imita a la real, se utiliza para probar lógica y funcionamiento del código en una simulación, sin necesidad de gastar ether real).

### Ejemplo contrato inteligente en Solidity para conocer diversos detalles sobre el último bloque de la blockchain.
![](https://github.com/user-attachments/assets/c2a82ac5-d879-4d2c-9b4d-a205592036d2)

## Paso 2: Creación de llaves y billetera(Clef)
  Para poder subir y ejecutar en la red de Ethereum los contratos inteligentes, se necesita tener una identidad en la blockchain, esto mediante un nodo completo y un par de llaves que conforman una billetera para poder operar dentro de ésta. Para esto existen varias formas de hacerlo, que van desde lo centralizado, donde a través de una plataforma se crea una billetera con una dirección, en el cual la misma plataforma se encarga de almacenar toda la información sensible y otorgarte una interfaz sencilla para operar en Ethereum, hasta lo descentralizado, donde uno genera sus propio par de llaves a través de una semilla o el **método de la curva elíptica**. En palabras simples, una billetera es solamente una forma de visualizar, a través de un par de llaves, la cantidad de ether que se tiene en una cierta dirección(llave pública). 

En este caso exploraremos una herramienta que busca dar los beneficios descentralizados de:

-**Generador y encriptación de llaves**

-**Billetera**

-**Firmante de transacciones usando la llave privada**

-**Que todo sea realizado de forma local así nuestros datos sensibles no sean expuestos a robos masivos de información**

  La herramienta a utilizar se llama **Clef**, la cuál cumple con todas las casillas antes mencionadas. Pertenece al desarrollador de software de Geth, que a pesar de ser un software de ejecución, tiene otras herramientas y características que nos permite realizar lo antes mencionado, y que recientemente, ha separado Clef de Geth, por lo que es posible utilizar uno sin el otro.

  Primero, para utilizar Clef, debemos descargarlo desde su sitio oficial https://geth.ethereum.org/docs/tools/clef . Una vez descargado, ejecutamos en la terminal(personalmente utilizo PowerShell pero la terminal común funciona igual de bien) de nuestro OS clef.exe(lo podemos ejecutar arrastrando el archivo clef.exe a la terminal) junto a la palabra init, esto nos permitirá crear la *master seed*, la cuál es nuestra primera capa de seguridad hacia nuestra llave privada, ya que debemos bloquearla junto a una clave. Una vez creada la *master seed*, cerramos la terminal y la abrimos nuevamente con clef.exe, solo que esta vez colocamos como parámentro newaccount, lo que creará un archivo json encriptado que tendrá como nombre la fecha de creación y nuestra llave pública. 

  Para la creación de estas llaves nos pedirá crear otra contraseña. Luego, si queremos firmar una transacción utilizando Clef, o desencriptar el archivo generado al crear el par de llaves *keyfile*, deberemos ingresar esta contraseña, agregando una segunda capa de seguridad a nuestra billetera y software firmante.

  Este archivo *keyfile* contiene: la llave pública, la llave privada encriptada y parámetros usados en la encriptación, para que así el software que se desee utilizar para desencriptar la llave privada, junto a la contraseña que se utilizó al crear las llaves, sepa cómo hacerlo. Esto permite que nuestra billetera(llaves) sea segura sin dejar de comprometer el aspecto descentralizado, ya que si algún día deseo cambiar de Clef a otro software, pueda hacerlo con la menor cantidad de inconvenientes posibles.
### Uso del comando newaccount para creación de llaves
![image](https://github.com/user-attachments/assets/f2f61674-4ad8-4961-998c-8be8a89c9cbf)


### Archivo *keyfile* generado por Clef(encriptado)
![image](https://github.com/user-attachments/assets/263e1083-094a-435a-bb70-850d73bf42a2)


## Paso 2.1: Desencriptar archivo *keyfile*
  Este paso es completamente opcional, ya que al contar con el *keyfile* generado con Clef siempre podremos firmar o utilizarlo para administrar nuestra cuenta a través de este, ya que, a pesar de que el *keyfile* esté en un formato extraño no reconocido por el computador(siendo la extension del archivo en gran parte nuestra llave pública), siempre se podrá utilizar junto al software que la generó.

¿Pero qué sucede si quiero saber mi llave privada?

  Es una buena pregunta, muy importante para el aspecto descentralizado, esto debido a que si algún día dejo de usar Clef o directamente quiero tenerla en mi posesión por cualquier motivo, debería contar con la capacidad de desencriptarla. Si revisamos la documentación oficial de Clef, nos daremos cuenta que esto, a pesar de que quizá en algún momento se pudo hacer, ya no está permitido hacerlo directamente por cuestiones de ciberseguridad(el acceso indiscriminado a algo tan sensible como es nuestra llave privada no suena a la mejor idea). 
### Documentación oficial de Clef explicando el desbloqueo indiscriminado de billeteras
![image](https://github.com/user-attachments/assets/6a958bb8-8adf-4a2c-9cfa-63741c123337)


  Aún así, si realmente se quiere hacer, siempre existe una forma. Buscando en internet podemos encontrar varias soluciones a este problema, las cuáles tienen algo en común: son muy antiguas. A pesar de esto, son en gran parte funcionales, por lo que usando de ejemplo un repositorio de GitHub de una implementación en Python(https://github.com/csknk/decrypt-ethereum-keyfile), iré paso por paso mostrando la forma de hacerlo, desde el archivo *keyfile* que nos genera Clef hasta la llave privada desencriptada.

  Primero, debemos ubicar nuestro archivo *keyfile*, siendo la ubicación de este por predeterminado en C:\Users\tu_usuario\AppData\Local\Ethereum\keystore. Esta carpeta es ubicable utilizando el comando %appdata% en la aplicación ejecutar(esto es para windows, en caso de otro sistema operativo debes guiarte por la ubicación que aparece en la terminal cuando generaste la llave). Teniendo el *keyfile* ubicado, abrimos nuestro IDE de preferencia y creamos un archivo .json en blanco, para luego copiar el contenido del *keyfile* en este(esto mediante la apertura del *keyfile* con un editor de texto y copiando el contenido completo).

### *Keyfile* copiado en un archivo .json creado con Visual Studio Code
![image](https://github.com/user-attachments/assets/4ce27ca7-a262-4842-926a-bcca14c17797)


  De ahí surge la pregunta, ¿Es este paso realmente necesario?, la respuesta es sí, ya que como fue explicado anteriormente, cada *keyfile* generado contiene una extension que varía segun la llave pública generada, por lo que no es identificado por el computador ni por ningún otro programa como un tipo de archivo conocido. Aún así, si revisamos la estructura del archivo al abrirlo con un editor de texto, nos podremos fijar que está escrito como archivo .json, por lo que al copiarlo a un archivo .json en blanco, automáticamente es reconocido por el syntax del IDE como uno.

  Con nuestro archivo .json preparado, descargamos el zip de este repositorio de GitHub, el cúal es una version ligeramente distinta a la original previamente descrita, ya que esta última ocupa ciertas librerias que ya no están disponible para su descarga, por lo que modifiqué muy ligeramente el código con librerias que cumplen el mismo propósito pero que están disponibles para su descarga a día de hoy. Lo extraemos en una carpeta y revisamos de contar con todas las librerías que este utiliza(safe-pysha3, pycryptodome, setuptools), en caso de faltar alguna realizamos *pip install nombre_libreria* en la terminal de Python. Puede existir un error al instalar alguna de estas, debido a un componente de c++ faltante. Para esto accedemos al link que nos proporciona la terminal en el error y descargamos vs_buildTools.exe, lo ejecutamos y cuando se instale le damos a modificar e instalamos las dependencias de c++ y sql. Una vez instalado los ~7 GB debería seguir todo sin problema.
  
### Imagenes de referencia para solucionar posible problema al instalar librerias
![image](https://github.com/user-attachments/assets/bde93ff5-eea0-46dc-886a-fdb950881b5b)
![image](https://github.com/user-attachments/assets/a9a23f47-536a-4010-bddc-094ae83f0c13)

Una vez que tengamos todo listo:

-**Archivo *keyfile*.json**

-**Librerias instaladas**

-**Carpeta con todos los ejecutables descargada**

Ahora podemos empezar con la decriptación de nuestro archivo. Escribimos en la terminal de nuestro computador **python path/main.py  path/keyfile.json**. Si realizamos todo bien, nos pedirá la contraseña que colocamos al momento de crear el *keyfile* con clef (clef.exe newaccount).

### Demostración de desbloqueo de la llave de ejemplo
![image](https://github.com/user-attachments/assets/5d43526c-e4a7-4713-90bf-3127c4cf58a7)

Listo, ahora tienes tu llave privada en formato hexadecimal, la cual puedes guardar donde quieras, o usarla como te plazca. En caso de querer verificar la funcionalidad del código este repositorio incluye una llave de ejemplo con contraseña *password123*

## Apuntes transacciones
Una transaccion en Ethereum se le dice a la ejecución de un contrato inteligente que realiza algun tipo de acción en la blockchain, como puede ser transferir fondos por ejemplo. Estas se deben realizar a través de la escritura de un código en varios lenguajes que tengan soporte para una libreria web3, pero el mas usado actualmente es JavaScript, específicamente node.js para ejecutar nuestros archivos de transacción. En este existen dos librerias famosas para redactar transacciones, la primera siendo web3.js y la segunda ethers.js. En esta explicación utilizaremos ethers.js.

Primero debemos instalar node.js, un importante plataforma adyacente a JavaScript que nos ayudará a ejecutar y desplegar nuestros contratos inteligentes. Seguiremos las instrucciones para Windows del sitio oficial de node.js [aquí](https://nodejs.org/en/download/package-manager).
*Importante* Si es que te aparece algun error relacionado a problemas de ejecucion de script, tienes que abrir PowerShell como administrador y colocar *Set-ExecutionPolicy RemoteSigned*, luego de instalar todo puedes devolverlo a la normalidad escribiendo *Set-ExecutionPolicy Restricted* de la misma forma.

Una vez instalado node.js, podemos empezar a instalar las dependencias necesarias. Primero instalaremos ethers.js escribiendo en la terminal de windows *npm install ethers*. Una vez instalado podremos probar una transacción en una testnet de Ethereum, específicamente Sepolia. Necesitamos primero crear una carpeta en blanco y dentro de esa carpeta crear un archivo .js usando cualquier IDE. Dentro de este archivo podemos copiar el contenido del archivo transaccion.js adjunto a este repositorio. Antes de ejecutarlo, debemos contar con Ether en nuestra dirección, para este ejemplo usaremos un [faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia) para depositarnos fondos en Sepolia y poder probar esta transacción.

### Faucet de Google donde podemos colocar nuestra dirección y recibir Ether
![image](https://github.com/user-attachments/assets/7362126f-e24d-4386-842a-f157f73bf9d5)

En este caso para poder enviar la transacción a la blockchain de Ethereum necesitamos de un provider, el cúal nos ayudará con dos tareas:
-Saber a que blockchain nos estaremos conectando
-Conectarnos a la la blockchain a través de un nodo completo conectado a la red
En el ejemplo utilizaremos [infura](https://developer.metamask.io/) como provider de Sepolia, pero existen provider públicos como Homestead Ethereum para operar en la mainnet.
Una vez que tenemos todo listo y reemplazamos el código con nuestros datos, podremos enviar la transacción usando *node transaccion.js* en nuestra terminal abierta en la carpeta donde tenemos nuestro archivo. Si todo sale bien, podremos ingresar a https://sepolia.etherscan.io/ y colocar nuestra dirección pública para ver la transacción recien realizada.

###Transaccion exitosa
![image](https://github.com/user-attachments/assets/5714d66a-86d9-4f57-9506-a9cf5bf5154e)









