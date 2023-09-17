import {FC, useEffect} from 'react';

import {IHero} from "../../interfaces";
import {useAppSelector} from "../../hooks";
import {ImageCard} from "../ImageCard/ImageCard";
import './ImagesList.css';

interface IProps {
    chosenHero: IHero;
}

const ImagesList: FC<IProps> = ({chosenHero}) => {
    const {trigger} = useAppSelector(state => state.heroesReducer);

    const {imagesList} = chosenHero;

    useEffect(() => {

    }, [trigger])

    return (
        <div className={'listOfImages'}>

            <h2>Heroes' images</h2>

            <div className='cardsList'>
                {imagesList.map((image, index) =>
                    <ImageCard key={index} id={chosenHero._id} imgData={image} index={index}/>
                )}
            </div>

        </div>
    );
};

export {ImagesList};