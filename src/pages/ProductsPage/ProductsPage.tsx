import { useEffect } from "react";
import { useToolbar } from "@kalortech/shared-components";
import { Pagination, Spin } from "antd";
import { Filter, Plus } from "lucide-react";

import { DeleteProductModal } from "./DeleteProductModal";
import { ProductCard } from "./ProductCard";
import { ProductDrawer } from "./ProductDrawer";
import { ProductFilters } from "./ProductFilters";
import { PRODUCTS_PAGE_SIZE } from "./ProductsPage.constants";
import { useProductsApi } from "./ProductsPage.hooks";
import styles from "./ProductsPage.module.scss";

export const ProductsPage = () => {
  const { setToolbarItems } = useToolbar();

  const {
    products,
    productsTotal,
    isProductsLoading,
    categories,
    page,
    filters,
    hasActiveFilters,
    selectedProduct,
    drawerDisclosure,
    filtersDrawerDisclosure,
    deleteModalDisclosure,
    isCreating,
    isUpdating,
    isDeleting,
    onAddHandler,
    onEditHandler,
    onDeleteHandler,
    onDrawerSubmitHandler,
    onDeleteConfirmHandler,
    onFiltersApplyHandler,
    onPageChangeHandler,
  } = useProductsApi();

  useEffect(() => {
    setToolbarItems([
      {
        key: "filter-products",
        label: "Filter",
        Icon: Filter,
        type: "default",
        badge: hasActiveFilters,
        onClick: filtersDrawerDisclosure.onOpenHandler,
      },
      {
        key: "add-product",
        label: "Add Product",
        Icon: Plus,
        type: "primary",
        onClick: onAddHandler,
      },
    ]);
    return () => setToolbarItems([]);
  }, [setToolbarItems, onAddHandler, filtersDrawerDisclosure.onOpenHandler, hasActiveFilters]);

  if (isProductsLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      {products && products.length > 0 ? (
        <>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={onEditHandler}
                onDelete={onDeleteHandler}
              />
            ))}
          </div>

          <div className={styles.pagination}>
            <Pagination
              current={page}
              total={productsTotal}
              pageSize={PRODUCTS_PAGE_SIZE}
              onChange={onPageChangeHandler}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <div className={styles.emptyState}>
          <p>No products found. Click &quot;Add Product&quot; to create one.</p>
        </div>
      )}

      <ProductDrawer
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onCloseHandler}
        onSubmit={onDrawerSubmitHandler}
        isSubmitting={isCreating || isUpdating}
        initialValues={selectedProduct ?? undefined}
        categories={categories}
      />

      <ProductFilters
        isOpen={filtersDrawerDisclosure.isOpen}
        onClose={filtersDrawerDisclosure.onCloseHandler}
        onApply={onFiltersApplyHandler}
        currentFilters={filters}
        categories={categories}
      />

      <DeleteProductModal
        product={selectedProduct}
        isOpen={deleteModalDisclosure.isOpen}
        onClose={deleteModalDisclosure.onCloseHandler}
        onConfirm={onDeleteConfirmHandler}
        isDeleting={isDeleting}
      />
    </div>
  );
};
