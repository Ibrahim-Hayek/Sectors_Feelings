import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoaderComponent } from './layout/loader/loader.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { FeelingsTableComponent } from './pages/feelings-table/feelings-table.component';
import { HeaderComponent } from './layout/header/header.component';
import { TableFilterComponent } from './shared/components/table-filter/table-filter.component';
import { TableGridComponent } from './shared/components/table-grid/table-grid.component';
import { ButtonRendererComponent } from './shared/components/table-grid/button-renderer.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { InputNumberComponent } from './shared/components/form-fields/input-number/input-number.component';
import { InputTextComponent } from './shared/components/form-fields/input-text/input-text.component';
import { InputDropdownComponent } from './shared/components/form-fields/input-dropdown/input-dropdown.component';
import { EmojisTabComponent } from './shared/components/emojis-tab/emojis-tab.component';
import { TablePaginatorComponent } from './shared/components/table-paginator/table-paginator.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PieChartComponent } from './shared/components/charts/pie-chart/pie-chart.component';
import { HorizontalBarChartComponent } from './shared/components/charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { NgxsModule } from '@ngxs/store';
import { RowState } from './core/state/row.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    FeelingsTableComponent,
    HeaderComponent,
    ButtonRendererComponent,
    TableFilterComponent,
    TableGridComponent,
    SideNavComponent,
    InputNumberComponent,
    InputTextComponent,
    InputDropdownComponent,
    EmojisTabComponent,
    TablePaginatorComponent,
    DashboardComponent,
    PieChartComponent,
    HorizontalBarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgGridModule.withComponents([ButtonRendererComponent]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    NgxsModule.forRoot([RowState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}