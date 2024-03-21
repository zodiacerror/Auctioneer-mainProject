import Post from "../post/Post";
import "./posts.scss";

const Posts = ({rowLot}) => {
 


  
  return <div className="posts">
    {rowLot && rowLot.map((post,key)=>(
      <Post post={post} key={key}/>
    ))}
  </div>;
};

export default Posts;