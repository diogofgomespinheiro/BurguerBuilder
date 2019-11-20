import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurguerBuilder } from "./BurguerBuilder";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";

configure({adapter: new Adapter()});

describe('<BurguerBuilder />', () => {  
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurguerBuilder onInitIngredients={() =>{}} onInitPurchase={() =>{}}/>);
  })

  it('should render BuildControls when receiving ingredients', () => {
    wrapper.setProps({ingredients: {salad: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })

});