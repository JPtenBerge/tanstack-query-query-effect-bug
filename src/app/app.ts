import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query';
import { DataService } from './data.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	imports: [ReactiveFormsModule],
	styleUrl: './app.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	dataService = inject(DataService);

	formField = new FormControl<number>(42);

	query = injectQuery(() => ({
		queryKey: ['query'],
		queryFn: () => {
			console.log('in query', this.dataService.give());
			return this.dataService.give();
		},
	}));

	constructor() {
		effect(() => {
			console.log('in effect:', this.query.isSuccess());
			if (!this.query.isSuccess()) return;

			console.log('setting form value');
			this.formField.setValue(9999);
		});
	}
}
