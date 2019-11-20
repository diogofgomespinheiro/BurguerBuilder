import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//propsimport asyncComponent from "./hoc/asyncComponent/asyncComponent";

import BurguerBuilder from "./containers/BurguerBuilder/BurguerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
// import Checkout from "./containers/Checkout/Checkout";

// const Checkout = asyncComponent(() => {
//   return import("./containers/Checkout/Checkout");
// })

const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));
const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));

const Routes = props => {
  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>}/>
      <Route path="/" exact component={BurguerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurguerBuilder} />
        <Route path="/checkout" render={(props) => <Checkout {...props}/>}/>
        <Route path="/orders" render={(props) => <Orders {...props}/>}/>
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>);
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Routes);
