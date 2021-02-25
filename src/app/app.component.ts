import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  onResize($event: ResizeObserverEntry) {
    const { width, height } = $event.contentRect;

    $event.target.className = "resizable";
    if (width * height > Math.pow(100, 2)) {
      $event.target.className = "resizable warn";
    }
    if (width * height > Math.pow(150, 2)) {
      $event.target.className = "resizable exceeded";
    }

    $event.target.innerHTML = `${width}x${height}`;
  }
}
