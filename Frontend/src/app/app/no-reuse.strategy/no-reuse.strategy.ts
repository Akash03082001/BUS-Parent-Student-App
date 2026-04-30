import { Component } from '@angular/core';
import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
@Component({
  selector: 'app-no-reuse.strategy',
  imports: [],
  templateUrl: './no-reuse.strategy.html',
  styleUrl: './no-reuse.strategy.css',
})

export class NoReuseStrategy implements RouteReuseStrategy {
  shouldDetach(): boolean { return false; }
  store(): void {}
  shouldAttach(): boolean { return false; }
  retrieve(): DetachedRouteHandle | null { return null; }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    // ✅ Force reinitialization on every navigation
    return future.routeConfig === curr.routeConfig ? false : true;
  }
}

