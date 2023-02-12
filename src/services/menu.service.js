import React from 'react';
import {
  BugOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

/**
 * @export
 * @type {[]}
 */
export const menus = [
  {
    key: 'menu.manageRoles',
    icon: <InfoCircleOutlined/>,
    component: 'manageRoles',
    url: '/admin/logs'
  },
  {
    key: 'menu.systemLogs',
    icon: <InfoCircleOutlined/>,
    items: [
      {
        key: 'menu.errorLogs',
        url: '/admin/errors0',
        component: 'errorLogs',
        icon: <BugOutlined/>
      },
      {
        key: 'menu.errorLogs',
        url: '/admin/errors1',
        component: 'errorLogs',
        icon: <BugOutlined/>
      }
    ]
  },
  {
    key: 'menu.userLogs',
    icon: <InfoCircleOutlined/>,
    items: [
      {
        key: 'menu.userLogs',
        url: '/admin/errors',
        component: 'userLogs',
        icon: <BugOutlined/>
      }
    ]
  }
];
