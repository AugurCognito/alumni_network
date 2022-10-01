import Link from "next/link"
import { useUser } from "../../hooks/authUser";
import { supabase } from "../../utils/initSupabase";

const Post_card = (post) => {
    const { user, error } = useUser()
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert("Link copied to clipboard")
    }
    async function submitComment(event, user) {
        event.preventDefault()
        let comment = await supabase.from("comments").insert(
            [{ post: post.post.id, user: user.id, content: event.target.content.value }]
        )
        if (!comment.error) {
            alert("Commented, refresh to see changes")
        }
    }
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
                                    <div className='flex flex-col select-none'>
                                        <Link href={`/user/${post.post.profiles.id}`}>
                                            <span className="pt-1 ml-2 font-bold text-black">
                                                {post.post.profiles.first_name ? <>{[post.post.profiles.first_name, post.post.profiles.last_name].filter(Boolean).join(" ")}</> : <>{post.post.profiles.email}</>}
                                            </span>
                                        </Link>
                                        <span className='ml-2 text-gray-700'>{post.post.company.name}</span>
                                    </div>
                                </div>

                            </div>
                            <img className="w-full bg-cover" src="https://3.bp.blogspot.com/-Chu20FDi9Ek/WoOD-ehQ29I/AAAAAAAAK7U/mc4CAiTYOY8VzOFzBKdR52aLRiyjqu0MwCLcBGAs/s1600/DSC04596%2B%25282%2529.JPG" alt="Post Media" />
                            <div class="px-3 pb-2">
                                <div className="text-right mt-0.5">
                                    <span className="m-4">
                                        {(new Date(post.post.created_at).toLocaleString())}
                                    </span>
                                    <button onClick={(e) => (copyToClipboard(`${window.location.origin}/post/${post.post.id}`))} className="btn text-right">
                                        Share <span className="ml-2 fa-duotone fa-share-nodes"></span>
                                    </button>
                                </div>
                                <div class="pt-2 flex flex-col">
                                    <i class="far fa-heart cursor-pointer"></i>
                                    <span class="text-sm text-gray-600 font-medium">{post.post.likes} likes</span>
                                </div>
                                <div class="pt-1">
                                    <div class="mb-2 text-sm text-gray-700">
                                        <Link href={`/user/${post.post.profiles.id}`}>
                                            <span class="font-bold mr-2 text-black">
                                                {post.post.profiles.first_name ? <>{[post.post.profiles.first_name, post.post.profiles.last_name].filter(Boolean).join(" ")}</> : <>{post.post.profiles.email}</>}
                                            </span>
                                        </Link>
                                        <span className="whitespace-pre-wrap">{post.post.content}</span>
                                    </div>
                                </div>
                                {/* <div class="text-sm mb-2 text-black cursor-pointer font-medium">View all 14 comments</div> */}


                                <div>Comments</div>
                                <div class="mb-2">
                                    {post.post.comments ? post.post.comments.map((comment) => (
                                        <div class="mb-2 text-sm text-gray-700">
                                            <Link href={`/user/${comment.profiles.id}`}>
                                                <span class="font-semibold mr-2 text-black">{comment.profiles.first_name ? <>{[comment.profiles.first_name, comment.profiles.last_name].filter(Boolean).join(" ")}</> : <>{comment.profiles.email}</>}
                                                </span>
                                            </Link>
                                            {comment.content}
                                            <div className="font-light">{(new Date(comment.created_at).toLocaleString())}
                                            </div>
                                        </div>
                                    )) : <div className="text-center">No Comments Yet!</div>}
                                    {user ? <form onSubmit={(e) => (submitComment(e, user))}>
                                        Add your comment: <textarea name="content" className="textarea block"></textarea><button className="btn mt-1">Submit</button>
                                    </form> : <>Login to comment</>}

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