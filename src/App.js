import React from 'react';
import Nav from './Nav';
import Channel from './Channel';

import {useAuth} from "./hooks/useAuth";

function App() {
    const { user, authError, handleSignIn, handleSignOut } = useAuth();

    if (user === 'loading') return <div className="Login"><h1>Authentication...</h1></div>

    return user ? (
        <div className="App">
            <Nav user={user} handleSignOut={handleSignOut}/>
            <Channel/>
        </div>
    ) : (
        <div className="Login">
            <h1>Chat!</h1>
            <button onClick={handleSignIn}>Sign in with Google</button>
            {authError && (
                <div>
                    <p>Ohhhh.... Something went wrong</p>
                    <p><i>{authError.message}</i></p>
                    <p>Please try again</p>
                </div>
            )}
        </div>
    )
}

export default App;
