import React from 'react'
import Enzyme, { shallow }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Icon  from '../icons'

describe('Icon component', ()=>{
  it('Should be defined', ()=>{
    expect(Icon).toBeDefined();
  })

  it('It should return "minimize" icon', ()=>{
    const tree = shallow(
      <Icon icon="minimize" iconClass="header-icon" />
    )
  })

  it('It should return "restore" icon', ()=>{
    const tree = shallow(
      <Icon icon="restore" iconClass="header-icon" />
    )
  })

  it('It should return "close" icon', ()=>{
    const tree = shallow(
      <Icon icon="close" iconClass="header-icon" />
    )
  })

})