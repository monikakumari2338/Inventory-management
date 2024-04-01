package com.inventory.purchaseorder.dto;

import java.util.List;

public class AsnAndPOCombinedDto {

	private List<ASNOnLoadDto> ASN;
	private List<PurchaseOrderdto> PurchaseOrder;

	public List<ASNOnLoadDto> getASN() {
		return ASN;
	}

	public void setASN(List<ASNOnLoadDto> aSN) {
		ASN = aSN;
	}

	public List<PurchaseOrderdto> getPurchaseOrder() {
		return PurchaseOrder;
	}

	public void setPurchaseOrder(List<PurchaseOrderdto> purchaseOrder) {
		PurchaseOrder = purchaseOrder;
	}

	public AsnAndPOCombinedDto(List<ASNOnLoadDto> aSN, List<PurchaseOrderdto> purchaseOrder) {
		super();
		ASN = aSN;
		PurchaseOrder = purchaseOrder;
	}

	public AsnAndPOCombinedDto() {
		super();
		// TODO Auto-generated constructor stub
	}

}
