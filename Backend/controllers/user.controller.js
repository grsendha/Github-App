import { GITHUB_API_KEY } from "../config/serverConfig.js";
import User from "../models/user.model.js";

export const getUserProfileAndRepos = async (req, res) => {
  const { username } = req.params;

  try {
    const userProfile = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          authorization: `token ${GITHUB_API_KEY}`,
        },
      }
    ).then((response) => response.json());

    const repos = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${GITHUB_API_KEY}`,
      },
    }).then((response) => response.json());

    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeProfile = async (req, res) => {
  const { username } = req.params;
  const user = await User.findById(req.user._id.toString());
  const userToLike = await User.findOne({ username });

  if (!userToLike) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.likedUsers.includes(userToLike._id.toString())) {
    return res.status(400).json({ message: "User already liked" });
  }
  userToLike.likedBy.push({
    username: user.username,
    avatarUrl: user.avatarUrl,
    likedDate: Date.now(),
  });

  user.likedProfile.push(userToLike.username);

  await userToLike.save();
  await user.save();

  res.status(200).json({ message: "User liked" });

  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedUsers: user.likedBy });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
