
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.ProductDetailsdto;
import com.inventory.purchaseorder.dto.Productdto;



public interface ProductService {

//	Productdto saveProduct(Productdto Productdto);
//	
//	ProductDetailsdto saveProductDetails(ProductDetailsdto ProductDetailsdto);
//	
	List<ProductCombineddto> saveProducts(List<ProductCombineddto> productCombineddto);
}
