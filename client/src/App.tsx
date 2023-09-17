import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {MainLayout} from "./layouts";
import {HeroesPage, HeroInfoPage} from "./pages";

const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'heroes'}/>}/>
                <Route path={'heroes'} element={<HeroesPage/>}/>
                <Route path={'heroInfo'} element={<HeroInfoPage/>}/>
            </Route>
        </Routes>
    );
};

export default App;