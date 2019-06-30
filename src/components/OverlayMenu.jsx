// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';

// Styles
import { Overlay } from './styles/OverlayMenuStyles';

// Assets
import WhiteLogo from '../images/tango_logo_white.svg';
import CloseButton from '../images/tango_close_button.svg';

const OverlayMenu = ({ menuOpen, callback }) => {
  const { menu: { edges: [{ node: menu }] } } = useStaticQuery(
    graphql`
    query OverlayMenu {
      menu: allWordpressWpApiMenusMenusItems(filter: {wordpress_id: {eq: 5}}) {
        totalCount
        edges {
          node {
            items {
              title
              url
              wordpress_id
            }
          }
        }
      }
    }
    `
  );

  return (
    <Overlay menuOpen={menuOpen}>
      <div className="inner">
        <img className="whiteLogo" src={WhiteLogo} alt="tango-white-logo" />
        <ul className="overlayMenu">
          {menu.items.map((item) => (
            <li key={item.wordpress_id}>
              <Link to={item.url} activeClassName="overlayActive">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="closeButton" onClick={callback} role="button" tabIndex="0" onKeyDown={callback}>
          <img src={CloseButton} alt="tango-close-button" />
        </div>
      </div>
    </Overlay>
  );
};

OverlayMenu.propTypes = {
  menuOpen: PropTypes.bool,
  callback: PropTypes.func
};

export default OverlayMenu;
