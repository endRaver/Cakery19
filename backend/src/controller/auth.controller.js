import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl, email } = req.body;

    // check if user already exists
    const user = await User.findOne({ clerkId: id });

    const fullname =
      `${firstName || ""} ${lastName || ""}`.trim() || email.split("@")[0];

    if (!user) {
      // signup
      await User.create({
        clerkId: id,
        fullname,
        email,
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};
