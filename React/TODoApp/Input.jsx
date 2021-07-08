class Input extends React.Component {
  state = { task: "" }

  handleInput = (e) => {
    this.setState(() => {
      return { task: e.target.value }
    })
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleInput}
          value={this.state.task}
        ></input>
        <button
          onClick={() => {
            this.props.taskHandler(this.state.task)
          }}
        >
          Submit
        </button>
      </div>
    )
  }
}
