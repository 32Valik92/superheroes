import React, {FC, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {IHero} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {heroesActions} from "../../redux";
import {formValidator} from "../../validators";
import './HeroForm.css';

interface IProps {

}

const HeroForm: FC<IProps> = () => {
    const {
        reset,
        handleSubmit,
        register,
        setValue,
        formState: {errors, isValid}
    } = useForm<IHero>({
        mode: "all",
        resolver: joiResolver(formValidator)
    });
    const dispatch = useAppDispatch();
    const {heroForUpdate} = useAppSelector(state => state.heroesReducer);
    const [base64Image, setBase64Image] = useState(null); // Our trigger for text on button

    // Function for submit new Hero to DB
    const save: SubmitHandler<IHero> = async (hero) => {
        await dispatch(heroesActions.create({hero}));
        reset();
    };

    // Function for update our Hero from DB
    const update: SubmitHandler<IHero> = async (hero) => {
        await dispatch(heroesActions.update({id: heroForUpdate._id, hero}));
        reset();
    }

    // Function for convert image to base64 string
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // get object event

        if (file) {
            const reader = new FileReader(); // const for helper read file

            // After reading, we have callback
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setBase64Image(reader.result);
                    setValue('image', reader.result)
                }
            };

            reader.readAsDataURL(file); // convert to base64 string
        }
    };

    // useEffect for looking for our heroForUpdate and set values to inputs
    useEffect(() => {
        if (heroForUpdate) {
            setValue('nickname', heroForUpdate.nickname)
            setValue('real_name', heroForUpdate.real_name)
            setValue('origin_description', heroForUpdate.origin_description)
            setValue('superpowers', heroForUpdate.superpowers)
            setValue('catch_phrase', heroForUpdate.catch_phrase)
        }
    }, [heroForUpdate, setValue])

    return (
        <div className={'divForm'}>

            <form onSubmit={handleSubmit(heroForUpdate ? update : save)} className={'form'}>

                {
                    !heroForUpdate &&
                    <div className={'fileInputDiv'}>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="fileInput"/>
                        <label htmlFor="file" className="inputLabel">
                            {base64Image || heroForUpdate ? 'Uploaded' : 'Upload a photo'}
                        </label>
                    </div>
                }

                <div className={'input'}>
                    <input type="text" placeholder={'nickname'} {...register('nickname')}/>
                </div>
                <div className={'input'}>
                    <input type="text" placeholder={'real_name'} {...register('real_name')}/>
                </div>
                <div className={'input'}>
                    <input type="text" placeholder={'origin_description'} {...register('origin_description')}/>
                </div>
                <div className={'input'}>
                    <input type="text" placeholder={'superpowers'} {...register('superpowers')}/>
                </div>
                <div className={'input'}>
                    <input type="text" placeholder={'catch_phrase'} {...register('catch_phrase')}/>
                </div>

                {/* div with errors from validators */}
                {Object.keys(errors).length > 0 &&
                    <div className={'errorsText'}>{Object.values(errors)[0].message}</div>}

                <div className={'button'}>
                    <button disabled={!isValid} className={'container disabled'}>
                        <span className={'button__line button__line--top'}></span>
                        <span className={'button__line button__line--right'}></span>
                        <span className={'button__line button__line--bottom'}></span>
                        <span className={'button__line button__line--left'}></span>
                        {heroForUpdate ? 'Update' : 'Register superhero'}
                    </button>
                </div>

            </form>

        </div>
    );
};

export {HeroForm};