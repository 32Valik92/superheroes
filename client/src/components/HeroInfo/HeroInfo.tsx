import {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {heroesActions} from "../../redux";
import {ImagesList} from "../ImagesList/ImagesList";
import {ImageForm} from "../ImageForm/ImageForm";
import './HeroInfo.css';

interface IProps {

}

const HeroInfo: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const {chosenHero, trigger} = useAppSelector(state => state.heroesReducer);

    const chosenHeroId = localStorage.getItem('choseHeroId'); // chosenHeroId from localStorage

    // useEffect for getting info about chosen Hero
    useEffect(() => {
        if (chosenHeroId) {
            dispatch(heroesActions.getHeroById({id: chosenHeroId}))
        }
    }, [dispatch, chosenHeroId, trigger])
    return (
        chosenHero ? (
                <div className={'containerInfo'}>
                    <div className={'heroInfoDiv'}>
                        {
                            !chosenHero.image
                                ?
                                <div className={'textNoImage'}>
                                    <h3>This hero doesn't have image</h3>
                                </div>
                                :
                                <div className={'heroImg'}>
                                    <img src={chosenHero.image} alt={chosenHero.nickname}/>
                                </div>
                        }

                        <div className={'infoAboutHero'}>
                            <div>id: {chosenHero._id}</div>
                            <div>nickname: {chosenHero.nickname}</div>
                            <div>real_name: {chosenHero.real_name}</div>
                            <div>origin_description: {chosenHero.origin_description}</div>
                            <div>superpowers: {chosenHero.superpowers}</div>
                            <div>catch_phrase: {chosenHero.catch_phrase}</div>
                        </div>

                    </div>

                    {/* Mini form for upload images to chosen Hero*/}
                    <ImageForm key={0} id={chosenHeroId}></ImageForm>
                    {/* Render hero's images */}
                    <ImagesList key={1} chosenHero={chosenHero}/>

                </div>
            )
            :
            <div className={'noChosenHero'}>
                Sorry, but you have to chose some hero!
            </div>

    )
        ;
};

export {HeroInfo};