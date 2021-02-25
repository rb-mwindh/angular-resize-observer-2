import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ResizeObserverModule } from "./resize-observer/resize-observer.module";

@NgModule({
  imports: [BrowserModule, FormsModule, ResizeObserverModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
