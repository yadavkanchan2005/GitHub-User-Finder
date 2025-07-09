import React, { useState } from "react";
import './GithubUser.css';

const GithubUser = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGithubUser = async () => {
    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const trimmedUsername = username.trim();
      if (!trimmedUsername) throw new Error("Please enter a username");

      const res = await fetch(`https://api.github.com/users/${trimmedUsername}`);
      if (!res.ok) throw new Error("User not found");

      const data = await res.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-container">
  <div className="input-group">
    <input
      type="text"
      placeholder="Enter GitHub username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <button onClick={fetchGithubUser}>Search</button>
  </div>

  {loading && <div className="spinner"></div>}
  {error && <p className="error-message">{error}</p>}

  {userData && (
    <div className="github-card">
      <img
        src={userData.avatar_url}
        alt={userData.login}
        className="github-avatar"
      />
      <h2>{userData.name || "No Name Provided"}</h2>
      <p>@{userData.login}</p>
      <p>Followers: {userData.followers}</p>
      <p>Public Repositories: {userData.public_repos}</p>
      <a
        href={userData.html_url}
        target="_blank"
        rel="noreferrer"
        className="github-link"
      >
        View GitHub Profile
      </a>
    </div>
  )}
</div>

  );
};

export default GithubUser;
