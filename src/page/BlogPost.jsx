import '../style/BlogPost.css';
import Post from "../component/Post";
import {useEffect, useState} from "react";

function BlogPost() {
    const [posts, setPosts] = useState([]);
    const [dates, setDates] = useState([]);
    const [post, setPost] = useState({
        id: "",
        title: "",
        author: "",
        date: "",
        content: "",
    });

    const [dateFilter, setDateFilter] = useState("All");
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        setDates(getUniqueDates(posts));
        console.log(dates)
    }, [posts])

    useEffect(() => {
        setFilteredPosts(posts.filter((post) => post.date === dateFilter));
    }, [dateFilter, posts])
    function getUniqueDates(postsArray) {
        const datesSet = new Set(postsArray.map((post) => post.date));
        return Array.from(datesSet);
    }

    function dateFilterHandler(e) {
        setDateFilter(e.target.value);
    }

    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            // eslint-disable-next-line no-mixed-operators
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function handleInputChange(e) {
        const {name, value} = e.target;
        setPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function submitPost(e) {
        e.preventDefault()

        if (!post.title || !post.author || !post.date || !post.content) {
            alert("Please fill out all fields before submitting.");
            return;
        }

        setPosts((prevState) => ([
            ...prevState,
            {
                id: uuidv4(),
                title: post.title,
                author: post.author,
                date: post.date,
                content: post.content,
            }
        ]))

        setPost({
            id: "",
            title: "",
            author: "",
            date: "",
            content: "",
        });
    }

    function onEdit(id, newPost) {
        setPosts((prevState) =>
            prevState.map((post) => post.id === id ? newPost : post)
        )

    }

    function onDelete(id) {
        setPosts((prevState) =>
            prevState.filter((post) => post.id !== id)
        )
    }

    return (
        <main>
            <form>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleInputChange}
                    id="title"
                />
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    name="author"
                    value={post.author}
                    onChange={handleInputChange}
                    id="author"
                />
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    name="date"
                    value={post.date}
                    onChange={handleInputChange}
                    id="date"
                />
                <label htmlFor="content">Content:</label>
                <textarea
                    name="content"
                    value={post.content}
                    onChange={handleInputChange}
                    id="content"
                />
                <button
                    onClick={submitPost}
                >Submit</button>
            </form>
            <div className="filter">
                <label htmlFor="dateFilter">Filter by Date:</label>
                <select
                    id="dateFilter"
                    value={dateFilter}
                    onChange={dateFilterHandler}
                >
                    <option value="All">All</option>
                    {
                        dates.map((date) => (
                            <option key={date} value={date}>{date}</option>
                        ))
                    }
                </select>
            </div>
            <div className="posts">
                {
                    dateFilter === "All" ? posts.length === 0 ?
                        <div className="post">
                            <h2>No blog posts to display.</h2>
                        </div> :
                        posts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                        )) :
                        filteredPosts.map((post) => (
                        <Post
                            key={post.id}
                            post={post}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))
                }
            </div>
        </main>
    )
}

export default BlogPost;