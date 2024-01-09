
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.TransferReceiveInfodto;
import com.inventory.purchaseorder.dto.TransferReceiveProductsdto;

public interface TransferReceiveService {

	String save_transferInfo(TransferReceiveInfodto transferReceiveInfo);

	TransferReceiveProductsdto saveTransferReceive(TransferReceiveProductsdto transferReceiveProductsdto);

	List<ProductCombineddto> saveTransferRecieveProducts(List<ProductCombineddto> productCombineddto, int transferId);

	List<TransferReceiveInfodto> getTransferId(String asnNumber);

	List<TransferReceiveProductsdto> getTransferReceiveProducts(int transferId);
}
