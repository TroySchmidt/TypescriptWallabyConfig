import * as React from 'react';
import { connect } from 'react-redux';
// import { Resizable } from 'react-resizable';
import { Image } from 'semantic-ui-react';
import * as constants from '../../../utilities/constants';

const logo = require('./logo.png');

export class Header extends React.PureComponent {
  render() {
    return (
      <div 
        style={{
          flex: '0 0 auto',
          height: 90,
          backgroundColor: constants.REGAL_BLUE,
        }}
      >
        <Image height={80} src={logo} floated="right" verticalAlign="middle"/>
      </div>
    );
  }
}

export default connect((state) => ({

}),
{

})(Header);