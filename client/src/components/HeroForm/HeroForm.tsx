import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IHero} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {heroesActions} from "../../redux";
import {joiResolver} from "@hookform/resolvers/joi";
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

    useEffect(() => {
        if (heroForUpdate) {
            setValue('nickname', heroForUpdate.nickname)
            setValue('real_name', heroForUpdate.real_name)
            setValue('origin_description', heroForUpdate.origin_description)
            setValue('superpowers', heroForUpdate.superpowers)
            setValue('catch_phrase', heroForUpdate.catch_phrase)
        }
    }, [heroForUpdate])

    const save: SubmitHandler<IHero> = async (hero) => {
        await dispatch(heroesActions.create({hero}));
        reset();
    };

    const update: SubmitHandler<IHero> = async (hero) => {
        await dispatch(heroesActions.update({id: heroForUpdate._id, hero}));
        reset();
    }
    return (
        <div className={'divForm'}>
            <form onSubmit={handleSubmit(heroForUpdate ? update : save)} className={'form'}>
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

                {Object.keys(errors).length > 0 &&
                    <div className={'errorsText'}>{Object.values(errors)[0].message}</div>}

                <div className={'button'}>
                    {/*<button disabled={!isValid}>{heroForUpdate ? 'Update' : 'Save'}</button>*/}
                    <button disabled={!isValid} className={'container disabled'}>
                        <span className={'button__line button__line--top'}></span>
                        <span className={'button__line button__line--right'}></span>
                        <span className={'button__line button__line--bottom'}></span>
                        <span className={'button__line button__line--left'}></span>
                        {heroForUpdate ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export {HeroForm};