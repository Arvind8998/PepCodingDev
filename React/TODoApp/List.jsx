function List(props) {
  const { tasks, taskRemoveHandler } = props
  return (
    <ul>
      {tasks.map((el, idx) => (
        <ListItem key={idx + "idx"} taskRemoveHandler={taskRemoveHandler} item={el} />
      ))}
    </ul>
  )
}
