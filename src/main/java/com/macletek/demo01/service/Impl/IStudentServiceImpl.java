package com.macletek.demo01.service.Impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.macletek.demo01.bean.Student;
import com.macletek.demo01.mapper.IStudentMapper;
import com.macletek.demo01.service.IStudentService;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class IStudentServiceImpl implements IStudentService {

    Logger logger = LoggerFactory.getLogger(IStudentServiceImpl.class);

    @Autowired
    IStudentMapper iStudentMapper;

    @Override
    @Transactional(propagation = Propagation.REQUIRED, readOnly = false)
    public int addAndDelStudent(Student student, Integer id) {
        int i = iStudentMapper.addStudent(student);
        Student stu = iStudentMapper.checkIdExist(id);

        if (stu == null) {
            throw new RuntimeException();
        }
        int j = iStudentMapper.deleteStudent(id);
        return i + j;
    }

    @Override
    public int addStudent(Student student) {
        return iStudentMapper.addStudent(student);
    }

    @Override
    public int deleteStudent(Integer id) {
        return iStudentMapper.deleteStudent(id);
    }

    @Override
    public int updateStudent(Student student) {
        return iStudentMapper.updateStudent(student);
    }

    @Override
    public Student getStudentById(Integer id) {
        return iStudentMapper.getStudentById(id);
    }

    @Override
    public List<Student> listAllStudents() {
        List<Student> students = iStudentMapper.listAllStudents();

        for (int i = 0; i < 10; i++) {
            logger.info("info!!!");
            logger.debug("debug!!!");
            logger.error("error!!!");
        }
        return students;
    }

    @Override
    public List<Student> getStudentByName(String name) {
        String studentName = "%" + name + "%";
        return iStudentMapper.getStudentByName(studentName);
    }
}
