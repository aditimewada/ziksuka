import { Component, OnDestroy, AfterViewInit, Output, Input, EventEmitter, ElementRef,
  forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';



@Component({
  selector: 'ngx-tiny-mce',
  template: '<textarea id="{{elementId}}"></textarea>',
})
export class TinyMCEComponent implements OnDestroy, AfterViewInit {

  @Input() elementId: String;

  @Output() editorKeyup = new EventEmitter<any>();

  editor: any;
  text: string;
  text1: string;
  onChange = (_: any) => { };

  constructor(private host: ElementRef) { }


  ngAfterViewInit() {
    tinymce.init({
      external_filemanager_path: '/eqneditor/',
      selector: '#' + this.elementId,
filemanager_title: 'Responsive Filemanager' ,
external_plugins: { 'eqneditor' : 'plugins/eqneditor/plugin.min.js'},
      target: this.host.nativeElement,
      plugins: ['link', 'paste', 'table', 'eqneditor'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          this.editorKeyup.emit(editor.getContent());
        });
      },
      height: '100',
    });
  }
  submit() {
  // str: String;
  // console.log('add  ', tinymce.get(this.editor).getContent());
  if (this.elementId === 'editor') {
             this.text = tinymce.get(this.elementId).getContent();
          }else {
              this.text1 = tinymce.get(this.elementId).getContent();
          }
          console.log('editor', this.text);
          console.log('editor   ', this.text1);
  }
  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}

