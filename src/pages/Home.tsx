import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Content from '../models/content';
import ContentCard from '../components/movieCard';
import ContentService from '../services/contentService';


const Home: FunctionComponent = () => {
    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {
        ContentService.getContents().then(contents => setContents(contents))
    }, []);

    return (
        <div className='center'>
            <br />
            <br />
            <div className='container'>
                <div className='row'>
                    {contents.map(content => (
                        <ContentCard key={content.id} content={content} />
                    ))}
                </div>
                <Link className='btn-floating btn-large waves-effect waves-light purple z-depth-3' style={{ position: 'fixed', bottom: '25px', right: '25px' }}  to="/contents/add">
                    <i className='material-icons'>add</i>
                </Link>
            </div>
        </div>
    );
}

export default Home;