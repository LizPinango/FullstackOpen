const Part = ({part}) => {  
  return (
    <>
      <li>
        <p>{part.name} - exercises: {part.exercises}</p>
      </li>
    </>
  )
}

export default Part