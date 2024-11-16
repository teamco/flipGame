import React from 'react';
import { Avatar, Badge, Popover, Tooltip } from 'antd';
import {
  BellTwoTone,
  HeartTwoTone,
  InfoCircleTwoTone,
  LogoutOutlined,
  ProfileOutlined,
  WifiOutlined
} from '@ant-design/icons';
import { Link, useIntl } from '@umijs/max';
import classnames from 'classnames';

import DropdownButton from '@/components/Buttons/dropdown.button';

import { t } from '@/utils/i18n';
import { COLORS } from '@/utils/colors';
import { stub } from '@/utils/function';

import styles from '@/components/Landing/landing.module.less';

const { API } = require('@/services/config/api.config');

export const LandingActions = props => {
  const intl = useIntl();

  const {
    loading,
    collapsible = false,
    collapsed = false,
    isSider = false
  } = props;

  /**
   * @constant
   * @param {string} idx
   * @param {string} title
   * @param {string} value
   * @returns {JSX.Element}
   */
  const info = (idx, title, value) => (
      <li key={idx}>
        <strong>{t(intl, title)}</strong>{value.toString()}
      </li>
  );

  const menuItems = [
  ];

  const actionPosition = isSider ? collapsed ? 'right' : 'topRight' : 'bottom';

  return (
      <div className={classnames(styles.actionsWrapper, {
        [styles.siderActions]: isSider,
        [styles.siderCollapsed]: collapsible && collapsed,
        [styles.collapsible]: collapsible
      })}>
        <div className={styles.actions}>
        </div>
        <div className={styles.auth}>
        </div>
      </div>
  );
};