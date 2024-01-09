package com.inventory.purchaseorder.serviceimpl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.entity.Stores;
import com.inventory.purchaseorder.entity.TransferReceiveInfo;
import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.ProductDetailsdto;
import com.inventory.purchaseorder.dto.Productdto;
import com.inventory.purchaseorder.dto.ProductsByItemNumberdto;
import com.inventory.purchaseorder.dto.StoreAndInTransitInventorydto;
import com.inventory.purchaseorder.dto.categorydto;
import com.inventory.purchaseorder.entity.Category;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.PurchaseOrder;
import com.inventory.purchaseorder.entity.PurchaseOrderItems;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessInfo;
import com.inventory.purchaseorder.repository.CategoryRepo;
import com.inventory.purchaseorder.repository.DsdInvoiceRepo;
import com.inventory.purchaseorder.repository.ProductDetailsRepo;
import com.inventory.purchaseorder.repository.ProductRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderItemsRepo;
import com.inventory.purchaseorder.repository.StoreRepo;
import com.inventory.purchaseorder.repository.TransferRecieveInfoRepo;
import com.inventory.purchaseorder.service.ProductService;
import com.inventory.purchaseorder.repository.PurchaseOrderRepo;
import com.inventory.purchaseorder.dto.categorydto;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepo productRepo;

	@Autowired
	private ProductDetailsRepo productDetailsRepo;

	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private StoreRepo storeRepo;

	@Autowired
	private PurchaseOrderRepo PurchaseOrderRepo;

	@Autowired
	private PurchaseOrderItemsRepo itemsRepo;
	@Autowired
	private DsdInvoiceRepo dsdInvoiceRepo;

	@Autowired
	private TransferRecieveInfoRepo transferRecieveInfoRepo;

	@Override
	public List<ProductCombineddto> saveProducts(List<ProductCombineddto> productCombineddto, int received_qty) {

		PurchaseOrder purchaseOrder = PurchaseOrderRepo
				.findByPoNumber(productCombineddto.get(0).getProductDetailsdto().getPoNumber());
		// System.out.print("purchaseOrder " + purchaseOrder);
		List<PurchaseOrderItems> PurchaseOrderItemsList = itemsRepo.findAllByPurchaseOrder(purchaseOrder);
		for (int i = 0; i < productCombineddto.size(); i++) {
//			System.out.print("length "+productCombineddto.size());
			Stores store = storeRepo.findByStoreName(productCombineddto.get(i).getProductDetailsdto().getStore());
			Category category = categoryRepo
					.findByCategory(productCombineddto.get(i).getProductdto().getCategoryName());

			Product product = productRepo.findByItemNumber(productCombineddto.get(i).getProductdto().getItemNumber());
			if (product == null) {

				Product product1 = new Product(productCombineddto.get(i).getProductdto().getItemNumber(),
						productCombineddto.get(i).getProductdto().getItemName(), category);

				Productdto Productdto = new Productdto(product1.getItemNumber(), product1.getitemName(),
						productCombineddto.get(i).getProductdto().getCategoryName());
				productRepo.save(product1);
				// productCombineddto1.get(i).setProductdto(Productdto);

				Product product2 = productRepo
						.findByItemNumber(productCombineddto.get(i).getProductdto().getItemNumber());
				ProductDetails productDetails2 = new ProductDetails(
						productCombineddto.get(i).getProductDetailsdto().getColor(),
						productCombineddto.get(i).getProductDetailsdto().getPrice(),
						productCombineddto.get(i).getProductDetailsdto().getSize(),
						productCombineddto.get(i).getProductDetailsdto().getStock(),
						productCombineddto.get(i).getProductDetailsdto().getImageData(), store, product2);

				productDetailsRepo.save(productDetails2);

			} else {
				ProductDetails productDetails1 = productDetailsRepo.findByColorAndSizeAndStoreAndProduct(
						productCombineddto.get(i).getProductDetailsdto().getColor(),
						productCombineddto.get(i).getProductDetailsdto().getSize(), store, product);
				int Prev_stock;
				int new_stock;
				int total_stock = 0;

				if (productDetails1 != null) {
					Prev_stock = productDetails1.getStock();
					new_stock = productCombineddto.get(i).getProductDetailsdto().getStock();
					total_stock = Prev_stock + new_stock;
					productDetails1.setStock(total_stock);
					productDetailsRepo.save(productDetails1);
				}

				else {
					ProductDetails productDetails2 = new ProductDetails(
							productCombineddto.get(i).getProductDetailsdto().getColor(),
							productCombineddto.get(i).getProductDetailsdto().getPrice(),
							productCombineddto.get(i).getProductDetailsdto().getSize(),
							productCombineddto.get(i).getProductDetailsdto().getStock(),
							productCombineddto.get(i).getProductDetailsdto().getImageData(), store, product);
					productDetailsRepo.save(productDetails2);
				}

			}

			for (int j = 0; j < PurchaseOrderItemsList.size(); j++) {
				if (PurchaseOrderItemsList.get(i).getPurchaseOrder().getPoNumber() == productCombineddto.get(0)
						.getProductDetailsdto().getPoNumber())

				{
					PurchaseOrderItems PurchaseOrderItems = itemsRepo
							.findByitemNumber(productCombineddto.get(i).getProductdto().getItemNumber());
					// System.out.print("PurchaseOrderItems "+PurchaseOrderItems);

					if (PurchaseOrderItems != null) {
						PurchaseOrderItems
								.setReceivedQty(productCombineddto.get(i).getProductDetailsdto().getReceived_qty());
					}
				}
			}
		}

		purchaseOrder.setStatus(productCombineddto.get(0).getProductDetailsdto().getStatus());
		System.out.println("purchaseOrder : " + purchaseOrder);
		System.out.println("received_qty : " + received_qty);
		purchaseOrder.setReceived_qty(received_qty);
		productRepo.save(purchaseOrder);

		return productCombineddto;

	}

	@Override
	public ProductsByItemNumberdto getByItemnumber(String item_number) {
		Product product = productRepo.findByItemNumber(item_number);

		List<ProductDetails> productDetails = productDetailsRepo.findAllByProduct(product);

		List<ProductDetailsdto> productDetailsdto = new ArrayList<>();
		ProductsByItemNumberdto productsByItemNumberdto = new ProductsByItemNumberdto();

		productsByItemNumberdto.setItemName(product.getitemName());
		productsByItemNumberdto.setItemNumber(product.getItemNumber());
		productsByItemNumberdto.setCategoryName(product.getCategory().getCategory());
		for (int i = 0; i < productDetails.size(); i++) {
			productDetailsdto.add(new ProductDetailsdto(productDetails.get(i).getColor(),
					productDetails.get(i).getPrice(), productDetails.get(i).getSize(), productDetails.get(i).getStock(),
					productDetails.get(i).getImageData(), productDetails.get(i).getStore().getStoreName(),
					productDetails.get(i).getProduct().getItemNumber()));

		}
		productsByItemNumberdto.setProductDetailsdto(productDetailsdto);
//        System.out.println("productsByItemNumberdto : "+productsByItemNumberdto);
//        System.out.println("productDetailsdto : "+productDetailsdto);

		return productsByItemNumberdto;
	}

	@Override
	public List<categorydto> getCategoryStock() {
		List<categorydto> dashboard = new ArrayList<>();
		for (int i = 1; i < 5; i++) {

			int total_stock = 0;
			Category category = categoryRepo.findByCategoryId(i);

			List<Product> products = productRepo.findAllProductByCategory_id(category.getCategoryId());
			List<ProductDetails> productDetail = new ArrayList<>();
			for (int j = 0; j < products.size(); j++) {
				productDetail
						.addAll(productDetailsRepo.findAllProductDetailsByitemNumber(products.get(j).getItemNumber()));
				total_stock = total_stock + productDetail.get(j).getStock();
			}

			dashboard.add(new categorydto(category.getCategory(), total_stock));

		}
		System.out.println("dashboard " + " " + dashboard);
		return dashboard;

	}

	public StoreAndInTransitInventorydto getInventory() {
		List<ProductDetails> ProductDetailstockList = productDetailsRepo.findAll();
		int inStore = 0;
		int inTransit = 0;
		for (int i = 0; i < ProductDetailstockList.size(); i++) {
			inStore = inStore + ProductDetailstockList.get(i).getStock();
		}
		System.out.println("inStore " + " " + inStore);

		List<PurchaseOrder> poList = PurchaseOrderRepo.findAllByStatus("pending");
		for (int i = 0; i < poList.size(); i++) {
			inTransit = inTransit + poList.get(i).getExpected_qty();
		}
		//System.out.println("inTransit after po " + " " + inTransit);
		List<DsdInvoice> dsdInvoiceList = dsdInvoiceRepo.findAllByStatus("pending");
		for (int i = 0; i < dsdInvoiceList.size(); i++) {
			inTransit = inTransit + dsdInvoiceList.get(i).getExpected_qty();
		}
		//System.out.println("inTransit after dsd " + " " + inTransit);
		List<TransferReceiveInfo> transferReceiveList = transferRecieveInfoRepo.findAllByStatus("pending");
		for (int i = 0; i < transferReceiveList.size(); i++) {
			inTransit = inTransit + transferReceiveList.get(i).getExpected_qty();
		}
		System.out.println("inTransit " + " " + inTransit);
		
		StoreAndInTransitInventorydto inventorydto =new StoreAndInTransitInventorydto(inStore,inTransit);
		return inventorydto;
	}
	
	@Override
	public List<Product> getMatchedProductsByItemNumber(String item_number) {
		List<Product> Products = productRepo.findByItemNumberContaining(item_number);
		return Products;
	}

}
