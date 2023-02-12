import { stub } from '@/utils/function';

/**
 * @export
 * @param {string} html Representing a single element
 * @return {ChildNode}
 */
export function htmlToElement(html) {
  const template = document.createElement('template');
  // Never return a text node of whitespace as the result
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

/**
 * @export
 * @param {string} html Representing any number of sibling elements
 * @return {NodeList}
 */
export function htmlToElements(html) {
  const template = document.createElement('template');
  // Never return a text node of whitespace as the result
  html = html.trim();
  template.innerHTML = html;
  return template.content.childNodes;
}

/**
 * @export
 * @description Handle DOM changes
 * @type {(function(*, *): (undefined|Window.MutationObserver|MutationObserver))|*}
 * @example
 * const $body = document.querySelector('body');
 * observeDOM($body, (...args) => console.log(args));
 * $body.append(1);
 * >>> (2) [Array(1), MutationObserver]
 * [
 *  ...
 *  0: MutationRecord
 *    addedNodes: NodeList [text]
 *    ...
 *    target: body
 *    type: "childList"
 *    ...
 * ]
 */
export const observeDOM = (() => {
  const { MutationObserver, addEventListener } = window;

  return (obj, callback = stub) => {
    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
      // define a new observer
      const mutationObserver = new MutationObserver(callback);

      // have the observer observe foo for changes in children
      mutationObserver.observe(obj, { childList: true, subtree: true });
      return mutationObserver;
    }

    // browser support fallback
    else if (addEventListener) {
      addEventListener('DOMContentLoaded', () => {
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
      });
    }
  };
})();