import { useCallback } from "react";
import { DatePicker, Drawer, FormControlLabel, Select } from "@kalortech/shared-components";
import { useFormik } from "@kalortech/shared-logic";
import { Button } from "antd";

import type { LogFilters as LogFiltersQuery } from "~services";

import { ACTION_OPTIONS, ENTITY_TYPE_OPTIONS } from "./LogFilters.constants";
import type { LogFiltersFormValues, LogFiltersProps } from "./LogFilters.types";

export const LogFilters = (props: LogFiltersProps) => {
  const { isOpen, onClose, onApply, currentFilters } = props;

  const onSubmitHandler = useCallback(
    (formValues: LogFiltersFormValues) => {
      const filters: LogFiltersQuery = {};
      if (formValues.action) filters.action = formValues.action as unknown as LogFiltersQuery["action"];
      if (formValues.entityType) filters.entityType = formValues.entityType;
      if (formValues.createdFrom) filters.createdFrom = formValues.createdFrom;
      if (formValues.createdTo) filters.createdTo = formValues.createdTo;
      onApply(filters);
      onClose();
    },
    [onApply, onClose],
  );

  const { values, onChange, handleSubmit, resetForm } = useFormik<LogFiltersFormValues>({
    initialValues: {
      action: currentFilters.action ?? "",
      entityType: currentFilters.entityType ?? "",
      createdFrom: currentFilters.createdFrom ?? "",
      createdTo: currentFilters.createdTo ?? "",
    },
    enableReinitialize: true,
    onSubmit: onSubmitHandler,
  });

  const { action, entityType, createdFrom, createdTo } = values;

  const onCloseHandler = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const onClearHandler = useCallback(() => {
    onApply({});
    resetForm();
    onClose();
  }, [onApply, resetForm, onClose]);

  const onConfirmHandler = useCallback(() => {
    void handleSubmit();
  }, [handleSubmit]);

  return (
    <Drawer
      title="Filter Logs"
      open={isOpen}
      onClose={onCloseHandler}
      onConfirm={onConfirmHandler}
      confirmLabel="Apply Filters"
      destroyOnHidden
    >
      <form className="flex flex-col gap-5">
        <div className="flex justify-end">
          <Button type="text" onClick={onClearHandler}>Clear all</Button>
        </div>

        <FormControlLabel layout="vertical" label="Action" name="action">
          <Select
            name="action"
            options={ACTION_OPTIONS}
            value={action}
            onChange={onChange}
            placeholder="All actions"
            allowClear
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Table" name="entityType">
          <Select
            name="entityType"
            options={ENTITY_TYPE_OPTIONS}
            value={entityType}
            onChange={onChange}
            placeholder="All tables"
            allowClear
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="From Date" name="createdFrom">
          <DatePicker name="createdFrom" value={createdFrom} onChange={onChange} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="To Date" name="createdTo">
          <DatePicker name="createdTo" value={createdTo} onChange={onChange} />
        </FormControlLabel>
      </form>
    </Drawer>
  );
};
