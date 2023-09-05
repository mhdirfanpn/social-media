import User from "../model/User.js";
import bcrypt from "bcrypt";


//update account
export const updateUser = async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (userId === req.params.id || req.body.isAdmin) {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      await User.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json("updated successfully");
    } else {
      return res.status(403).json("you can only update your own account");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


//delete account
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId === req.params.id || req.body.isAdmin) {
      await User.findOneAndDelete(req.params.id);
      res.status(200).json("deleted successfully");
    } else {
      return res.status(403).json("you can only delete your own account");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


//get user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, createdAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};


//follow a user
export const followUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.body.userId);
      const currentUser = await User.findById(req.params.id);
      if (!user.followers.includes(req.params.id)) {
        await user.updateOne({ $push: { followings: req.params.id } });
        await currentUser.updateOne({ $push: { followers: req.body.userId } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already following this user");
      }
    } else {
      res.status(403).json("you can't follow your own");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//unfollow a user
export const unFollowUser = async (req, res) => {
  try {
    if (req.body.userId !== req.params.id) {
      const user = await User.findById(req.body.userId);
      const currentUser = await User.findById(req.params.id);
      if (user.followers.includes(req.params.id)) {
        await user.updateOne({ $pull: { followers: req.params.id } });
        await currentUser.updateOne({ $pull: { followers: req.body.userId } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } else {
      res.status(403).json("you can't unfollow your own");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
