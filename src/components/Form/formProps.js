import React from 'react';
import classnames from 'classnames';

import { stub } from '@/utils/function';

import styles from './form.module.less';

/**
 * @export
 * @param props
 * @return {{layout: string, onFieldsChange, scrollToFirstError: boolean, className: string, onFinish: stub, fields}}
 */
export const formProps = props => {
  const {
    className,
    touched,
    entityForm,
    layout = 'vertical',
    scrollToFirstError = true,
    onFinish = stub,
    onFieldsChange = stub
  } = props;

  /**
   * @constant
   * @param changedFields
   * @param allFields
   */
  const handleOnFieldsChange = (changedFields, allFields) => {
    if (touched) {
      // TODO: Avoid re-rendering.
    } else {
      onFieldsChange(changedFields, allFields);
    }
  };

  return ({
    layout,
    onFinish,
    scrollToFirstError,
    fields: entityForm,
    className: classnames(className, styles.form),
    onFieldsChange: handleOnFieldsChange,
  });
};