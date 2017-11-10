/**
* Container - short description of a component.
*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Container = ({ children }) => (
  <div>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {};

export default connect()(Container);
