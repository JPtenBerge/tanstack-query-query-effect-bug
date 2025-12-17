import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
	give() {
		return new Promise<number[]>(res => setTimeout(() => res([1, 2, 3]), 1000));
	}
}
