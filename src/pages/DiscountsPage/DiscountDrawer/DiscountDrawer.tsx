import { useCallback } from "react";
import {
  DatePicker,
  Drawer,
  FormControlLabel,
  ImageUpload,
  Input,
  PercentageInput,
  RadioGroup,
  Select,
  Switch,
} from "@kalortech/shared-components";
import { useFormik } from "@kalortech/shared-logic";

import { requestSignedUpload } from "~services";
import type { DiscountInsert } from "~services";

import {
  DISCOUNT_INITIAL_VALUES,
  DISCOUNT_SCHEMA,
  SCOPE_OPTIONS,
} from "./DiscountDrawer.constants";
import styles from "./DiscountDrawer.module.scss";
import type {
  DiscountDrawerProps,
  DiscountFormValues,
} from "./DiscountDrawer.types";

export const DiscountDrawer = (props: DiscountDrawerProps) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    isSubmitting,
    initialValues,
    categories,
    products,
  } = props;

  const isEditMode = initialValues !== undefined;

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));
  const productOptions = products.map((p) => ({ value: p.id, label: p.name }));

  const onSubmitHandler = useCallback(
    (formValues: DiscountFormValues) => {
      const payload: DiscountInsert = {
        name: formValues.name,
        description: formValues.description || undefined,
        percentage: formValues.percentage ?? 0,
        scope: formValues.scope,
        isActive: formValues.isActive,
        startDate: formValues.startDate || undefined,
        endDate: formValues.endDate || undefined,
        imageUrl: formValues.imageUrl,
        ...(formValues.scope === "category"
          ? { categoryId: formValues.categoryId || undefined, productIds: [] }
          : { productIds: formValues.productIds, categoryId: undefined }),
      };
      onSubmit(payload);
    },
    [onSubmit],
  );

  const {
    values,
    errors,
    onChange,
    handleSubmit,
    resetForm,
    isDisabled,
    setValues,
  } = useFormik({
    initialValues: initialValues
      ? {
          name: initialValues.name,
          description: initialValues.description ?? "",
          percentage: initialValues.percentage,
          scope: initialValues.scope,
          categoryId: initialValues.categoryId ?? "",
          productIds: initialValues.productIds ?? [],
          isActive: initialValues.isActive,
          startDate: initialValues.startDate ?? "",
          endDate: initialValues.endDate ?? "",
          imageUrl: initialValues.imageUrl,
        }
      : DISCOUNT_INITIAL_VALUES,
    validationSchema: DISCOUNT_SCHEMA,
    enableReinitialize: true,
    onSubmit: onSubmitHandler,
  });

  const {
    name,
    description,
    percentage,
    scope,
    categoryId,
    productIds,
    isActive,
    startDate,
    endDate,
    imageUrl,
  } = values;
  const { name: nameError, percentage: percentageError } = errors;

  const onCloseHandler = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const onConfirmHandler = useCallback(() => {
    void handleSubmit();
  }, [handleSubmit]);

  const onImageUploadHandler = useCallback(
    async (file: File): Promise<string> => {
      const { signedUrl, publicUrl } = await requestSignedUpload({
        fileName: file.name,
        contentType: file.type,
      });
      await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      return publicUrl;
    },
    [],
  );

  const onImageChangeHandler = useCallback(
    (url: string | null) => {
      void setValues((prev) => ({ ...prev, imageUrl: url }));
    },
    [setValues],
  );

  return (
    <Drawer
      title={isEditMode ? "Edit Discount" : "Add Discount"}
      open={isOpen}
      onClose={onCloseHandler}
      onConfirm={onConfirmHandler}
      isConfirmDisabled={isDisabled}
      isConfirmLoading={isSubmitting}
      destroyOnHidden
    >
      <form className={styles.form}>
        <FormControlLabel
          layout="vertical"
          label="Banner Image"
          name="imageUrl"
        >
          <ImageUpload
            value={imageUrl}
            onChange={onImageChangeHandler}
            onUpload={onImageUploadHandler}
            accept="image/*"
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Name" name="name" required>
          <Input
            name="name"
            placeholder="e.g. Summer Sale"
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
            isTextArea
          />
        </FormControlLabel>

        <FormControlLabel
          layout="vertical"
          label="Discount %"
          name="percentage"
          required
        >
          <PercentageInput
            name="percentage"
            value={percentage ?? undefined}
            onChange={onChange}
            error={percentageError}
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Scope" name="scope">
          <RadioGroup
            name="scope"
            options={[...SCOPE_OPTIONS]}
            value={scope}
            onChange={onChange}
          />
        </FormControlLabel>

        {scope === "category" && (
          <FormControlLabel
            layout="vertical"
            label="Category"
            name="categoryId"
          >
            <Select
              name="categoryId"
              options={categoryOptions}
              value={categoryId}
              onChange={onChange}
              placeholder="Select a category"
              allowClear
            />
          </FormControlLabel>
        )}

        {scope === "products" && (
          <FormControlLabel
            layout="vertical"
            label="Products"
            name="productIds"
          >
            <Select
              name="productIds"
              options={productOptions}
              value={productIds}
              onChange={onChange}
              mode="multiple"
              placeholder="Select products"
              allowClear
            />
          </FormControlLabel>
        )}

        <FormControlLabel layout="vertical" label="Start Date" name="startDate">
          <DatePicker name="startDate" value={startDate} onChange={onChange} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="End Date" name="endDate">
          <DatePicker name="endDate" value={endDate} onChange={onChange} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Active" name="isActive">
          <Switch name="isActive" value={isActive} onChange={onChange} />
        </FormControlLabel>
      </form>
    </Drawer>
  );
};
