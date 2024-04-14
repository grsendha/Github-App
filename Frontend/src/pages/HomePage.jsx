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

  const getUserProfileAndRepos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.github.com/users/grsendha");
      const userProfile = await response.json();
      setUserProfile(userProfile);

      const responseRepos = await fetch(userProfile.repos_url);
      const repos = await responseRepos.json();
      setRepos(repos);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="m-4">
      <Search />
      <SortRepo />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {repos.length > 0 && !loading && <Repos repos={repos} />}
      </div>
    </div>
  );
};

export default HomePage;
