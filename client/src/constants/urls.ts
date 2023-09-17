const baseURLHeroesDB = 'http://localhost:5000';

const urls = {
    toHeroes: '/heroes',
    heroById: (id: string): string => `/heroes/${id}`,
    pushImage: (id: string): string => `/heroes/image/${id}`,
    deleteImage: (id: string, index: number): string => `/heroes/image/${id}/${index}`
};

export {
    baseURLHeroesDB,
    urls
}