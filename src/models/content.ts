export default class Content {
    id: number;
    title: string;
    picture: string;
    mark: number;
    published: number;
    
    constructor(
     id: number,
     title: string = 'title',
     picture: string = 'http://',
     mark: number = 5,
     published: number = 2022
    ) { 
     this.id = id;
     this.title = title;
     this.picture = picture;
     this.mark = mark;
     this.published = published;
    }
}