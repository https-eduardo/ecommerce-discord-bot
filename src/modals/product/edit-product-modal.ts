import { Product } from "../../types/product";
import { createProductModal } from "./create-product-modal";

export function editProductModal(product: Product) {
  const modal = createProductModal();
  modal.setTitle("Editar produto");
  modal.setCustomId(`edit-product-modal-${product.id}`);

  for (const actionRow of modal.components) {
    for (const component of actionRow.components) {
      if (component.data.custom_id) {
        const value = product[component.data.custom_id];
        if (value) component.setValue(value.toString());
      }
    }
  }

  return modal;
}
