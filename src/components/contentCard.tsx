import React, { FunctionComponent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Content from '../models/content'
import './contentCard.css';

type Props = {
    content: Content,
    borderColor?: string
}

const ContentCard: FunctionComponent<Props> = ({ content, borderColor = '#009688' }) => {
    const [color, setColor] = useState<string>();
    const navigate = useNavigate();

    const showBorder = () => {
        setColor(borderColor);
    }
    
    const hideBorder = () => {
        setColor('#f5f5f5');
    }

    const goToContent = (id: number) => {
        navigate(`/contents/${id}`)
    }
    
    return (
        <div className='col s6 m4' onClick={() => goToContent(content.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
            <div className='card horizontal' style={{ borderColor: color }}>
                <div className='card-image'>
                    <img src={content.picture} alt={content.title}/>
                </div>
                <div className='card-stacked'>
                    <div className='card-content'>
                        <p>{content.title}</p>
                        <p>{content.published}</p>
                        <p>{content.mark}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContentCard;