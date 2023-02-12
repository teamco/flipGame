import React from 'react';
import { Button } from 'antd';
import { useIntl, history } from '@umijs/max';
import { AppstoreAddOutlined } from '@ant-design/icons';

import { isSpinning } from '@/utils/state';
import { stub } from '@/utils/function';
import { Can } from '@/utils/auth/can';
import { t } from '@/utils/i18n';

/**
 * @export
 * @default
 * @constant
 * @param {{spinOn}} props
 * @return {JSX.Element}
 */
const newButton = props => {
  const intl = useIntl();

  const {
    className,
    loading,
    disabled,
    icon = <AppstoreAddOutlined/>,
    onClick = stub,
    size = 'small',
    type = 'primary',
    modelName,
    url,
    component,
    spinOn = []
  } = props;

  const linkTo = url || `/admin/${component}/new`;

  const _spinOn = [
    ...spinOn,
    ...[]
  ];

  const handleClick = () => {
    onClick();
    history.push(linkTo);
  };

  return (
      <Can I={'create'} a={component} key={'add'}>
        <Button size={size}
                className={className}
                loading={isSpinning(loading, _spinOn)}
                disabled={disabled}
                icon={icon}
                onClick={handleClick}
                type={type}>
          {t(intl, 'actions.new')}
        </Button>
      </Can>
  );
};

export default newButton;
