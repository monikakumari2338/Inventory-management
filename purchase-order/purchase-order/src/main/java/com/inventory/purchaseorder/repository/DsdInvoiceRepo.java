package com.inventory.purchaseorder.repository;

import java.time.LocalDate;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.DsdSuppliers;

public interface DsdInvoiceRepo extends JpaRepository<DsdInvoice, Integer> {

	DsdInvoice findByInvoiceId(int id);

	DsdInvoice findByInvoiceNumber(int invoice);

	List<DsdInvoice> findAllBySupplierId(DsdSuppliers dsdSuppliers);

	List<DsdInvoice> findAllByexpDate(LocalDate date);

	List<DsdInvoice> findAllByStatus(String status);

	List<DsdInvoice> findBySupplierNameContaining(String name);

}
