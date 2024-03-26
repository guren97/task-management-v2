import jwt from "jsonwebtoken";

const generateToken = async (user, statusCode, res) => {
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Set to true if served over HTTPS
      sameSite: "strict",
      maxAge: 10 * 60 * 1000, // Expires in 10 minutes
      path: "/", // Set the cookie path as needed
    });

    res.status(statusCode).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export default generateToken;
