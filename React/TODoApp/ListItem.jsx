function ListItem(props) {
  const { item, taskRemoveHandler } = props
  return (
    <div>
      <span> {item}</span>
      <button onClick={()=>taskRemoveHandler(item)}> x</button>
    </div>
  )
}
