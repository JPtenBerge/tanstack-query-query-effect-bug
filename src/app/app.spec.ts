import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { render } from '@testing-library/angular';
import { expect, Mocked } from 'vitest';
import { page } from 'vitest/browser';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query';
import { DataService } from './data.service';
import { ApplicationRef } from '@angular/core';

describe('App', () => {
	let dataServiceMock: Mocked<DataService>;

	beforeEach(() => {
		dataServiceMock = { give: vi.fn().mockReturnValue(Promise.resolve([30, 40, 50])) } as Mocked<DataService>;
	});

	it('should work using the testing library', async () => {
		let sut = await render(App, {
			providers: [provideTanStackQuery(() => new QueryClient()), { provide: DataService, useValue: dataServiceMock }],
		});

		await sut.fixture.whenStable();

		expect(page.getByRole('textbox')).toHaveValue('9999');
		expect(sut.fixture.componentInstance.formField.value).toBe(9999);
	});

	it('should work using TestBed', async () => {
		TestBed.configureTestingModule({
			imports: [App],
			providers: [provideTanStackQuery(() => new QueryClient()), { provide: DataService, useValue: dataServiceMock }],
		});
		let fixture = TestBed.createComponent(App);
		const appRef = TestBed.inject(ApplicationRef);
		let sut = fixture.componentInstance;
		fixture.detectChanges();

		await appRef.whenStable();

		expect(sut.formField.value).toBe(9999);
	});
});
