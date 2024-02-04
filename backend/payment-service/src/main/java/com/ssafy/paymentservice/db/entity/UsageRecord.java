package com.ssafy.paymentservice.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
//@Setter
public class UsageRecord {
    @Id
    private String id;
    @Column
    private String user_id;
    @Column
    private int price;
    @Column
    private int balance; // 사용 후 잔액
    @Column
    private String created_at; // 요청 시간
//    @Column
//    private String approved_at; // 승인 시간
    @Builder
    public UsageRecord(String id, String user_id, int price, String created_at ){
        this.id = id;
        this.user_id = user_id;
        this.price = price;
        this. created_at = created_at;
    }
}
