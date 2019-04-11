import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Home from './home';

const App = () => (
    <Fragment>
        <main>
            <Route exact path="/" component={Home} />
        </main>
    </Fragment>
);

export default App;
