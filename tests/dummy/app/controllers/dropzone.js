import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DropzoneController extends Controller {
  @action
  drop() {
    // eslint-disable-next-line no-console
    console.log(...arguments);
  }
}
