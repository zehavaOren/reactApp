import react, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { logMessage, getLogs } from '../logger';

export const AddPost = (props) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [postId, setPostId] = useState('');
    const [validationError, setValidationError] = useState(null);

    // Reset form fields and validation error when the dialog is closed
    useEffect(() => {
        if (!visible) {
            setTitle('');
            setBody('');
            setValidationError(null);
        }
    }, [visible]);

    //Add a new post to the user
    const addPost = async () => {
        //check that the title and the body were provided
        if (!title.trim()) {
            setValidationError('Title are required.');
            return;
        }
        if (!body.trim()) {
            setValidationError('Body are required.');
            return;
        }
        setLoading(true);
        //check the last index in the posts array
        checkPostsArrayLen();
        //add post
        try {
            //create post object       
            const post = {
                userId: props.userId,
                id: postId,
                title: title,
                body: body,
            }
            // Add post
            const newPostResponse = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    post
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!newPostResponse.ok) {
                throw new Error('Network response was not ok');
            }
            // Notify the parent component about the new post
            props.onPostAdded(post);
            // Reset the form fields
            setTitle('');
            setBody('');
            setValidationError(null);
            logMessage('info', 'This post added');
        }
        catch (error) {
            console.error('Error adding post:', error);
            logMessage('error', 'Error adding post');
        }
        finally {
            //set logs to local storage
            const logs = getLogs();
            localStorage.setItem('logs', JSON.stringify(logs));
            setLoading(false);
            // Close the dialog after adding the post 
            setVisible(false);
        }
    };
    // check ths post id
    const checkPostsArrayLen = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            logMessage('info', 'This length of the post array get sucssefuly');
            setPostId(data.length);
        }
        catch (error) {
            console.error('Error fetching posts:', error.message);
            logMessage('error', 'Error fetching posts');
        }
    }

    return (
        <>
            <div className="user-table-container">
                {loading && (
                    <div className="overlay">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" />
                    </div>
                )}

                <Button label="Add new post" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                <Dialog header="Add New Post" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <div>
                        {validationError && <Message severity="error" text={validationError} />}
                    </div>
                    <div className="card flex flex-column md:flex-row gap-3">
                        <div className="p-inputgroup flex-1">
                            <InputText value={title} placeholder="title" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <br />
                        <div className="p-inputgroup flex-1">
                            <InputTextarea value={body} placeholder="body" onChange={(e) => setBody(e.target.value)} rows={5} cols={30} />
                        </div>
                        <br />
                        <Button label="Add my post" onClick={addPost} />

                    </div>
                </Dialog>
            </div>
        </>
    )
}