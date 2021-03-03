import React from 'react';

function ChannelInfo() {
    return (
        <div className="ChannelInfo">
            <div className="Topic">
                Topic: <input className="TopicInput" value="Awesome stuff" onChange={() => {
            }}/>
            </div>
            <div className="ChannelName">#general</div>
        </div>
    );
}

export default ChannelInfo;
