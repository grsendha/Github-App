export const loginController = async (req, res) => {
  try {
    res.send("Login page");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
