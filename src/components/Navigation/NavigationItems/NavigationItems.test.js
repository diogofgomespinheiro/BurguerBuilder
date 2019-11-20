import React from "react";
import { NavLink } from "react-router-dom";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  }); 

  it('should render two li elements if not authenticated',() => {
    expect(wrapper.find('li')).toHaveLength(2);
  });

  it('should render tree li elements if authenticated',() => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find('li')).toHaveLength(3);
  });

  it('should render Logout <NavigatioItem /> elements if authenticated',() => {
    wrapper.setProps({isAuthenticated: true});

    expect(wrapper.contains(<li><NavLink to="/logout">Logout</NavLink></li>)).toBe(true);
  });
});