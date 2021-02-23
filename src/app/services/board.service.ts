import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    API_URL = environment.API_URL;


    constructor(private http: HttpClient) { }

    // Boards API

    getBoards() {
        return this.http.get(this.API_URL + '/boards');
    }

    createBoards(boardName) {
        return this.http.post(this.API_URL + '/boards', { boardName });
    }

    updateBoards(boardData) {
        return this.http.put(this.API_URL + '/boards/' + boardData.boardId, { boardData });
    }

    deleteBoards(boardData) {
        return this.http.delete(this.API_URL + '/boards' + boardData.boardId);
    }

}
