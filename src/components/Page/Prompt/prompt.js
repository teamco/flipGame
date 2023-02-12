import React from 'react';
import ReactRouterPrompt from 'react-router-prompt';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';

import { useUnload } from '@/utils/hooks';

import styles from './prompt.module.less';
import { t } from '@/utils/i18n';

/**
 * @export
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export const PagePrompt = props => {
  const { touched } = props;
  const intl = useIntl();

  useUnload(e => {
    e.preventDefault();
    e.returnValue = '';
  }, touched);

  return touched ? (
      <ReactRouterPrompt when={true}>
        {({ isActive, onConfirm, onCancel }) => (
            <Modal title={(
                <div className={styles.title}>
                  <ExclamationCircleOutlined/>
                  <h1>{t(intl, 'msg.unsavedData')}</h1>
                </div>
            )}
                   className={styles.confirmation}
                   open={isActive}
                   onOk={onConfirm}
                   onCancel={onCancel}
                   okText={t(intl, 'actions.ok')}
                   cancelText={t(intl, 'actions.cancel')}>
              <p>
                {t(intl, 'msg.unsaved')}
              </p>
            </Modal>
        )}
      </ReactRouterPrompt>
  ) : null;
};

