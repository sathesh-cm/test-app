import React from 'react';
import {ListGroupItem} from 'react-bootstrap';

class Item extends React.Component {
  render() {    

    return (
    <ListGroupItem> { this.props.ip }</ListGroupItem>
      
    )
  
}
}

Item.defaultProps = {
  id: '',
  ip: ''
};

export default Item;
