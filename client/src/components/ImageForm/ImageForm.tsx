import React, {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {IImage} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {heroesActions} from "../../redux";
import './ImageForm.css';

interface IProps {
    id: string;
}

const ImageForm: FC<IProps> = ({id}) => {
    const {
        handleSubmit,
        setValue
    } = useForm<IImage>();
    const dispatch = useAppDispatch();
    const [base64Image, setBase64Image] = useState(null);


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setBase64Image(reader.result);
                    setValue('image', reader.result)
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const submit: SubmitHandler<IImage> = async (image) => {
        await dispatch(heroesActions.pushImageById({id, imageData: image}));
    };
    return (
        <div className='imageForm'>

            <form onSubmit={handleSubmit(submit)} className={'form'}>

                <div className={'fileInputDiv'}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="fileInput"/>
                    <label htmlFor="file" className="inputLabel">
                        {base64Image ? 'Uploaded' : 'Upload a photo'}
                    </label>
                </div>

                <div className={'button'}>
                    <button disabled={!base64Image} className={'container disabled'}>
                        <span className={'button__line button__line--top'}></span>
                        <span className={'button__line button__line--right'}></span>
                        <span className={'button__line button__line--bottom'}></span>
                        <span className={'button__line button__line--left'}></span>
                        Submit
                    </button>
                </div>

            </form>

        </div>
    );
};

export {ImageForm};
