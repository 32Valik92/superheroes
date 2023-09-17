import {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {heroesActions} from "../../redux";
import './ImageCard.css';

interface IProps {
    id: string;
    imgData: string;
    index: number;
}

const ImageCard: FC<IProps> = ({id, imgData, index}) => {
    const dispatch = useAppDispatch();
    const {trigger} = useAppSelector(state => state.heroesReducer);

    useEffect(() => {

    }, [trigger]);
    return (
        <div className={'imageCard'}>

            <div className={'img'}>
                <img src={imgData} alt={`photo`}/>
            </div>

            <div className='deleteButton'>
                <button onClick={() => dispatch(heroesActions.deleteImage({id, index}))}>Delete image</button>
            </div>

        </div>
    );
};

export {ImageCard};