const Post_card = (post) => {
    console.log(">>>", post)
    return (
        <div>

            {!post.post ? <>Loading!!!</> :
                <>
                    <div className="post-container flex justify-center">
                        <div class=" rounded overflow-hidden border w-full mx-auto lg:w-6/12 md:w-6/12 bg-white md:mx-0 lg:mx-0">
                            <div class="w-full flex justify-between p-3">
                                <div class="flex">
                                    <div class="rounded-full h-12 w-12 bg-gray-500 flex items-center justify-center overflow-hidden my-auto">
                                        {!post.post.profiles.avatar ? <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg> :
                                            <img src={`https://hhwsjrpyfypmiacusavr.supabase.co/storage/v1/object/public/${post.post.profiles.avatar}`} height="200" width="200" alt="user profile image" className="rounded-full" />
                                        }
                                    </div>

                                    <div className='flex flex-col'>
                                        <span class="pt-1 ml-2 font-bold text-black">
                                            {post.post.profiles.first_name ? <>{[post.post.profiles.first_name, post.post.profiles.last_name].filter(Boolean).join(" ")}</> : <>{post.post.profiles.email}</>}
                                        </span>
                                        <span className='ml-2 text-gray-700'>{post.post.company.name}</span>
                                    </div>
                                </div>

                            </div>
                            <img class="w-full bg-cover" src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG" />
                            <div class="px-3 pb-2">
                                <div class="pt-2 flex flex-col">
                                    <span>
                                        {(new Date(post.post.created_at).toLocaleString())}
                                    </span>
                                    <i class="far fa-heart cursor-pointer"></i>
                                    <span class="text-sm text-gray-600 font-medium">{post.post.likes} likes</span>
                                </div>
                                <div class="pt-1">
                                    <div class="mb-2 text-sm text-gray-700">
                                        <span class="font-bold mr-2 text-black">
                                            {
                                                post.post.profiles.first_name ? <>{[post.post.profiles.first_name, post.post.profiles.last_name].filter(Boolean).join(" ")}</> : <>{post.post.profiles.email}</>
                                            }
                                        </span> <span className="whitespace-pre-wrap">{post.post.content}</span>
                                    </div>
                                </div>
                                {/* <div class="text-sm mb-2 text-black cursor-pointer font-medium">View all 14 comments</div> */}
                                <div>Comments</div>
                                <div class="mb-2">
                                    {post.post.comments ? post.post.comments.map((comment) => (
                                        <div class="mb-2 text-sm text-gray-700">
                                            {console.log("this")}
                                            <span class="font-semibold mr-2 text-black">{comment.profiles.first_name ? <>{[comment.profiles.first_name, comment.profiles.last_name].filter(Boolean).join(" ")}</> : <>{comment.profiles.email}</>}</span> {comment.content}
                                            <div className="font-light">{(new Date(comment.created_at).toLocaleString())}
                                            </div>
                                        </div>
                                    )) : <div className="text-center">No Comments Yet!</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Post_card