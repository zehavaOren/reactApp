import react, { useEffect, useState } from 'react'
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { DisplayPosts } from './DisplayPosts';
import { logMessage, getLogs } from '../logger';

export const PostsData = (props) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState(props.userId);
    const [errorMessage, setErrorMessage] = useState(null);

    //Going to add a post with the received ID
    useEffect(() => {
        addPost();
    }, [userId]);

    //get all the post that the user worte
    const addPost = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            logMessage('info', 'This posts getted');
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
            logMessage('error', `Error fetching posts:, ${error.message}`);
            setErrorMessage('Warning Message: ' + error.message);
        }
        finally {
            setLoading(false);
        }
    };
    // This function will be called when a new post is added
    // Fetch updated posts data or perform any other necessary actions
    const handlePostAdded = async (newPost) => {
        try {
            // Update the state by adding the new post to the existing list
            setPosts((prevPosts) => [...prevPosts, newPost]);
            logMessage('info', 'This posts updatig');
        }
        catch (error) {
            console.error('Error updating posts:', error.message);
            logMessage('error', `Error updating posts:, ${error.message}`);
            setErrorMessage('Warning Message: ' + error.message);
        }
        finally {
            setLoading(false);
        }
    };

    // Reset userId when the component receives a new userId prop
    useEffect(() => {
        setUserId(props.userId);
    }, [props.userId]);

    // Reset state when the component is unmounted
    useEffect(() => {
        return () => {
            setUserId(null);
            setPosts([]);
            setErrorMessage(null);
            setLoading(false);
        };
    }, []);

    return (
        <>
            <div className="user-table-container">
                {loading && (
                    <div className="overlay">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                    </div>
                )}
                {errorMessage && <Message severity="warn" text={errorMessage} />}
                <h1 id='postsData'>Posts Data</h1>
                <DisplayPosts posts={posts} userId={userId} onPostAdded={handlePostAdded} />
            </div>
        </>
    )
}