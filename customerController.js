const { db } = require("./connectdb.js");

// Helper function to validate email, mobile number, and pin code
const validateInput = (data) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\+[1-9]{1}[0-9]{3,14}$/;
  const pinRegex = /^[0-9]{6}$/;

  if (!emailRegex.test(data.email)) {
    return "Invalid email address";
  }
  if (!mobileRegex.test(data.mobileNumber)) {
    return "Invalid mobile number";
  }
  if (!pinRegex.test(data.pincode)) {
    return "Invalid pin code";
  }
  return null;
};

const createCustomer = (req, res) => {
  const { firstName, lastName, email, mobileNumber, address, pincode } =
    req.body;

  const validationError = validateInput(req.body);

  if (validationError) {
    return res.status(400).json({
      success: false,
      message: validationError,
    });
  }

  const query = `CALL InsertCustomer(?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [firstName, lastName, email, mobileNumber, address, pincode],
    (err, results) => {
      console.log(results);
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Database Error",
          error: err.message,
        });
      }

      const status = results[0][0].status;
      const message = results[0][0].message;

      console.log(status);
      if (status === 0) {
        return res.status(400).json({ success: false, message });
      }

      res.status(200).json({ success: true, message });
    }
  );
};

const getUsers = (req, res) => {
  db.query(`select * from customerDetails;`, (err, results) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Database Error",
        error: err.message,
      });
    }
    res.status(200).json({
      success: true,
      myData: results,
    });
  });
};

module.exports = { createCustomer, getUsers };
