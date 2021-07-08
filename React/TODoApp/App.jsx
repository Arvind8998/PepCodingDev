class App extends React.Component {
  state = {
    taskData: [],
  }

  taskHandler = (value) => {
    let tempArr = this.state.taskData
    tempArr.push(value)
    this.setState({ taskData: tempArr })
  }

  taskRemoveHandler = (value) => {
    let filteredArr = this.state.taskData.filter((el) => el != value)
    this.setState({ taskData: filteredArr })
  }
  render() {
    return (
      <div>
        <Input taskHandler={this.taskHandler} />
        <List tasks={this.state.taskData} taskRemoveHandler={this.taskRemoveHandler} />
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.querySelector("#root")
)
