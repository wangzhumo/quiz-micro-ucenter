import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as JSONBig from '@pgherveou/json-bigint'

@Injectable()
export class BigintInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                return JSONBig.parse(JSONBig.stringify(data))
            }),
        )
    }
}