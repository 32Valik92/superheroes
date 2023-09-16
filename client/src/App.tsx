import React, {useEffect, useState} from 'react';
import axios from "axios";
import {IUser} from "./interfaces";

const App = () => {
    const [back, setBack] = useState<IUser[]>()

    // let axiosService = axios.create({baseURL: "http://localhost:5000/"});
    useEffect(() => {
        axios.get("http://localhost:5000/heroes").then(r => setBack(r.data))

    }, [back])
    return (
        <div className={'ssss'}>
            {back && back.map((value, index) => <p key={index}>{value.nickname}</p>)}
        </div>
    );
};

export default App;