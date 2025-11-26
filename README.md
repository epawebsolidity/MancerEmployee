# 🚀 Mancer Employee – Fullstack Web3 Application
- **Express.js**  
- **MySQL**  
- **Next.js**  
- **Wagmi + Viem**  
- **TailwindCSS**  
- **Axios**  
- **Firebase Authentication**
---
## 📦 Tech Stack
### **Backend**
- Express.js  
- MySQL  
- JWT Authentication  
### **Frontend**
- Next.js  
- Wagmi + Viem (Web3 Interaction)  
- TailwindCSS  
- Axios  
- Firebase Auth  
---

## 📂 Project Structure
```base
MancerEmployee/
│── backend/ 
│ ├── package.json
│ └── .env
│
│── frontend/
│ ├── app/
│ ├── components/
│ ├── types/
│ ├── package.json
│ └── .env
```
---
## 🔧 Environment Setup
### 🔹 1. Frontend — `frontend/.env`
```sh
NEXT_PUBLIC_PHII_CONTRACT_ADDRESS=
NEXT_PUBLIC_STREAM_CONTRACT_ADDRESS=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```
---
### 🔹 2. Backend — `backend/.env`
```sh
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mancer_db

JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=5000
```
---
## 🔗 Smart Contract Addresses

| Name                    | Address                                      |
| ----------------------- | -------------------------------------------- |
| **Token PHII (ERC-20)** | `0xc6800342F5C0895dd4419b99Bf758b2136F1CAfe` |
| **Token EDU Mancer**    | `0x0fe44adB7854Cad8F11521e6D7C5eb5B7118EC0b` |
---
## 🧪 Blockscout Test Results
### Transaction Logs

| Action               | Link                                                                                                                                                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Approve**          | [https://edu-chain-testnet.blockscout.com/tx/0x23648c29a1ae472471a554ab7f239c2f9d8e81f7488dc160c3ffaab3f01b386b](https://edu-chain-testnet.blockscout.com/tx/0x23648c29a1ae472471a554ab7f239c2f9d8e81f7488dc160c3ffaab3f01b386b) |
| **CreateAndDeposit** | [https://edu-chain-testnet.blockscout.com/tx/0xc4c9375a1f1859adaa3a63d0bd5b3d12f0071cb7f399eb6d418559ad55d74a31](https://edu-chain-testnet.blockscout.com/tx/0xc4c9375a1f1859adaa3a63d0bd5b3d12f0071cb7f399eb6d418559ad55d74a31) |
| **WithdrawMax**      | [https://edu-chain-testnet.blockscout.com/tx/0xe0cfd4012ab3c04412a5d9e7c5dd31e02865124bda257b96cbedcb2a504436c5](https://edu-chain-testnet.blockscout.com/tx/0xe0cfd4012ab3c04412a5d9e7c5dd31e02865124bda257b96cbedcb2a504436c5) |
| **RefundMax**        | [https://edu-chain-testnet.blockscout.com/tx/0xe225ec815ef5cb294ef504c8b1aa929181f2c636ecdff82cc12007e0b46082ec](https://edu-chain-testnet.blockscout.com/tx/0xe225ec815ef5cb294ef504c8b1aa929181f2c636ecdff82cc12007e0b46082ec) |


## 🚀 Installation & Run
### 1️⃣ Clone Repository
```sh
git clone https://github.com/epawebsolidity/MancerEmployee.git
```
```sh
cd backend
npm install
npm run dev
http://localhost:5000
```
```sh
cd frontend
npm install
npm run dev
http://localhost:3000

```
## Demo
### DESKTOP


<p align="center">
  <img src="https://github.com/epawebsolidity/MancerEmployee/blob/main/demo/login.png" alt="Claim Faucet" width="400" />
</p>

<p align="center">
  <img src="https://github.com/epawebsolidity/MancerEmployee/blob/main/demo/deskop_home_admin.png" alt="Claim Faucet" width="400" />
</p>

<p align="center">
  <img src="https://github.com/epawebsolidity/MancerEmployee/blob/main/demo/deskop_home_admin.png" alt="Claim Faucet" width="400" />
</p>