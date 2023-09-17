import {FC} from 'react';
import {HeroInfo} from "../../components";

interface IProps {

}

const HeroInfoPage: FC<IProps> = () => {
    return (
        <div className={'heroInfoPage'}>
            <HeroInfo/>
        </div>
    );
};

export {HeroInfoPage};