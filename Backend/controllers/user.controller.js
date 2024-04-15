import { GITHUB_API_KEY } from "../config/serverConfig.js";

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
