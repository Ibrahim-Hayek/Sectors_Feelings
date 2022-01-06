import { Error } from './errors';

export class result<T>{
    result: T | undefined;
    errors: Error[]| undefined;

    public hasError(): boolean {
        if (this.errors && this.errors.length > 0) {
            return true
        }
        return false
    }
}