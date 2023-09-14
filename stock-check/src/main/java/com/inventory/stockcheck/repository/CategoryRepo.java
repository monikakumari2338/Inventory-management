package com.inventory.stockcheck.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.stockcheck.entity.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
	
	Category findByCategoryId(int categoryid);

}
