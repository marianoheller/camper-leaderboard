

export const initState = {
    showing: "recent",
    campers: {
        recent: {
            showName: "Recent (30 days)",
            data: [],
        },
        allTime: {
            showName: "All Time",
            data: [],
        },
    },
}


export const Config = {
    urls: {
        recent : "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
        allTime: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
    },
}