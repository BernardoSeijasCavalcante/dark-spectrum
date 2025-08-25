package br.com.darkspectrum.darkintermedium.entities;

import java.util.Objects;

import br.com.darkspectrum.darkintermedium.enums.ProductCategory;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name="product")
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@MapsId("id")
	@JoinColumn(name = "user_id")
	private User user;

	private String name;
	private Double cost_price;
	private Double sale_price;
	private Integer stockQuantity;
	private Integer minimumStock;
	private Integer maximumStock;
	@Enumerated(EnumType.STRING)
	private ProductCategory category;
	
	public Product() {
		
	}

	public Product(Long id, User user, String name, Double cost_price, Double sale_price, Integer stockQuantity,
			Integer minimumStock, Integer maximumStock, ProductCategory category) {
		super();
		this.id = id;
		this.user = user;
		this.name = name;
		this.cost_price = cost_price;
		this.sale_price = sale_price;
		this.stockQuantity = stockQuantity;
		this.minimumStock = minimumStock;
		this.maximumStock = maximumStock;
		this.category = category;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getCost_price() {
		return cost_price;
	}

	public void setCost_price(Double cost_price) {
		this.cost_price = cost_price;
	}

	public Double getSale_price() {
		return sale_price;
	}

	public void setSale_price(Double sale_price) {
		this.sale_price = sale_price;
	}

	public Integer getStockQuantity() {
		return stockQuantity;
	}

	public void setStockQuantity(Integer stockQuantity) {
		this.stockQuantity = stockQuantity;
	}

	public Integer getMinimumStock() {
		return minimumStock;
	}

	public void setMinimumStock(Integer minimumStock) {
		this.minimumStock = minimumStock;
	}

	public Integer getMaximumStock() {
		return maximumStock;
	}

	public void setMaximumStock(Integer maximumStock) {
		this.maximumStock = maximumStock;
	}

	public ProductCategory getCategory() {
		return category;
	}

	public void setCategory(ProductCategory category) {
		this.category = category;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		return Objects.equals(id, other.id);
	}
	
}
