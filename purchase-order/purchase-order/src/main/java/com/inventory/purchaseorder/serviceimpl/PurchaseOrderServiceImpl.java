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
import com.inventory.purchaseorder.dto.purchaseOrderItemDetailsdto;
import com.inventory.purchaseorder.entity.Category;
import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.PurchaseOrder;
import com.inventory.purchaseorder.repository.CategoryRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderItemDetailsRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderItemsRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderRepo;
import com.inventory.purchaseorder.repository.StoreRepo;
import com.inventory.purchaseorder.service.PurchaseOrderService;
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
	private CategoryRepo categoryRepo;

	@Autowired
	private StoreRepo storeRepo;

//	@Override
//	public PurchaseOrderItemsdto savePurchaseOrderItems(PurchaseOrderItemsdto PurchaseOrderItemsdto1) {
//		PurchaseOrder item = purchaseOrderRepo.findByPoNumber(PurchaseOrderItemsdto1.getPoNumber());
//		PurchaseOrderItems items = new PurchaseOrderItems(PurchaseOrderItemsdto1.getItemNumber(),
//				PurchaseOrderItemsdto1.getItemName(), PurchaseOrderItemsdto1.getExpectedQty(),
//				PurchaseOrderItemsdto1.getCategory(), item);
//		PurchaseOrderItems item1 = itemsRepo.save(items);
//		return PurchaseOrderItemsdto1;
//	}

//	@Override
//	public purchaseOrderItemDetailsdto savepurchaseOrderItemDetails(purchaseOrderItemDetailsdto POitemDetails) {
//
//		PurchaseOrderItems items = itemsRepo.findByitemNumber(POitemDetails.getItemNumber());
//		purchaseOrderItemDetails itemDetails = new purchaseOrderItemDetails(POitemDetails.getColor(),
//				POitemDetails.getPrice(), POitemDetails.getStoreref(), POitemDetails.getSize(),
//				POitemDetails.getStock(), POitemDetails.getImageData(), items);
//		purchaseOrderItemDetails purchaseOrderItemDetails1 = itemDetailsRepo.save(itemDetails);
//		return POitemDetails;
//	}
//
	@Override
	public PurchaseOrderCombineddto displayPO(int poNumber) {
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
					PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getCategory(), item);
			itemsRepo.save(items);

			PurchaseOrderItems itemdetail = itemsRepo
					.findByitemNumber(PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getItemNumber());

			System.out.println("item num : "+PurchaseOrderCombineddto.get(i).getPurchaseOrderItemsdto().getItemNumber());
			System.out.println("itemdetails : "+itemdetail);
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
//			} else {
//				purchaseOrderItemDetails purchaseOrderItemDetails = itemDetailsRepo.findByColorAndSizeAndStoreAndItems(
//						PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getColor(),
//						PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getSize(),
//						PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getStore_name(), itemdetail);
//				int Prev_stock;
//				int new_stock;
//				int total_stock = 0;
//
//				if (purchaseOrderItemDetails != null) {
//					Prev_stock = purchaseOrderItemDetails.getStock();
//					new_stock = PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getStock();
//					total_stock = Prev_stock + new_stock;
//					purchaseOrderItemDetails.setStock(total_stock);
//					itemDetailsRepo.save(purchaseOrderItemDetails);
//				}
//
//				else {
//					purchaseOrderItemDetails itemDetails = new purchaseOrderItemDetails(
//							PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getColor(),
//							PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getPrice(),
//							PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getSize(),
//							PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getStock(),
//							PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getImageData(),
//							PurchaseOrderCombineddto.get(i).getPurchaseOrderItemDetailsdto().getStore_name(),
//							itemdetail);
//
//					itemDetailsRepo.save(itemDetails);
//				}
//
//			}

		}
		return PurchaseOrderCombineddto;
	}

}
