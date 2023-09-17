import {FC} from 'react';
import {IHero} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {heroesActions} from "../../redux";
import {useNavigate} from "react-router-dom";
import './Hero.css';

interface IProps {
    hero: IHero;
}

const Hero: FC<IProps> = ({hero}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {_id, nickname, image} = hero;

    const heroInfo = (): void => {
        localStorage.setItem('choseHeroId', `${_id}`);
        navigate('/heroInfo');
    };
    return (
        <div className={'heroCard'}>
            <div onClick={heroInfo} className={'heroInfo'}>
                <div>{nickname}</div>
                <div className={'heroImage'}><img src={image} alt={nickname}/></div>
            </div>
            <div className={'updateAndDelete'}>
                <button onClick={() => dispatch(heroesActions.setHeroForUpdate(hero))}>update</button>
                <button onClick={() => dispatch(heroesActions.deleteHero({id: _id}))}>delete</button>
            </div>
        </div>
    );
};

export {Hero};