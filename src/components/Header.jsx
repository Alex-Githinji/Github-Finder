import React, { useState } from 'react';
import './header.css'

const Header = () => {
  const [username, setUsername] = useState('Github');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchGitProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setProfile(null);

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error(`User not found: ${response.statusText}`);
            }
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
      <>
      <div className='header-info'>
        <div className="header">

            <div className="logo">
                <h2>GITHUB FINDER</h2>
            </div>
            <div className="link">
                <p> By<a href="http://github.com/Alex-Githinji">  Alex Githinji</a></p>
            </div>
            <form className="item" onSubmit={fetchGitProfile}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter a username"
                />
                <button type="submit">Search</button>
            </form>

            </div>

            <div className="hero">
              {loading && <p>Loading...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {profile && (
                  <div >
                      <h2>{profile.name}</h2>
                      <img src={profile.avatar_url} alt="Profile Avatar" width={100} />
                      <p><strong>Bio:</strong> {profile.bio}</p>
                      <p><strong>Location:</strong> {profile.location}</p>
                      <p><strong>Public Repos:</strong> {profile.public_repos}</p>
                      <p><strong>Followers:</strong> {profile.followers}</p>
                      <p><strong>Following:</strong> {profile.following}</p>
                      <p><strong>Profile URL:</strong> <a href={profile.html_url} target="_blank" rel="noopener noreferrer">{profile.html_url}</a></p>
                  </div>
              )}
              
          </div>
       
          
        </div>

        
        
        </>
    );
};

export default Header;
