import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import db from "../config/database.js";
import { educhainTestnet } from "../config/network.js";

export const claimAllowcationEmploye = async (req, res) => {
  try {
    const { address, salary } = req.body;

    if (!address || !salary) {
      return res.status(400).json({ error: "Invalid request" });
    }

    const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);
    const client = createWalletClient({
      account,
      chain: educhainTestnet,
      transport: http(),
    });

    const tx = await client.writeContract({
      address: process.env.PHII_TOKEN_ADDRESS,
      abi: tokenAbi,
      functionName: "transfer",
      args: [address, BigInt(salary)],
    });

    res.json({ success: true, tx });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Claim failed" });
  }
};

export const createAllowcationEmploye = async (req, res) => {
  const { id_employe, salary, month, type, hash, streamId } = req.body;
  try {
    const [rows] = await db.query(
      "INSERT INTO emp_salary (id_employe, salary, month, type, hash, streamId) VALUES (?, ?, ?, ?, ?, ?)",
      [id_employe, salary, month, type, hash, streamId]
    );
    return res.status(200).json({
      success: true,
      message: "Airdrop allocation created",
      data: rows,
    });
  } catch (error) {
    console.error("Error creating airdrop:", error);
    return res.status(500).json({ message: "Error creating airdrop" });
  }
};

export const getAllowcationEmploye = async (req, res) => {
  const { id_employe } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT * FROM emp_salary WHERE id_employe = ?`,
      [id_employe]
    );
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching wallet data" });
  }
};

// export const getAllowcationEmploye = async (req, res) => {
//   const { id_employe } = req.params;

//   try {
//     // Ambil data semua salary employee dari DB
//     const [rows] = await pool.query(
//       "SELECT * FROM emp_salary WHERE id_employe = ?",
//       [id_employe]
//     );

//     const now = new Date();
//     const monthNames = [
//       "January","February","March","April","May","June",
//       "July","August","September","October","November","December"
//     ];
//     const currentMonthName = monthNames[now.getMonth()]; // ex: "November"

//     // Filter data bulan ini
//     const filtered = rows.filter(item => item.month === currentMonthName);

//     res.status(200).json({
//       success: true,
//       data: filtered,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching wallet data" });
//   }
// };

export const getSalaryBalanceEmploye = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM emp_salary`);
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching wallet data" });
  }
};
