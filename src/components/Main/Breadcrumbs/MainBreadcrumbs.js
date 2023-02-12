import React from 'react';
import { Breadcrumb } from 'antd';
import { NavLink } from '@umijs/max';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import classnames from 'classnames';

import { effectHook } from '@/utils/hooks';

import styles from './MainBreadcrumbs.module.less';

/**
 * This component is wrapped in withBreadcrumbs which automatically
 * generates breadcrumbs based on the current route.
 * If you need custom or dynamic breadcrumbs.
 * Check out the Readme here:
 * @link https://github.com/icd2k3/react-router-breadcrumbs-hoc#dynamic-breadcrumbs
 * @constant
 * @param breadcrumbs
 * @param meta
 * @param onUpdateDocumentMeta
 * @param onUpdate404
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const Breadcrumbs = ({ meta, onUpdateDocumentMeta, onUpdate404, ...props }) => {
  const breadcrumbs = useBreadcrumbs();

  const { is404 } = props;
  const title = breadcrumbs?.map(({ breadcrumb }) => breadcrumb?.props?.children)?.join(' / ');

  effectHook(() => {
    if (title === meta.title) {
      // TODO: Do something.
    } else {
      onUpdateDocumentMeta({ title });
    }
  }, [title]);

  effectHook(() => {
    onUpdate404(is404);
  }, [is404]);

  return (
      <Breadcrumb className={classnames(styles.breadcrumbs)}>
        {breadcrumbs?.map((data, idx) => {
          const { match, breadcrumb } = data || {};
          return (
              <Breadcrumb.Item key={idx}>
                <NavLink to={match.pathname}>{breadcrumb?.props?.children}</NavLink>
              </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
  );
};

export default Breadcrumbs;
