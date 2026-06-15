import { useCallback } from "react";
import {
  ColorPicker,
  Drawer,
  FormControlLabel,
  Input,
} from "@kalortech/shared-components";
import { createChangeEvent, useFormik } from "@kalortech/shared-logic";

import type { CategoryInsert } from "~services";

import {
  CATEGORY_INITIAL_VALUES,
  CATEGORY_SCHEMA,
} from "./CategoryDrawer.constants";
import styles from "./CategoryDrawer.module.scss";
import { rgbToHex } from "./CategoryDrawer.utils";
import type {
  CategoryDrawerProps,
  CategoryFormValues,
} from "./CategoryDrawer.types";

export const CategoryDrawer = (props: CategoryDrawerProps) => {
  const { isOpen, onClose, onSubmit, isSubmitting, initialValues } = props;

  const isEditMode = initialValues !== undefined;

  const onSubmitHandler = useCallback(
    (formValues: CategoryFormValues) => {
      const payload: CategoryInsert = {
        name: formValues.name,
        description: formValues.description || undefined,
        color: formValues.color || undefined,
      };
      onSubmit(payload);
    },
    [onSubmit],
  );

  const { values, errors, onChange, handleSubmit, resetForm, isDisabled } =
    useFormik({
      initialValues: initialValues
        ? {
            name: initialValues.name,
            description: initialValues.description ?? "",
            color: initialValues.color ?? "",
          }
        : CATEGORY_INITIAL_VALUES,
      validationSchema: CATEGORY_SCHEMA,
      enableReinitialize: true,
      onSubmit: onSubmitHandler,
    });

  const { name, description, color } = values;
  const {
    name: nameError,
    description: descriptionError,
    color: colorError,
  } = errors;

  const onColorChangeHandler = useCallback(
    (event: React.SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      onChange(
        createChangeEvent({ name: "color", value: rgbToHex(target.value) }),
      );
    },
    [onChange],
  );

  const onCloseHandler = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const onConfirmHandler = useCallback(() => {
    void handleSubmit();
  }, [handleSubmit]);

  return (
    <Drawer
      title={isEditMode ? "Edit Category" : "Add Category"}
      open={isOpen}
      onClose={onCloseHandler}
      onConfirm={onConfirmHandler}
      isConfirmDisabled={isDisabled}
      isConfirmLoading={isSubmitting}
      destroyOnHidden
    >
      <form className={styles.form}>
        <FormControlLabel layout="vertical" label="Name" name="name" required>
          <Input
            name="name"
            placeholder="e.g. Beverages"
            value={name}
            onChange={onChange}
            error={nameError}
          />
        </FormControlLabel>

        <FormControlLabel
          layout="vertical"
          label="Description"
          name="description"
        >
          <Input
            name="description"
            placeholder="Optional description"
            value={description}
            onChange={onChange}
            error={descriptionError}
            isTextArea
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Color" name="color">
          <ColorPicker
            name="color"
            value={color}
            onChange={onColorChangeHandler}
            error={colorError}
          />
        </FormControlLabel>
      </form>
    </Drawer>
  );
};
