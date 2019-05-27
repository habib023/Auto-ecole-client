import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Admin } from '../model/admin.model';

@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Admin[]>(`${environment.apiUrl}/admin`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/admin/` + id);
    }

    register(admin: Admin) {
        return this.http.post(`${environment.apiUrl}/admin/register`, admin);
    }

    update(admin: Admin) {
        return this.http.put(`${environment.apiUrl}/admin/` + admin.id, admin);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/admin/` + id);
    }
}
