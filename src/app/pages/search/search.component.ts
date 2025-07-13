import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/shared/header/header.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchResult: string = '';

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchResult = params['q'] || '';
    });
  }
}
