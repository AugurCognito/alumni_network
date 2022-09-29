const Post_card = (post) => {
    console.log(">>>", post)
    return (
        <div>
            
            {post.post ? <>{JSON.stringify( post.post)}</> :
                <></>}
        </div>
    )
}

export default Post_card