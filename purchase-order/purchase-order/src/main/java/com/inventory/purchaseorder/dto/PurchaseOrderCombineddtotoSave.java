package com.inventory.purchaseorder.dto;

import java.util.List;

public class PurchaseOrderCombineddtotoSave {

	private String attachedImage;
	private List<PurchaseOrderItemsdto> purchaseOrderItemsdto;

	public String getAttachedImage() {
		return attachedImage;
	}

	public void setAttachedImage(String attachedImage) {
		this.attachedImage = attachedImage;
	}

	public List<PurchaseOrderItemsdto> getPurchaseOrderItemsdto() {
		return purchaseOrderItemsdto;
	}

	public void setPurchaseOrderItemsdto(List<PurchaseOrderItemsdto> purchaseOrderItemsdto) {
		this.purchaseOrderItemsdto = purchaseOrderItemsdto;
	}

	public PurchaseOrderCombineddtotoSave(String attachedImage, List<PurchaseOrderItemsdto> purchaseOrderItemsdto) {
		super();
		this.attachedImage = attachedImage;
		this.purchaseOrderItemsdto = purchaseOrderItemsdto;
	}

	public PurchaseOrderCombineddtotoSave() {
		super();
		// TODO Auto-generated constructor stub
	}

}
