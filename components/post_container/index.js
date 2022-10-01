import Post_card from "./post"
const Post_container = (posts) => {
  return (
    <div>
      {posts.posts? posts.posts.map((post) => {
        return <div className="mt-3">
       <Post_card post={post} />
       </div>
      }):
      <></>}
    </div>
  )
}
export default Post_container