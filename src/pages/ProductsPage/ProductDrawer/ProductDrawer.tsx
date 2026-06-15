import { useCallback } from "react";
import {
  CurrencyInput,
  Drawer,
  FormControlLabel,
  ImageUpload,
  Input,
  MdEditor,
  Select,
  Switch,
} from "@kalortech/shared-components";
import { useFormik } from "@kalortech/shared-logic";

import { requestSignedUpload } from "~services";
import type { ProductInsert } from "~services";

import { PRODUCT_INITIAL_VALUES, PRODUCT_SCHEMA } from "./ProductDrawer.constants";
import styles from "./ProductDrawer.module.scss";
import type { ProductDrawerProps, ProductFormValues } from "./ProductDrawer.types";

export const ProductDrawer = (props: ProductDrawerProps) => {
  const { isOpen, onClose, onSubmit, isSubmitting, initialValues, categories } = props;

  const isEditMode = initialValues !== undefined;

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));

  const onSubmitHandler = useCallback(
    (formValues: ProductFormValues) => {
      const payload: ProductInsert = {
        name: formValues.name,
        description: formValues.description || undefined,
        categoryId: formValues.categoryId || undefined,
        price: formValues.price ?? 0,
        imageUrl: formValues.imageUrl,
        isAvailable: formValues.isAvailable,
      };
      onSubmit(payload);
    },
    [onSubmit],
  );

  const { values, errors, onChange, handleSubmit, resetForm, isDisabled, setValues } = useFormik({
    initialValues: initialValues
      ? {
          name: initialValues.name,
          description: initialValues.description ?? "",
          categoryId: initialValues.categoryId ?? "",
          price: initialValues.price,
          imageUrl: initialValues.imageUrl,
          isAvailable: initialValues.isAvailable,
        }
      : PRODUCT_INITIAL_VALUES,
    validationSchema: PRODUCT_SCHEMA,
    enableReinitialize: true,
    onSubmit: onSubmitHandler,
  });

  const { name, description, categoryId, price, imageUrl, isAvailable } = values;
  const { name: nameError, description: descriptionError, price: priceError } = errors;

  const onCloseHandler = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const onConfirmHandler = useCallback(() => {
    void handleSubmit();
  }, [handleSubmit]);

  const onImageUploadHandler = useCallback(async (file: File): Promise<string> => {
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
  }, []);

  const onImageChangeHandler = useCallback(
    (url: string | null) => {
      void setValues((prev) => ({ ...prev, imageUrl: url }));
    },
    [setValues],
  );

  return (
    <Drawer
      title={isEditMode ? "Edit Product" : "Add Product"}
      open={isOpen}
      onClose={onCloseHandler}
      onConfirm={onConfirmHandler}
      isConfirmDisabled={isDisabled}
      isConfirmLoading={isSubmitting}
      destroyOnHidden
    >
      <form className={styles.form}>
        <FormControlLabel layout="vertical" label="Image" name="imageUrl">
          <ImageUpload
            value={imageUrl}
            onChange={onImageChangeHandler}
            onUpload={onImageUploadHandler}
            accept="image/*"
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Name" name="name" required>
          <Input name="name" placeholder="Product name" value={name} onChange={onChange} error={nameError} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Description" name="description">
          <MdEditor
            name="description"
            placeholder="Optional description"
            value={description}
            onChange={onChange}
            error={descriptionError}
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Category" name="categoryId">
          <Select
            name="categoryId"
            options={categoryOptions}
            value={categoryId}
            onChange={onChange}
            placeholder="Select a category"
            allowClear
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Price" name="price" required>
          <CurrencyInput name="price" value={price ?? undefined} onChange={onChange} error={priceError} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Available" name="isAvailable">
          <Switch name="isAvailable" value={isAvailable} onChange={onChange} />
        </FormControlLabel>
      </form>
    </Drawer>
  );
};
