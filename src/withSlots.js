import React, { Component } from 'react';

export const withSlots = WrappedComponent => class withSlots extends Component {
  state = {
    // store an array of slots inside of WrappedComponent
    slots: [],
    // store an array of fills inside of the withSlots component
    fills: [],
    // Store an array of floating children with the withSlots Component
    // @NOTE This doesn't do anything as of this moment, might remove it
    // because the preference with this pattern should be setting up the InternalComponent
    // to use Fills
    regularChildren: []
  }
  wrappedChildren = [];
  render() {
    // Get slots/other children
    React.Children.map(this.props.children, (child, index) => {
      if (child.type === Fill) {
        if (!child.props.name) {
          throw new Error('Make sure to pass in a `name` prop to each Fill Component');
        }
        // avoiding setState for now
        this.state = {
          ...this.state,
          fills: [
            ...this.state.fills,
            child
          ]
        };
      } else {
        // don't allow this, but we collect it anyway
        this.state = {
          ...this.state,
          regularChildren: [
            ...this.state.regularChildren,
            child
          ]
        };
      }
    });
    const originalChildren = WrappedComponent().props.children;
    this.wrappedChildren = originalChildren.reduce((newChildren, child) => {
      if (child.type === Slot) {
        if (!child.props.as) {
          throw new Error('Make sure to pass in the `as` prop to each Slot Component');
        }
        this.state = {
          ...this.state,
          slots: [
            ...this.state.slots,
            child
          ]
        };
        let selectedFill = this.state.fills.filter(fill => fill.props.name === child.props.as);
        if (selectedFill.length) {
          newChildren.push(selectedFill[0].props.children);
        } else {
          throw new Error('Failed to find slot with valid as prop');
        }
      } else {
        newChildren.push(child);
      }
      return newChildren;
    }, this.wrappedChildren)
    const WrapperElement = WrappedComponent().type;
    if (this.wrappedChildren.length > 0) {
      return (
        <WrapperElement {...this.props}>
          {this.wrappedChildren}
        </WrapperElement>
      )
    } else {
      return null;
    }
  }
};
