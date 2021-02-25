import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ResizeObserverDirective } from "./resize-observer.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [ResizeObserverDirective],
  exports: [ResizeObserverDirective]
})
export class ResizeObserverModule {}
