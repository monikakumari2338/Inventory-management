
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.PurchaseOrderCombineddto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombineddtotoSave;
import com.inventory.purchaseorder.dto.PurchaseOrderdto;
import com.inventory.purchaseorder.entity.ASN;
import com.inventory.purchaseorder.entity.PurchaseOrder;

public interface PurchaseOrderService {

	List<PurchaseOrderCombineddtotoSave> saveProducts(List<PurchaseOrderCombineddtotoSave> PurchaseOrderCombineddto);

	PurchaseOrderCombineddto displayPO(String po);

	// Functions for finding asn and po list by status

	List<ASN> findByStatus(String Status);

	List<PurchaseOrderdto> findpoByStatus(String Status);

	List<PurchaseOrder> findMatchedPoByStatus(String status);

	List<PurchaseOrder> findMatchedPoNumber(String po);
}
