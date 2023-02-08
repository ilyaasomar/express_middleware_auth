import TransectionModel from "../models/Transections.js";

// get all transections
export const getTransections = async (req, res) => {
  const transections = await TransectionModel.find().where({
    createdby: req.Id,
  });
  res.status(200).json(transections);
};

// transection creation
export const createTransection = async (req, res) => {
  const { transection_type, amount, registred_date, description } = req.body;
  try {
    if (!transection_type && !amount && !registred_date && !description) {
      return res.status(401).json({ message: "All fields are mendatory" });
    } else {
      if (transection_type === "deposit") {
        const data = await TransectionModel.create({
          transection_type,
          amount,
          registred_date,
          description,
          createdby: req.userId,
        });
        res.status(200).json(data);
      } else if (transection_type === "withdraw") {
        const deposit_data = await TransectionModel.find().where({
          transection_type: "deposit",
          createdby: req.userId,
        });
        let deposit_balance = 0;
        deposit_data.forEach((data) => {
          deposit_balance += data.amount;
        });
        const withdraw_data = await TransectionModel.find().where({
          transection_type: "withdraw",
          createdby: req.userId,
        });
        let withdraw_balance = 0;
        withdraw_data.forEach((data) => {
          withdraw_balance += data.amount;
        });
        let total = deposit_balance - withdraw_balance;
        // hadi empty u yahay you don't have a deposit
        if (deposit_data.length === 0) {
          res.status(202).json("You don't have a deposit");
        } else if (total < amount) {
          res
            .status(202)
            .json(
              `You don't have a sufficient amount. Your balance is only $${total}`
            );
        } else {
          const data = await TransectionModel.create({
            transection_type,
            amount,
            registred_date,
            description,
            createdby: req.userId,
          });
          res.status(200).json(data);
        }
      } else {
        res.status().json("unknown error");
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get single transection
export const getSingleTransSection = async (req, res) => {
  const { id } = req.params;
  try {
    const transection = await TransectionModel.findOne(id).where({
      createdby: req.userId,
    });
    if (!transection) {
      return res.status(404).json({ message: "No transection found" });
    } else {
      return res.status(200).json(transection);
    }
  } catch (error) {
    res.statu(500).json({ message: error.message });
  }
};
// delete transection

export const deleteTransection = async (req, res) => {
  const { id } = req.params;
  try {
    const transection = await TransectionModel.findByIdAndRemove(id).where({
      createdby: req.userId,
    });
    if (!transection) {
      res.status(401).json({ message: "No transection found" });
    } else {
      res.status(200).json({ message: "transection deleted successfully!" });
    }
  } catch (error) {}
};
