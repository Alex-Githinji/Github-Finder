import React from 'react'
import "./hero.css";
import { Link } from 'react-router-dom';
import react , {useState} from 'react'
import Followers from './userDetails/Followers'
import Following from './userDetails/Following'
import Picture from './userDetails/Picture'
import repository from './userDetails/Repository'



const Hero = () => {
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
       

        
         
      );
  };
  


export default Hero




