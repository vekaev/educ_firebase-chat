import React from 'react';
import useCollection from './hooks/useCollection'

function Nav({user, handleSignOut}) {
    const channels = useCollection('channels');

    return (
        <div className="Nav">
            <div className="User">
                <img
                    className="UserImage"
                    alt="whatever"
                    src={user.photoUrl || '/logo192.png'}
                />
                <div>
                    <div>{user.displayName}</div>
                    <div>
                        <button onClick={handleSignOut} className="text-button">log out</button>
                    </div>
                </div>
            </div>
            <nav className="ChannelNav">
                {channels.map(channel => (
                    <a key={channel.id} href={`/channel/${channel.id}`}># {channel.id}</a>
                ))}
            </nav>
        </div>
    );
}

export default Nav;
