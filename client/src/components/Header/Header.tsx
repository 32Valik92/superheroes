import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

import './Header.css';

interface IProps {

}

const Header: FC<IProps> = () => {
    return (
        <div className={'header'}>

            <div className={'headerLink'}>
                <NavLink to={'heroes?page=1'} className={'link'}>Heroes</NavLink>
            </div>

            <div className={'headerLink'}>
                <NavLink to={'heroInfo'} className={'link'}>HeroInfoPage</NavLink>
            </div>

        </div>
    );
};

export {Header};