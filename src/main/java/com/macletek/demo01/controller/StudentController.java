package com.macletek.demo01.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.macletek.demo01.bean.Student;
import com.macletek.demo01.service.IStudentService;
import com.macletek.demo01.util.Result;

@RestController
@RequestMapping("/user")
public class StudentController {

    @Autowired
    IStudentService iStudentService;

    @PostMapping("/add")
    public Result add(@Validated @RequestBody Student student) {
        return iStudentService.addStudent(student) == 1 ? Result.success() : Result.error("500", "添加失敗");
    }

    @DeleteMapping("/addAndDel/{id}")
    public Result addAndDel(@Validated @RequestBody Student student, @PathVariable("id") Integer id) {
        return iStudentService.addAndDelStudent(student, id) == 2 ?
                Result.success() : Result.error("500", "增刪只執行其中一個");
    }

    @GetMapping("/list")
    public List<Student> list() {
        List<Student> students = iStudentService.listAllStudents();
        return students;
    }

    @PutMapping("/update/{id}")
    public Result update(@Validated @RequestBody Student student, Errors errors, @PathVariable("id") Integer id) {
        HashMap<Object, Object> map = new HashMap<>();
        List<FieldError> fieldErrors = errors.getFieldErrors();

        for (FieldError fieldError : fieldErrors) {
            map.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        if (map.isEmpty()) { // 說明沒有校驗錯誤，正常添加
            //前端傳來的student沒有id
            student.setId(id);
            iStudentService.updateStudent(student);
            return Result.success();
        } else {
            return Result.error("400", "後端校驗失敗!", map);
        }
    }

    @DeleteMapping("/del/{id}")
    public Result deleteStudent(@PathVariable("id") Integer id) {
        return iStudentService.deleteStudent(id) == 1 ? Result.success() : Result.error("500", "删除失敗");
    }

    @GetMapping("/getById/{id}")
    public Student getStudentById(@PathVariable("id") Integer id) {
        Student student = iStudentService.getStudentById(id);
        return student;
    }

    @GetMapping("/getByName/{name}")
    public List<Student> getStudentByName(@PathVariable("name") String name) {
        return iStudentService.getStudentByName(name);
    }
}
