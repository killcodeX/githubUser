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

  // check rate
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({data}) => {
          let {rate : { remaining },
        } = data;

        setrequest(remaining)
        if(remaining === 0){
          toggleError(true, 'sorry, youhave exceeded your hourly rate limit !')
        }
      })
      .catch((err) => console.log(err));
  };

  // request loading
  const [request, setrequest] = useState(0);
  const [loading, setLoading] = useState(false);

  // error
  const [error, setError] = useState({show:false, msg:''})

  function toggleError(show, msg){
    setError({show,msg})
  }

  // error
  useEffect(checkRequest, []);

  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, request, error }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
