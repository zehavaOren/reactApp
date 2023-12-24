import react, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { AddPost } from './AddPost';


export const DisplayPosts = (props) => {

    return (
        <>
            <div>
                <AddPost userId={props.userId} onPostAdded={props.onPostAdded} />
                {props.posts.map((post) => (
                    <Card key={post.id} title={post.title}>
                        <p className="m-0">
                            {post.body}
                            <br />
                        </p>
                    </Card>
                ))}
            </div>
        </>
    )
}