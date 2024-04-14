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
    setLoading(false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="m-4">
      <Search onSearch={onSearch} />
      <SortRepo />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
      </div>
    </div>
  );
};

export default HomePage;
