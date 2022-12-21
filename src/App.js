import './App.css';
import './firebase';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Header from './components/header';
import Footer from './components/footer';
// import Blog from './components/blog';
import Blogs from './pages/blogs';
import Journey from './pages/journey';
import Alerts from './pages/alerts';
import Admin_portal from './pages/admin';
import Emaillist from './pages/email_list';
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {

  AOS.init();

  return (
    <BrowserRouter>

    <Header/>

    <Switch>

      <Route exact path="/" component={Home} />
      {/* <Route path="/blogs:id" component={Blog} /> */}
      <Route path="/blogs" component={Blogs} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/admin" component={Admin_portal} />
      <Route path="/journey" component={Journey} />
      <Route path="/emaillist" component={Emaillist} />

    </Switch>

    <Footer />

    </BrowserRouter>
  );
}

export default App;
