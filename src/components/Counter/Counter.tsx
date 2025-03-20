import React from "react";

interface CounterProps {
  [index: string]: unknown;
}

interface CounterState {
  value: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  initialValue: number = 0;
  
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      value: this.initialValue, 
    };
  }

  increment = () => {
    this.setState((prevState) => ({
      value: prevState.value + 1,
    }));
  };

  decrement = () => {
    this.setState((prevState) => ({
      value: prevState.value - 1,
    }));
  };

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement("h1", null, `Value: ${this.state.value}`),
      React.createElement(
        "button",
        { onClick: this.decrement },
        "Decrement"
      ),
      React.createElement(
        "button",
        { onClick: this.increment},
        "Increment"
      )
    );
  }
}

export default Counter;