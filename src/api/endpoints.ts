export const ENDPOINTS = {
    students:{
        getAll:"/students",
        getById:(id:string) => `/students/${id}`,
        create:"/students",
        update:(id:string) => `/students/${id}`,
        delete:(id:string) => `/students/${id}`,
    },
    teachers:{
        getAll:"/teachers",
        getById:(id:string) => `/teachers/${id}`,
        create:"/teachers",
        update:(id:string) => `/teachers/${id}`,
        delete:(id:string) => `/teachers/${id}`,
    },
    courses:{
        getAll:"/courses",
        getById:(id:string) => `/courses/${id}`,
        create:"/courses",
        update:(id:string) => `/courses/${id}`,
        delete:(id:string) => `/courses/${id}`,
    }

}