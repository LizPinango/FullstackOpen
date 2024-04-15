const Total = ({parts}) => {
  let total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <p>
        Total of exercises {total}
      </p>
    </div>
  )
}

export default Total