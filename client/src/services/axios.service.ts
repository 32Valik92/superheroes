import axios from "axios";

import {baseURLHeroesDB} from "../constants";

const axiosService = axios.create({baseURL: baseURLHeroesDB});

export {
    axiosService
}