// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import Home from './Home';
import Lesson from './Lesson';
import CourseLesson from './CourseLesson';
import Header from './Header';
import Body from './Body';
import Register from './Register';
import Login from './Login';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Header />
          <Switch>
            <Route exact path="/" component={Body} />
            <Route exact path="/lesson" component={Lesson} />
            <Route exact path="/course/:courseId/lessons" component={CourseLesson} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Container>
      </BrowserRouter>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
