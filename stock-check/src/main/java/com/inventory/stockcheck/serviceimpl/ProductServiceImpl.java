package com.inventory.stockcheck.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.stockcheck.dto.ProductDto;
import com.inventory.stockcheck.entity.Category;
import com.inventory.stockcheck.entity.Product;
import com.inventory.stockcheck.entity.Stores;
import com.inventory.stockcheck.repository.CategoryRepo;
import com.inventory.stockcheck.repository.ProductRepo;
import com.inventory.stockcheck.repository.StoreRepo;
import com.inventory.stockcheck.service.ProductService;
;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepo productRepo;
	
	@Autowired
	private StoreRepo storeRepo;

	@Autowired
	private CategoryRepo categoryRepo;
	
	
	@Override
	public ArrayList<ProductDto> save_product(ArrayList<ProductDto> productDto) {

		for(int i=0;i<productDto.size();i++)
		{
			Product product1=productRepo.findAllByItemNumberAndColorAndSize(productDto.get(i).getItemNumber(),productDto.get(i).getColor(),productDto.get(i).getSize());
			if(product1==null)
			{
			Stores store = storeRepo.findByStoreId(productDto.get(i).getStoreref());
			
			Category category=categoryRepo.findByCategoryId(productDto.get(i).getCategoryref());
			
			Product product=new Product(productDto.get(i).getProductName(),productDto.get(i).getProductStock(),productDto.get(i).getItemNumber(),
					productDto.get(i).getColor(),productDto.get(i).getPrice(),productDto.get(i).getSize(),productDto.get(i).getImageData(),store,category);
			
			productRepo.save(product);
			}
			
			else
			{
				int stock=product1.getProductStock();
				product1.setProductStock(stock+productDto.get(i).getProductStock());
				productRepo.save(product1);
			}
			
		}
		return productDto;
	}

	@Override
	public ProductDto save(ProductDto productDto) {
		
		Product product1=productRepo.findAllByItemNumberAndColorAndSize(productDto.getItemNumber(),productDto.getColor(),productDto.getSize());
		if(product1==null)
		{
			Stores store = storeRepo.findByStoreId(productDto.getStoreref());
			
			Category category=categoryRepo.findByCategoryId(productDto.getCategoryref());
			
			Product product=new Product(productDto.getProductName(),productDto.getProductStock(),productDto.getItemNumber(),
					productDto.getColor(),productDto.getPrice(),productDto.getSize(),productDto.getImageData(),store,category);
			
			productRepo.save(product);
		}
		else
		{
			int stock=product1.getProductStock();
			product1.setProductStock(stock+productDto.getProductStock());
			productRepo.save(product1);
		}
		return productDto;
	}
	
	@Override
	public List<ProductDto> getProduct(String modelNumber) {
	
		List<Product> product=productRepo.findAllByItemNumber(modelNumber);
		//int id=product.getStore().getStoreId();
		List<ProductDto> productDto=new ArrayList<>();
		//System.out.println("length"+product.size());
		for(int i=0;i<product.size();i++)
		{
				ProductDto productDto1=new ProductDto(product.get(i).getProductName(),product.get(i).getProductStock(),product.get(i).getItemNumber(),
				product.get(i).getColor(),product.get(i).getPrice(),product.get(i).getStore().getStoreId(),product.get(i).getSize(),product.get(i).getCategory().getCategoryId(), product.get(i).getImageData());
				
				productDto.add(productDto1);
		}
		
		//System.out.println("length2"+productDto.size());
		return productDto;
	}

	@Override
	public ProductDto getProductByitemNumberColorSize(String modelNumber, String color, String size) {
		
		Product product=productRepo.findAllByItemNumberAndColorAndSize(modelNumber, color, size);

		ProductDto productDto=new ProductDto(product.getProductName(),product.getProductStock(),product.getItemNumber()
				,product.getColor(),product.getPrice(),product.getStore().getStoreId(),product.getSize(),product.getCategory().getCategoryId(),product.getImageData());
		
		return productDto;
	
	}

	@Override
	public List<String> getProductByitemNumberSize(String itemNumber, String size) {
	
		List<Product> product=productRepo.findAllByItemNumberAndSize(itemNumber, size);
		List<String> colors = new ArrayList<>();
		for(int i=0;i<product.size();i++)
		{
			colors.add(product.get(i).getColor());
		}
		
		return colors;
	}
	
	@Override
	public List<String> getProductByitemNumberColor(String itemNumber, String color) {
	
		List<Product> product=productRepo.findAllByItemNumberAndColor(itemNumber, color);
		List<String> sizes = new ArrayList<>();
		for(int i=0;i<product.size();i++)
		{
			sizes.add(product.get(i).getSize());
		}
		
		return sizes;
	}

	
	

}
