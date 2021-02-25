import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { Subject } from "rxjs";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { ResizeObserverService } from "./resize-observer.service";

@Directive({
  selector: "[resize]"
})
export class ResizeObserverDirective implements OnInit, OnDestroy {
  @Output("resize") readonly emitter: EventEmitter<
    ResizeObserverEntry
  > = new EventEmitter<ResizeObserverEntry>();

  private readonly _destroyed$ = new Subject<void>();

  constructor(
    private readonly host: ElementRef<any>,
    private readonly resizeObserver: ResizeObserverService
  ) {}

  ngOnDestroy() {
    this.resizeObserver.unobserve(this.host.nativeElement);
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  ngOnInit() {
    this.resizeObserver.resize$
      .pipe(
        map(entries =>
          entries.find(item => item.target === this.host.nativeElement)
        ),
        filter(entry => !!entry),
        takeUntil(this._destroyed$)
      )
      .subscribe(entry => {
        const { target, contentRect } = entry;
        this.emitter.emit({ target, contentRect });
      });
    this.resizeObserver.observe(this.host.nativeElement);
  }
}
