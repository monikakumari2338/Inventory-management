
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.ProductsByItemNumberdto;
import com.inventory.purchaseorder.dto.StoreAndInTransitInventorydto;
import com.inventory.purchaseorder.dto.categorydto;
import com.inventory.purchaseorder.entity.Product;

public interface ProductService {

	List<ProductCombineddto> saveProducts(List<ProductCombineddto> productCombineddto, int received_qty);

	ProductsByItemNumberdto getByItemnumber(String item_number);

	List<categorydto> getCategoryStock();

	public StoreAndInTransitInventorydto getInventory();

	List<Product> getMatchedProductsByItemNumber(String item_number);

	List<String> getAllCategories();
}
