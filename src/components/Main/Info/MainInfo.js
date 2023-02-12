import React from 'react';
import { Link, useIntl } from '@umijs/max';

import { t } from '@/utils/i18n';

export const MainInfo = props => {
  const {
    touched,
    isEdit = false,
    info: {
      createdBy = {},
      updatedBy = {},
      createdAt,
      updatedAt
    }
  } = props;

  const intl = useIntl();
  const detailsEntity = t(intl, 'panel.details');

  return isEdit && (
      <>
        <div>
          <div label={t(intl, 'form.createdBy')}>
            <Link to={`/admin/users/${createdBy.id}`}>{createdBy.displayName}</Link>
          </div>
          <div label={t(intl, 'form.updatedBy')}>
            <Link to={`/admin/users/${updatedBy.id}`}>{updatedBy.displayName}</Link>
          </div>
        </div>
        <div>
          <div label={t(intl, 'form.createdAt')}>{createdAt}</div>
          <div label={t(intl, 'form.updatedAt')}>{updatedAt}</div>
        </div>
      </>
  );
};
