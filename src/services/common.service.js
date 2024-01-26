import { getDvaApp } from '@umijs/max';

import { stub } from '@/utils/function';

/**
 * @constant
 * @export
 * @return {boolean}
 */
export const isDevelopment = () => process.env.NODE_ENV === 'development';

/**
 * @constant
 * @export
 * @return {boolean}
 */
export const isProduction = () => process.env.NODE_ENV === 'production';

/**
 * @export
 * @param changedFields
 * @param allFields
 * @param MODEL_NAME
 * @param dispatch
 */
export const onFieldsChangeHandler = ({ changedFields, allFields, MODEL_NAME, dispatch = stub }) => {
  dispatch({
    type: `${MODEL_NAME}/updateFields`,
    payload: {
      changedFields,
      allFields,
      model: MODEL_NAME
    }
  });
};

/**
 * @export
 * @param entityForm
 * @param key
 * @param [namespace]
 * @return {number}
 */
export function getEntityFormIdx({ entityForm, key, namespace = '' }) {
  let idx = -1;
  if (namespace && namespace.length) {
    key = `${namespace}/${key}`;
  }
  entityForm.forEach((form, index) => {
    if (form.name === key) {
      idx = index;
    }
  });

  return idx;
}

/**
 * @export
 * @param [entityForm]
 * @param [formObj]
 * @return {*[]}
 */
export const toEntityForm = ({ entityForm = [], formObj = {} }) => {
  const _entityForm = [...entityForm];
  const toDelete = [];

  const keys = Object.keys(formObj);

  for (const element of keys) {
    const key = element;
    const idx = getEntityFormIdx({ entityForm, key });

    const formItem = {
      name: key,
      value: formObj[key]
    };

    // Overwrite existing values
    if (idx > -1) {
      toDelete.push(idx);
    }

    _entityForm.push(formItem);
  }

  return [..._entityForm.filter((_form, idx) => toDelete.indexOf(idx) === -1)];
};

/**
 * @export
 * @param {string} id
 * @return {boolean}
 */
export const isNew = id => id === 'new';

/**
 * @export
 * @async
 * @param {string} collectionPath
 * @param {boolean} [notice]
 * @param {string} [action]
 * @example
 * networkConnection('users', true, 'add')
 * @return {Promise<boolean>}
 */
export const networkConnection = async (collectionPath, notice = true, action = 'firestore') => {
  if (window.navigator.onLine) {
    return true;
  } else {
    // const error = await intl({ id: 'error.noConnection', defaultMessage: 'No internet connection' });
    if (notice) {
      // message.error(error).then(async () => errorSaveMsg(false, capitalize(collectionPath)));
    }
    // console.error(`No network connection on ${action}: ${collectionPath}\n`, error);
    return false;
  }
};

/**
 * @export
 * @return {*}
 */
export const useDispatcher = () => {
  const dva = getDvaApp();
  return dva._store.dispatch;
};
