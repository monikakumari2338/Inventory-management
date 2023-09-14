package com.inventory.purchaseorder.dto;

import com.inventory.purchaseorder.entity.PurchaseOrderItems;
import com.inventory.purchaseorder.entity.purchaseOrderItemDetails;

public class PurchaseOrderCombineddtotoSave {

	private PurchaseOrderItemsdto purchaseOrderItemsdto;
	private purchaseOrderItemDetailsdto purchaseOrderItemDetailsdto;

	public PurchaseOrderItemsdto getPurchaseOrderItemsdto() {
		return purchaseOrderItemsdto;
	}

	public void setPurchaseOrderItemsdto(PurchaseOrderItemsdto purchaseOrderItemsdto) {
		this.purchaseOrderItemsdto = purchaseOrderItemsdto;
	}

	public purchaseOrderItemDetailsdto getPurchaseOrderItemDetailsdto() {
		return purchaseOrderItemDetailsdto;
	}

	public void setPurchaseOrderItemDetailsdto(purchaseOrderItemDetailsdto purchaseOrderItemDetailsdto) {
		this.purchaseOrderItemDetailsdto = purchaseOrderItemDetailsdto;
	}

	public PurchaseOrderCombineddtotoSave(PurchaseOrderItemsdto purchaseOrderItemsdto,
			com.inventory.purchaseorder.dto.purchaseOrderItemDetailsdto purchaseOrderItemDetailsdto) {
		super();
		this.purchaseOrderItemsdto = purchaseOrderItemsdto;
		this.purchaseOrderItemDetailsdto = purchaseOrderItemDetailsdto;
	}

	public PurchaseOrderCombineddtotoSave() {
		super();
		// TODO Auto-generated constructor stub
	}

}
