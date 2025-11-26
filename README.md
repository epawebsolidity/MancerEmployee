# 🚀 Mancer Employee – Fullstack Web3 Application

A fullstack Web3 payroll streaming system built using:

- **Express.js**  
- **MySQL**  
- **Next.js**  
- **Wagmi + Viem**  
- **TailwindCSS**  
- **Axios**  
- **Firebase Authentication**

This application allows companies to create streaming payrolls, employees to withdraw or refund their salary streams, and all transaction logs are stored on-chain & off-chain.

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

MancerEmployee/
│── backend/
│ ├── src/
│ ├── package.json
│ └── .env
│
│── frontend/
│ ├── app/
│ ├── package.json
│ └── .env.local

yaml
Copy code

---

## 🔧 Environment Setup

### 🔹 1. Frontend — `frontend/.env.local`

NEXT_PUBLIC_PHII_CONTRACT_ADDRESS=
NEXT_PUBLIC_STREAM_CONTRACT_ADDRESS=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

yaml
Copy code

---

### 🔹 2. Backend — `backend/.env`

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mancer_db

JWT_SECRET=
JWT_REFRESH_SECRET=
PORT=5000

---

## 🔗 Smart Contract Addresses

| Name                    | Address                                      |
| ----------------------- | -------------------------------------------- |
| **Token PHII (ERC-20)** | `0xc6800342F5C0895dd4419b99Bf758b2136F1CAfe` |
| **Token EDU Mancer**    | `0x0fe44adB7854Cad8F11521e6D7C5eb5B7118EC0b` |

---

## 🧪 Blockscout Test Results

You can track all Web3 interactions here:

### Transaction Logs

- **Approve** ⇒  
- **CreateAndDeposit** ⇒  
- **WithdrawMax** ⇒  
- **RefundMax** ⇒  

*(Add transaction URLs if needed)*

---

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