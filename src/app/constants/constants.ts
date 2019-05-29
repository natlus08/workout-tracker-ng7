import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Constants {
  public static API_ENDPOINT = 'http://localhost:8080/tracker/api/';
  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })
  };
}