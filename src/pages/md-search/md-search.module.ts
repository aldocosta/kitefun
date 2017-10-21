import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MdSearchPage } from './md-search';

@NgModule({
  declarations: [
    MdSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MdSearchPage),
  ],
})
export class MdSearchPageModule {}
