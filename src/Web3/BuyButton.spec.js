import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StorePage from '../Store/StorePage';
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';

Enzyme.configure({ adapter: new Adapter() });

const initialState = fromJS({
  priceInETH: 'open MetaMask for ',
  web3: {
    validNetwork: false,
    metamaskUnlocked: false,
    isMobile: true,
    isChrome: false,
    hasWeb3: false,
  },
  modal: {
    open: false,
    message: null,
  },
});


describe('>>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)',()=>{
  const mockStore = configureStore([thunk])
  let container;
  let store,wrapper
  
  it("displays the text 'Learn More' if Web3 is not found.", () => {
    store = mockStore(initialState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('#buy-btn').text()).toEqual('Learn More')
  });

  it("displays the text 'Learn More' if on a mobile device.", () => {
    let newState = initialState.setIn(['web3', 'hasWeb3'], true)
    store = mockStore(newState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('#buy-btn').text()).toEqual('Learn More')
  });

  it("displays the text 'How To Buy Album' if on not on Chrome.", () => {
    let newState = initialState
      .setIn(['web3', 'hasWeb3'], true)
      .setIn(['web3', 'isMobile'], false)
    store = mockStore(newState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('#buy-btn').text()).toEqual('How To Buy Album')
  });

  it("displays the text 'Buy Album' if MetaMask is not available.", () => {
    let newState = initialState
      .setIn(['web3', 'hasWeb3'], true)
      .setIn(['web3', 'isMobile'], false)
      .setIn(['web3', 'isChrome'], true)
    store = mockStore(newState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('#buy-btn').text()).toEqual('How To Buy Album')
  });

  it("displays the text 'Buy Album' everything is connected.", () => {
    let newState = initialState
      .setIn(['web3', 'hasWeb3'], true)
      .setIn(['web3', 'isMobile'], false)
      .setIn(['web3', 'isChrome'], true)
      .setIn(['web3', 'validNetwork'], true)
      .setIn(['web3', 'metamaskUnlocked'], true)
    store = mockStore(newState)
    container = mount( <Provider store={store}><StorePage /></Provider> )
    expect(container.find('#buy-btn').text()).toEqual('Buy Album')
  });

});