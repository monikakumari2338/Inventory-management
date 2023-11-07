
package com.inventory.purchaseorder.service;

import java.util.List;

import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.ProductsByItemNumberdto;

public interface ProductService {

	List<ProductCombineddto> saveProducts(List<ProductCombineddto> productCombineddto,int received_qty);

	ProductsByItemNumberdto getByItemnumber(String item_number);
}
