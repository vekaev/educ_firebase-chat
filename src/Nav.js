import React from 'react';
import useCollection from './hooks/useCollection'
import {Link} from "@reach/router";

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
                    <Link
                        key={channel.id}
                        to={`/channel/${channel.id}`}># {channel.id}</Link>
                ))}
            </nav>
        </div>
    );
}

export default Nav;
