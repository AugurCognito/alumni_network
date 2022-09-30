const Post_card = (post) => {
    console.log(">>>", post)
    return (
        <div>

            {post.post ? <>{JSON.stringify(post.post)}</> :
                <>
                    <div className="post-container flex justify-center">
                        <div class=" rounded overflow-hidden border w-full mx-auto lg:w-6/12 md:w-6/12 bg-white md:mx-0 lg:mx-0">
                            <div class="w-full flex justify-between p-3">
                                <div class="flex">
                                    <div class="rounded-full h-12 w-12 bg-gray-500 flex items-center justify-center overflow-hidden my-auto">
                                        <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic" />
                                    </div>

                                    <div className='flex flex-col'>
                                        <span class="pt-1 ml-2 font-bold text-black">braydoncoyer</span>
                                        <span className='ml-2 text-gray-700'>Berzogar Inc.</span>
                                    </div>
                                </div>

                            </div>
                            <img class="w-full bg-cover" src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG" />
                            <div class="px-3 pb-2">
                                <div class="pt-2 flex flex-col">
                                    <span>
                                        Fri Sept 30 2022
                                    </span>
                                    <i class="far fa-heart cursor-pointer"></i>
                                    <span class="text-sm text-gray-600 font-medium">12 likes</span>
                                </div>
                                <div class="pt-1">
                                    <div class="mb-2 text-sm text-gray-700">
                                        <span class="font-medium mr-2 text-black">braydoncoyer</span> Lord of the Rings is my favorite film-series. One day I'll make my way to New Zealand to visit the Hobbiton set!
                                    </div>
                                </div>
                                <div class="text-sm mb-2 text-black cursor-pointer font-medium">View all 14 comments</div>
                                <div class="mb-2">
                                    <div class="mb-2 text-sm text-gray-700">
                                        <span class="font-medium mr-2 text-black">razzle_dazzle</span> Dude! How cool! I went to New Zealand last summer and had a blast taking the tour! So much to see! Make sure you bring a good camera when you go!
                                    </div>
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