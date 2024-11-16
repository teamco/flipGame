import React, { useState } from 'react';
import { Menu, Spin } from 'antd';
import { NavLink, useIntl } from '@umijs/max';
import classnames from 'classnames';
import { matchPath } from 'react-router';

import { t } from '@/utils/i18n';
import { stub } from '@/utils/function';
import { abilityMenuItem } from '@/utils/abilityComponent/abilityMenuItem';
import { isSpinning } from '@/utils/state';
import { effectHook } from '@/utils/hooks';

import Main from '@/components/Main';

import styles from '@/layouts/app/app.layout.module.less';

/**
 * @constant
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const MainMenu = props => {
  const intl = useIntl();

  const { pathname } = window.location;

  const {
    collapsible = true,
    isSider = false,
    visible = true,
    position = 'relative',
    mode = 'inline',
    collapsed,
    onCollapse,
    showLogo = false,
    onRoute = stub,
    data,
    model,
    loading,
    spinOn = [],
    defaultDims,
    className,
  } = props;

  const [selectedItems, setSelectedItems] = useState(null);
  const [openedItems, setOpenedItems] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  effectHook(() => {
    if (data?.length) {
      handleMenuSelection();
    }
  }, [data]);

  const handleMenuSelection = () => {
    let _menuItems = [], _mKey, _sKey;

    data?.forEach((menu, idx_m) => {
          _mKey = `${menu?.key}_${idx_m}`;

          if (menu?.url) {
            const _menuItem = _menu(_mKey, menu);
            _menuItems = _menuItems.concat(_menuItem);
            setSelectedItems(_mKey);
            setOpenedItems(null);
          } else {

            const subMenu = [
              ...abilityMenuItem({
                key: `${menu?.key}_${idx_m}`,
                icon: menu?.icon,
                divider: menu?.divider,
                canI: ability.can('read', menu?.component),
                children: t(intl, menu?.key)
              })
            ];

            let menuSubItems = [];
            menu?.items?.forEach((s_menu, idx_i) => {
              if (s_menu?.url) {
                _sKey = `${s_menu?.url}_${idx_m}_${idx_i}`;
                const isActive = !!matchPath(pathname, s_menu?.url);
                if (isActive) {
                  setSelectedItems(_sKey);
                  setOpenedItems(_mKey);
                }
                const _subMenuItem = _menu(_sKey, s_menu);
                menuSubItems = menuSubItems.concat(_subMenuItem);
              }
            });

            if (menuSubItems.length) {
              subMenu[0].children = [...menuSubItems];
            }

            _menuItems = _menuItems.concat(subMenu);
          }
        }
    );

    setMenuItems(_menuItems);
  };

  /**
   * @constant
   * @param key
   * @param menu
   * @private
   */
  const _menu = (key, menu) => abilityMenuItem({
    key,
    icon: menu?.icon,
    divider: menu?.divider,
    canI: ability.can('read', menu?.component),
    children: (
        <NavLink to={menu?.url}
                 onClick={() => setSelectedItems(key)}
                 className={({ isActive }) => isActive ? styles.selected : null}>
          {t(intl, menu?.key)}
        </NavLink>
    )
  });

  const spinning = isSpinning(loading, [...spinOn]);

  return (
      <Main.Sider collapsed={collapsed}
                  onCollapse={onCollapse}
                  collapsible={collapsible}
                  visible={visible}
                  loading={loading}
                  defaultDims={defaultDims}
                  position={position}
                  component={'mainMenu'}
                  render={() => (
                      <Spin spinning={spinning}>
                        {showLogo ? <div className={styles.menuLogo}/> : null}
                        <Menu mode={mode}
                              className={className}
                              items={menuItems}
                              onOpenChange={keys => {
                                setOpenedItems(keys[keys.length - 1]);
                              }}
                              openKeys={openedItems ? [openedItems] : []}
                              selectedKeys={[selectedItems]}/>
                      </Spin>
                  )}
                  className={classnames(styles.siderPanel, styles.siderMenu)}/>
  );
};

export default MainMenu;
