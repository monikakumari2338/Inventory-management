
package com.inventory.purchaseorder.serviceimpl;

import java.time.LocalDate;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.dto.DsdReceiveItemsdto;
import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.Productdto;
import com.inventory.purchaseorder.entity.Category;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.DsdReceiveItems;
import com.inventory.purchaseorder.entity.DsdSuppliers;
import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.Stores;
import com.inventory.purchaseorder.exception.ExceptionHandling;
import com.inventory.purchaseorder.repository.CategoryRepo;
import com.inventory.purchaseorder.repository.DsdInvoiceRepo;
import com.inventory.purchaseorder.repository.DsdSuppliersRepo;
import com.inventory.purchaseorder.repository.ProductDetailsRepo;
import com.inventory.purchaseorder.repository.ProductRepo;
import com.inventory.purchaseorder.repository.PurchaseOrderRepo;
import com.inventory.purchaseorder.repository.StoreRepo;
import com.inventory.purchaseorder.service.DSDService;

@Service
public class DSDServiceImpl implements DSDService {

	@Autowired
	private DsdSuppliersRepo DsdRepo;

	@Autowired
	private com.inventory.purchaseorder.repository.DsdReceiveItemsRepo DsdItemsRepo;

	@Autowired
	private DsdInvoiceRepo invoiceRepo;

	@Autowired
	private ProductRepo productRepo;

	@Autowired
	private ProductDetailsRepo productDetailsRepo;

	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private StoreRepo storeRepo;

	// Function to save Dsd receive products
	@Override
	public DsdReceiveItemsdto saveDsd(DsdReceiveItemsdto DsdReceiveItemsdto) {
		DsdInvoice dsdInvoice = invoiceRepo.findByInvoiceId(DsdReceiveItemsdto.getInvoiceId());
		DsdReceiveItems DsdReceiveItems1 = DsdItemsRepo.findByItemNumberAndColorAndSizeAndStoreAndDsdinvoice(
				DsdReceiveItemsdto.getItemNumber(), DsdReceiveItemsdto.getColor(), DsdReceiveItemsdto.getSize(),
				DsdReceiveItemsdto.getStore(), dsdInvoice);

		System.out.println("DsdReceiveItems1 : " + DsdReceiveItems1);
		if (DsdReceiveItems1 == null) {

			DsdReceiveItems dsdReceiveItems = new DsdReceiveItems(DsdReceiveItemsdto.getItemNumber(),
					DsdReceiveItemsdto.getItemName(), DsdReceiveItemsdto.getExpectedQty(),
					DsdReceiveItemsdto.getCategory(), DsdReceiveItemsdto.getColor(), DsdReceiveItemsdto.getPrice(),
					DsdReceiveItemsdto.getSize(), DsdReceiveItemsdto.getImageData(), DsdReceiveItemsdto.getStore(),
					DsdReceiveItemsdto.getStock(), dsdInvoice);

//			System.out.println("invoice : " + dsdInvoice);
			DsdItemsRepo.save(dsdReceiveItems);
		}

		else {
			int stock = DsdReceiveItems1.getStock();
			DsdReceiveItems1.setStock(stock + DsdReceiveItemsdto.getStock());
			DsdItemsRepo.save(DsdReceiveItems1);
		}

		return DsdReceiveItemsdto;
	}

	// Function to get invoices associated with the supplier

	@Override
	public List<DsdInvoice> getDsdSupplierInvoices(int supplier) {
		DsdSuppliers dsdSuppliers = DsdRepo.findBySupplierId(supplier);
		List<DsdInvoice> DsdInvoice1 = invoiceRepo.findAllBySupplierId(dsdSuppliers);
		System.out.println("DsdInvoice : " + DsdInvoice1);
		return DsdInvoice1;
	}

	// Function to save Dsd products in Master product table
	@Override
	public List<ProductCombineddto> saveDSdProducts(List<ProductCombineddto> productCombineddto, int invoiceNumber) {

		DsdInvoice dsdInvoice = invoiceRepo.findByInvoiceNumber(invoiceNumber);
		String invoiceStatus = dsdInvoice.getStatus();

//		System.out.println("dsdInvoice :  " + dsdInvoice.getStatus());

		if (!invoiceStatus.equals("complete")) {
			for (int i = 0; i < productCombineddto.size(); i++) {

				Stores store = storeRepo.findByStoreName(productCombineddto.get(i).getProductDetailsdto().getStore());
				Category category = categoryRepo
						.findByCategory(productCombineddto.get(i).getProductdto().getCategoryName());

				Product product = productRepo
						.findByItemNumber(productCombineddto.get(i).getProductdto().getItemNumber());

//			System.out.println("store :  "+store);
//			System.out.println("category :  "+category);
//			System.out.println("product :  "+product);
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
					// System.out.println("saved : inside if");

				} else {
					ProductDetails productDetails1 = productDetailsRepo.findByColorAndSizeAndStoreAndProduct(
							productCombineddto.get(i).getProductDetailsdto().getColor(),
							productCombineddto.get(i).getProductDetailsdto().getSize(), store, product);
					int Prev_stock;
					int new_stock;
					int total_stock = 0;
					// System.out.println("productDetails1 : " + productDetails1);
					if (productDetails1 != null) {
						Prev_stock = productDetails1.getStock();
						new_stock = productCombineddto.get(i).getProductDetailsdto().getStock();
						total_stock = Prev_stock + new_stock;
						productDetails1.setStock(total_stock);
						productDetailsRepo.save(productDetails1);
						// System.out.println("saved : inside else if");
					}

					else {
						ProductDetails productDetails2 = new ProductDetails(
								productCombineddto.get(i).getProductDetailsdto().getColor(),
								productCombineddto.get(i).getProductDetailsdto().getPrice(),
								productCombineddto.get(i).getProductDetailsdto().getSize(),
								productCombineddto.get(i).getProductDetailsdto().getStock(),
								productCombineddto.get(i).getProductDetailsdto().getImageData(), store, product);
						productDetailsRepo.save(productDetails2);

						// System.out.println("saved : inside else");
					}

				}

			}
		}

		dsdInvoice.setStatus("complete");
		invoiceRepo.save(dsdInvoice);
		return productCombineddto;

	}

	// Function to get dsd products on the basis of invoice number
	@Override
	public List<DsdReceiveItemsdto> getInvoiceProducts(int invoiceNumber) {
		DsdInvoice dsdInvoice = invoiceRepo.findByInvoiceNumber(invoiceNumber);
		// int invoiceID = dsdInvoice.getInvoiceId();
		List<DsdReceiveItems> dsdReceiveItems = DsdItemsRepo.findAllByDsdinvoice(dsdInvoice);
		System.out.println("dsdInvoice : " + dsdInvoice);
		System.out.println("dsdReceiveItems : " + dsdReceiveItems);

		List<DsdReceiveItemsdto> dsdReceiveItemsdto = new ArrayList<>();
		for (int i = 0; i < dsdReceiveItems.size(); i++) {
			dsdReceiveItemsdto.add(new DsdReceiveItemsdto(dsdReceiveItems.get(i).getItemNumber(),
					dsdReceiveItems.get(i).getItemName(), dsdReceiveItems.get(i).getExpectedQty(),
					dsdReceiveItems.get(i).getCategory(), dsdReceiveItems.get(i).getColor(),
					dsdReceiveItems.get(i).getPrice(), dsdReceiveItems.get(i).getSize(),
					dsdReceiveItems.get(i).getImageData(), dsdReceiveItems.get(i).getStore(),
					dsdReceiveItems.get(i).getStock(), dsdReceiveItems.get(i).getDsdinvoice().getInvoiceId()));
		}
		return dsdReceiveItemsdto;
	}

	// Function to get all DSD
	@Override
	public List<DsdInvoice> getViewDsd() {
		List<DsdSuppliers> dsdSuppliers = DsdRepo.findAll();
		List<DsdInvoice> DsdInvoice1 = new ArrayList<>();
		for (int i = 0; i < dsdSuppliers.size(); i++) {
			DsdSuppliers dsdSuppliers1 = DsdRepo.findBySupplierId(dsdSuppliers.get(i).getSupplierId());
			DsdInvoice1.addAll(invoiceRepo.findAllBySupplierId(dsdSuppliers1));
		}

		System.out.println("DsdInvoice1 : " + DsdInvoice1);
		return DsdInvoice1;
	}

	// Function to get all DSD by supplier
	@Override
	public List<DsdInvoice> getViewDsdBySupplier(String supplierName) {
		DsdSuppliers supplier = DsdRepo.findBysupplierName(supplierName);
		if (supplier == null) {
			throw new ExceptionHandling(HttpStatus.BAD_REQUEST, "No data found with the supplier " + supplierName);
		}
		System.out.println("supplier : " + supplier);
		List<DsdInvoice> DsdInvoice1 = invoiceRepo.findAllBySupplierId(supplier);
		System.out.println("DsdInvoice1 : " + DsdInvoice1);
		return DsdInvoice1;
	}

	// Function to get all DSD by date
	@Override
	public List<DsdInvoice> getViewDsdByDate(LocalDate date) {
		List<DsdInvoice> DsdInvoice1 = invoiceRepo.findAllByexpDate(date);
		if (DsdInvoice1.size() == 0) {
			throw new ExceptionHandling(HttpStatus.BAD_REQUEST, "No data found with the date " + date);
		}
		System.out.println("DsdInvoice1 : " + DsdInvoice1);
		return DsdInvoice1;
	}

	@Override
	public List<DsdInvoice> getMatchedSuppliers(String name) {
		List<DsdInvoice> suppliers = invoiceRepo.findBySupplierNameContaining(name);
		System.out.print("suppliers :" + suppliers);
		return suppliers;
	}

}
