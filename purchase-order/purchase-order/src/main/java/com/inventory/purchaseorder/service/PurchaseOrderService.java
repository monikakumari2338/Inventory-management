
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.ASNCombinedDto;
import com.inventory.purchaseorder.dto.ASNDto;
import com.inventory.purchaseorder.dto.ASNOnLoadDto;
import com.inventory.purchaseorder.dto.ASNPOItemDetailsDto;
import com.inventory.purchaseorder.dto.AsnAndPOCombinedDto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombinedDto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombineddtotoSave;
import com.inventory.purchaseorder.dto.PurchaseOrderItemsdto;
import com.inventory.purchaseorder.dto.PurchaseOrderOnLoadDTO;
import com.inventory.purchaseorder.dto.PurchaseOrderdto;
import com.inventory.purchaseorder.entity.ASN;
import com.inventory.purchaseorder.entity.ASNPOItemDetails;
import com.inventory.purchaseorder.entity.PoDamagedItemsList;
import com.inventory.purchaseorder.entity.PurchaseOrder;
import com.inventory.purchaseorder.entity.PurchaseOrderItems;

public interface PurchaseOrderService {

	PurchaseOrderCombinedDto savePurchaseOrder(PurchaseOrderCombinedDto combinedDto);

	ASNCombinedDto saveASN(ASNCombinedDto asnCombinedDto);

	AsnAndPOCombinedDto getAllPOAndASN();

	List<PurchaseOrderItemsdto> getPoItemsByPoNumber(int poNumber);

	List<ASNPOItemDetailsDto> getPoItemsByAsnNumber(int asnNumber);

	String saveDamagedPoItems(List<PoDamagedItemsList> poDamagedItemsList);

	List<PoDamagedItemsList> getDamagedPoItemsByAsnOrPo(int number);

	String savePoToMaster(PurchaseOrderCombineddtotoSave combinedDto, String storeName);

}
