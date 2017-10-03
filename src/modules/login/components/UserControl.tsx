import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as constants from '../../../utilities/constants';
import * as actions from '../actions';

interface State {

}
interface Actions {
  onLogout: typeof actions.logout;
}
export class UserControl extends React.PureComponent<State & Actions, {}> {
  render() {
    const { onLogout } = this.props;

    return(
      <div style={{padding: 5, position: 'relative', height: 200, backgroundColor: constants.REGAL_BLUE}}>
        <Button style={{position: 'absolute', bottom: 10}} onClick={onLogout}>Logout</Button>
      </div>
    );
  }
}

/* ignore code coverage */
export default connect(() => ({

}),
{
  onLogout: actions.logout,
})(UserControl);
