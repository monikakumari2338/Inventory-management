package com.inventory.purchaseorder.dto;

import java.util.List;

import com.inventory.purchaseorder.entity.PurchaseOrderItems;
import com.inventory.purchaseorder.entity.purchaseOrderItemDetails;

public class PurchaseOrderCombineddto {

	private List<PurchaseOrderItems> purchaseOrderItemsdto;
	private List<purchaseOrderItemDetails> purchaseOrderItemDetailsdto;

	public List<PurchaseOrderItems> getPurchaseOrderItemsdto() {
		return purchaseOrderItemsdto;
	}

	public void setPurchaseOrderItemsdto(List<PurchaseOrderItems> purchaseOrderItemsdto) {
		this.purchaseOrderItemsdto = purchaseOrderItemsdto;
	}

	public List<purchaseOrderItemDetails> getPurchaseOrderItemDetailsdto() {
		return purchaseOrderItemDetailsdto;
	}

	public void setPurchaseOrderItemDetailsdto(List<purchaseOrderItemDetails> purchaseOrderItemDetailsdto) {
		this.purchaseOrderItemDetailsdto = purchaseOrderItemDetailsdto;
	}

	public PurchaseOrderCombineddto(List<PurchaseOrderItems> purchaseOrderItemsdto,
			List<purchaseOrderItemDetails> purchaseOrderItemDetailsdto) {
		super();
		this.purchaseOrderItemsdto = purchaseOrderItemsdto;
		this.purchaseOrderItemDetailsdto = purchaseOrderItemDetailsdto;
	}

	public PurchaseOrderCombineddto() {
		super();
		// TODO Auto-generated constructor stub
	}

}
