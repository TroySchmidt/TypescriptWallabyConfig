import * as React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'semantic-ui-react';
// import Splitter from 'm-react-splitters';
// import SplitPane from '../../../react-split-pane/SplitPane';
import LoginContainer, { actions as loginActions } from '../../login';
import { Map } from '../../mapping';
import Sidebar from './Sidebar';
import Header from './Header';
import './App.css';

interface Props {
  onLogout: typeof loginActions.logout;
}
export class App extends React.PureComponent<Props, {}> {
  render() {
    return (
      <LoginContainer>
        <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
          <Sidebar />
          <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Header /> 
            <Map />
          </div>
        </div>
      </LoginContainer>
    );
  }
}

export default connect(
  () => ({}),
  {onLogout: loginActions.logout}
)(App);
