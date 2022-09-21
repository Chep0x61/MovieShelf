import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const PageNotFound: FunctionComponent = () => {
    return (
        <div className='center'>
            <h1>Ooops, this page doesn't exist !</h1>
            <Link to="/" className="waves-effect waves-teal btn-flat">Comeback to Main Menu
            </Link>
        </div>
    )
}

export default PageNotFound;