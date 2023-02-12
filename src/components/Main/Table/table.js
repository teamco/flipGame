import React, { useState } from 'react';
import { Table } from 'antd';
import { useIntl } from '@umijs/max';

import { t } from '@/utils/i18n';
import { stub } from '@/utils/function';

import styles from '@/components/Main/Table/table.module.less';
import { effectHook } from '@/utils/hooks';

/**
 * @function
 * @constructor
 * @param props
 * @return {JSX.Element}
 */
function MainTable(props = {}) {
  const intl = useIntl();

  const {
    data = [],
    scroll,
    columns,
    pagination = {},
    pageSize = 15,
    onChange = stub,
    refTarget,
    ...rest
  } = props;

  const [tablePageSize, setTablePagesize] = useState(pageSize);

  effectHook(() => {
    setTablePagesize(pageSize);
  });

  const PAGINATION = {
    pagination: {
      showSizeChanger: data.length > 10,
      showQuickJumper: data.length > tablePageSize,
      position: [data.length ? 'bottomRight' : 'none'],
      tablePageSize,
      ...pagination
    }
  };

  /**
   * Add keys to dataSource
   * @type {[]}
   */
  const dataSource = data?.map ?
      data?.map((entity, idx) => ({ ...entity, ...{ key: idx } })) : [];

  /**
   * @constant
   * @param key
   * @return {{text: *, value: *}[]}
   */
  const filterBy = key => {
    const _filter = dataSource?.map(data => ({
      text: data[key],
      value: data[key]
    }));

    return [
      ...new Map(_filter.map(item =>
          [item['value'], item])).values()
    ];
  };

  /**
   * @constant
   * @param data
   * @param {string} type
   * @returns {string|*}
   * @private
   */
  const _objValue = (data, type = 'string') => {
    if (type === 'string') {
      return data ? data : '';
    }

    return data;
  };

  // specify the condition of filtering result
  // here is that finding the name started with `value`
  const onFilter = key => (value, record) => !_objValue(record[key]).indexOf(value);
  const sorter = key => (a, b) => _objValue(a[key]).length - _objValue(b[key]).length;

  const _columns = (columns || []).map(column => {
    const _column = { ...column };

    if (column.filterable) {
      _column.filters = filterBy(column.key);
      _column.onFilter = onFilter(column.key);
    }

    if (column.sortable) {
      _column.sorter = sorter(column.key);
      _column.sortDirections = ['descend', 'ascend'];
    }

    delete _column.filterable;
    delete _column.sortable;

    return _column;
  });

  const gridProps = { ...props };
  gridProps.dataSource = dataSource || [];

  const total = gridProps.dataSource.length;

  delete gridProps.t;
  delete gridProps.data;
  delete gridProps.columns;

  const handleChange = pagination => {
    setTablePagesize(pagination.pageSize);
    onChange(pagination);
  };

  return (
      <div ref={refTarget}>
        <Table className={styles.grid}
               scroll={scroll}
               onChange={handleChange}
               expandable={gridProps.expandable}
               footer={() => `${t(intl, 'table.total')}: ${total}`}
               columns={_columns}
               {...rest}
               {...PAGINATION}
               {...gridProps} />
      </div>
  );
}

export default MainTable;
