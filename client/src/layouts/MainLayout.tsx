import {FC} from 'react';
import {Outlet} from "react-router-dom";

import {Header} from "../components";

interface IProps {

}

const MainLayout: FC<IProps> = () => {
    return (
        <div className={'headerAndOutlet'}>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainLayout};