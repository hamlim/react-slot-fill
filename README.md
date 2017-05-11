# React-Slot-Fill

React-Slot-Fill is a simple implementation of a component rendering pattern that is
developed to mimic web-component's `<slot name>` API.

This pattern was developed to avoid messy props-as-nodes components like this:

```Javascript
<CustomComponent
  someSpecialProp={
    <div>
      <p>Some other jsx here, potentially other components and things</p>
    </div>
  }
/>
```

Using React-Slot-Fill, the above example can become far more composable:

```Javascript
<CustomComponent>
  <Fill name="someSpecialProp">
    <div>
      <p>Some other jsx here, potentially other components and things</p>
    </div>
  </Fill>
</CustomComponent>
```

This above is a bit of a contrived example because if you only need to insert one thing into the CustomComponent, then `props.children` would be a far more suitable solution.


## How do I use this?

When designing your components, you can use `<Slot>` as a placeholder for whatever you want the implementor to render inside the component.

```Javascript
const MyCustomComponent = props => (
  <div>
    <p>some internal content not affected by `React-Slot-Fill`</p>
    <Slot as="name" />
    <p>Some more internal content</p>
  </div>
);
```

Where:

 * `<Slot>` accepts one prop `as` that is used to match it to a `<Fill>`



Then when you want to use your component you can do the following:

```Javascript
const MyApp = props => (
 <main>
   <p>some app content</p>
   <MyCustomComponent>
     <Fill name="as">
       <p>some content that will be inserted into the associated `<Slot>`</p>
     </Fill>
   </MyCustomComponent>
 </main>
)
```

### NOTES:

This is an extremely early API, there are plenty of untested edge cases. Feel free to browse through the Github issues for notes on things I plan on working on soon, or to post general questions.
