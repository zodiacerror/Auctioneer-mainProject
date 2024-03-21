import { Box } from "@mui/material";
import Post from "../post/Post";
import "./posts.scss";

const Posts = ({ rows }) => {

  return (
    <Box className="posts">
      {
        rows.map((post, key) => (
          <Post post={post} key={key} />
        ))
      }
    </Box>
  );
};

export default Posts;