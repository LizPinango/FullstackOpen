const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0; 
  let mostLikesIndex = 0; 
  const length = blogs.length;
  for (let i = 0; i<length; i++){       
    if(mostLikes<blogs[i].likes){      
      mostLikes = blogs[i].likes;
      mostLikesIndex = i;
    }
  }

  return blogs[mostLikesIndex];
}
  
module.exports = {
  dummy, totalLikes, favoriteBlog
}




