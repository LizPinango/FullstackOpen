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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
    return counts;
  }, {});

  const authorWithMostBlogs = Object.keys(blogCounts).reduce((prevAuthor, currentAuthor) => {
    return blogCounts[prevAuthor] > blogCounts[currentAuthor] ? prevAuthor : currentAuthor;
  });

  return {
    author: authorWithMostBlogs,
    blogs: blogCounts[authorWithMostBlogs]
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likesCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes;      
    return counts
  }, {});
  
  const authorWithMostLikes = Object.keys(likesCounts).reduce((prevAuthor, currentAuthor) => {
    return likesCounts[prevAuthor] > likesCounts[currentAuthor] ? prevAuthor : currentAuthor;
  });

  return {
    author: authorWithMostLikes,
    likes: likesCounts[authorWithMostLikes]
  };
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}




