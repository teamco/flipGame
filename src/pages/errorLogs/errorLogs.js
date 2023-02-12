import React, { useRef } from 'react';
import ReactJson from 'react-json-view';
import { useIntl } from '@umijs/max';
import { UserSwitchOutlined } from '@ant-design/icons';

import Page from '@/components/Page/page.connect';
import Main from '@/components/Main';
import { SubHeader } from '@/components/Page/page.subheader';

import { errorLogsMetadata } from '@/pages/errorLogs/errorLogs.metadata';

import { effectHook } from '@/utils/hooks';
import { t } from '@/utils/i18n';
import { componentAbilities } from '@/utils/auth/component.setting';

import styles from '@/pages/errorLogs/errorLogs.module.less';

const { Table } = Main;

export const errorLogs = (props) => {
  const intl = useIntl();

  const {
    authModel,
    errorModel,
    loading,
    onQuery
  } = props;

  const {
    errors = []
  } = errorModel;

  effectHook(() => {
    onQuery();
  }, []);

  const subTitle = (
      <>
        <UserSwitchOutlined style={{ marginRight: 10 }}/>
      </>
  );

  const component = 'userLogs';
  const {
    ability,
    disabled,
    canUpdate,
    canDelete,
    canExport,
    canRead
  } = componentAbilities(authModel, component, true);

  const refTarget = useRef(null);

  const pageHeaderProps = {
    subTitle,
    loading,
    disabled,
    component,
    actions: {
      closeBtn: false,
      saveBtn: false,
      menuBtn: false,
      newBtn: false,
      exportBtn: { refTarget, data: errors, disabled: !canExport }
    }
  };

  return (
      <Page className={styles.errorLogs}
            component={component}
            spinEffects={['authModel/defineAbilities']}>
        <SubHeader {...pageHeaderProps}/>
        <Table data={errors}
               refTarget={refTarget}
               expandable={{
                 expandedRowRender(record) {
                   return (
                       <div>
                         <div>
                           <strong>{t(intl, 'form.createdBy')}</strong>
                           <span>{record.createdBy || t(intl, 'auth.anonymous')}</span>
                         </div>
                         <div>
                           <strong>{t(intl, 'logs.referrer')}</strong>
                           <a href={record.referrer}>{record.referrer}</a>
                         </div>
                         <ReactJson src={record.metadata}
                                    theme={'monokai'}/>
                       </div>
                   );
                 },
                 rowExpandable: record => record.eventType
               }}
               {...errorLogsMetadata({
                 data: errors,
                 loading
               })} />
      </Page>
  );
};
