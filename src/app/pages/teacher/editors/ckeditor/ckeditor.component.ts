import { Component } from '@angular/core';

import './ckeditor.loader';
import 'ckeditor';

@Component({
  selector: 'ngx-ckeditor',
  template: `
    <nb-card>
      <nb-card-header>
        CKEditor
      </nb-card-header>
      <nb-card-body>
      <script type="text/javascript" src="http://latex.codecogs.com/integration/ckeditor/ckeditor.js"></script>
        <ckeditor [config]="{ extraPlugins: 'divarea' }"></ckeditor>
      </nb-card-body>
    </nb-card>
  `,
})

export class CKEditorComponent {
}
