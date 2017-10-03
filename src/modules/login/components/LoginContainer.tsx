import * as React from 'react';
import { connect } from 'react-redux';
import { Image, Loader, Message } from 'semantic-ui-react';
import { login, logout } from '../actions';

const loginImage = require('./LoginImage.png');

interface StateProps {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    exception?: Error;
}

interface DispatchProps {
  onLogin: Function;
  onLogout: Function;
}

export class LoginContainer extends React.PureComponent<StateProps & DispatchProps, {}> {
  componentDidMount() {
    this.props.onLogin();
  }

  renderApplication() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        {this.props.children}
      </div>
    );
  }

  renderLoggingIn() {
    const { exception, isLoggingIn } = this.props;
    let message = 'Logging in...';
    if (!isLoggingIn) {
      message = 'Getting user details...';
    }
    if (exception) {
      if (!exception.message) {
        message = exception.message;
      } else {
        message = 'WebAPI possibly down.  Try refreshing.';
      }
    }

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
          <Loader active={!exception} style={{ fontSize: '3em', top: '0.89em' }} />
          <Image
            centered={true}
            src={loginImage}
            alt="Web Application"
            style={{ zIndex: 99 }}
          />
          <Message
            style={{ textAlign: 'center', border: 'none', background: 'none', boxShadow: 'none' }}
            error={!!exception}
            header={
              (exception)
              ? 'Unable to connect to If the problem persists, please contact the site administrator.'
              : null}
            content={message}
          />
        </div>
    );
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.renderApplication();
    }
    return this.renderLoggingIn();
  }
}

const mapStateToLoginProps = (state) => ({
  ...state.currentUser,
});

export default connect(
  mapStateToLoginProps,
  { onLogin: login, onLogout: logout },
)(LoginContainer);
