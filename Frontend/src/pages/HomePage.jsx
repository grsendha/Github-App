import toast from "react-hot-toast";
import React, { useCallback, useEffect, useState } from "react";
import Search from "../components/Search";
import SortRepo from "../components/SortRepo";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState("recent");

  const getUserProfileAndRepos = useCallback(async (username = "grsendha") => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userProfile = await response.json();
      setUserProfile(userProfile);

      const responseRepos = await fetch(userProfile.repos_url);
      const repos = await responseRepos.json();
      console.log("REPOS", repos);
      console.log("PROFILE", userProfile);
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setRepos(repos);
      return { userProfile, repos };
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();

    setLoading(true);
    setRepos([]);
    setUserProfile(null);
    const { userProfile, repos } = await getUserProfileAndRepos(username);
    setUserProfile(userProfile);
    setRepos(repos);
    setSortType("recent");
    setLoading(false);
  };

  const onSort = (sortType) => {
    if (sortType === "recent") {
      setRepos(
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
    } else if (sortType === "stars") {
      setRepos(repos.sort((a, b) => b.stargazers_count - a.stargazers_count));
    } else if (sortType === "forks") {
      setRepos(repos.sort((a, b) => b.forks_count - a.forks_count));
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepo onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
      </div>
    </div>
  );
};

export default HomePage;
