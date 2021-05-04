import MainPage from '../pages/MainPage';
import SecondPage from '../pages/SecondPage';

const routes = [
  {
    path: "/",
    exact: true,
    component: MainPage
  },
  {
    path: "/character/:id",
    component: SecondPage
  }
];

export default routes;
