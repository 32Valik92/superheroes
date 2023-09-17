const baseURLHeroesDB = 'http://localhost:5000';

const urls = {
    toHeroes: '/heroes',
    heroById: (id: string): string => `/heroes/${id}`
};

export {
    baseURLHeroesDB,
    urls
}