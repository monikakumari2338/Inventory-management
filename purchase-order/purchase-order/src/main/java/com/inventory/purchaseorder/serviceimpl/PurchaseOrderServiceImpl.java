package com.inventory.purchaseorder.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.entity.PurchaseOrderItems;
import com.inventory.purchaseorder.entity.Stores;
import com.inventory.purchaseorder.dto.Productdto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombineddto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombineddtotoSave;
import com.inventory.purchaseorder.dto.PurchaseOrderItemsdto;
import com.inventory.purchaseorder.dto.PurchaseOrderdto;
import com.inventory.purchaseorder.dto.purchaseOrderItemDetailsdto;
import com.inventory.purchaseorder.entity.ASN;
import com.inventory.purchaseorder.entity.Category;
import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.PurchaseOrder;
import com.inventory.purchaseorder.repository.ASNRepo;
import com.inventory.purchaseorder.repository.CategoryRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderItemDetailsRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderItemsRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderRepo;
import com.inventory.purchaseorder.repository.StoreRepo;
import com.inventory.purchaseorder.service.PurchaseOrderService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import com.inventory.purchaseorder.entity.purchaseOrderItemDetails;

@Service
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

	@Autowired
	private PurchaseOrderItemsRepo itemsRepo;

	@Autowired
	private PurchaseOrderItemDetailsRepo itemDetailsRepo;

	@Autowired
	private PurchaseOrderRepo purchaseOrderRepo;

	@Autowired
	private ASNRepo asnRepo;

	@Override
	public PurchaseOrderCombineddto displayPO(String poNumber) {
		PurchaseOrder purchaseOrder = purchaseOrderRepo.findByPoNumber(poNumber);
		List<PurchaseOrderItems> purchaseOrderItems = itemsRepo.findAllByPurchaseOrder(purchaseOrder);

		List<purchaseOrderItemDetails> POItemDetail = new ArrayList<>();
		for (int i = 0; i < purchaseOrderItems.size(); i++) {
			POItemDetail.addAll(itemDetailsRepo.findAllByItems(purchaseOrderItems.get(i)));
		}
		PurchaseOrderCombineddto purchaseOrderCombineddto = new PurchaseOrderCombineddto();
		purchaseOrderCombineddto.setPurchaseOrderItemsdto(purchaseOrderItems);
		purchaseOrderCombineddto.setPurchaseOrderItemDetailsdto(POItemDetail);
		return purchaseOrderCombineddto;
	}

	@Override
	public List<PurchaseOrderCombineddtotoSave> saveProducts(
			List<PurchaseOrderCombineddtotoSave> PurchaseOrderCombineddto) {

		for (int i = 0; i < PurchaseOrderCombineddto.size(); i++) {

			PurchaseOrder item = purchaseOrderRepo
					.findByPoNumber(PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getPoNumber());

			PurchaseOrderItems items = new PurchaseOrderItems(
					PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getItemNumber(),
					PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getItemName(),
					PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getExpectedQty(),
					PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getReceived_qty(),
					PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getCategory(), item);
			itemsRepo.save(items);

			PurchaseOrderItems itemdetail = itemsRepo
					.findByitemNumber(PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getItemNumber());

			System.out.println(
					"item num : " + PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getItemNumber());
			System.out.println("itemdetails : " + itemdetail);
			purchaseOrderItemDetails purchaseOrderItemDetails = itemDetailsRepo.findByColorAndSizeAndStoreAndItems(
					PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getColor(),
					PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getSize(),
					PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getStore_name(), itemdetail);
			System.out.println("purchaseOrderItemDetails : " + purchaseOrderItemDetails);
			if (purchaseOrderItemDetails == null) {
				System.out.println("purchaseOrderItemDetails-inside : " + purchaseOrderItemDetails);
				purchaseOrderItemDetails itemDetails = new purchaseOrderItemDetails(
						PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getColor(),
						PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getPrice(),
						PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getSize(),
						PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getStock(),
						PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getImageData(),
						PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getStore_name(), itemdetail);

				itemDetailsRepo.save(itemDetails);
			} else {
				int Prev_stock;
				int new_stock;
				int total_stock = 0;

				if (purchaseOrderItemDetails != null) {
					Prev_stock = purchaseOrderItemDetails.getStock();
					new_stock = PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getStock();
					total_stock = Prev_stock + new_stock;
					purchaseOrderItemDetails.setStock(total_stock);
					itemDetailsRepo.save(purchaseOrderItemDetails);
				}

			}

		}

//		PurchaseOrder PO = purchaseOrderRepo.findByPoNumber(PurchaseOrderCombineddto.get(0).getPurchaseOrderItemsdto().getPoNumber());
//        PO.setReceived_qty(20);
		return PurchaseOrderCombineddto;
	}

	// API's for finding asn and po list by status

	@Override
	public List<ASN> findByStatus(String Status) {
		List<ASN> asn = asnRepo.findAllByStatus(Status);
		return asn;
	}

	@Override
	public List<PurchaseOrderdto> findpoByStatus(String Status) {
		List<PurchaseOrderdto> purschaseOrderDto = new ArrayList<PurchaseOrderdto>();
		List<PurchaseOrder> purchaseOrder = purchaseOrderRepo.findAllByStatus(Status);
		for (int i = 0; i < purchaseOrder.size(); i++) {
			purschaseOrderDto.add(new PurchaseOrderdto(purchaseOrder.get(i).getPoNumber(),
					purchaseOrder.get(i).getStatus(), purchaseOrder.get(i).getAsn().getAsnNumber(),
					purchaseOrder.get(i).getExpected_qty(), purchaseOrder.get(i).getReceived_qty()));
		}
		// System.out.println(purschaseOrderDto);
		return purschaseOrderDto;
	}

	@Override
	public List<PurchaseOrder> findMatchedPoByStatus(String status) {

		return purchaseOrderRepo.findByStatusContaining(status);
	}

	@Override
	public List<PurchaseOrder> findMatchedPoNumber(String po) {
		//String num = Integer.toString(po);
		return purchaseOrderRepo.findByPoNumberContaining(po);
	}

}
