// import logo from './logo.svg';
import './App.css';
import React from 'react'; // , {useState}
// import Home from './Home';
import Lesson from './Lesson';
import CourseLesson from './CourseLesson';
import Header from './Header';
import Body from './Body';
import Register from './Register';
import Login from './Login';
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Logout from './Logout';
// import API, { endpoints } from './API';
// import cookies from 'react-cookies';
// import { useDispatch } from 'react-redux';

export let UserContext = React.createContext()
export default function App(props) {
  // const [user, setUser] = useState(null)
  // const dispatch = useDispatch()

  // const login = async (username, password) => {
  //   let res = await API.post(endpoints['login'], {
  //     'client_id': 'IJ4WjH3X3UPu8ydIbAsnOC8W5RbPnfLDxmn90SqO',
  //     'client_secret': 'fM6Yl7Cs1bxE3VJC2SwUtRLW1DqHsLwMyZjrcjPhg5KPy4CGdrgHlare80z5cAuYOaS9IACFiwn3HRJPkUhd6v7qNRRlazrLT4RN6RtAHc239iIt7eIeV7YMvjaiII2d',
  //     'username': username,
  //     'password': password,
  //     'grant_type': 'password'
  //   });
  //   console.log(res.data);

  //   cookies.save("access_token", res.data.access_token);

  //   let user = await API.get(endpoints['current-user'], {
  //     headers: {
  //       'Authorization': `Bearer ${cookies.load('access_token')}`
  //     }
  //   })
  //   console.info(user.data);
  //   cookies.save("user", user.data)

  //   dispatch({
  //     "type": "login",
  //     "payload": user.data
  //   })

  //   setUser(user)
  // }

  return (
    // <UserContext.Provider value={{ user, login }}>
      <BrowserRouter>
        <Container>
          <Header />
          <Switch>
            <Route exact path="/" component={Body} />
            <Route exact path="/lesson" component={Lesson} />
            <Route exact path="/course/:courseId/lessons" component={CourseLesson} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
        </Container>
      </BrowserRouter>
    // </UserContext.Provider>
  )
}