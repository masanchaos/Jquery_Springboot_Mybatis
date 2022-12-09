package com.macletek.demo01;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@MapperScan(basePackages = { "com.macletek.demo01.mapper" }) // 掃包！
@SpringBootApplication
@EnableTransactionManagement //開啟事務支持
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
