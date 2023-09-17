import {FC} from 'react';

import {Heroes, HeroForm} from "../../components";

interface IProps {

}

const HeroesPage: FC<IProps> = () => {
    return (
        <div className={'heroesPage'}>
            <HeroForm/>
            <Heroes/>
        </div>
    );
};

export {HeroesPage};