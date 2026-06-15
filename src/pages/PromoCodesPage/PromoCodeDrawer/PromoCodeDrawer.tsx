import { useCallback } from "react";
import {
  CurrencyInput,
  DateTimePicker,
  Drawer,
  FormControlLabel,
  Input,
  PercentageInput,
  RadioGroup,
  Switch,
} from "@kalortech/shared-components";
import { useFormik } from "@kalortech/shared-logic";

import { DISCOUNT_TYPE_PERCENTAGE } from "~services";
import type { PromoCodeInsert } from "~services";

import { DISCOUNT_TYPE_OPTIONS, PROMO_CODE_INITIAL_VALUES, PROMO_CODE_SCHEMA } from "./PromoCodeDrawer.constants";
import styles from "./PromoCodeDrawer.module.scss";
import type { PromoCodeDrawerProps, PromoCodeFormValues } from "./PromoCodeDrawer.types";

export const PromoCodeDrawer = (props: PromoCodeDrawerProps) => {
  const { isOpen, onClose, onSubmit, isSubmitting, initialValues } = props;

  const isEditMode = initialValues !== undefined;

  const onSubmitHandler = useCallback(
    (formValues: PromoCodeFormValues) => {
      const payload: PromoCodeInsert = {
        code: formValues.code.toUpperCase(),
        discountType: formValues.discountType,
        discountValue: formValues.discountValue ?? 0,
        minOrderAmount: formValues.minOrderAmount,
        maxUses: formValues.maxUses,
        expiresAt: formValues.expiresAt || undefined,
        isActive: formValues.isActive,
      };
      onSubmit(payload);
    },
    [onSubmit],
  );

  const { values, errors, onChange, handleSubmit, resetForm, isDisabled } = useFormik({
    initialValues: initialValues
      ? {
          code: initialValues.code,
          discountType: initialValues.discountType,
          discountValue: initialValues.discountValue,
          minOrderAmount: initialValues.minOrderAmount,
          maxUses: initialValues.maxUses,
          expiresAt: initialValues.expiresAt ?? "",
          isActive: initialValues.isActive,
        }
      : PROMO_CODE_INITIAL_VALUES,
    validationSchema: PROMO_CODE_SCHEMA,
    enableReinitialize: true,
    onSubmit: onSubmitHandler,
  });

  const { code, discountType, discountValue, minOrderAmount, maxUses, expiresAt, isActive } = values;
  const { code: codeError, discountValue: discountValueError, minOrderAmount: minOrderAmountError, maxUses: maxUsesError } = errors;

  const onCloseHandler = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const onConfirmHandler = useCallback(() => {
    void handleSubmit();
  }, [handleSubmit]);

  return (
    <Drawer
      title={isEditMode ? "Edit Promo Code" : "Add Promo Code"}
      open={isOpen}
      onClose={onCloseHandler}
      onConfirm={onConfirmHandler}
      isConfirmDisabled={isDisabled}
      isConfirmLoading={isSubmitting}
      destroyOnHidden
    >
      <form className={styles.form}>
        <FormControlLabel layout="vertical" label="Code" name="code" required>
          <Input
            name="code"
            placeholder="e.g. SUMMER20"
            value={code}
            onChange={onChange}
            error={codeError}
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Discount Type" name="discountType">
          <RadioGroup name="discountType" options={[...DISCOUNT_TYPE_OPTIONS]} value={discountType} onChange={onChange} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Discount Value" name="discountValue" required>
          {discountType === DISCOUNT_TYPE_PERCENTAGE ? (
            <PercentageInput name="discountValue" value={discountValue ?? undefined} onChange={onChange} error={discountValueError} />
          ) : (
            <CurrencyInput name="discountValue" value={discountValue ?? undefined} onChange={onChange} error={discountValueError} />
          )}
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Minimum Order Amount" name="minOrderAmount">
          <CurrencyInput name="minOrderAmount" value={minOrderAmount ?? undefined} onChange={onChange} error={minOrderAmountError} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Max Uses" name="maxUses">
          <Input
            name="maxUses"
            type="number"
            placeholder="Leave empty for unlimited"
            value={maxUses ?? ""}
            onChange={onChange}
            error={maxUsesError}
          />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Expires At" name="expiresAt">
          <DateTimePicker name="expiresAt" value={expiresAt} onChange={onChange} />
        </FormControlLabel>

        <FormControlLabel layout="vertical" label="Active" name="isActive">
          <Switch name="isActive" value={isActive} onChange={onChange} />
        </FormControlLabel>
      </form>
    </Drawer>
  );
};
