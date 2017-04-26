import React from 'react';
import Item from './Item';
import {ListGroup} from 'react-bootstrap';

class ListComp extends React.Component {

  render() {
  console.log("ITEMS:",this.props.items);
    const items = this.props.items.map((item, i) => {
        return (
          <Item
            key={item.id}
            ip={item.ip}
            />
        );
      });

    return (
      <ListGroup>
        { items }
      </ListGroup>
    );
  }
}

ListComp.defaultProps = {
  items: []
};

export default ListComp;
