import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  // request loading
  const [request, setrequest] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // check rate
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setrequest(remaining);
        if (remaining === 0) {
          toggleError(
            true,
            "sorry, you have exceeded your hourly rate limit !"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  // Search user

  const serachGithubUser = async (user) => {
    // toggle error
    toggleError();
    setIsLoading(true);
    // setLoadingError
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?perpage=100`),
        axios(`${followers_url}?perpage=100`),
      ]).then((result) => {
        const [repos, followers] = result;
        if(repos.status === 'fulfilled'){
          setRepos(repos.value.data)
        }
        if(followers.status === 'fulfilled'){
          setFollowers(followers.value.data)
        }
      })
    } else {
      toggleError(true, "there is no user with that username");
    }

    checkRequest();
    setIsLoading(false);
  };

  // error
  const [error, setError] = useState({ show: false, msg: "" });

  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  // error
  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        request,
        error,
        serachGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
