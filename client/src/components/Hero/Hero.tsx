import {FC} from 'react';
import {useNavigate} from "react-router-dom";

import {IHero} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {heroesActions} from "../../redux";
import './Hero.css';

interface IProps {
    hero: IHero;
}

const Hero: FC<IProps> = ({hero}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {_id, nickname, image} = hero;

    // Function for put _id to localStorage and navigate to hero info page
    const heroInfo = (): void => {
        localStorage.setItem('choseHeroId', `${_id}`);
        navigate('/heroInfo');
    };
    return (
        <div className={'heroCard'}>

            <div onClick={heroInfo} className={'heroInfo'}>
                <div><h3 className={'nickname'}>{nickname}</h3></div>
                {
                    !image
                        ?
                        <h3>This hero doesn't have image</h3>
                        :
                        <div className={'heroImage'}><img src={image} alt={nickname}/></div>
                }
            </div>

            <div className={'updateAndDelete'}>
                <button onClick={() => dispatch(heroesActions.setHeroForUpdate(hero))}>update</button>
                <button onClick={() => dispatch(heroesActions.deleteHero({id: _id}))}>delete</button>
            </div>

        </div>
    );
};

export {Hero};