import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import Content from '../models/content';
import ContentService from '../services/contentService';

const ContentDetail: FunctionComponent = () => {
    const {id} = useParams();
    const [content, setContent] = useState<Content|null>(null);

    useEffect(() => {
        ContentService.getContent(+id!).then(content => setContent(content))
    }, [id]);

    return (
        <div>
            { content ? (
                <div className='row'>
                    <div className='col s12 m8 offset-m2'>
                        <h2 className='header center'>{content.title}</h2>
                        <div className='card hoverable'>
                            <div className='card-image'>
                                <img src={content.picture} alt={content.title} style={{width: '250px', margin: '0 auto'}}/>
                                <Link to={`/contents/edit/${content.id}`} className='btn-floating halfway-fab waves-effect waves-light'>
                                    <i className='material-icons'>edit</i>
                                </Link>
                            </div>
                            <div className='card-stacked'>
                                <div className='card-stacked'>
                                    <table className='bordered striped'>
                                        <tbody>
                                            <tr>
                                                <td>Title</td>
                                                <td><strong>{content.title}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Published</td>
                                                <td><strong>{content.published}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>Mark</td>
                                                <td><strong>{content.mark}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='card-action'>
                                    <Link to='/'>Home Page</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h4 className="center">No Content to display !</h4>
            )}
        </div>
    );
}

export default ContentDetail