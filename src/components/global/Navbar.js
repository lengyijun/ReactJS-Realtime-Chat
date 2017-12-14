/**
 * Author:Saurabh Mhatre
 * @file:Appbar
 *
 * File to handle navigation among various app components from top
 * navbar
 */
import React, {Component} from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
export default class Appbar extends Component {
  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              Simple Chat App
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#">Group Chat</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}
