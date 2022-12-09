package com.macletek.demo01.bean;

import org.hibernate.validator.constraints.NotEmpty;
import org.hibernate.validator.constraints.Range;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    private Integer id;

    @NotEmpty(message = "請輸入姓名")
    private String name;

    @NotEmpty(message = "請輸入語文成績")
    @Range(min = 0, max = 100, message = "分數超出範圍")
    private String chineseScore;

    @NotEmpty(message = "請輸入數學成績")
    @Range(min = 0, max = 100, message = "分數超出範圍")
    private String mathScore;

    @NotEmpty(message = "請輸入英語成績")
    @Range(min = 0, max = 100, message = "分數超出範圍")
    private String englishScore;

}
