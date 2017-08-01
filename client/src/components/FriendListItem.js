import React, { Component } from 'react'
import { List, Image, Icon } from 'semantic-ui-react'

class FriendListItem extends Component {
    constructor(props) {
      super (props)

      if (!this.props.profiles[this.props.friend.friend_id]) {
        this.props.getProfile(this.props.friend.friend_id)
      }

      this.removeFriend = this.removeFriend.bind(this)
      this.status = this.status.bind(this)
      this.actions = this.actions.bind(this)
      this.messageFriend = this.messageFriend.bind(this)
    }

    status () {
      if (this.props.friend.status === 'Accepted') {
        return <a onClick={this.removeFriend}>Remove</a>
      } else if (this.props.friend.status === 'Pending') {
        return <a onClick={this.acceptFriend}>Accept</a>
      } else if (this.props.friend.status === 'Waiting Approval') {
        return <span>Waiting Approval</span>
      }
    }

    actions() {
      if (this.props.friend.status === 'Accepted') {
        return <a onClick={this.messageFriend}>Message</a>
      } 
    }

    // status () {
    //   if (this.props.friend.status === 'Accepted') {
    //     return <a onClick={this.removeFriend}>Remove</a>
    //   } else if (this.props.friend.status === 'Pending') {
    //     return <a onClick={this.acceptFriend}>Accept</a>
    //   } else {
    //     return <span>Waiting Approval</span>
    //   }
    // }

    removeFriend () {
      let userId = this.props.friend.user_id 
      let friendId = this.props.friend.friend_id
      this.props.actionFunc(userId, friendId, this.props.index)
    }

    messageFriend() {
      if (this.props.directs[this.props.friend.friend_id]) {
        //Direct Message exists
        console.log('In friendlistitem', this.props.directs[this.props.friend.friend_id].channel_id)
        this.props.selectChannel(this.props.channels[this.props.directs[this.props.friend.friend_id].channel_id])
        //this.props.setChannel(this.props.direct[this.props.friend.friend_id].channel_id)
      } else {
        this.props.addDirectChannel(this.props.friend.user_id, this.props.friend.friend_id)
      }
    }

    componentWillMount() {

    }

    render () {
      return (
        <List.Item>
          <List.Content floated='right'>
            {this.status()}
          </List.Content>
          <List.Content floated='left' verticalAlign='top'>
            <Image avatar src={this.props.profiles[this.props.friend.friend_id].image} alt='p' />
          </List.Content>
          <List.Content floated='left' verticalAlign='top'>  
            <List.Header>{this.props.profiles[this.props.friend.friend_id].display} </List.Header>
            <List.Description>
              {this.actions()} 
            </List.Description> 
          </List.Content>    
        </List.Item>
      );
    }
}

export default FriendListItem;