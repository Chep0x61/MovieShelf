import React, { FunctionComponent, useState } from 'react';
import Content from '../models/content';
import ContentForm from '../components/contentForm';

const ContentAdd: FunctionComponent = () => {
    const [id] = useState<number>(new Date().getTime());
    const [content] = useState<Content>(new Content(id));

    return (
        <div className='row'>
            <h2 className='header center'>Add new content</h2>
            <ContentForm content={content} isEditForm={false}></ContentForm>
        </div>
    );
}

export default ContentAdd;