import { GITHUB_API_KEY } from "../config/serverConfig.js";

export const explorePopularRepos = async (req, res) => {
  const { language } = req.params;
  try {
    const data = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`,
      {
        headers: {
          authorization: `token ${GITHUB_API_KEY}`,
        },
      }
    ).then((response) => response.json());
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
