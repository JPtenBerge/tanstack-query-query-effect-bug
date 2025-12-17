import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { render } from '@testing-library/angular';
import { expect, Mocked } from 'vitest';
import { page } from 'vitest/browser';
import { provideQueryClient, QueryClient } from '@tanstack/angular-query-experimental';
import { DataService } from './data.service';

describe('App', () => {
	let dataServiceMock: Mocked<DataService>;

	beforeEach(() => {
		dataServiceMock = { give: vi.fn().mockReturnValue(Promise.resolve([30, 40, 50])) } as Mocked<DataService>;
	});

	it('should work using the testing library', async () => {
		let sut = await render(App, {
			providers: [provideQueryClient(new QueryClient()), { provide: DataService, useValue: dataServiceMock }],
		});

		await sut.rerender();
		sut.detectChanges();
		await sut.fixture.whenStable();
		await sut.rerender();
		sut.detectChanges();
		await sut.fixture.whenStable();
		await sut.rerender();
		sut.detectChanges();
		await sut.fixture.whenStable();
		await sut.rerender();
		sut.detectChanges();
		await sut.fixture.whenStable();
		await sut.rerender();
		TestBed.tick();
		TestBed.tick();
		TestBed.tick();
		sut.fixture.detectChanges();
		await sut.fixture.whenStable();
		sut.detectChanges();
		await sut.fixture.whenStable();
		await sut.rerender();
		await expect(page.getByRole('textbox')).toHaveValue(9999);
		expect(sut.fixture.componentInstance.formField.value).toBe(9999);
	});

	it('should work using TestBed', async () => {
		TestBed.configureTestingModule({
			imports: [App],
			providers: [provideQueryClient(new QueryClient()), { provide: DataService, useValue: dataServiceMock }],
		});
		let fixture = TestBed.createComponent(App);
		let sut = fixture.componentInstance;

		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		await fixture.whenStable();
		TestBed.tick();
		TestBed.tick();
		TestBed.tick();
		TestBed.tick();
		fixture.detectChanges();
		await fixture.whenStable();

		expect(sut.formField.value).toBe(9999);
	});
});
