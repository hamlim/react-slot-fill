import React, {Component} from 'react';

const PageWrapper = props => (
  <main>
    <header className="Header">
      <Fill name="Header" />
    </header>
    <aside className="Sidebar">
      <Fill name="Sidebar" />
    </aside>
    <section className="Main">
      {props.children}
    </section>
  </main>
);


const NewPage = props => (
  <PageWrapper>
    <Slot as="Header">
      <h1>Page Title</h1>
    </Slot>
    <Slot as="Sidebar">
      <h2>Sidebar</h2>
    </Slot>
    Main content
  </PageWrapper>
)
