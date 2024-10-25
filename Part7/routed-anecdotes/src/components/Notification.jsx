const Notification = ({ notification }) => {
  if (notification === null) {    
    return null
  } 
  
  return(
    <div className='notification'>
      <p>{notification}</p>
    </div>
  )
}

export default Notification