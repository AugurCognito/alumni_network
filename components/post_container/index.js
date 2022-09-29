import Post_card from "./post"
const Post_container = (posts) => {
  console.log(">", posts)
  return (
    <div>
      abc
      {posts.posts? posts.posts.map((post) => {
        return <div>
       <Post_card post={post} />
       </div>
      }):
      <></>}
    </div>
  )
}
export default Post_container