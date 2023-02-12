import { message } from 'antd';
import { intl } from '@/utils/i18n';

/**
 * @export
 * @constant
 * @type {*}
 */
export const STATUS = {
  sent: intl({ id: 'status.sent', defaultMessage: 'Sent' }),
  read: intl({ id: 'status.read', defaultMessage: 'Read' }),
  answered: intl({ id: 'status.answered', defaultMessage: 'Answered' }),
  pending: intl({ id: 'status.pending', defaultMessage: 'Pending' }),
  success: intl({ id: 'status.success', defaultMessage: 'Success' }),
  failed: intl({ id: 'status.failed', defaultMessage: 'Failed' }),
  inProgress: intl({ id: 'status.inProgress', defaultMessage: 'In Progress' }),
  warning: intl({ id: 'status.warning', defaultMessage: 'Warning' })
};

/**
 * @export
 * @async
 * @param isEdit
 * @param instance
 */
export const successSaveMsg = async (isEdit, instance = 'Entity') => {
  const msg = await intl({
    id: isEdit ? 'msg.successUpdate' : 'msg.successSave',
    defaultMessage: isEdit ?
        `${instance} successfully updated` :
        `${instance} successfully created`,
    instance
  });

  console.log(msg);
};

/**
 * @export
 * @param isEdit
 * @param instance
 */
export const errorSaveMsg = async (isEdit, instance) => {
  const msg = await intl({
    id: isEdit ? 'msg.errorUpdate' : 'msg.errorSave',
    defaultMessage: isEdit ?
        `Failed to update ${instance}` :
        `Failed to create ${instance}`,
    instance
  });

  console.error(msg);
};

/**
 * @export
 * @param instance
 */
export const errorGetMsg = async (instance) => {
  const msg = await intl({
    id: 'msg.errorGet',
    defaultMessage: `Failed to get ${instance}`,
    instance
  });

  console.error(msg);
};

/**
 * @export
 * @param instance
 */
export const errorDownloadMsg = async (instance) => {
  const msg = await intl({
    id: 'msg.errorDownload',
    defaultMessage: `Failed to download file: ${instance}`,
    instance
  });

  console.error(msg);
};

/**
 * @export
 * @param instance
 */
export const successDeleteMsg = async (instance) => {
  const msg = await intl({
    id: 'msg.successDelete',
    defaultMessage: `${instance} successfully deleted`,
    instance
  });

  console.log(msg);
};

/**
 * @export
 * @param instance
 */
export const errorDeleteMsg = async (instance) => {
  const msg = await intl({
    id: 'msg.errorDelete',
    defaultMessage: `Failed to delete ${instance}`,
    instance
  });

  console.error(msg);
};
