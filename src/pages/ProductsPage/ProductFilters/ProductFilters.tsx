import { useCallback } from "react";
import {
  CurrencyInput,
  DatePicker,
  Drawer,
  FormControlLabel,
  Input,
  Select,
} from "@kalortech/shared-components";
import { useFormik } from "@kalortech/shared-logic";
import { Button } from "antd";

import type { ProductFilters as ProductFiltersQuery } from "~services";

import styles from "./ProductFilters.module.scss";
import type { ProductFiltersFormValues, ProductFiltersProps } from "./ProductFilters.types";

export const ProductFilters = (props: ProductFiltersProps) => {
  const { isOpen, onClose, onApply, currentFilters, categories } = props;

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));

  const onSubmitHandler = useCallback(
    (formValues: ProductFiltersFormValues) => {
      const filters: ProductFiltersQuery = {};
      if (formValues.name) filters.name = formValues.name;
      if (formValues.categoryId) filters.categoryId = formValues.categoryId;
      if (formValues.priceMin !== null) filters.priceMin = formValues.priceMin;
      if (formValues.priceMax !== null) filters.priceMax = formValues.priceMax;
      if (formValues.createdFrom) filters.createdFrom = formValues.createdFrom;
      if (formValues.createdTo) filters.createdTo = formValues.createdTo;
      onApply(filters);
      onClose();
    },
    [onApply, onClose],
  );

  const { values, onChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: currentFilters.name ?? "",
      categoryId: currentFilters.categoryId ?? "",
      priceMin: currentFilters.priceMin ?? null,
      priceMax: currentFilters.priceMax ?? null,
      createdFrom: currentFilters.createdFrom ?? "",
      createdTo: currentFilters.createdTo ?? "",
    } as ProductFiltersFormValues,
    enableReinitialize: true,
    onSubmit: onSubmitHandler,
  });

  const { name, categoryId, priceMin, priceMax, createdFrom, createdTo } = values;

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
      title="Filter Products"
      open={isOpen}
      onClose={onCloseHandler}
      onConfirm={onConfirmHandler}
      confirmLabel="Apply Filters"
      destroyOnHidden
    >
      <form className={styles.form}>
        <div className={styles.clearButton}>
          <Button type="text" onClick={onClearHandler}>Clear all</Button>
        </div>

        <FormControlLabel layout="vertical" label="Name" name="name">
          <Input name="name" placeholder="Search by name" value={name} onChange={onChange} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Category" name="categoryId">
          <Select
            name="categoryId"
            options={categoryOptions}
            value={categoryId}
            onChange={onChange}
            placeholder="All categories"
            allowClear
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Min Price" name="priceMin">
          <CurrencyInput name="priceMin" value={priceMin ?? undefined} onChange={onChange} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Max Price" name="priceMax">
          <CurrencyInput name="priceMax" value={priceMax ?? undefined} onChange={onChange} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Created From" name="createdFrom">
          <DatePicker name="createdFrom" value={createdFrom} onChange={onChange} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Created To" name="createdTo">
          <DatePicker name="createdTo" value={createdTo} onChange={onChange} />
        </FormControlLabel>
      </form>
    </Drawer>
  );
};
