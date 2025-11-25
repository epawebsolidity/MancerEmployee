import db from "../config/database.js";

export const getEmployees = async (req, res) => {
  try {
    const [employees] = await db.query("SELECT * FROM employe");
    return res.status(200).json({
      message: "Success",
      data: employees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJoinEmployeByUserId = async (req, res) => {
  const { id_users } = req.params;
  try {
    const [rows] = await db.query(`SELECT * FROM employe WHERE id_users = ?`, [id_users]);
    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching wallet data" });
  }
};


export const getEmployeesUsersJoin = async (req, res) => {
  try {
    const [employees] = await db.query(`
      SELECT 
        e.*,
        s.id_emp_salary,
        s.month,
        s.salary,
        s.streamId,
        s.type,
        s.hash
      FROM employe e
      LEFT JOIN emp_salary s 
        ON e.id_employe = s.id_employe
      ORDER BY e.id_employe DESC;
    `);

    return res.status(200).json({
      message: "Success",
      data: employees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
