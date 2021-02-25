import { Injectable, NgZone, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import ResizeObserver from "resize-observer-polyfill";

@Injectable({
  providedIn: "root",
  deps: [NgZone]
})
export class ResizeObserverService implements OnDestroy {
  private readonly _resize$ = new BehaviorSubject<ResizeObserverEntry[]>([]);
  public readonly resize$ = this._resize$.pipe(share());

  private observer = new ResizeObserver(entries => {
    this.zone.run(() => {
      this._resize$.next(entries);
    });
  });

  constructor(private zone: NgZone) {}

  observe(target: Element) {
    this.observer.observe(target);
  }

  unobserve(target: Element) {
    this.observer.unobserve(target);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
