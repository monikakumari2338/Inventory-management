package com.inventory.purchaseorder.dto;

import java.time.LocalDateTime;

public class SaveStockCountInfodto {

	private int countId;
	private String countDescription;
	private LocalDateTime startedAt;
	private LocalDateTime completedAt;
	private String status;
	private int totalBookQty;
	private int countedQty;
	private int varianceQty;
	private String reCount;

	public SaveStockCountInfodto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getCountId() {
		return countId;
	}

	public void setCountId(int countId) {
		this.countId = countId;
	}

	public String getCountDescription() {
		return countDescription;
	}

	public void setCountDescription(String countDescription) {
		this.countDescription = countDescription;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getTotalBookQty() {
		return totalBookQty;
	}

	public void setTotalBookQty(int totalBookQty) {
		this.totalBookQty = totalBookQty;
	}

	public LocalDateTime getStartedAt() {
		return startedAt;
	}

	public void setStartedAt(LocalDateTime startedAt) {
		this.startedAt = startedAt;
	}

	public LocalDateTime getCompletedAt() {
		return completedAt;
	}

	public void setCompletedAt(LocalDateTime completedAt) {
		this.completedAt = completedAt;
	}

	public int getCountedQty() {
		return countedQty;
	}

	public void setCountedQty(int countedQty) {
		this.countedQty = countedQty;
	}

	public int getVarianceQty() {
		return varianceQty;
	}

	public void setVarianceQty(int varianceQty) {
		this.varianceQty = varianceQty;
	}

	public String getReCount() {
		return reCount;
	}

	public void setReCount(String reCount) {
		this.reCount = reCount;
	}

	public SaveStockCountInfodto(int countId, String countDescription, LocalDateTime startedAt,
			LocalDateTime completedAt, String status, int totalBookQty, int countedQty, int varianceQty,
			String reCount) {
		super();
		this.countId = countId;
		this.countDescription = countDescription;
		this.startedAt = startedAt;
		this.completedAt = completedAt;
		this.status = status;
		this.totalBookQty = totalBookQty;
		this.countedQty = countedQty;
		this.varianceQty = varianceQty;
		this.reCount = reCount;
	}

	@Override
	public String toString() {
		return "SaveStockCountInfo [countId=" + countId + ", countDescription=" + countDescription + ", startedAt="
				+ startedAt + ", completedAt=" + completedAt + ", status=" + status + ", totalBookQty=" + totalBookQty
				+ ", countedQty=" + countedQty + ", varianceQty=" + varianceQty + "]";
	}

}
