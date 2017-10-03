import * as React from 'react';
import { connect } from 'react-redux';
import { ResizableBox } from 'react-resizable';
import { Menu } from 'semantic-ui-react';
import { UserControl } from '../../login';

export class Sidebar extends React.PureComponent {
  render() {
    return (
      <ResizableBox width={300} height={Infinity} axis="x" style={{textAlign: 'center'}}>
        <UserControl />
        <Menu borderless={true} vertical={true}>
          <Menu.Item name="inbox" content="Inbox"/>
          <Menu.Item name="outbox" content="Outbox"/>
        </Menu>
      </ResizableBox>
    );
  }
}

export default connect((state) => ({

}),
{

})(Sidebar);