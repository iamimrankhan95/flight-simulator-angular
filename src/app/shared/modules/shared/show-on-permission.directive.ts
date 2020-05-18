import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[showOnPermission]'
})
export class ShowOnPermissionDirective implements OnInit {

  @Input('showOnPermission') permission: string; // Required permission passed in
  constructor(private el: ElementRef,
    private authService: AuthService) { }

  ngOnInit() {
    console.log(this.permission, 'directive');
    if (!this.authService.checkPermissionForthisFeature(this.permission)) {
      this.el.nativeElement.style.display = 'none';
    }
  }

}
