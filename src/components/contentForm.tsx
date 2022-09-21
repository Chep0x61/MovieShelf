import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Content from '../models/content';
import ContentService from '../services/contentService';

type Props = {
    content: Content,
    isEditForm: boolean
};

type Field = {
    value?:any,
    error?: string,
    isValid?: boolean
};

type Form = {
    title: Field,
    published: Field,
    picture: Field,
    mark: Field
};

const ContentForm: FunctionComponent<Props> = ({ content, isEditForm }) => {

    const [form, setForm] = useState<Form>({
        title: { value: content.title},
        published: { value: content.published},
        picture: { value: content.picture},
        mark: { value: content.mark}
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldTitle: string = e.target.title;
        const fieldValue: string = e.target.value;
        const newField: Field = {[fieldTitle]: { value: fieldValue }};

        setForm({...form, ...newField});
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (isFormValid) {
            content.title = form.title.value;
            content.published = form.published.value;
            content.picture = form.picture.value;
            content.mark = form.mark.value;

            isEditForm ? updateContent() : addContent();
        }
    }

    const addContent = () => {
        ContentService.addContent(content).then(() => navigate('/contents'));
    }

    const updateContent = () => {
        ContentService.updateContent(content).then(() => navigate(`/contents/${content.id}`));
    }

    const deleteContent = () => {
        ContentService.deleteContent(content).then(() => navigate('/contents'));
    }

    const isAddForm = () => {
        return !isEditForm;
    }

    const validateForm = () => {
        let newForm: Form = form;

        if (isAddForm()) {
            const end = '.jpg';

            if (!form.picture.value.endsWith(end)) {
                const errorMsg: string = "URL not valid";
                const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false };

                newForm = {...form, ...{ picture: newField }};
            } else {
                const newField: Field = { value: form.picture.value, error: '', isValid: true };

                newForm = { ...newForm, ...{ name: newField } };
            }
        }

        if (!/^[a-zA-Zaéè0-9]{1, 30}$/.test(form.title.value)) {
            const errorMsg: string = 'You must use allowed chars';
            const newField: Field = { value: form.title.value, error: errorMsg, isValid: false};

            newForm = { ...newForm, ...{ name: newField }};
        } else {
            const newField: Field = { value: form.title.value, error: '', isValid: true};

            newForm = { ...newForm, ...{ name: newField }};
        }

        if (!/^[0-9]{1,5}$/.test(form.mark.value)) {
            const errorMsg: string = 'Mark must be between 1 or 5 stars';
            const newField: Field = { value: form.mark.value, error: errorMsg, isValid: false};

            newForm = { ...newForm, ...{ name: newField }};
        } else {
            const newField: Field = { value: form.title.value, error: '', isValid: true};

            newForm = { ...newForm, ...{ name: newField }};
        }
        if (!/^[0-9]{1900,3000}$/.test(form.published.value)) {
            const errorMsg: string = 'Year of the publication';
            const newField: Field = { value: form.published.value, error: errorMsg, isValid: false};

            newForm = { ...newForm, ...{ name: newField }};
        } else {
            const newField: Field = { value: form.published.value, error: '', isValid: true};

            newForm = { ...newForm, ...{ name: newField }};
        }
        setForm(newForm);

        return newForm.title.isValid && newForm.published.isValid && newForm.mark.isValid;
    }
    return (
        <form onSubmit={e => handleSubmit(e)}>
            <div className='row'>
                <div className='col s12 m8 offset-m2'>
                    <div className='card hoverable'>
                        {isEditForm && (
                            <div className='card-image'>
                                <img src={content.picture} alt={content.title} style={{ width: '250px', margin: '0 auto'}}/>
                                <span className='btn-floating halfway-fab waves-effect waves-light'>
                                    <i onClick={deleteContent} className='material-icons'>delete</i>
                                </span>
                            </div>
                        )}
                        <div className="card-stacked"> 
                            <div className='card-content'>
                                
                                <div className='form-group'>
                                    <label htmlFor="Title">Title</label>
                                    <input id="title" title="title" type="text" className="form-control" value={form.title.value} onChange={e => handleInputChange(e)}></input>
                                    {form.title.error &&
                                    <div className='card-panel red accent-1'>
                                        {form.title.error}
                                    </div>
                                    }
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="Published">Published</label>
                                    <input id="published" title="published" type="number" className="form-control" value={form.published.value} onChange={e => handleInputChange(e)}></input>
                                    {form.published.error &&
                                    <div className='card-panel red accent-1'>
                                        {form.published.error}
                                    </div>
                                    }
                                </div>

                                {isAddForm() && (
                                <div className="form-group">
                                    <label htmlFor="picture">Image</label>
                                    <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e => handleInputChange(e)}></input>

                                    {form.picture.error &&
                                    <div className="card-panel red accent-1">
                                        {form.picture.error}
                                    </div>
                                    }
                                </div>
                                )}

                                <div className='form-group'>
                                    <label htmlFor="Mark">Mark</label>
                                    <input id="mark" title="mark" type="text" className="form-control" value={form.mark.value} onChange={e => handleInputChange(e)}></input>
                                    {form.mark.error &&
                                    <div className='card-panel red accent-1'>
                                        {form.mark.error}
                                    </div>
                                    }
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ContentForm;