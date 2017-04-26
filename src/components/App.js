import React, { Component } from 'react';
import io from 'socket.io-client';
import config from '../config';
import '../style/App.css';
import {Navbar,Panel,Jumbotron } from 'react-bootstrap';
import ListComp from './ListComp';

class App extends Component {
 socket = {};
 store={};
 constructor(props) {
    super(props);
    let self=this;
    this.state = {items:[]};
    //setup socket connection
    this.socket = io(config.socserv).connect();
    this.socket.on('connect', function(){    
       self.store.id=this.id;      
    });
    //on message from server check if add or remove
    //-and call necessary method accordingly
    this.socket.on('server:message', message => {    
        if(message.action==='add'){
            //call addItemHandler to add the connected users ip
            if(message.id===self.store.id){
                message.ip="Me: "+message.ip;
            }
            self.addItemHandler(message);
        }
        if(message.action==='remove'){
            //call removeItemHandler to remove the disconnected users ip
            self.removeItemHandler(message);
        }
    });
  }
  //method to add user ip to list view
  addItemHandler(item){
    var newItems=this.state.items;
    newItems.push(item);
    this.setState({items:newItems});
  }
  //method to remove user ip from list view
  removeItemHandler(item){  
    this.setState({
        items: this.state.items.filter(function (e, i) {
        return e.id !== item.id;
      })
    });
  }
  render() {
    
    return (       
        <div>
        <Navbar inverse fixedTop>
         
            <Navbar.Header>
              <Navbar.Brand>
                <a>User IP Log</a>
              </Navbar.Brand>
              
            </Navbar.Header>
          
        </Navbar>
        <Jumbotron style={{backgroundColor:'white'}}>
          <Panel>
              <ListComp items={this.state.items}/>      
          </Panel>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
