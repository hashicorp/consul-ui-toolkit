import { helper } from '@ember/component/helper';
import { assign as assignMethod } from '@ember/polyfills';
import ObjectProxy from '@ember/object/proxy';

export function assign(params, hash) {
  console.log('hash', hash.ApplyButton);
  // debugger;
  const obj = params[0];
  obj.ApplyButton = hash.ApplyButton;
  return obj;
  // return Object.assign({}, obj, hash);
  // return assignMethod({}, ...params);
}

export default helper(assign);
