//@flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

type TypeUser = {
  name: string;
  img: string;
};

type TypeUsers = Array<TypeUser>;

class Root extends Component {
  state: {
    users: TypeUsers
  };

  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentWillMount() {
    fetch('https://api.github.com/users')
    .then(r => {
      return r.json();
    })
    .then(r => {
      const users = r.map((u) => {
        return { name: u.login, img: u.avatar_url }
      });
      this.setState({users});
    })
    .catch(e=> console.log(e))
  }

  render() {
    return <Users users={this.state.users} />
  }
}

class Users extends Component {
  props: {
    users: TypeUsers
  };

  static defaultProps = {
    users: []
  };

  constructor() {
    super()
  }
  render() {
    return <ul>{this.props.users.map((user, i)=> <User key={i} user={user}/>)}</ul>
  }
}

class User extends Component {
  props: {
    user: TypeUser;
  };

  static defaultProps = {
    user: { name: '', img: '' }
  };

  constructor() {
    super()
  }

  render() {
    const { user } = this.props;
    return (
      <li>
        <a href={`https://github.com/${user.name}`}><img src={user.img} alt={user.name} /></a>
        {user.name}
      </li>
    )
  }
}

ReactDOM.render(<Root />, document.querySelector('#root'));
