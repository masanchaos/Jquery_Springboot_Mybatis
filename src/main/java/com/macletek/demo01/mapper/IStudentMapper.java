package com.macletek.demo01.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.macletek.demo01.bean.Student;

@Mapper
public interface IStudentMapper {

	public int addStudent(Student student);

	public int deleteStudent(Integer id);

	public int updateStudent(Student student);

	public Student getStudentById(Integer id);

	public List<Student> listAllStudents();

	public List<Student> getStudentByName(String name);

	public Student checkIdExist(Integer id);
}