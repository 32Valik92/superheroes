import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {heroesActions} from "../../redux";
import './HeroInfo.css';

interface IProps {

}

const HeroInfo: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const {chosenHero} = useAppSelector(state => state.heroesReducer);
    const chosenHeroId = localStorage.getItem('choseHeroId');

    useEffect(() => {
        if (chosenHeroId) {
            dispatch(heroesActions.getHeroById({id: chosenHeroId}))
        }
    }, [dispatch, chosenHeroId])
    return (
        chosenHero && (
            <div className={'heroInfoDiv'}>
                <div className={'heroImg'}>image</div>
                <div className={'infoAboutHero'}>
                    <div>id: {chosenHero._id}</div>
                    <div>nickname: {chosenHero.nickname}</div>
                    <div>real_name: {chosenHero.real_name}</div>
                    <div>origin_description: {chosenHero.origin_description}</div>
                    <div>superpowers: {chosenHero.superpowers}</div>
                    <div>catch_phrase: {chosenHero.catch_phrase}</div>
                </div>
            </div>
        )
    );
};

export {HeroInfo};