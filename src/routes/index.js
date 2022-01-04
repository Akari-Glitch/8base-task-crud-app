import { Route, Switch } from 'react-router-dom';

/* Import Components */
import { NavBar } from 'components';

/* Import Route Components */
import { Home } from './home';
import { AuthRoutes } from './auth';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/auth" component={AuthRoutes} />
      <Route>
        <div>
          <NavBar />
          <hr />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </Route>
    </Switch>
  );
};
