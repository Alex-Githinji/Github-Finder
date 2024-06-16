import React, { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { RiGitRepositoryFill, RiStarSFill } from 'react-icons/ri';
import { IoIosPeople } from 'react-icons/io';
import { GoRepoForked } from 'react-icons/go';
i

const Header = () => {
    const [username, setUsername] = useState('Github');
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchGitProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setProfile(null);
        setRepos([]);
        setFollowers([]);
        setFollowing([]);

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error(`User not found: ${response.statusText}`);
            }
            const data = await response.json();
            setProfile(data);

            const [reposResponse, followersResponse, followingResponse] = await Promise.all([
                fetch(`https://api.github.com/users/${username}/repos`),
                fetch(`https://api.github.com/users/${username}/followers`),
                fetch(`https://api.github.com/users/${username}/following`)
            ]);

            if (!reposResponse.ok || !followersResponse.ok || !followingResponse.ok) {
                throw new Error('Error fetching additional data');
            }

            const reposData = await reposResponse.json();
            const followersData = await followersResponse.json();
            const followingData = await followingResponse.json();

            setRepos(reposData);
            setFollowers(followersData);
            setFollowing(followingData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="header-info">
                <div className="header">
                    <div className="logo">
                        <h2>GITHUB FINDER</h2>
                    </div>
                    <div className="link">
                        <p> By <a href="http://github.com/Alex-Githinji">Alex Githinji</a></p>
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
                <div className="section">
                    <div className="hero">
                        {loading && <p>Loading...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {profile && (
                            <div>
                                <img src={profile.avatar_url} alt="Profile Avatar" width={100} />
                                <p><strong>Bio:</strong> {profile.bio}</p>
                                <button><a href={profile.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a></button>
                                <p><strong><CiLocationOn /></strong> {profile.location}</p>
                                <p><strong><RiGitRepositoryFill /></strong> {profile.public_repos} repositories</p>
                                <p><strong><IoIosPeople /></strong> {profile.followers} followers</p>
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
                                        <li key={repo.id}>
                                            <h3>{repo.name}</h3>
                                            <p>{repo.description}</p>
                                            <p><GoRepoForked /> {repo.forks_count} forks</p>
                                            <p><RiStarSFill /> {repo.stargazers_count} stars</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="content">
                        {followers.length > 0 && (
                            <div>
                                <h2>Followers</h2>
                                <ul>
                                    {followers.map(follower => (
                                        <li key={follower.id}>
                                            <img src={follower.avatar_url} alt={follower.login} width={50} />
                                            <p>{follower.login}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="content">
                        {following.length > 0 && (
                            <div>
                                <h2>Following</h2>
                                <ul>
                                    {following.map(following => (
                                        <li key={following.id}>
                                            <img src={following.avatar_url} alt={following.login} width={50} />
                                            <p>{following.login}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
