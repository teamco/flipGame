import React from 'react';
import {
  AppstoreOutlined,
} from '@ant-design/icons';

/**
 * @export
 * @type {[]}
 */
export const menus = [
  {
    key: 'menu.products',
    icon: <AppstoreOutlined />,
    component: 'products',
    url: '/admin/products'
  }
];
