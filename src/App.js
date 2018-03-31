import React, { Component } from 'react';
import './App.css';
import Icon from './icons';

const electron = window.require('electron');


class App extends Component {
  static windowMinimize() {
    electron.remote.BrowserWindow.getFocusedWindow().minimize();
  }
  static windowMaximize() {
    if (electron.remote.BrowserWindow.getFocusedWindow().isMaximized()) {
      electron.remote.BrowserWindow.getFocusedWindow().unmaximize();
    } else {
      electron.remote.BrowserWindow.getFocusedWindow().maximize();
    }
  }
  static windowClose() {
    electron.remote.BrowserWindow.getFocusedWindow().close();
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <span onClick={App.windowMinimize} role="presentation">
            <Icon icon="minimize" iconClass="header-icon" />
          </span>
          <span onClick={App.windowMaximize} role="presentation">
            <Icon icon="restore" iconClass="header-icon" />
          </span>
          <span onClick={App.windowClose} role="presentation">
            <Icon icon="close" iconClass="header-icon" />
          </span>
        </div>
      </div>
    );
  }
}

export default App;
