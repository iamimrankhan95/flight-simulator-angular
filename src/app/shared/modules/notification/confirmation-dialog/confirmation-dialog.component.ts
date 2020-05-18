import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TranslationHelperService } from '../../../shared-services/translation-helper.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  public language: string;
  langSubscriber: Subscription;
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(private activeModal: NgbActiveModal,
    private translateService: TranslateService,
    private translationHelperService: TranslationHelperService) { }

    ngOnInit() {
      this.initLang();
    }

    initLang() {
      console.log('from confirmation component: ', this.translationHelperService.language);
      this.translateService.setDefaultLang('en');
      this.translateService.use(this.translationHelperService.language).subscribe(
        (x) => {
          if (this.translationHelperService.language === 'bn') {
            this.translateService.setTranslation(this.translationHelperService.language,
              this.translationHelperService.DEFAULT_TRANSLATIONS, true);
          }
        }
      );

      this.langSubscriber = this.translationHelperService.receivedFilter.subscribe((lang: string) => {
        this.translateService.use(lang).subscribe(
          (x) => {
            if (this.translationHelperService.language === 'bn') {
              this.translateService.setTranslation(this.translationHelperService.language,
                this.translationHelperService.DEFAULT_TRANSLATIONS, true);
            }
          }
        );
      });
    }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
