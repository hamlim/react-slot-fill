import React, { Component } from 'react';

export const withSlots = WrappedComponent => {
  return class withSlots extends Component {
    constructor() {
      super();
      // We need the wrapped component to be a functional Component
      // this method below just refactors classes into functions, and
      // stores the new WrappedComponent as this.NewWrappedComponent
      try {
        WrappedComponent();
        this.NewWrappedComponent = WrappedComponent;
      } catch (e) {
        const {
          props,
          context
        } = this;
        this.NewWrappedComponent = (props, context) => WrappedComponent.prototype.render();
      }
    }
    // store an array of slots inside of WrappedComponent
    slots = []
    // store an array of fills inside of the withSlots component
    fills = []
    // store an array of the new children to insert into the WrappedComponent
    wrappedChildren = [];
    render() {
      // Get slots/other children
      React.Children.map(this.props.children, (child, index) => {
        if (child.type === Slot) {
          if (!child.props.as) {
            throw new Error('Make sure to pass in a `name` prop to each Fill Component');
          }
          this.slots.push(child);
        }
      });
      const originalChildren = this.NewWrappedComponent().props.children;
      if (typeof originalChildren !== 'object') {
        throw new Error('Make sure to pass in at least one `Fill` into your original component');
      }
      this.wrappedChildren = originalChildren.reduce((newChildren, child) => {
        if (child.type === Fill) {
          if (!child.props.name) {
            throw new Error('Make sure to pass in the `as` prop to each Slot Component');
          }
          this.fills.push(child);
          const selectedSlot = this.slots.filter(slot => slot.props.as === child.props.name);
          if (selectedSlot.length) {
            newChildren.push(selectedSlot[0].props.children);
          } else {
            throw new Error('Failed to find slot with valid as prop');
          }
        } else {
          newChildren.push(child);
        }
        return newChildren;
      }, this.wrappedChildren)
      const WrapperElement = this.NewWrappedComponent().type;
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
  }
};
