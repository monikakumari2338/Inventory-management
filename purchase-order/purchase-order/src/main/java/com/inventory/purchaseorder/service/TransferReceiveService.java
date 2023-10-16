
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.TransferReceiveInfodto;
import com.inventory.purchaseorder.dto.TransferReceiveProductsdto;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.TransferReceiveInfo;
import com.inventory.purchaseorder.entity.TransferReceiveProducts;

public interface TransferReceiveService {

	String save_transferInfo(TransferReceiveInfodto transferReceiveInfo);

	TransferReceiveProductsdto saveTransferReceive(TransferReceiveProductsdto transferReceiveProductsdto);

	List<TransferReceiveInfodto> getTransferId(int asnNumber);

	List<TransferReceiveProductsdto> getTransferReceiveProducts(int transferId);

	List<ProductCombineddto> saveTransferRecieveProducts(List<ProductCombineddto> productCombineddto, int transferId);
}
