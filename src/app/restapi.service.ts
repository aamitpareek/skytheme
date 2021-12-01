import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError,tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  private base_URL = "http://localhost:8080/";
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      // 'Access-Control-Allow-Origin' :'http://localhost:8080/',
    })
  }

  constructor(private httpClient : HttpClient) { }

  // admin login
  loginadmin(data: any) : Observable <any>{
    return this.httpClient.post<any>(this.base_URL+'adminlogin', JSON.stringify(data), this.httpOptions)
    .pipe(
      tap(_ => console.log(`data`,data)),
      catchError(this.handleError<any>('post'))
    );
  }

  // postimage
  postImage(data: any) : Observable<any>{
    return this.httpClient.post<any>(this.base_URL+'postImage',data,{observe: 'events'})
    .pipe(
      tap(_=> console.log(`data${data}`)),
      catchError(this.handleError<any>(`post`))
    )

  }

  //post category
  postCategory(data: any): Observable<any>{
    return this.httpClient.post<any>(this.base_URL+'postCategory',JSON.stringify(data), this.httpOptions)
    .pipe(
      tap(_=> console.log(`data${data}`)),
      catchError(this.handleError(`post`))
    )
  }

  //post product
  postProduct(data: any): Observable<any>{
    return this.httpClient.post<any>(this.base_URL+'postProduct', JSON.stringify(data), this.httpOptions)
    .pipe(
      tap(_=> console.log(`data${data}`)),
      catchError(this.handleError(`post`))
    )
  }

  // get image
  getImage() : Observable<any>{
    return this.httpClient.get<any>(this.base_URL+'getimage',this.httpOptions)
    .pipe(
      tap (_=> console.log(``)),
      catchError(this.handleError("Get"))
    )
  }

  // get category
  getcategory(): Observable<any>{
    return this.httpClient.get<any>(this.base_URL+'getCategory', this.httpOptions)
    .pipe(
      tap(_=> console.log("get")),
      catchError(this.handleError("Get"))
    )
  }

  //getproduct
  getProduct(): Observable<any>{
    return this.httpClient.get<any>(this.base_URL+'getProduct',this.httpOptions)
    .pipe(
      tap(_=> console.log('get')),
      catchError(this.handleError('get'))
    )

  }
  //delete image
  deleteImage(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.base_URL+`deleteimage/${id}`, this.httpOptions)
    .pipe(
      tap(_=> console.log(`id${id}`)),
      catchError(this.handleError("delete"+id))
    )
  }

  // delete admin category
    deleteCategory(id: any): Observable<any>{
      return this.httpClient.delete<any>(this.base_URL+'deleteCategory/'+id, this.httpOptions)
      .pipe(
        tap(_=> console.log("id",id)),
        catchError(this.handleError("delete"+id))
      )
    }

    // delete product 
    deleteProduct(id: any): Observable<any>{
      return this.httpClient.delete<any>(this.base_URL+'deleteProduct/'+id, this.httpOptions)
      .pipe(
        tap(_=> console.log("id", id)),
        catchError(this.handleError("delete"+id))
      )
    }

    // Update admin category
    updateCategory(id: any, data: any): Observable<any>{
      return this.httpClient.put<any>(this.base_URL+'updateCategory/'+id,JSON.stringify(data), this.httpOptions)
      .pipe(
        tap(_=> console.log("data",data)),
        catchError(this.handleError("Update", data))
      )
    }

    // update product
    updateProduct(id:any, data: any): Observable<any>{
      return this.httpClient.put<any>(this.base_URL+'updateProduct/'+id, JSON.stringify(data), this.httpOptions)
      .pipe(
        tap(_=> console.log("data",data)),
        catchError(this.handleError("Update", data))
      )
    }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
