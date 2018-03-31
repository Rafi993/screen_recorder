import React, { Component } from 'react';
import './App.css'
import Icon from './icons'
const electron = window.require("electron")


class App extends Component {

  constructor(props) {
    super(props)

    this.windowMinimize = this.windowMinimize.bind(this)
    this.windowMaximize = this.windowMaximize.bind(this)
    this.windowClose    = this.windowClose.bind(this)
  }

  windowMinimize(){
    electron.remote.BrowserWindow.getFocusedWindow().minimize()
  }
  windowMaximize(){
    if(electron.remote.BrowserWindow.getFocusedWindow().isMaximized()) {
      electron.remote.BrowserWindow.getFocusedWindow().unmaximize()
    } else {
      electron.remote.BrowserWindow.getFocusedWindow().maximize()
    }
  }
  windowClose(){
    electron.remote.BrowserWindow.getFocusedWindow().close()
  }

  render() {
    return (
      <div className='App'>
        <div className='header'>
          <span onClick={this.windowMinimize}><Icon icon='minimize' iconClass='header-icon'></Icon></span>
          <span onClick={this.windowMaximize}><Icon icon='restore' iconClass='header-icon'></Icon></span>
          <span onClick={this.windowClose}><Icon icon='close' iconClass='header-icon'></Icon></span>
        </div>
      </div>
    );
  }
}

export default App;
