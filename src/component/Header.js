import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="header-Head">
        <div className="header-Wrapper clearfix">
          {/* name not sure */}
          <ul>
            <li>
              <Link to={'/dashboard'}>DASHBOARD</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
