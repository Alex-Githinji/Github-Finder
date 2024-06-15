import React, { useState } from 'react';
import './header.css'
import { IoIosPeople } from "react-icons/io";
import { RiGitRepositoryFill } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";


const Header = () => {
  const [username, setUsername] = useState('Github');
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
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

    const fetchRepository = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      setProfile(null);
      setRepos([]); // Reset repos state

      try {
          const responserepos = await fetch(`https://api.github.com/users/${username}/repos`);
          if (!responserepos.ok) {
              throw new Error(`User not found: ${responserepos.statusText}`);
          }
          const datarepos = await responserepos.json();
          setRepos(datarepos);
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
                   
                      <img src={profile.avatar_url} alt="Profile Avatar" width={100} />
                      <p><strong>Bio:</strong> {profile.bio}</p>
                      <p><strong><CiLocationOn /></strong> {profile.location}</p>
                      <p><strong><RiGitRepositoryFill /></strong> {profile.public_repos} repository</p>
                      <p><strong><IoIosPeople/></strong> {profile.followers} followers</p>
                      <p><strong><IoIosPeople /></strong> {profile.following} Following</p>
                     
                  </div>
              )}
              
          </div>
          <div className="content">
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {repos.length > 0 && (
                    <div>
                        <h2>Repositories</h2>
                        <ul>
                            {repos.map(repo => (
                                <li key={repo.id}>{repo.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
       
          
        </div>

        
        
        </>
    );

  }
  

export default Header;
