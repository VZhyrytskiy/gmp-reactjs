import React from "react";

export interface CounterProps {
  initialValue?: number;
}

interface CounterState {
  value: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);
    this.state = {
      value: props.initialValue || 0, 
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