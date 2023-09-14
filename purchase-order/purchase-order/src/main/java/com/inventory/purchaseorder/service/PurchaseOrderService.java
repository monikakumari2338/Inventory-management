
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombineddto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombineddtotoSave;
import com.inventory.purchaseorder.dto.PurchaseOrderItemsdto;
import com.inventory.purchaseorder.dto.purchaseOrderItemDetailsdto;


public interface PurchaseOrderService {

//	PurchaseOrderItemsdto savePurchaseOrderItems(PurchaseOrderItemsdto itemsDto);
//	
//	purchaseOrderItemDetailsdto savepurchaseOrderItemDetails(purchaseOrderItemDetailsdto ItemDetailsDto);
	
	List<PurchaseOrderCombineddtotoSave> saveProducts(List<PurchaseOrderCombineddtotoSave> PurchaseOrderCombineddto);
	
	PurchaseOrderCombineddto displayPO(int po);
}
