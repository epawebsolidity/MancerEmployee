import api from "../utils/axios";

// CREATE AIRDROP (NEW)
export const createAllowcationAirdrop = async (
  id_employe: number,
  salary: string,
  month: string,
  hash: string,
  streamId: string
) => {
  try {
    const res = await api.post("/salary", {
      id_employe,
      salary,
      month,
      hash,
      streamId,
    });

    console.log("result", res.data);
    return res.data;
  } catch (error) {
    console.error("Error creating salary:", error);
    return null;
  }
};

// GET AIRDROP BY EMPLOYEE
export const getAllowcationAirdrop = async (id_employe: number) => {
  try {
    console.log(id_employe);
    const res = await api.get(`/salary/${id_employe}`);
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return [];
  }
};

// CLAIM AIRDROP
export const claimAirdropUsers = async (to: string, amount: string) => {
  try {
    const res = await api.post("/salary/reward", { to, amount });
    return res.data.data;
  } catch (error) {
    console.error("Error claiming salary:", error);
    return null;
  }
};


export const getBalanceHistoryEmploye = async () => {
  try {
    const res = await api.get("/salary/");
    console.log("result", res);
    return res.data;
  } catch (error) {
    console.error("Error fetching salary data:", error);
    return [];
  }
};