# MVP: Metamask Embedded Wallet + Smart Account Kit + ERC-7579 hooks en Sepolia

## Objetivo
Crear un prototipo funcional donde un usuario pueda:
1. Iniciar sesión con login Web2 (correo electrónico) usando Metamask Embedded Wallet SDK.
2. Desplegar su Smart Account modular usando Smart Accounts Kit en Sepolia.
3. Instalar un módulo ERC-7579 mínimo con hooks.
4. Ejecutar operaciones simples y emitir eventos on-chain.
5. Escuchar eventos off-chain y registrar información en una DB privada o consola.

---

## Tecnologías principales
| Componente | Tecnología / Herramienta | Función |
|-----------|-------------------------|---------|
| Login Web2 | Metamask Embedded Wallet SDK | Login social/email, gestión de clave del usuario |
| Smart Account | Smart Accounts Kit (Metamask) | Cuenta modular y extensible (ERC-7579) |
| Módulo custom | Solidity | Hooks que emiten eventos on-chain (`AccountAction`) |
| Listener off-chain | Node.js + ethers.js | Escucha eventos emitidos y guarda txHash, blockNumber, timestamp |
| Blockchain | Sepolia | Red de pruebas para despliegue de smart accounts y operaciones |

---

## Flujo de usuario

```text
[Usuario]
   |
   | Login Web2 (correo electrónico)
   v
[Metamask Embedded Wallet SDK]
   |  (gestiona clave / signer)
   v
[Smart Account Kit]
   |  (modular, ERC-7579)
   |  └─> Instala módulo custom con hooks
   |
   | Ejecuta operación mínima (usuario paga gas con Sepolia test ETH)
   v
[Blockchain Sepolia]
   |  └─> Evento emitido desde módulo
   v
[Listener Off-chain (Node.js + ethers.js)]
   |
   | Guarda txHash, blockNumber, timestamp en DB privada o consola
   v
[Tu aplicación / dashboard]
   └─> Muestra resultado al usuario

```

### Pasos de Implementación

#### 1. Configuración de la Embedded Wallet
*   Integrar el SDK de Metamask Embedded Wallet en el frontend.
*   Habilitar el inicio de sesión mediante correo electrónico.
*   Obtener el objeto `signer` para el usuario autenticado.

#### 2. Despliegue de la Smart Account
*   Utilizar Smart Accounts Kit para la creación de la Smart Account modular.
*   El usuario cubrirá las tarifas de gas en la red de pruebas Sepolia (con test ETH).
*   **Nota:** Para este MVP inicial, no se requiere la implementación de un EntryPoint ni un bundler.

#### 3. Desarrollo e Instalación del Módulo Custom
*   Diseñar un módulo ERC-7579 minimalista que emita el evento `AccountAction`.
*   Instalar el módulo desarrollado en la Smart Account.
*   Implementar un `hook` inicial simple para registrar una acción de prueba.

#### 4. Ejecución de Operación de Prueba
*   Invocar el `hook` del módulo desde la interfaz de usuario.
*   Confirmar la emisión del evento `AccountAction` en la blockchain.

#### 5. Implementación del Listener Off-chain
*   Desarrollar un servicio Node.js utilizando `ethers.js` para escuchar el evento `AccountAction`.
*   Almacenar la información esencial (hash de transacción, número de bloque, timestamp) en consola o en una base de datos privada.
*   Validar el registro correcto de la operación.

### Notas importantes

Este MVP está enfocado en pruebas en Sepolia.

Evitar operaciones complejas hasta validar el flujo básico.

Gas lo paga el usuario con test ETH; no se necesita Paymaster ni EntryPoint.

Hooks ERC-7579 pueden ser ampliados luego para lógica más compleja.