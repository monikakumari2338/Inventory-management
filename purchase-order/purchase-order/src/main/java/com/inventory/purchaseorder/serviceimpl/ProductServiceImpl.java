package com.inventory.purchaseorder.serviceimpl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.entity.Stores;
import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.Productdto;
import com.inventory.purchaseorder.entity.Category;
import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.PurchaseOrder;
import com.inventory.purchaseorder.repository.CategoryRepo;
import com.inventory.purchaseorder.repository.ProductDetailsRepo;
import com.inventory.purchaseorder.repository.ProductRepo;
import com.inventory.purchaseorder.repository.StoreRepo;
import com.inventory.purchaseorder.service.ProductService;
import com.inventory.purchaseorder.repository.PurchaseOrderRepo;
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

	@Override
	public List<ProductCombineddto> saveProducts(List<ProductCombineddto> productCombineddto) {

		//List<ProductCombineddto> productCombineddto1 = new ArrayList<ProductCombineddto>();
		
		for(int i=0;i<productCombineddto.size();i++)
		{
//			System.out.print("length "+productCombineddto.size());
		Stores store = storeRepo.findByStoreName(productCombineddto.get(i).getProductDetailsdto().getStore());
		Category category = categoryRepo.findByCategory(productCombineddto.get(i).getProductdto().getCategoryName());

		Product product = productRepo.findByitemNumber(productCombineddto.get(i).getProductdto().getItemNumber());
		if (product == null) {

			Product product1 = new Product(productCombineddto.get(i).getProductdto().getItemNumber(),
					productCombineddto.get(i).getProductdto().getItemName(), category);

			Productdto Productdto = new Productdto(product1.getItemNumber(), product1.getitemName(),
					productCombineddto.get(i).getProductdto().getCategoryName());
			productRepo.save(product1);
			//productCombineddto1.get(i).setProductdto(Productdto);

			Product product2 = productRepo.findByitemNumber(productCombineddto.get(i).getProductdto().getItemNumber());
			ProductDetails productDetails2 = new ProductDetails(productCombineddto.get(i).getProductDetailsdto().getColor(),
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


		}
		PurchaseOrder purchaseOrder= PurchaseOrderRepo.findByPoNumber(productCombineddto.get(0).getProductDetailsdto().getPoNumber());
		purchaseOrder.setStatus(productCombineddto.get(0).getProductDetailsdto().getStatus());
		productRepo.save(purchaseOrder);
		return productCombineddto;

	}

}




//ProductDetailsdto productDetailsdto = new ProductDetailsdto(productDetails2.getColor(),
//productDetails2.getPrice(), productDetails2.getSize(), productDetails2.getStock(),
//productDetails2.getImageData(), productCombineddto.getProductDetailsdto().getStore(),
//productCombineddto.getProductDetailsdto().getItemNumber());

// productCombineddto1.setProductDetailsdto(productDetailsdto);
