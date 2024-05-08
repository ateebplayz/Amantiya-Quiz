export interface Result {
    algemeenGrads: number,
    type: 'De Overload Burnout' | 'De Chaotic Burnout' | 'De Hypersensitive Burnout' | 'De Rockbottom Burnout' | 'De Burnout Shutdown',
}

export interface User {
    email: string,
    name: string,
    phone: string,
    energyLevel: {
        energielevel: number,
        activerende: number,
        blokkade: number,
        focus: number,
        hyper: number,
        energiereserves: number
    },
    time: number
}

export interface Admin {
    username: string,
    password: string
}