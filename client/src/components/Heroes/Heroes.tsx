import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Hero} from "../Hero/Hero";
import {heroesActions} from "../../redux";
import {useSearchParams} from "react-router-dom";
import './Heroes.css';

interface IProps {

}

const Heroes: FC<IProps> = () => {
    const {heroes, trigger, page} = useAppSelector(state => state.heroesReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams({page: '1'});

    const paginationFunc = (button: string): void => {
        if (button === 'next') {
            setQuery(prev => ({...prev, page: +prev.get('page') + 1}));
        } else {
            setQuery(prev => ({...prev, page: +prev.get('page') - 1}));
        }
    }

    useEffect(() => {
        dispatch(heroesActions.getAll({page: +query.get('page')}))
    }, [dispatch, query, trigger])
    return (
        <div className={'heroesComponent'}>

            <div className={'heroes'}>
                {heroes.map((hero, index) => <Hero key={index} hero={hero}/>)}
            </div>

            {/* Pagination */}
            <div className={'pagination'}>
                <button disabled={page === 1} onClick={(): void => paginationFunc('prev')}> prev page</button>
                <button disabled={page === 100} onClick={(): void => paginationFunc('next')}> next page</button>
            </div>

        </div>

    );
};

export {Heroes};