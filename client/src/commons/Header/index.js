import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

import './index.css';

export const Header = () => {
  const [state, setState] = useState({});

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const { activeItem } = state;

  return (
    <Menu>
      <Menu.Item header name='Portfolio' />
      <Menu.Item
        name='aboutUs'
        active={activeItem === 'aboutUs'}
        onClick={handleItemClick}
        style={{ marginLeft: 'auto' }}
      />
      <Menu.Item
        name='jobs'
        active={activeItem === 'jobs'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name='locations'
        active={activeItem === 'locations'}
        onClick={handleItemClick}
      />
    </Menu>
  );
};
