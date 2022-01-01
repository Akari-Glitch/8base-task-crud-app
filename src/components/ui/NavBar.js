import { Link } from 'react-router-dom';

import { AuthButton } from './AuthButton';

const NavBar = () => (
  <div id="nav">
    <h1>Task CRUD App</h1>
    <AuthButton />
  </div>
);

export { NavBar };
