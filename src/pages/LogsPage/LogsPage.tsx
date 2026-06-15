import { useEffect, useRef, useState } from "react";
import { useToolbar } from "@kalortech/shared-components";
import { Pagination, Spin, Table } from "antd";
import { Filter } from "lucide-react";

import { LogFilters } from "./LogFilters";
import { INITIAL_SCROLL_Y, LOGS_PAGE_SIZE, TABLE_HEADER_HEIGHT_FALLBACK } from "./LogsPage.constants";
import { LOGS_TABLE_COLUMNS } from "./LogsPage.constants.tsx";
import { useLogsPage } from "./LogsPage.hooks";
import styles from "./LogsPage.module.scss";

export const LogsPage = () => {
  const { setToolbarItems } = useToolbar();
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState<number>(INITIAL_SCROLL_Y);

  const {
    logs,
    logsTotal,
    isLoading,
    page,
    filters,
    hasActiveFilters,
    filtersDrawerDisclosure,
    onFiltersApplyHandler,
    onPageChangeHandler,
  } = useLogsPage();

  useEffect(() => {
    setToolbarItems([
      {
        key: "filter-logs",
        label: "Filter",
        Icon: Filter,
        type: "default",
        badge: hasActiveFilters,
        onClick: filtersDrawerDisclosure.onOpenHandler,
      },
    ]);
    return () => setToolbarItems([]);
  }, [setToolbarItems, filtersDrawerDisclosure.onOpenHandler, hasActiveFilters]);

  useEffect(() => {
    if (isLoading) return;
    const wrapper = tableWrapperRef.current;
    if (!wrapper) return;
    const measure = () => {
      const header = wrapper.querySelector<HTMLElement>(".ant-table-header");
      const headerHeight = header?.offsetHeight ?? TABLE_HEADER_HEIGHT_FALLBACK;
      setScrollY(wrapper.clientHeight - headerHeight);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(wrapper);
    requestAnimationFrame(measure);
    return () => ro.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div ref={tableWrapperRef} className={styles.tableWrapper}>
        <Table
          columns={LOGS_TABLE_COLUMNS}
          dataSource={logs ?? []}
          rowKey="id"
          pagination={false}
          scroll={{ y: scrollY }}
        />
      </div>
      <div className={styles.pagination}>
        <Pagination
          current={page}
          total={logsTotal}
          pageSize={LOGS_PAGE_SIZE}
          onChange={onPageChangeHandler}
          showSizeChanger={false}
        />
      </div>
      <LogFilters
        isOpen={filtersDrawerDisclosure.isOpen}
        onClose={filtersDrawerDisclosure.onCloseHandler}
        onApply={onFiltersApplyHandler}
        currentFilters={filters}
      />
    </div>
  );
};
