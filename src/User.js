import React from "react";
import UserInfo from "./UserInfo";

class User extends React.Component {
  constructor(props) {
    super(props);

    // neu khai bao bang arrow function thi ko can
    // this.hello = this.hello.bind(this)

    this.users = [
      {
        id: 1,
        name: "Nguyen Van A",
      },
      {
        id: 2,
        name: "Tran Van B",
      },
      {
        id: 3,
        name: "Phan Van C",
      },
    ];

    this.state = {
      name: "",
      courses: [],
    };
  }

  hello = (country) => {
    alert(
      `Welcome ${this.props.firstName} ${this.props.lastName} - ${country} to our website!`
    );
  };

  submitForm = () => {

  }

  change = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  componentDidMount = () => {
    fetch("http://127.0.0.1:8000/courses/").then((res) => res.json());
  };

  render() {
    return (
      <>
        <form onSubmit={this.submitForm}>
            <input type="text" value={this.state.name}  
            onChange={this.change} 
            placeholder="Nhap ten..." />
            <input type="submit" value="Submit" />
        </form>
        <h1>WELCOME {this.state.name} !!!</h1>
        <h2>E-COURSE</h2>
        <h3>
          Welcome {this.props.firstName} {this.props.lastName}
        </h3>
        <input
          type="button"
          value="Click me"
          onClick={() => this.hello("Vietname")}
        />
        <ul>
          {this.users.map((v) => (
            <UserInfo user={v} />
          ))}
        </ul>
      </>
    );
  }
}

export default User;
