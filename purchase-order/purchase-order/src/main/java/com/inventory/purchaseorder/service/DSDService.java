
package com.inventory.purchaseorder.service;

import java.time.LocalDate;

import java.util.List;
import java.util.Set;

import com.inventory.purchaseorder.dto.DsdReceiveItemsdto;
import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.DsdSuppliers;

public interface DSDService {

	List<DsdInvoice> getDsdSupplierInvoices(int id);

	DsdReceiveItemsdto saveDsd(DsdReceiveItemsdto DsdReceiveItemsdto);

	List<ProductCombineddto> saveDSdProducts(List<ProductCombineddto> productCombineddto, int invoiceNumber);

	List<DsdReceiveItemsdto> getInvoiceProducts(int invoiceNumber);

	List<DsdInvoice> getViewDsd();

	List<DsdInvoice> getViewDsdBySupplier(String name);

	List<DsdInvoice> getViewDsdByDate(LocalDate date);

	Set<String> getAllDSDSuppliers();

	List<DsdSuppliers> getAllSuppliers();
}
