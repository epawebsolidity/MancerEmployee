import api from "../utils/axios";

export const createAllowcationAirdrop = async (
  id_employe: number,
  salary: string,
<<<<<<< HEAD
  status_cleam: string
) => {
  try {
    console.log(id_employe, salary, status_cleam);
    const res = await api.post("/airdrop", {
      id_employe,
      salary,
      status_cleam,
    });
    console.log("result", res.data);
=======
  month: string,
  hash: string, 
  streamId: string
) => {
  try {
    const res = await api.post("/airdrop", {
      id_employe,
      salary,
      month, 
      hash, 
      streamId
    });
    console.log("result", res);
>>>>>>> fa65e95 (first commit)
    return res.data;
  } catch (error) {
    console.error("Error creating wallet:", error);
    return null;
  }
};

export const getAllowcationAirdrop = async (id_employe: number) => {
  try {
    const res = await api.get(`/airdrop/${id_employe}`);
<<<<<<< HEAD
    console.log(res.data.data);
=======
    console.log(res);
>>>>>>> fa65e95 (first commit)
    return res.data.data;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return [];
  }
};

export const claimAirdropUsers = async (to: string, amount: string) => {
  try {
    console.log(to, amount);
    const res = await api.post("/airdrop/reward", { to, amount });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return [];
  }
};
