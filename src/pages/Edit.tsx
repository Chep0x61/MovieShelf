import React, { FunctionComponent, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../models/content';
import ContentService from '../services/contentService';
import ContentForm from '../components/contentForm';
import { cp } from 'fs';

const ContentEdit: FunctionComponent = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [content, setContent] = useState<Content|null>(null);


    useEffect(() => {
        ContentService.getContent(+id!).then(content => setContent(content))
    }, [id]);
    
    return (
        <div>
            { content ? (
                <div className='row'>
                    <h2 className="header center">Edit {content.title}</h2>
                    <ContentForm content={content} isEditForm={true}></ContentForm>
                </div>
            ) : (
                <h4 className='center'>No Content to display</h4>
            )}
        </div>
    );
}

export default ContentEdit;