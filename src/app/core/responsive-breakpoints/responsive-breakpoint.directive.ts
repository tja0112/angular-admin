import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Directive({
  selector: '[responsiveBreakpoint]'
})
export class ResponsiveBreakpointDirective {
  @Input('responsiveBreakpoint') screen: string;

  constructor(public element: ElementRef) { }

}
