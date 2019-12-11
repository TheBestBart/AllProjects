import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'environments/environment';

import { AppComponent } from './app.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { NavBarComponent } from './admin-panel/nav-bar/nav-bar.component';
import { AdminPanelLogoComponent } from './admin-panel/admin-panel-logo/admin-panel-logo.component';
import { SetsTableComponent } from './admin-panel/sets-table/sets-table.component';
import { SetsDetailComponent } from './admin-panel/sets-detail/sets-detail.component';
import { ContentCardComponent } from './admin-panel/content-card/content-card.component';
import { AddStudentComponent } from './admin-panel/add-student/add-student.component';
import { StudentsListComponent } from './admin-panel/students-list/students-list.component';
import { TextQuestionsListComponent } from './admin-panel/text-questions-list/text-questions-list.component';
import { AddTextQuestionsComponent } from './admin-panel/add-text-questions/add-text-questions.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminPanelComponent,
    NavBarComponent,
    AdminPanelLogoComponent,
    SetsTableComponent,
    SetsDetailComponent,
    ContentCardComponent,
    AddStudentComponent,
    StudentsListComponent,
    TextQuestionsListComponent,
    AddTextQuestionsComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
