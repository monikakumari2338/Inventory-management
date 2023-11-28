package com.inventory.purchaseorder.repository;

import java.time.LocalDate;


import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.purchaseorder.entity.StockCountCreation;

public interface StockCreationRepo extends JpaRepository<StockCountCreation, Integer> {

	StockCountCreation findByCountId(int id);
	StockCountCreation findByDate(LocalDate date);
}