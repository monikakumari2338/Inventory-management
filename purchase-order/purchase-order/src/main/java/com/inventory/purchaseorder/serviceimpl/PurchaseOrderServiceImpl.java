package com.inventory.purchaseorder.serviceimpl;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.entity.PurchaseOrderItems;
import com.inventory.purchaseorder.entity.Stores;
import com.inventory.purchaseorder.dto.ASNCombinedDto;
import com.inventory.purchaseorder.dto.ASNOnLoadDto;
import com.inventory.purchaseorder.dto.ASNPOItemDetailsDto;
import com.inventory.purchaseorder.dto.AsnAndPOCombinedDto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombinedDto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombineddtotoSave;
import com.inventory.purchaseorder.dto.PurchaseOrderItemsdto;
import com.inventory.purchaseorder.dto.PurchaseOrderdto;
import com.inventory.purchaseorder.entity.ASN;
import com.inventory.purchaseorder.entity.ASNPOItemDetails;
import com.inventory.purchaseorder.entity.Category;
import com.inventory.purchaseorder.entity.PoDamagedItemsList;
import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.PurchaseOrder;
import com.inventory.purchaseorder.repository.ASNPOItemDetailsRepo;
import com.inventory.purchaseorder.repository.ASNRepo;
import com.inventory.purchaseorder.repository.CategoryRepo;
import com.inventory.purchaseorder.repository.PoDamagedItemsListRepo;
import com.inventory.purchaseorder.repository.ProductDetailsRepo;
import com.inventory.purchaseorder.repository.ProductRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderItemsRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderRepo;
import com.inventory.purchaseorder.repository.StoreRepo;
import com.inventory.purchaseorder.service.PurchaseOrderService;

@Service
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

	@Autowired
	private ProductRepo productRepo;

	@Autowired
	private ProductDetailsRepo productDetailsRepo;

	@Autowired
	private PurchaseOrderItemsRepo itemsRepo;

	@Autowired
	private PurchaseOrderRepo purchaseOrderRepo;

	@Autowired
	private ASNRepo asnRepo;

	@Autowired
	private ASNPOItemDetailsRepo asnPOItemDetailsRepo;

	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private StoreRepo storeRepo;

	@Autowired
	private PoDamagedItemsListRepo poDamagedItemsRepo;

	@Override
	public ASNCombinedDto saveASN(ASNCombinedDto asnCombinedDto) {

		List<PurchaseOrder> purchaseOrder = new ArrayList<>();
		List<Integer> poNumber_List = asnCombinedDto.getAsn().getPoNumber();

		for (int i = 0; i < poNumber_List.size(); i++) {
			PurchaseOrder purchase_Order = purchaseOrderRepo.findByPoNumber(poNumber_List.get(i));
			purchaseOrder.add(purchase_Order);
		}
		ASN asn = new ASN(asnCombinedDto.getAsn().getQuantity(), asnCombinedDto.getAsn().getCreationDate(),
				asnCombinedDto.getAsn().getStatus(), null, purchaseOrder);
		asnRepo.save(asn);

		for (int i = 0; i < asnCombinedDto.getAsnDetails().size(); i++) {
			ASNPOItemDetails asnDetails = new ASNPOItemDetails(asnCombinedDto.getAsnDetails().get(i).getItemNumber(),
					asnCombinedDto.getAsnDetails().get(i).getItemName(),
					asnCombinedDto.getAsnDetails().get(i).getExpectedQty(),
					asnCombinedDto.getAsnDetails().get(i).getShippedQty(),
					asnCombinedDto.getAsnDetails().get(i).getRemainingQty(),
					asnCombinedDto.getAsnDetails().get(i).getCategory(),
					asnCombinedDto.getAsnDetails().get(i).getColor(), asnCombinedDto.getAsnDetails().get(i).getPrice(),
					asnCombinedDto.getAsnDetails().get(i).getSize(),
					asnCombinedDto.getAsnDetails().get(i).getImageData(),
					asnCombinedDto.getAsnDetails().get(i).getUpc(), asnCombinedDto.getAsnDetails().get(i).getSku(),
					asnCombinedDto.getAsnDetails().get(i).getTaxPercentage(),
					asnCombinedDto.getAsnDetails().get(i).getTaxCode(),
					asnCombinedDto.getAsnDetails().get(i).getPoNumber(), asn);

			asnPOItemDetailsRepo.save(asnDetails);
		}
		return asnCombinedDto;

	}

	@Override
	public PurchaseOrderCombinedDto savePurchaseOrder(PurchaseOrderCombinedDto combinedDto) {

		PurchaseOrder purchaseOrder = new PurchaseOrder(combinedDto.getPurchaseOrderdto().getStatus(),
				combinedDto.getPurchaseOrderdto().getSupplierId(), combinedDto.getPurchaseOrderdto().getCost(),
				combinedDto.getPurchaseOrderdto().getTotalSKU(), combinedDto.getPurchaseOrderdto().getStoreLocation(),
				combinedDto.getPurchaseOrderdto().getCreationDate(),
				combinedDto.getPurchaseOrderdto().getReceiveAfter(),
				combinedDto.getPurchaseOrderdto().getReceiveBefore(),
				combinedDto.getPurchaseOrderdto().getExpectedDeliveryDate(), null, null);

		purchaseOrderRepo.save(purchaseOrder);

		PurchaseOrder po = purchaseOrderRepo.findFirstByOrderByPoNumberDesc();
		for (int i = 0; i < combinedDto.getPurchaseOrderItemsdto().size(); i++) {
			PurchaseOrderItems purchaseOrderItems = new PurchaseOrderItems(
					combinedDto.getPurchaseOrderItemsdto().get(i).getItemNumber(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getItemName(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getExpectedQty(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getReceivedQty(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getRemainingQty(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getCategory(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getColor(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getPrice(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getSize(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getImageData(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getUpc(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getSku(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getTaxPercentage(),
					combinedDto.getPurchaseOrderItemsdto().get(i).getTaxCode(), po);

			itemsRepo.save(purchaseOrderItems);

		}
		return combinedDto;

	}

	@Override
	public List<PurchaseOrderItemsdto> getPoItemsByPoNumber(int poNumber) {
		PurchaseOrder purchaseOrder = purchaseOrderRepo.findByPoNumber(poNumber);
		List<PurchaseOrderItems> purchaseOrderItems = itemsRepo.findAllByPurchaseOrder(purchaseOrder);

		List<PurchaseOrderItemsdto> PurchaseOrderItemsdto = new ArrayList<>();
		for (int i = 0; i < purchaseOrderItems.size(); i++) {
			// System.out.println("asn--" +
			// purchaseOrderItems.get(i).getPurchaseOrder().getAsn());
			PurchaseOrderItemsdto purchaseOrderItemsdto = new PurchaseOrderItemsdto(
					purchaseOrderItems.get(i).getItemNumber(), purchaseOrderItems.get(i).getItemName(),
					purchaseOrderItems.get(i).getExpectedQty(), purchaseOrderItems.get(i).getReceivedQty(),
					purchaseOrderItems.get(i).getRemainingQty(), purchaseOrderItems.get(i).getCategory(),
					purchaseOrderItems.get(i).getColor(), purchaseOrderItems.get(i).getPrice(),
					purchaseOrderItems.get(i).getSize(), purchaseOrderItems.get(i).getImageData(),
					purchaseOrderItems.get(i).getUpc(), purchaseOrderItems.get(i).getSku(),
					purchaseOrderItems.get(i).getTaxPercentage(), purchaseOrderItems.get(i).getTaxCode(),
					purchaseOrderItems.get(i).getPurchaseOrder().getPoNumber(), 0);
			PurchaseOrderItemsdto.add(purchaseOrderItemsdto);
		}
		return PurchaseOrderItemsdto;
	}

	@Override
	public List<ASNPOItemDetailsDto> getPoItemsByAsnNumber(int asnNumber) {

		ASN asn = asnRepo.findByasnNumber(asnNumber);
		List<ASNPOItemDetails> asnPOItemDetails = asnPOItemDetailsRepo.findByAsn(asn);

		List<ASNPOItemDetailsDto> items = new ArrayList<>();

		for (int i = 0; i < asnPOItemDetails.size(); i++) {
			ASNPOItemDetailsDto aSNPOItemDetailsDto = new ASNPOItemDetailsDto(asnPOItemDetails.get(i).getItemNumber(),
					asnPOItemDetails.get(i).getItemName(), asnPOItemDetails.get(i).getExpectedQty(),
					asnPOItemDetails.get(i).getShippedQty(), asnPOItemDetails.get(i).getRemainingQty(),
					asnPOItemDetails.get(i).getCategory(), asnPOItemDetails.get(i).getColor(),
					asnPOItemDetails.get(i).getPrice(), asnPOItemDetails.get(i).getSize(),
					asnPOItemDetails.get(i).getImageData(), asnPOItemDetails.get(i).getUpc(),
					asnPOItemDetails.get(i).getSku(), asnPOItemDetails.get(i).getTaxPercentage(),
					asnPOItemDetails.get(i).getTaxCode(), asnPOItemDetails.get(i).getPoNumber(),
					asnPOItemDetails.get(i).getAsn().getAsnNumber());
			items.add(aSNPOItemDetailsDto);
		}
		return items;
	}

	@Override
	public String savePoToMaster(PurchaseOrderCombineddtotoSave combinedDto, String storeName) {

		Stores store = storeRepo.findByStoreName(storeName);
		for (int i = 0; i < combinedDto.getPurchaseOrderItemsdto().size(); i++) {
			Category category = categoryRepo
					.findByCategory(combinedDto.getPurchaseOrderItemsdto().get(i).getCategory());
			Product product = productRepo
					.findByItemNumber(combinedDto.getPurchaseOrderItemsdto().get(i).getItemNumber());

			if (product == null) {

				Product product1 = new Product(combinedDto.getPurchaseOrderItemsdto().get(i).getItemNumber(),
						combinedDto.getPurchaseOrderItemsdto().get(i).getItemName(), category);
				productRepo.save(product1);

				Product product2 = productRepo
						.findByItemNumber(combinedDto.getPurchaseOrderItemsdto().get(i).getItemNumber());
				ProductDetails productDetails2 = new ProductDetails(
						combinedDto.getPurchaseOrderItemsdto().get(i).getColor(),
						combinedDto.getPurchaseOrderItemsdto().get(i).getPrice(),
						combinedDto.getPurchaseOrderItemsdto().get(i).getSize(),
						combinedDto.getPurchaseOrderItemsdto().get(i).getReceivedQty(), 0,
						combinedDto.getPurchaseOrderItemsdto().get(i).getImageData(), store, product2,
						combinedDto.getPurchaseOrderItemsdto().get(i).getUpc(),
						combinedDto.getPurchaseOrderItemsdto().get(i).getSku());

				int total_stock = combinedDto.getPurchaseOrderItemsdto().get(i).getReceivedQty();
				productDetails2.setTotalStock(total_stock);
				productDetailsRepo.save(productDetails2);

			}

			else {
				ProductDetails productDetails1 = productDetailsRepo
						.findBySkuAndStore(combinedDto.getPurchaseOrderItemsdto().get(i).getSku(), store);
				int Prev_stock;
				int new_stock;
				int totalSellable = 0;

				if (productDetails1 != null) {
					Prev_stock = productDetails1.getSellableStock();
					new_stock = combinedDto.getPurchaseOrderItemsdto().get(i).getReceivedQty();
					int nonSellable_stock = productDetails1.getNonSellableStock();
					totalSellable = Prev_stock + new_stock;
					int total_stock = totalSellable + nonSellable_stock;
					productDetails1.setTotalStock(total_stock);
					productDetails1.setSellableStock(totalSellable);
					productDetailsRepo.save(productDetails1);
					// System.out.println("inside iff");
				}

				else {
					ProductDetails productDetails2 = new ProductDetails(
							combinedDto.getPurchaseOrderItemsdto().get(i).getColor(),
							combinedDto.getPurchaseOrderItemsdto().get(i).getPrice(),
							combinedDto.getPurchaseOrderItemsdto().get(i).getSize(),
							combinedDto.getPurchaseOrderItemsdto().get(i).getReceivedQty(), 0,
							combinedDto.getPurchaseOrderItemsdto().get(i).getImageData(), store, product,
							combinedDto.getPurchaseOrderItemsdto().get(i).getUpc(),
							combinedDto.getPurchaseOrderItemsdto().get(i).getSku());
					int total_stock = combinedDto.getPurchaseOrderItemsdto().get(i).getReceivedQty();
					productDetails2.setTotalStock(total_stock);
					productDetailsRepo.save(productDetails2);
					// System.out.println("inside else");
				}

			}

			PurchaseOrder PO = purchaseOrderRepo
					.findByPoNumber(combinedDto.getPurchaseOrderItemsdto().get(i).getPoNumber());

			if (PO != null) {
				PurchaseOrderItems item = itemsRepo
						.findBySkuAndPurchaseOrder(combinedDto.getPurchaseOrderItemsdto().get(i).getSku(), PO);
				item.setReceivedQty(
						item.getReceivedQty() + combinedDto.getPurchaseOrderItemsdto().get(i).getReceivedQty());
				item.setRemainingQty(
						item.getRemainingQty() - combinedDto.getPurchaseOrderItemsdto().get(i).getReceivedQty());
				itemsRepo.save(item);
			}

		}

		if (combinedDto.getPurchaseOrderItemsdto().get(0).getAsnNumber() != 0) {
			ASN asn = asnRepo.findByasnNumber(combinedDto.getPurchaseOrderItemsdto().get(0).getAsnNumber());
			asn.setStatus("Complete");
			asn.setAttachedImage(combinedDto.getAttachedImage());
			List<PurchaseOrder> po_list = asn.getPurchaseOrder();
			System.out.println("po_list" + po_list);
			for (int i = 0; i < po_list.size(); i++) {
				po_list.get(i).setAttachedImage(combinedDto.getAttachedImage());
				List<PurchaseOrderItems> items = itemsRepo.findAllByPurchaseOrder(po_list.get(i));
				for (int j = 0; j < items.size(); j++) {
					int qty = items.get(j).getRemainingQty();
					if (qty != 0) {
						po_list.get(j).setStatus("Partial Receive");
						break;
					}
				}
			}

		}

		else {
			PurchaseOrder PO = purchaseOrderRepo
					.findByPoNumber(combinedDto.getPurchaseOrderItemsdto().get(0).getPoNumber());
			List<PurchaseOrderItems> items = itemsRepo.findAllByPurchaseOrder(PO);
			PO.setAttachedImage(combinedDto.getAttachedImage());
			for (int j = 0; j < items.size(); j++) {
				if (items.get(j).getRemainingQty() != 0) {
					PO.setStatus("Partial Receive");
					break;
				}
			}
		}

		return "Saved Successfully";
	}

	@Override
	public AsnAndPOCombinedDto getAllPOAndASN() {

		AsnAndPOCombinedDto asnAndPOCombinedDto = new AsnAndPOCombinedDto();

		List<PurchaseOrder> purchaseOrder = purchaseOrderRepo.findAll();
		List<PurchaseOrderdto> purchaseOrder1 = new ArrayList<>();

		for (int i = 0; i < purchaseOrder.size(); i++) {
			if (purchaseOrder.get(i).getAsn().isEmpty()) {
				PurchaseOrderdto PurchaseOrderdto = new PurchaseOrderdto(purchaseOrder.get(i).getPoNumber(),
						purchaseOrder.get(i).getStatus(), purchaseOrder.get(i).getSupplierId(),
						purchaseOrder.get(i).getCost(), purchaseOrder.get(i).getTotalSKU(),
						purchaseOrder.get(i).getStoreLocation(), purchaseOrder.get(i).getCreationDate(),
						purchaseOrder.get(i).getReceiveAfter(), purchaseOrder.get(i).getReceiveBefore(),
						purchaseOrder.get(i).getExpectedDeliveryDate());
				purchaseOrder1.add(PurchaseOrderdto);
			}
		}
		asnAndPOCombinedDto.setPurchaseOrder(purchaseOrder1);

		List<ASN> asn = asnRepo.findAll();
		List<ASNOnLoadDto> aSNOnLoadDto = new ArrayList<>();
		for (int i = 0; i < asn.size(); i++) {
			ASNOnLoadDto ASNOnLoadDto1 = new ASNOnLoadDto(asn.get(i).getAsnNumber(), asn.get(i).getQuantity(),
					asn.get(i).getCreationDate(), asn.get(i).getStatus());
			aSNOnLoadDto.add(ASNOnLoadDto1);
		}

		asnAndPOCombinedDto.setASN(aSNOnLoadDto);
		return asnAndPOCombinedDto;
	}

	@Override
	public String saveDamagedPoItems(List<PoDamagedItemsList> poDamagedItemsList) {
		poDamagedItemsRepo.saveAll(poDamagedItemsList);
		return "Saved Successfully";
	}

	@Override
	public List<PoDamagedItemsList> getDamagedPoItemsByAsnOrPo(int number) {
		List<PoDamagedItemsList> items = poDamagedItemsRepo.findByAsnNumberOrPoNumber(number, number);
		return items;
	}
}
