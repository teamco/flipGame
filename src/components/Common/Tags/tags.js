import React from 'react';
import { useIntl } from '@umijs/max';

import { stub } from '@/utils/function';
import { t } from '@/utils/i18n';

import EditableTags from '@/components/Form/EditableTags';

/**
 * @export
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const CommonTags = (props) => {
  const intl = useIntl();

  const {
    testId,
    formRef,
    tags = [],
    disabled,
    onUpdateTags = stub,
    canUpdate = false,
    canDelete = false,
    canCreate = false,
    name = 'tags',
    defaultActiveKey = null,
    ...rest
  } = props;

  return (
      <EditableTags label={t(intl, 'form.tags')}
                    name={'tags'}
                    form={formRef}
                    canDelete={canDelete}
                    canUpdate={canUpdate}
                    canCreate={canCreate}
                    disabled={disabled}
                    onChange={onUpdateTags}
                    tags={tags}/>
  );
};

export default CommonTags;
